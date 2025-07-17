#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
醫療工具百寶箱 - 批量更新腳本
將所有HTML頁面的JS引用更新為統一的 unified-app.js

使用方法：
python update_all_pages_to_unified.py

功能：
1. 掃描所有HTML檔案
2. 替換舊的JS引用為 unified-app.js
3. 更新初始化代碼
4. 創建備份
5. 生成更新報告
"""

import os
import re
import shutil
from datetime import datetime
from pathlib import Path

class PageUpdater:
    def __init__(self):
        self.public_dir = Path('public')
        self.backup_dir = Path('backup_before_unified_update')
        self.updated_files = []
        self.skipped_files = []
        self.errors = []
        
        # 需要替換的舊JS引用模式
        self.old_js_patterns = [
            r'<script src=["\']js/tools-config\.js["\']></script>',
            r'<script src=["\']js/spa-router\.js["\']></script>',
            r'<script src=["\']js/main\.js["\']></script>',
            r'<script src=["\']js/app\.js["\']></script>',
            r'<script src=["\']components/header-sidebar\.js["\']></script>'
        ]
        
        # 新的統一JS引用
        self.new_js_reference = '    <script src="js/unified-app.js"></script>'
        
        # 舊的初始化代碼模式
        self.old_init_patterns = [
            r'<!-- 初始化頂部欄和側邊欄 -->\s*<script>[\s\S]*?initHeaderSidebar\([^}]*\}\s*\);\s*\}\);\s*</script>',
            r'<script>[\s\S]*?document\.addEventListener\(["\']DOMContentLoaded["\'][\s\S]*?initHeaderSidebar[\s\S]*?</script>'
        ]
        
    def create_backup(self):
        """創建備份目錄"""
        if self.backup_dir.exists():
            shutil.rmtree(self.backup_dir)
        self.backup_dir.mkdir()
        print(f"✅ 創建備份目錄: {self.backup_dir}")
        
    def backup_file(self, file_path):
        """備份單個檔案"""
        relative_path = file_path.relative_to(self.public_dir)
        backup_path = self.backup_dir / relative_path
        backup_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(file_path, backup_path)
        
    def get_html_files(self):
        """獲取所有HTML檔案"""
        html_files = []
        for file_path in self.public_dir.rglob('*.html'):
            # 跳過備份檔案和測試檔案
            if 'backup' in str(file_path) or 'test' in str(file_path):
                continue
            html_files.append(file_path)
        return html_files
        
    def detect_page_name(self, file_path):
        """從檔案路徑檢測頁面名稱"""
        return file_path.stem
        
    def update_html_file(self, file_path):
        """更新單個HTML檔案"""
        try:
            # 備份原檔案
            self.backup_file(file_path)
            
            # 讀取檔案內容
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            original_content = content
            page_name = self.detect_page_name(file_path)
            
            # 檢查是否已經使用統一檔案
            if 'unified-app.js' in content:
                self.skipped_files.append({
                    'file': str(file_path),
                    'reason': '已經使用 unified-app.js'
                })
                return False
                
            # 移除所有舊的JS引用
            js_removed = False
            for pattern in self.old_js_patterns:
                if re.search(pattern, content):
                    content = re.sub(pattern, '', content)
                    js_removed = True
                    
            # 移除舊的初始化代碼
            init_removed = False
            for pattern in self.old_init_patterns:
                if re.search(pattern, content, re.MULTILINE | re.DOTALL):
                    content = re.sub(pattern, '', content, flags=re.MULTILINE | re.DOTALL)
                    init_removed = True
                    
            # 如果沒有找到舊的JS引用，跳過此檔案
            if not js_removed:
                self.skipped_files.append({
                    'file': str(file_path),
                    'reason': '未找到需要替換的JS引用'
                })
                return False
                
            # 添加新的統一JS引用和配置
            new_js_section = f'''
    <!-- 統一應用程式檔案 - 包含所有功能 -->
{self.new_js_reference}

    <!-- 統一檔案會自動初始化，如需自訂配置可設定 window.medicalToolsConfig -->
    <script>
        // 可選：自訂配置
        window.medicalToolsConfig = {{
            currentPage: '{page_name}',
            pageTitle: document.title || '醫療工具百寶箱',
            enableSPA: true
        }};
    </script>'''
            
            # 在 </body> 前插入新的JS代碼
            if '</body>' in content:
                content = content.replace('</body>', f'{new_js_section}\n</body>')
            else:
                # 如果沒有 </body>，在檔案末尾添加
                content += new_js_section
                
            # 清理多餘的空行和註釋
            content = re.sub(r'\n\s*<!-- 必要的 JavaScript 文件 -->\s*\n', '\n', content)
            content = re.sub(r'\n\s*<!-- 初始化頂部欄和側邊欄 -->\s*\n', '\n', content)
            content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)  # 移除多餘空行
            
            # 寫入更新後的內容
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
            self.updated_files.append({
                'file': str(file_path),
                'page_name': page_name,
                'js_removed': js_removed,
                'init_removed': init_removed
            })
            
            return True
            
        except Exception as e:
            self.errors.append({
                'file': str(file_path),
                'error': str(e)
            })
            return False
            
    def run_update(self):
        """執行批量更新"""
        print("🚀 開始批量更新所有HTML頁面...")
        print("=" * 50)
        
        # 創建備份
        self.create_backup()
        
        # 獲取所有HTML檔案
        html_files = self.get_html_files()
        print(f"📁 找到 {len(html_files)} 個HTML檔案")
        
        # 更新每個檔案
        for i, file_path in enumerate(html_files, 1):
            print(f"[{i}/{len(html_files)}] 處理: {file_path.name}")
            self.update_html_file(file_path)
            
        # 生成報告
        self.generate_report()
        
    def generate_report(self):
        """生成更新報告"""
        report_content = f"""# 批量更新報告
        
