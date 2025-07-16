#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
將所有HTML頁面轉換為統一的組件呼叫模式
移除舊有的導航欄代碼，改為使用組件系統
"""

import os
import re
from pathlib import Path

# 頁面ID映射表
PAGE_MAPPING = {
    'amoxicillin-dose-calculator.html': 'amoxicillin-dose-calculator',
    'anemia.html': 'anemia',
    'asthma-control.html': 'asthma-control',
    'bppv.html': 'bppv',
    'carotid-ultrasound.html': 'carotid-ultrasound',
    'children-asthma.html': 'children-asthma',
    'children-steroid-dose-calculator.html': 'children-steroid-dose-calculator',
    'children-vaccine.html': 'children-vaccine',
    'cloud-report-organizer.html': 'cloud-report-organizer',
    'constipation.html': 'constipation',
    'covid-medication.html': 'covid-medication',
    'diabetes-education.html': 'diabetes-education',
    'diabetes-medication.html': 'diabetes-medication',
    'enterovirus.html': 'enterovirus',
    'health-check-analyzer.html': 'health-check-analyzer',
    'hypertension.html': 'hypertension',
    'hypertension-medication.html': 'hypertension-medication',
    'hyperthyroidism.html': 'hyperthyroidism',
    'index.html': 'index',
    'inferior-turbinate-rfa.html': 'inferior-turbinate-rfa',
    'insomnia.html': 'insomnia',
    'lipid-calculator.html': 'lipid-calculator',
    'measles.html': 'measles',
    'mounjaro.html': 'mounjaro',
    'my-plate-education.html': 'my-plate-education',
    'nasal-spray.html': 'nasal-spray',
    'osas.html': 'osas',
    'papilloma-hpv.html': 'papilloma-hpv',
    'pediatric-antibiotic-calculator.html': 'pediatric-antibiotic-calculator',
    'pneumococcus-vaccine.html': 'pneumococcus-vaccine',
    'smoking-cessation-meds.html': 'smoking-cessation-meds',
    'thyroid-medication-pregnancy.html': 'thyroid-medication-pregnancy',
    'timer-for-bppv.html': 'timer-for-bppv',
    'trigeminal-neuralgia.html': 'trigeminal-neuralgia',
    'vertigo.html': 'vertigo',
    'vzv.html': 'vzv'
}

def get_component_template(page_id):
    """生成統一的組件呼叫模板"""
    return f"""    <!-- 必要的 JavaScript 文件 -->
    <script src="js/tools-config.js"></script>
    <script src="components/header-sidebar.js"></script>

    <!-- 初始化頂部欄和側邊欄 -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {{
            initHeaderSidebar({{
                currentPage: '{page_id}',
                pageTitle: '醫療工具百寶箱'
            }});
        }});
    </script>
