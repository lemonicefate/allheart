// spa-router.js - 單頁應用路由系統
// 使用 AJAX 技術實現無重載頁面切換

class SPARouter {
    constructor() {
        this.currentPage = '';
        this.isLoading = false;
        this.cache = new Map(); // 頁面內容快取
        this.scrollPositions = new Map(); // 頁面滾動位置快取
        this.init();
    }

    init() {
        // 攔截所有內部連結的點擊事件
        this.interceptLinks();
        
        // 監聽瀏覽器的前進/後退按鈕
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.page) {
                this.loadPage(event.state.page, false); // false = 不添加到歷史記錄
            }
        });

        // 監聽頁面滾動事件，定期保存滾動位置
        this.initScrollListener();

        // 設定當前頁面狀態
        const currentPath = window.location.pathname;
        const currentPageName = this.extractPageName(currentPath);
        this.currentPage = currentPageName;
        
        // 將當前頁面添加到瀏覽器歷史
        history.replaceState({ page: currentPageName }, '', currentPath);
    }

    /**
     * 攔截所有內部連結點擊事件
     */
    interceptLinks() {
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            
            // 檢查是否為內部連結
            if (this.isInternalLink(link)) {
                event.preventDefault(); // 阻止預設的頁面跳轉
                
                const href = link.getAttribute('href');
                const pageName = this.extractPageName(href);
                
                // 如果不是當前頁面，則載入新頁面
                if (pageName !== this.currentPage) {
                    this.loadPage(pageName, true);
                }
            }
        });
    }

    /**
     * 檢查是否為內部連結
     */
    isInternalLink(link) {
        if (!link || !link.href) return false;
        
        const href = link.getAttribute('href');
        
        // 排除外部連結、錨點連結、JavaScript連結等
        if (!href || 
            href.startsWith('http://') || 
            href.startsWith('https://') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            href.startsWith('#') ||
            href.startsWith('javascript:')) {
            return false;
        }
        
        // 只處理 .html 檔案
        return href.endsWith('.html');
    }

    /**
     * 從URL路徑提取頁面名稱
     */
    extractPageName(path) {
        if (!path) return 'index';
        
        const fileName = path.split('/').pop();
        if (!fileName || fileName === '') return 'index';
        
        return fileName.replace('.html', '');
    }

    /**
     * 載入頁面內容 (核心AJAX功能)
     */
    async loadPage(pageName, addToHistory = true) {
        if (this.isLoading) return;
        
        try {
            this.isLoading = true;
            this.showLoadingIndicator();
            
            // 保存當前頁面的滾動位置
            this.saveCurrentScrollPosition();
            
            // 檢查快取
            let content = this.cache.get(pageName);
            
            if (!content) {
                // 使用 fetch API 進行 AJAX 請求
                console.log(`正在載入頁面: ${pageName}.html`);
                
                const response = await fetch(`${pageName}.html`);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const html = await response.text();
                content = this.extractMainContent(html);
                
                // 將內容存入快取
                this.cache.set(pageName, content);
            } else {
                console.log(`從快取載入頁面: ${pageName}`);
            }
            
            // 更新頁面內容
            this.updatePageContent(content, pageName);
            
            // 更新瀏覽器URL和歷史記錄
            if (addToHistory) {
                const newUrl = `${pageName}.html`;
                history.pushState({ page: pageName }, '', newUrl);
            }
            
            // 更新當前頁面狀態
            this.currentPage = pageName;
            
            // 更新頁面標題
            this.updatePageTitle(content.title);
            
            // 觸發頁面載入完成事件
            this.onPageLoaded(pageName);
            
        } catch (error) {
            console.error('載入頁面失敗:', error);
            this.showError(`載入頁面失敗: ${error.message}`);
        } finally {
            this.isLoading = false;
            this.hideLoadingIndicator();
        }
    }

    /**
     * 從完整HTML中提取主要內容
     */
    extractMainContent(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // 提取標題
        const title = doc.querySelector('title')?.textContent || '醫療工具百寶箱';
        
        // 提取主要內容 (排除導航欄相關元素)
        const main = doc.querySelector('main');
        let content = '';
        
        if (main) {
            // 如果有 main 標籤，提取其內容
            content = main.innerHTML;
        } else {
            // 如果沒有 main 標籤，提取 body 內容並排除導航相關元素
            const body = doc.querySelector('body');
            const clone = body.cloneNode(true);
            
            // 移除不需要的元素
            const elementsToRemove = [
                'nav', 'aside', '#sidebar', '#sidebar-overlay',
                'script[src*="header-sidebar"]',
                'script[src*="tools-config"]',
                'script[src*="spa-router"]'
            ];
            
            elementsToRemove.forEach(selector => {
                try {
                    const elements = clone.querySelectorAll(selector);
                    elements.forEach(el => el.remove());
                } catch (error) {
                    console.warn(`無效的選擇器: ${selector}`, error);
                }
            });
            
            // 移除包含特定內容的 script 標籤
            const scripts = clone.querySelectorAll('script');
            scripts.forEach(script => {
                const content = script.textContent || '';
                if (content.includes('initHeaderSidebar') || 
                    content.includes('DOMContentLoaded') ||
                    content.includes('spa-router') ||
                    content.includes('header-sidebar')) {
                    script.remove();
                }
            });
            
            content = clone.innerHTML;
        }
        
        return { title, content };
    }

    /**
     * 更新頁面主要內容
     */
    updatePageContent(contentData, pageName) {
        // 尋找主要內容容器（框架結構或傳統結構）
        const frameContainer = document.getElementById('main-frame');
        const scrollContainer = document.getElementById('main-scroll-container');
        const mainElement = document.querySelector('main');
        
        const targetContainer = frameContainer || mainElement;
        
        if (targetContainer) {
            // 添加淡出效果
            targetContainer.style.opacity = '0.5';
            
            setTimeout(() => {
                if (frameContainer && scrollContainer) {
                    // 框架結構：更新滾動容器內的內容
                    const contentWrapper = scrollContainer.querySelector('div');
                    if (contentWrapper) {
                        contentWrapper.innerHTML = contentData.content;
                        this.executePageScripts(contentWrapper);
                    }
                } else {
                    // 傳統結構：直接更新 main 元素
                    mainElement.innerHTML = contentData.content;
                    this.executePageScripts(mainElement);
                }
                
                // 添加淡入效果
                targetContainer.style.opacity = '1';
                
                // 恢復滾動位置或滾動到頂部
                this.restoreScrollPosition(pageName);
            }, 150);
        }
    }

    /**
     * 執行頁面內的JavaScript代碼
     */
    executePageScripts(container) {
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.src) {
                // 外部腳本 - 跳過，避免重複載入
                console.log('跳過外部腳本:', script.src);
            } else if (script.textContent && !script.textContent.includes('initHeaderSidebar')) {
                // 內聯腳本 - 排除導航初始化腳本
                try {
                    console.log('執行內聯腳本');
                    eval(script.textContent);
                } catch (error) {
                    console.warn('執行頁面腳本時發生錯誤:', error);
                }
            }
        });
    }

    /**
     * 更新頁面標題
     */
    updatePageTitle(title) {
        document.title = title;
    }

    /**
     * 顯示載入指示器
     */
    showLoadingIndicator() {
        // 在頂部導航欄顯示載入指示器
        const nav = document.querySelector('nav');
        if (nav && !nav.querySelector('.loading-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'loading-indicator fixed top-16 left-0 right-0 h-1 bg-primary-500 z-50';
            indicator.innerHTML = '<div class="h-full bg-primary-600 animate-pulse"></div>';
            nav.after(indicator);
        }
    }

    /**
     * 隱藏載入指示器
     */
    hideLoadingIndicator() {
        const indicator = document.querySelector('.loading-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    /**
     * 顯示錯誤訊息
     */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        // 3秒後自動移除
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    /**
     * 頁面載入完成後的回調
     */
    onPageLoaded(pageName) {
        console.log(`頁面載入完成: ${pageName}`);
        
        // 特殊處理首頁
        if (pageName === 'index') {
            this.handleIndexPageLoad();
        }
        
        // 觸發自定義事件
        window.dispatchEvent(new CustomEvent('spa-page-loaded', {
            detail: { pageName }
        }));
    }

    /**
     * 處理首頁的特殊載入邏輯
     */
    handleIndexPageLoad() {
        console.log('開始處理首頁載入');
        
        // 等待 DOM 更新完成後再執行首頁初始化
        setTimeout(() => {
            // 檢查必要的依賴是否存在
            if (typeof TOOLS_CONFIG === 'undefined' || typeof CATEGORIES === 'undefined') {
                console.warn('TOOLS_CONFIG 或 CATEGORIES 未載入，嘗試重新載入');
                // 如果依賴未載入，嘗試重新載入 tools-config.js
                const script = document.createElement('script');
                script.src = 'js/tools-config.js';
                script.onload = () => {
                    console.log('tools-config.js 重新載入完成');
                    this.executeIndexPageInit();
                };
                document.head.appendChild(script);
            } else {
                this.executeIndexPageInit();
            }
        }, 200);
    }

    /**
     * 執行首頁初始化
     */
    executeIndexPageInit() {
        // 確保必要的依賴已載入
        if (typeof TOOLS_CONFIG === 'undefined' || typeof CATEGORIES === 'undefined') {
            console.log('等待 tools-config.js 載入...');
            setTimeout(() => this.executeIndexPageInit(), 200);
            return;
        }
        
        if (typeof window.initIndexPage === 'function') {
            console.log('重新初始化首頁內容');
            try {
                window.initIndexPage();
                console.log('首頁初始化完成');
            } catch (error) {
                console.error('首頁初始化失敗:', error);
                // 如果初始化失敗，嘗試重新定義函數
                this.redefineIndexPageFunctions();
            }
        } else {
            console.warn('initIndexPage 函數未找到，嘗試重新定義');
            this.redefineIndexPageFunctions();
        }
    }

    /**
     * 重新定義首頁函數（備用方案）
     */
    redefineIndexPageFunctions() {
        // 重新執行首頁的腳本內容
        const mainElement = document.querySelector('main');
        if (mainElement) {
            const scripts = mainElement.querySelectorAll('script');
            scripts.forEach(script => {
                if (script.textContent && !script.textContent.includes('initHeaderSidebar')) {
                    try {
                        console.log('重新執行首頁腳本');
                        eval(script.textContent);
                    } catch (error) {
                        console.warn('重新執行首頁腳本失敗:', error);
                    }
                }
            });
        }
    }

    /**
     * 保存當前頁面的滾動位置
     */
    saveCurrentScrollPosition() {
        if (this.currentPage) {
            // 檢查是否使用框架結構
            const scrollContainer = document.getElementById('main-scroll-container');
            const scrollY = scrollContainer ? 
                scrollContainer.scrollTop : 
                (window.scrollY || window.pageYOffset);
            
            this.scrollPositions.set(this.currentPage, scrollY);
            console.log(`保存 ${this.currentPage} 頁面滾動位置: ${scrollY}`);
        }
    }

    /**
     * 恢復頁面滾動位置
     */
    restoreScrollPosition(pageName) {
        const savedPosition = this.scrollPositions.get(pageName);
        
        if (savedPosition !== undefined && savedPosition > 0) {
            console.log(`恢復 ${pageName} 頁面滾動位置: ${savedPosition}`);
            // 延遲滾動，確保內容已經渲染完成
            setTimeout(() => {
                // 檢查是否使用框架結構
                const scrollContainer = document.getElementById('main-scroll-container');
                
                if (scrollContainer) {
                    // 框架結構：滾動內容容器
                    scrollContainer.scrollTo({
                        top: savedPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // 傳統結構：滾動視窗
                    window.scrollTo({
                        top: savedPosition,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        } else {
            // 沒有保存的位置，滾動到頂部
            const scrollContainer = document.getElementById('main-scroll-container');
            if (scrollContainer) {
                scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }

    /**
     * 初始化滾動監聽器
     */
    initScrollListener() {
        let scrollTimer;
        
        const handleScroll = () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                this.saveCurrentScrollPosition();
            }, 100); // 防抖動，100ms 後保存
        };
        
        // 監聽視窗滾動（傳統結構）
        window.addEventListener('scroll', handleScroll);
        
        // 監聽框架內容滾動（新框架結構）
        const checkForFrameScroll = () => {
            const scrollContainer = document.getElementById('main-scroll-container');
            if (scrollContainer && !scrollContainer.hasScrollListener) {
                scrollContainer.addEventListener('scroll', handleScroll);
                scrollContainer.hasScrollListener = true;
                console.log('框架滾動監聽器已初始化');
            }
        };
        
        // 立即檢查
        checkForFrameScroll();
        
        // 定期檢查（用於 SPA 載入後的情況）
        const checkInterval = setInterval(() => {
            checkForFrameScroll();
            // 如果找到框架容器，停止檢查
            if (document.getElementById('main-scroll-container')) {
                clearInterval(checkInterval);
            }
        }, 500);
        
        // 10秒後停止檢查
        setTimeout(() => clearInterval(checkInterval), 10000);
    }

    /**
     * 清除快取
     */
    clearCache() {
        this.cache.clear();
        this.scrollPositions.clear();
        console.log('頁面快取和滾動位置已清除');
    }

    /**
     * 預載入頁面
     */
    async preloadPage(pageName) {
        if (!this.cache.has(pageName)) {
            try {
                const response = await fetch(`${pageName}.html`);
                if (response.ok) {
                    const html = await response.text();
                    const content = this.extractMainContent(html);
                    this.cache.set(pageName, content);
                    console.log(`預載入完成: ${pageName}`);
                }
            } catch (error) {
                console.warn(`預載入失敗: ${pageName}`, error);
            }
        }
    }
}

// 導出供全域使用
window.SPARouter = SPARouter;