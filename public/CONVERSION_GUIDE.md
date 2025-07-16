# 🔧 手動轉換頁面指南

由於現有頁面結構複雜，這裡提供一個簡化的手動轉換方法。

## 🎯 轉換步驟（每個頁面 2 分鐘）

### 步驟 1: 在每個頁面的 `</body>` 前添加組件腳本

找到 `</body>` 標籤，在它前面添加：

```html
<!-- 必要的 JavaScript 文件 -->
<script src="js/tools-config.js"></script>
<script src="components/header-sidebar.js"></script>

<!-- 初始化頂部欄和側邊欄 -->
<script>
    document.addEventListener('DOMContentLoaded', () => {
        initHeaderSidebar({
            currentPage: 'PAGE_ID',  // 改為對應的頁面 ID
            pageTitle: '誠心醫療體系的醫療工具箱'
        });
    });
</script>
</body>
```

### 步驟 2: 替換頁面 ID

將 `PAGE_ID` 替換為對應的值：

#### 🔧 看診小工具 (tools)
- `amoxicillin-dose-calculator` → amoxicillin-dose-calculator.html
- `pediatric-antibiotic-calculator` → pediatric-antibiotic-calculator.html
- `children-steroid-dose-calculator` → children-steroid-dose-calculator.html
- `lipid-calculator` → lipid-calculator.html
- `health-check-analyzer` → health-check-analyzer.html
- `cloud-report-organizer` → cloud-report-organizer.html
- `timer-for-bppv` → timer-for-bppv.html

#### 🦠 感染疾病 (infection-disease)
- `enterovirus` → enterovirus.html
- `measles` → measles.html
- `covid-medication` → covid-medication.html
- `vzv` → vzv.html

#### 👂 耳鼻喉頭頸外科 (ent)
- `nasal-spray` → nasal-spray.html
- `inferior-turbinate-rfa` → inferior-turbinate-rfa.html
- `vertigo` → vertigo.html
- `bppv` → bppv.html
- `trigeminal-neuralgia` → trigeminal-neuralgia.html

#### 🫀 內科疾病 (internal-medicine)
- `anemia` → anemia.html
- `hypertension` → hypertension.html
- `hypertension-medication` → hypertension-medication.html
- `diabetes-education` → diabetes-education.html
- `diabetes-medication` → diabetes-medication.html
- `hyperthyroidism` → hyperthyroidism.html
- `thyroid-medication-pregnancy` → thyroid-medication-pregnancy.html
- `carotid-ultrasound` → carotid-ultrasound.html

#### 📚 疾病/衛教 (disease)
- `asthma-control` → asthma-control.html
- `children-asthma` → children-asthma.html
- `children-vaccine` → children-vaccine.html
- `my-plate-education` → my-plate-education.html
- `smoking-cessation-meds` → smoking-cessation-meds.html
- `constipation` → constipation.html
- `insomnia` → insomnia.html
- `osas` → osas.html
- `papilloma-hpv` → papilloma-hpv.html
- `pneumococcus-vaccine` → pneumococcus-vaccine.html
- `mounjaro` → mounjaro.html

## 📝 實際示例

### 示例 1: amoxicillin-dose-calculator.html
```html
<!-- 在 </body> 前添加 -->
<script src="js/tools-config.js"></script>
<script src="components/header-sidebar.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        initHeaderSidebar({
            currentPage: 'amoxicillin-dose-calculator',
            pageTitle: '誠心醫療體系的醫療工具箱'
        });
    });
</script>
</body>
```

### 示例 2: anemia.html
```html
<!-- 在 </body> 前添加 -->
<script src="js/tools-config.js"></script>
<script src="components/header-sidebar.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        initHeaderSidebar({
            currentPage: 'anemia',
            pageTitle: '誠心醫療體系的醫療工具箱'
        });
    });
</script>
</body>
```

## ✨ 轉換效果

轉換後，每個頁面會自動獲得：
- ✅ 統一的頂部導航欄
- ✅ 響應式側邊欄
- ✅ 明暗模式切換
- ✅ 當前頁面高亮
- ✅ 分類滾動導航

## 🚨 注意事項

1. **保持現有功能**：不需要移除現有的導航欄代碼，組件會自動覆蓋
2. **檔案路徑**：確保 `js/tools-config.js` 和 `components/header-sidebar.js` 路徑正確
3. **頁面 ID**：使用正確的頁面 ID 以確保側邊欄高亮正常

## 🎯 優先轉換頁面

建議先轉換這些重要頁面：
1. `amoxicillin-dose-calculator.html`
2. `anemia.html`
3. `diabetes-education.html`
4. `hypertension.html`
5. `asthma-control.html`

## 🔧 批量轉換工具

如果您有 Node.js 環境，可以使用：
```bash
node convert-pages.js
```

如果只有 PowerShell，可以使用：
```powershell
.\convert-pages.ps1
```

## 📞 需要幫助？

如果在轉換過程中遇到問題，請告訴我具體的頁面名稱和錯誤信息，我會立即協助您！