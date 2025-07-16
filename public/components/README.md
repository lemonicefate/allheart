# 🧩 可重用頂部欄和側邊欄組件

## 📁 文件說明

- `header-sidebar.js` - 主要組件文件
- `page-template.html` - 新頁面模板
- `README.md` - 使用說明（本文件）

## 🚀 快速開始

### 方法 1: 使用模板創建新頁面

1. **複製模板**：
   ```bash
   cp components/page-template.html your-new-page.html
   ```

2. **修改頁面內容**：
   - 更改 `<title>` 標籤
   - 更改 `currentPage` 參數
   - 添加您的內容

3. **完成！** 頂部欄和側邊欄會自動載入

### 方法 2: 改造現有頁面

在現有 HTML 頁面中添加以下代碼：

#### 1. 在 `<head>` 中添加必要的 CSS 和 JS：
```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Font Awesome -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

<!-- Tailwind Config -->
<script>
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: {
                    primary: {
                        50: '#eff6ff',
                        100: '#dbeafe',
                        500: '#3b82f6',
                        600: '#2563eb',
                        700: '#1d4ed8',
                        800: '#1e40af',
                        900: '#1e3a8a'
                    }
                }
            }
        }
    }
</script>
```

#### 2. 在 `<body>` 的最後添加：
```html
<!-- 必要的 JavaScript 文件 -->
<script src="js/tools-config.js"></script>
<script src="components/header-sidebar.js"></script>

<!-- 初始化頂部欄和側邊欄 -->
<script>
    document.addEventListener('DOMContentLoaded', () => {
        initHeaderSidebar({
            currentPage: 'your-page-name', // 改為您的頁面標識
            pageTitle: '誠心醫療體系的醫療工具箱'
        });
    });
</script>
```

#### 3. 為主內容添加適當的類：
```html
<main class="p-6 lg:p-8">
    <!-- 您的原有內容 -->
</main>
```

## 📝 配置選項

### currentPage 參數

用於高亮顯示當前頁面，可用值：
- `'index'` - 首頁
- `'knowledge-base'` - 知識庫
- `'risk-calculator'` - 風險計算器
- `'about-us'` - 關於我們
- 或任何自定義值

### pageTitle 參數

自定義頂部欄顯示的標題，預設為 "醫療工具百寶箱"

## 🎯 實際示例

### 示例 1: 貧血頁面
```html
<!DOCTYPE html>
<html lang="zh-TW" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>貧血診斷與治療 - 誠心醫療體系的醫療工具箱</title>
    <!-- 添加必要的 CSS -->
</head>
<body class="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    
    <main class="p-6 lg:p-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">貧血診斷與治療</h1>
            <!-- 您的貧血相關內容 -->
        </div>
    </main>
    
    <!-- 添加必要的 JS -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            initHeaderSidebar({
                currentPage: 'anemia',
                pageTitle: '誠心醫療體系的醫療工具箱'
            });
        });
    </script>
</body>
</html>
```

### 示例 2: 計算器頁面
```html
<script>
    document.addEventListener('DOMContentLoaded', () => {
        initHeaderSidebar({
            currentPage: 'amoxicillin-calculator',
            pageTitle: '誠心醫療體系的醫療工具箱'
        });
    });
</script>
```

## 🎨 自定義樣式

### 修改頂部欄標題
```javascript
initHeaderSidebar({
    pageTitle: '您的自定義標題'
});
```

### 添加自定義導航項目
編輯 `header-sidebar.js` 中的 `createSidebar` 函數，在主要導航區域添加新的連結。

## 🔧 進階功能

### 1. 分類導航滾動
- 在首頁：點擊分類會滾動到對應區塊
- 在其他頁面：點擊分類會跳轉到首頁對應區塊

### 2. 響應式設計
- 桌面版：側邊欄固定顯示
- 移動版：漢堡菜單，可收起側邊欄

### 3. 明暗模式
- 自動檢測系統偏好
- 手動切換功能
- 偏好保存到 localStorage

### 4. 鍵盤快捷鍵
- `ESC` 鍵：關閉移動版側邊欄

## 🚨 注意事項

1. **依賴文件**：確保 `js/tools-config.js` 文件存在
2. **路徑問題**：根據您的文件結構調整 JS 文件路徑
3. **樣式衝突**：如果有自定義 CSS，可能需要調整優先級

## 📞 故障排除

### 問題 1: 側邊欄分類不顯示
**解決方案**：確保 `js/tools-config.js` 已正確載入，且 `CATEGORIES` 變數已定義

### 問題 2: 主題切換不工作
**解決方案**：檢查是否有 `id="theme-toggle"` 和 `id="theme-icon"` 的元素

### 問題 3: 側邊欄在移動端無法切換
**解決方案**：確保 `id="sidebar-toggle"` 按鈕存在

## 🎉 優勢

- ✅ **一次設置，處處使用**
- ✅ **統一的設計風格**
- ✅ **自動響應式適配**
- ✅ **內建明暗模式**
- ✅ **易於維護和更新**
- ✅ **減少重複代碼 95%**

現在您可以專注於頁面內容，而不用擔心導航欄的重複工作！