## 更新時間
{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## 統計摘要
- ✅ 成功更新: {len(self.updated_files)} 個檔案
- ⏭️ 跳過檔案: {len(self.skipped_files)} 個檔案  
- ❌ 錯誤檔案: {len(self.errors)} 個檔案

## 成功更新的檔案
"""
        
        for file_info in self.updated_files:
            report_content += f"- ✅ {file_info['file']} (頁面: {file_info['page_name']})\n"
            
        if self.skipped_files:
            report_content += "\n## 跳過的檔案\n"
            for file_info in self.skipped_files:
                report_content += f"- ⏭️ {file_info['file']} - {file_info['reason']}\n"
                
        if self.errors:
            report_content += "\n## 錯誤檔案\n"
            for error_info in self.errors:
                report_content += f"- ❌ {error_info['file']} - {error_info['error']}\n"
                
        report_content += f"""
## 更新內容
1. 移除舊的JS引用：
   - js/tools-config.js
   - js/spa-router.js  
   - js/main.js
   - js/app.js
   - components/header-sidebar.js

2. 添加統一JS引用：
   - js/unified-app.js

3. 更新初始化代碼：
   - 移除舊的 initHeaderSidebar 調用
   - 添加 window.medicalToolsConfig 配置

## 備份位置
{self.backup_dir}

## 回滾方法
如需回滾，可以從備份目錄恢復檔案：
```bash
cp -r {self.backup_dir}/* public/
```
"""
        
        # 寫入報告檔案
        report_file = Path('update_report.md')
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write(report_content)
            
        # 輸出摘要
        print("\n" + "=" * 50)
        print("📊 更新完成摘要:")
        print(f"✅ 成功更新: {len(self.updated_files)} 個檔案")
        print(f"⏭️ 跳過檔案: {len(self.skipped_files)} 個檔案")
        print(f"❌ 錯誤檔案: {len(self.errors)} 個檔案")
        print(f"📄 詳細報告: {report_file}")
        print(f"💾 備份位置: {self.backup_dir}")
        
        if self.errors:
            print("\n⚠️ 發現錯誤，請檢查報告檔案")
        else:
            print("\n🎉 所有檔案更新成功！")

def main():
    """主函數"""
    print("醫療工具百寶箱 - 批量更新腳本")
    print("將所有HTML頁面更新為使用 unified-app.js")
    print()
    
    # 確認執行
    response = input("確定要執行批量更新嗎？(y/N): ").strip().lower()
    if response != 'y':
        print("❌ 取消更新")
        return
        
    # 檢查必要檔案
    unified_js = Path('public/js/unified-app.js')
    if not unified_js.exists():
        print(f"❌ 錯誤: 找不到 {unified_js}")
        print("請確保 unified-app.js 檔案存在")
        return
        
    # 執行更新
    updater = PageUpdater()
    updater.run_update()

if __name__ == '__main__':
    main()