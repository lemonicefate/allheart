# allheart Roadmap

**Status**: 🟡 Maintenance
**Last updated**: 2026-04-27
**Current state**: 31/33 SPA 頁面正常，2 頁待修

## 🔧 Active maintenance
- [ ] 修復 hyperthyroidism.html
- [ ] 修復 health-check-analyzer.html

## 📅 Up next
- [ ] 統一頁面組件系統（header-sidebar.js 套用至全部頁面）
- [ ] 計算器類工具加入醫療參數輸入驗證（weight / age / BP 範圍檢查）
- [ ] 加入免責聲明於所有計算器頁面

## 🗂️ Backlog
- 全站搜索功能（search.js + index.html 搜索框 + autocomplete）
- 工具篩選機制（tools-config.js 多標籤、難度等級、常用工具分類）
- 工具索引頁面 tools-index.html（表格式、可排序）
- Service Worker 離線快取（public/sw.js）
- 醫療數據輸入驗證（validation.js + 異常值警告 + 計算結果合理性檢查）
- 39 個 HTML 樣式統一（考慮模板化、自動轉換腳本）
- 性能監控與載入速度優化（CSS/JS 壓縮、圖片 WebP + lazy loading、Chart.js 懶載入）
- 安全性強化（CSP、XSS 防護、輸入清理）
- 統一錯誤處理機制（error-handler.js）
- 暗色模式一致性與響應式斷點統一
- WCAG 2.1 AA 可訪問性

## ✅ Recently done
- [x] 修復 AJAX 載入並統一切換至 unified-app.js（SPA 主架構）
- [x] 側邊欄與整體樣式更新
- [x] 新增頸動脈超音波頁 carotid-sono.html 與 insomnia.html
- [x] 雲端報告管理器 cloud-report-organizer.html 重做並加入排序功能
- [x] 新增貧血、糖尿病用藥、高血壓用藥三張衛教頁

## ⚠️ Known concerns
- 2 個壞掉的頁面（hyperthyroidism.html、health-check-analyzer.html）
- 39 個 HTML 手維護重複度高，缺乏模板化
- 無 Service Worker，離線無法使用
- 醫療數據無輸入驗證，異常值不會警告
- 缺乏 CSP 與 XSS 防護
- Tailwind 透過 CDN 載入，正式環境效能未最佳化
