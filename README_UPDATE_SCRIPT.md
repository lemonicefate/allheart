# 🔄 批量更新腳本使用說明

## 📋 腳本功能

`update_all_pages_to_unified.py` 是一個自動化腳本，用於將所有HTML頁面更新為使用統一的 `unified-app.js` 檔案。

## 🚀 使用方法

### 1. 執行腳本
```bash
python update_all_pages_to_unified.py
```

### 2. 確認執行
腳本會詢問確認，輸入 `y` 繼續：
```
確定要執行批量更新嗎？(y/N): y
```

## 🔧 腳本會執行的操作

### ✅ 自動處理
1. **創建備份** - 在 `backup_before_unified_update/` 目錄備份所有原始檔案
2. **掃描檔案** - 找到所有 `.html` 檔案
3. **移除舊引用** - 刪除以下JS引用：
   - `js/tools-config.js`
   - `js/spa-router.js`
   - `js/main.js`
   - `js/app.js`
   - `components/header-sidebar.js`
4. **添加新引用** - 加入 `js/unified-app.js`
5. **更新初始化** - 替換為新的配置方式
6. **生成報告** - 創建詳細的更新報告

### 📄 輸出檔案
- `update_report.md` - 詳細更新報告
- `backup_before_unified_update/` - 原始檔案備份

## 📊 預期結果

### 更新前的HTML結構：
```html
<script src="js/tools-config.js"></script>
<script src="js/spa-router.js"></script>
<script src="components/header-sidebar.js"></script>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        initHeaderSidebar({
            currentPage: 'page-name',
            pageTitle: '頁面標題',
            enableSPA: true
        });
    });
</script>
```

### 更新後的HTML結構：
```html
<!-- 統一應用程式檔案 - 包含所有功能 -->
<script src="js/unified-app.js"></script>

<!-- 統一檔案會自動初始化，如需自訂配置可設定 window.medicalToolsConfig -->
<script>
    // 可選：自訂配置
    window.medicalToolsConfig = {
        currentPage: 'page-name',
        pageTitle: document.title || '醫療工具百寶箱',
        enableSPA: true
    };
</script>
```

## 🛡️ 安全機制

### 1. 自動備份
- 所有原始檔案都會備份到 `backup_before_unified_update/`
- 保持原始目錄結構

### 2. 智能跳過
- 已經使用 `unified-app.js` 的檔案會自動跳過
- 沒有相關JS引用的檔案會跳過

### 3. 錯誤處理
- 遇到錯誤時會記錄但繼續處理其他檔案
- 所有錯誤都會在報告中詳細記錄

## 🔄 回滾方法

如果需要回滾到原始狀態：

```bash
# 方法1: 使用備份目錄
cp -r backup_before_unified_update/* public/

# 方法2: 使用 Git (如果有版本控制)
git checkout -- public/
```

## 📋 檢查清單

執行前請確認：
- ✅ `public/js/unified-app.js` 檔案存在
- ✅ 已測試 `unified-app.js` 功能正常
- ✅ 有足夠的磁碟空間進行備份
- ✅ 沒有其他程序正在使用這些檔案

執行後請檢查：
- ✅ 查看 `update_report.md` 確認更新結果
- ✅ 測試幾個重要頁面功能是否正常
- ✅ 檢查瀏覽器控制台是否有錯誤

## ⚠️ 注意事項

1. **執行環境**: 需要 Python 3.6+
2. **檔案權限**: 確保有讀寫 `public/` 目錄的權限
3. **備份重要**: 雖然腳本會自動備份，建議先手動備份重要檔案
4. **測試建議**: 更新後建議測試主要功能頁面

## 🎉 完成後

更新完成後，您的專案將：
- ✅ 使用單一統一的JS檔案
- ✅ 消除JS檔案間的衝突
- ✅ 簡化維護和更新
- ✅ 提高載入效率
- ✅ 統一所有頁面的導航體驗