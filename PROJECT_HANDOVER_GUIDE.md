# 🚀 醫療工具網站專案交班指南

## 📋 專案概述

這是一個現代化的醫療工具網站，採用 **SPA (單頁應用)** 架構，具備完整的 **AJAX 導航**、**響應式設計** 和 **框架式佈局**。

### 🎯 核心特色
- ✅ **SPA 架構**：無重載頁面切換，流暢使用者體驗
- ✅ **AJAX 導航**：只載入內容，保持導航欄不變
- ✅ **框架式佈局**：現代化的視窗框架設計
- ✅ **響應式設計**：完美適配桌面、平板、手機
- ✅ **深色模式**：完整的主題切換支援
- ✅ **滾動位置記憶**：智能記住使用者瀏覽位置

## 🏗️ 專案架構

### 📁 核心檔案結構
```
public/
├── index.html                    # 主頁（SPA 入口點）
├── [page-name].html             # 各功能頁面（33個）
├── js/
│   ├── main.js                  # 首頁邏輯
│   ├── tools-config.js          # 工具配置
│   ├── spa-router.js            # SPA 路由核心 ⭐
│   └── frame-content-fix.js     # 框架內容修復
├── components/
│   ├── header-sidebar.js        # 導航組件 ⭐
│   └── page-template.html       # 頁面模板
└── [其他資源檔案]
```

### ⭐ 核心組件說明

#### 1. `spa-router.js` - SPA 路由核心
**功能**：
- AJAX 頁面載入
- 瀏覽器歷史管理
- 滾動位置記憶
- 內容快取機制
- 錯誤處理

**關鍵類別**：`SPARouter`

#### 2. `header-sidebar.js` - 導航組件
**功能**：
- 創建頂部欄和側邊欄
- 響應式佈局調整
- 深色模式切換
- 框架式佈局管理

**關鍵函數**：`initHeaderSidebar()`

#### 3. `tools-config.js` - 工具配置
**功能**：
- 定義所有醫療工具
- 分類管理
- 工具資料結構

## 🎯 SPA 設計原則

### ✅ 正確的頁面結構

#### 標準頁面模板：
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <!-- 標準 head 內容 -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- 其他 CSS -->
</head>
<body class="bg-gray-50 dark:bg-gray-900">
    <main>
        <div class="container mx-auto p-6 lg:p-8">
            <!-- 頁面特定內容 -->
        </div>
    </main>
    
    <!-- 統一的腳本載入 -->
    <script src="js/tools-config.js"></script>
    <script src="js/spa-router.js"></script>
    <script src="components/header-sidebar.js"></script>
    
    <!-- 統一的初始化 -->
    <script>
    document.addEventListener('DOMContentLoaded', () => {
        const existingNav = document.querySelector('nav');
        const existingFrame = document.getElementById('main-frame');
        
        if (!existingNav && !existingFrame) {
            // 直接載入：創建導航
            initHeaderSidebar({
                currentPage: 'page-name',
                pageTitle: '醫療工具百寶箱',
                enableSPA: true
            });
        } else {
            // SPA 載入：跳過導航創建
            if (typeof SPARouter !== 'undefined' && !window.spaRouter) {
                window.spaRouter = new SPARouter();
            }
            if (typeof updateSidebarHighlight === 'function') {
                updateSidebarHighlight('page-name');
            }
        }
    });
    </script>
</body>
</html>
```

### 🔧 SPA 行為規範

#### ✅ 正確行為：
1. **直接載入頁面**：創建完整導航系統
2. **SPA 導航**：只載入內容，保持導航不變
3. **重新整理**：重新創建導航系統
4. **瀏覽器前進/後退**：正確處理歷史記錄

#### ❌ 避免的錯誤：
- 在 SPA 模式下重新創建導航
- 破壞現有的框架結構
- 忽略滾動位置記憶
- 缺少深色模式支援

## 📱 響應式設計規範

### 🖥️ 桌面端 (≥1024px)
```css
.main-frame {
    position: fixed;
    top: 4px;
    right: 4px;
    bottom: 4px;
    left: 288px; /* 側邊欄寬度 */
}
```

### 📱 手機端 (<1024px)
```css
.main-frame {
    position: fixed;
    top: 80px; /* 頂部欄高度 */
    right: 4px;
    bottom: 4px;
    left: 4px;
}
```

## 🎨 深色模式規範

### 必要的深色模式類別：
```html
<!-- 背景 -->
<body class="bg-gray-50 dark:bg-gray-900">

<!-- 文字 -->
<h1 class="text-gray-900 dark:text-white">
<p class="text-gray-600 dark:text-gray-300">

<!-- 卡片 -->
<div class="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
```

## 🔧 常見問題解決

### Q1: 頁面有導航衝突
**症狀**：導航欄重複或樣式異常
**解決**：檢查頁面是否有自己的導航結構，應該移除並使用組件

### Q2: SPA 導航不工作
**症狀**：點擊連結重新載入整頁
**解決**：確認 `spa-router.js` 正確載入且 `enableSPA: true`

### Q3: 深色模式異常
**症狀**：切換主題時樣式不正確
**解決**：檢查是否添加了完整的深色模式類別

### Q4: 框架內容被遮擋
**症狀**：頁面頂部內容看不到
**解決**：使用標準的頁面結構，避免額外的 padding

## 📊 已完成的頁面狀態

### ✅ 完全正常的頁面 (6個)
- `index.html` - 首頁
- `anemia.html` - 貧血指南
- `amoxicillin-dose-calculator.html` - 劑量計算器
- `asthma-control.html` - 氣喘控制
- `diabetes-education.html` - 糖尿病教育
- `hypertension.html` - 高血壓管理

### 🔧 已修復但需驗證 (1個)
- `lipid-calculator.html` - 血脂計算器（最新修復）

### ⏳ 需要修復的頁面 (2個)
- `hypertension.html` - 可能有導航衝突
- `health-check-analyzer.html` - 可能有導航衝突

### ✅ 其他已啟用 SPA 的頁面 (24個)
所有其他頁面都已啟用 SPA 功能，使用標準結構。

## 🚀 下一步工作建議

### 🔧 立即需要處理
1. **驗證 `lipid-calculator.html`**：確認 SPA 行為正確
2. **修復 `hypertension.html`**：統一導航系統
3. **修復 `health-check-analyzer.html`**：統一導航系統

### 📈 功能增強
1. **預載入功能**：為常用頁面添加預載入
2. **載入動畫**：改善頁面切換視覺效果
3. **錯誤頁面**：添加 404 頁面處理
4. **效能優化**：優化快取策略

### 🧪 測試清單
- [ ] 所有頁面的直接載入正常
- [ ] SPA 導航完全無重載
- [ ] 深色模式在所有頁面正常
- [ ] 響應式設計在所有設備正常
- [ ] 滾動位置記憶功能正常

## 📚 重要提醒

### ⚠️ 絕對不要做的事
1. **破壞 SPA 架構**：不要讓頁面重新載入導航
2. **忽略響應式**：所有修改都要考慮手機端
3. **忘記深色模式**：新增內容必須支援深色主題
4. **硬編碼路徑**：使用相對路徑，保持可移植性

### ✅ 始終遵循的原則
1. **AJAX 優先**：頁面切換使用 AJAX
2. **組件化**：使用統一的導航組件
3. **響應式**：支援所有設備尺寸
4. **可訪問性**：保持良好的使用者體驗

---

**🎯 專案目標：打造現代化、高效能、使用者友善的醫療工具網站**

**核心技術棧：HTML5 + CSS3 + Vanilla JavaScript + Tailwind CSS + SPA 架構**