# 🚀 醫療工具百寶箱改進計劃 TODO List

## 📋 專案概況
- **專案名稱**: 醫療工具百寶箱 (Allheart Webpage)
- **技術棧**: Tailwind CSS + Vanilla JavaScript
- **主要功能**: 醫療計算器、疾病衛教、健康工具 (共35個工具/頁面)
- **目標用戶**: 醫療專業人員 + 一般民眾

## 🎯 改進目標 (4大方向)

### 1. 🔍 改善搜索功能和工具分類
**現況**: 目前只有分類導航，缺乏搜索功能
**目標**: 建立智能搜索和改進分類系統

#### 📝 具體任務:
- [ ] **建立全站搜索功能**
  - 在 `public/js/` 新增 `search.js`
  - 在 `index.html` 頂部導航加入搜索框
  - 實現即時搜索建議 (autocomplete)
  - 支援工具名稱、描述、關鍵字搜索

- [ ] **優化工具分類系統**
  - 修改 `public/js/tools-config.js` 增加更多分類標籤
  - 新增 "常用工具"、"最新工具" 分類
  - 實現多標籤篩選功能
  - 加入工具難度等級標示

- [ ] **建立工具索引頁面**
  - 新增 `public/tools-index.html`
  - 提供表格式工具清單
  - 支援排序 (按名稱、分類、使用頻率)

#### 🔧 修改方式:
```javascript
// 1. 在 tools-config.js 增加搜索索引
const SEARCH_INDEX = {
    keywords: {
        '血壓': ['hypertension', 'hypertension-medication'],
        '糖尿病': ['diabetes-education', 'diabetes-medication'],
        '兒童': ['children-vaccine', 'children-asthma', 'amoxicillin-dose-calculator']
    }
};

// 2. 新增搜索函數
function searchTools(query) {
    // 實現模糊搜索邏輯
}
```

### 2. ⚡ 優化頁面載入速度
**現況**: 部分頁面載入較慢，重複載入相同資源
**目標**: 提升載入速度 50%，改善用戶體驗

#### 📝 具體任務:
- [ ] **資源優化**
  - 壓縮 CSS/JS 檔案
  - 優化圖片 (WebP 格式、lazy loading)
  - 實現 CDN 快取策略

- [ ] **代碼分割和懶載入**
  - 將 `tools-config.js` 按分類分割
  - 實現組件懶載入
  - 優化 Chart.js 等第三方庫載入

- [ ] **快取機制**
  - 實現 Service Worker
  - 新增 `public/sw.js`
  - 快取靜態資源和 API 回應

- [ ] **性能監控**
  - 新增 `public/js/performance.js`
  - 監控頁面載入時間
  - 實現性能指標收集

#### 🔧 修改方式:
```javascript
// 1. 在 index.html 加入 Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

// 2. 實現懶載入
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    // 實現 Intersection Observer
};
```

### 3. 🔒 加強數據驗證和安全性
**現況**: 缺乏輸入驗證，無安全性檢查
**目標**: 建立完整的數據驗證和安全防護

#### 📝 具體任務:
- [ ] **輸入驗證系統**
  - 新增 `public/js/validation.js`
  - 對所有計算器加入數據驗證
  - 實現即時錯誤提示

- [ ] **安全性增強**
  - 加入 CSP (Content Security Policy)
  - 防止 XSS 攻擊
  - 實現輸入清理 (sanitization)

- [ ] **錯誤處理機制**
  - 新增 `public/js/error-handler.js`
  - 統一錯誤處理和用戶提示
  - 實現錯誤日誌收集

- [ ] **醫療數據驗證**
  - 建立醫療參數範圍檢查
  - 加入異常值警告
  - 實現計算結果合理性檢查