</body>
</html>"""

def remove_old_navigation(content):
    """移除舊有的導航欄HTML代碼"""
    
    # 移除頂部導航欄
    nav_pattern = r'<nav[^>]*>.*?</nav>'
    content = re.sub(nav_pattern, '', content, flags=re.DOTALL)
    
    # 移除側邊欄遮罩
    overlay_pattern = r'<div[^>]*id=["\']sidebar-overlay["\'][^>]*>.*?</div>'
    content = re.sub(overlay_pattern, '', content, flags=re.DOTALL)
    
    # 移除側邊欄
    sidebar_pattern = r'<aside[^>]*>.*?</aside>'
    content = re.sub(sidebar_pattern, '', content, flags=re.DOTALL)
    
    return content

def remove_old_javascript(content):
    """移除舊有的JavaScript代碼"""
    
    # 移除主題切換相關的JavaScript
    theme_js_patterns = [
        r'function\s+initTheme\(\)\s*\{[^}]*\}',
        r'function\s+toggleTheme\(\)\s*\{[^}]*\}',
        r'const\s+themeToggle\s*=.*?;',
        r'const\s+themeIcon\s*=.*?;',
        r'themeToggle\.addEventListener.*?;'
    ]
    
    for pattern in theme_js_patterns:
        content = re.sub(pattern, '', content, flags=re.DOTALL)
    
    # 移除側邊欄相關的JavaScript
    sidebar_js_patterns = [
        r'function\s+initSidebar\(\)\s*\{[^}]*\}',
        r'function\s+toggleSidebar\(\)\s*\{[^}]*\}',
        r'function\s+openSidebar\(\)\s*\{[^}]*\}',
        r'function\s+closeSidebar\(\)\s*\{[^}]*\}',
        r'const\s+sidebar\s*=.*?;',
        r'const\s+sidebarOverlay\s*=.*?;',
        r'const\s+sidebarToggle\s*=.*?;',
        r'let\s+sidebarOpen\s*=.*?;'
    ]
    
    for pattern in sidebar_js_patterns:
        content = re.sub(pattern, '', content, flags=re.DOTALL)
    
    # 移除分類導航相關的JavaScript
    nav_js_patterns = [
        r'function\s+renderCategoriesNav\(\)\s*\{[^}]*\}',
        r'renderCategoriesNav\(\);?'
    ]
    
    for pattern in nav_js_patterns:
        content = re.sub(pattern, '', content, flags=re.DOTALL)
    
    return content

def clean_main_content(content):
    """清理main標籤的類名，移除舊的邊距設定"""
    
    # 移除main標籤上的舊類名
    main_pattern = r'<main[^>]*class=["\']([^"\']*)["\']([^>]*)>'
    
    def replace_main_class(match):
        old_classes = match.group(1)
        other_attrs = match.group(2)
        
        # 移除與組件相關的類名
        classes_to_remove = ['lg:ml-64', 'pt-16', 'min-h-screen']
        new_classes = []
        
        for cls in old_classes.split():
            if cls not in classes_to_remove:
                new_classes.append(cls)
        
        if new_classes:
            return f'<main class="{" ".join(new_classes)}"{other_attrs}>'
        else:
            return f'<main{other_attrs}>'
    
    content = re.sub(main_pattern, replace_main_class, content)
    
    return content

def remove_existing_component_calls(content):
    """移除現有的組件呼叫代碼"""
    
    # 移除現有的組件腳本引用和初始化
    component_patterns = [
        r'<script src=["\']js/tools-config\.js["\']></script>',
        r'<script src=["\']components/header-sidebar\.js["\']></script>',
        r'<script>\s*document\.addEventListener\(["\']DOMContentLoaded["\'],.*?initHeaderSidebar.*?\);\s*</script>',
        r'<!-- 必要的 JavaScript 文件 -->.*?<!-- 初始化頂部欄和側邊欄 -->.*?</script>',
        r'<!-- 初始化統一組件系統 -->.*?</script>'
    ]
    
    for pattern in component_patterns:
        content = re.sub(pattern, '', content, flags=re.DOTALL)
    
    return content

def convert_html_file(file_path):
    """轉換單個HTML文件"""
    try:
        # 讀取文件內容
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 獲取頁面ID
        file_name = os.path.basename(file_path)
        page_id = PAGE_MAPPING.get(file_name, file_name.replace('.html', ''))
        
        # 移除現有的組件呼叫
        content = remove_existing_component_calls(content)
        
        # 移除舊有的導航欄HTML
        content = remove_old_navigation(content)
        
        # 移除舊有的JavaScript
        content = remove_old_javascript(content)
        
        # 清理main內容
        content = clean_main_content(content)
        
        # 生成新的組件呼叫代碼
        component_code = get_component_template(page_id)
        
        # 定義結束標籤模式
        end_patterns = [
            r'</body>\s*</html>\s*$',
            r'</script>\s*</body>\s*</html>\s*$',
            r'</script>\s*\n\s*</body>\s*\n\s*</html>\s*$',
            r'</body>\s*\n\s*</html>\s*$'
        ]
        
        # 替換結束標籤
        converted = False
        for pattern in end_patterns:
            if re.search(pattern, content, re.MULTILINE | re.DOTALL):
                new_content = re.sub(pattern, component_code, content, flags=re.MULTILINE | re.DOTALL)
                converted = True
                break
        
        if not converted:
            return 'failed', '未找到標準的結束標籤'
        
        # 清理多餘的空行
        new_content = re.sub(r'\n\s*\n\s*\n', '\n\n', new_content)
        
        # 寫入新內容
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        return 'success', f'頁面ID: {page_id}'
        
    except Exception as e:
        return 'error', str(e)

def main():
    """主函數"""
    print("🔄 開始轉換所有頁面為統一組件模式...")
    print("=" * 60)
    
    # 獲取public目錄下的所有HTML文件
    public_dir = Path('public')
    if not public_dir.exists():
        print("❌ 錯誤: 找不到 public 目錄")
        return
    
    html_files = list(public_dir.glob('*.html'))
    
    # 排除測試文件和模板文件
    exclude_files = ['test_components.html', 'page-template.html', 'example-converted-page.html']
    html_files = [f for f in html_files if f.name not in exclude_files]
    
    if not html_files:
        print("❌ 錯誤: 在 public 目錄中找不到HTML文件")
        return
    
    print(f"📁 找到 {len(html_files)} 個HTML文件需要轉換")
    print()
    
    # 統計變量
    success_count = 0
    failed_count = 0
    error_count = 0
    
    # 處理每個文件
    for file_path in sorted(html_files):
        file_name = file_path.name
        print(f"🔄 轉換: {file_name}", end=" ... ")
        
        status, message = convert_html_file(file_path)
        
        if status == 'success':
            print(f"✅ 成功 ({message})")
            success_count += 1
        elif status == 'failed':
            print(f"⚠️  失敗 ({message})")
            failed_count += 1
        else:  # error
            print(f"❌ 錯誤 ({message})")
            error_count += 1
    
    # 顯示總結
    print()
    print("=" * 60)
    print("🎉 組件化轉換完成！")
    print(f"✅ 成功轉換: {success_count} 個頁面")
    print(f"⚠️  失敗: {failed_count} 個頁面")
    print(f"❌ 錯誤: {error_count} 個頁面")
    print(f"📊 總計: {len(html_files)} 個頁面")
    
    if success_count > 0:
        print()
        print("🎯 轉換完成後的特點:")
        print("✨ 所有頁面使用統一的組件系統")
        print("🗑️  移除了重複的導航欄代碼")
        print("🔧 簡化了頁面結構")
        print("📱 保持響應式設計")
        
        print()
        print("🧪 建議測試:")
        print("1. 打開 index.html 測試首頁")
        print("2. 打開任意轉換後的頁面測試組件")
        print("3. 測試側邊欄分類跳轉功能")
        print("4. 測試明暗模式切換")

if __name__ == "__main__":
    main()