#### 🔧 修改方式:
```javascript
// 1. 建立驗證規則
const VALIDATION_RULES = {
    weight: { min: 0.5, max: 300, unit: 'kg' },
    age: { min: 0, max: 120, unit: 'years' },
    bloodPressure: { systolic: {min: 70, max: 250}, diastolic: {min: 40, max: 150} }
};

// 2. 實現驗證函數
function validateMedicalInput(field, value) {
    // 驗證邏輯
}
```

### 4. 🎨 統一頁面樣式和組件
**現況**: 頁面樣式不一致，部分頁面未使用統一組件
**目標**: 100% 頁面使用統一組件系統

#### 📝 具體任務:
- [ ] **組件系統標準化**
  - 更新 `public/components/header-sidebar.js`
  - 建立統一的頁面模板
  - 實現組件版本控制

- [ ] **批量頁面轉換**
  - 使用 `CONVERSION_GUIDE.md` 轉換所有頁面
  - 優先轉換: amoxicillin-dose-calculator.html, lipid-calculator.html, diabetes-education.html
  - 建立自動化轉換腳本

- [ ] **樣式統一化**
  - 建立設計系統文檔
  - 統一顏色、字體、間距
  - 實現暗色模式一致性

- [ ] **響應式優化**
  - 檢查所有頁面移動端適配
  - 統一斷點和佈局規則
  - 優化觸控操作體驗

#### 🔧 修改方式:
```bash
# 1. 批量轉換腳本 (PowerShell)
# 新增 convert-all-pages.ps1
$pages = @("amoxicillin-dose-calculator", "lipid-calculator", "diabetes-education")
foreach ($page in $pages) {
    # 自動添加組件引用
}

# 2. 樣式檢查腳本
# 新增 style-checker.js
function checkPageConsistency() {
    // 檢查頁面是否使用統一組件
}
```

## 📅 實施優先級

### Phase 1 (高優先級 - 1-2 週)
1. ✅ 統一頁面樣式和組件 (基礎建設)
2. ✅ 加強數據驗證和安全性 (核心功能)

### Phase 2 (中優先級 - 2-3 週)
3. ✅ 改善搜索功能和工具分類 (用戶體驗)

### Phase 3 (低優先級 - 3-4 週)
4. ✅ 優化頁面載入速度 (性能優化)

## 🛠️ 開發環境準備

### 需要的工具:
- [ ] 代碼編輯器 (VS Code 推薦)
- [ ] 瀏覽器開發者工具
- [ ] 圖片壓縮工具
- [ ] 性能測試工具 (Lighthouse)

### 測試頁面清單:
```
優先測試頁面:
1. public/index.html (首頁)
2. public/amoxicillin-dose-calculator.html (計算器)
3. public/diabetes-education.html (衛教頁面)
4. public/lipid-calculator.html (複雜計算器)
5. public/children-vaccine.html (互動頁面)
```

## 📊 成功指標

### 量化目標:
- [ ] 頁面載入速度提升 50%
- [ ] 搜索響應時間 < 200ms
- [ ] 100% 頁面使用統一組件
- [ ] 0 安全性漏洞
- [ ] 移動端適配率 100%

### 質化目標:
- [ ] 用戶體驗一致性
- [ ] 代碼可維護性提升
- [ ] 醫療數據準確性保證

## 🔄 下次 Session 快速啟動指令

```bash
# 1. 查看專案結構
ls public/

# 2. 檢查當前組件狀態
grep -r "initHeaderSidebar" public/

# 3. 開始第一個任務
# 根據優先級選擇對應的改進方向
```

## 📝 注意事項

1. **醫療責任**: 所有計算器必須包含免責聲明
2. **數據準確性**: 醫療參數和計算公式需要專業驗證
3. **用戶安全**: 不收集敏感個人醫療數據
4. **兼容性**: 支援主流瀏覽器 (Chrome, Firefox, Safari, Edge)
5. **可訪問性**: 符合 WCAG 2.1 AA 標準

---

**📞 準備就緒！** 下次 session 請直接告訴我要從哪個改進方向開始，我會立即開始實施對應的任務！