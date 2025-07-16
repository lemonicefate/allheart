// header-sidebar.js - 可重用的頂部欄和側邊欄組件
// 使用方法: 在任何 HTML 頁面中引入此文件，然後調用 initHeaderSidebar()

/**
 * 初始化頂部欄和側邊欄
 * @param {Object} options - 配置選項
 * @param {string} options.currentPage - 當前頁面標識 (用於高亮顯示)
 * @param {string} options.pageTitle - 頁面標題 (可選)
 * @param {boolean} options.enableSPA - 是否啟用單頁應用模式 (預設: false)
 */
function initHeaderSidebar(options = {}) {
    const { currentPage = 'index', pageTitle = '誠心醫療工具箱', enableSPA = false } = options;
    
    // 移除現有的導航欄（如果存在）
    removeExistingNavigation();
    
    // 創建頂部導航欄
    createTopNavigation(pageTitle);
    
    // 創建側邊欄
    createSidebar(currentPage);
    
    // 初始化功能
    initThemeToggle();
    initSidebarToggle();
    initCategoriesNavigation();
    initSidebarNavLinks();
    
    // 調整主內容
    adjustMainContent();
    
    // 如果啟用SPA模式，初始化路由器
    if (enableSPA && typeof SPARouter !== 'undefined') {
        initSPARouter();
    }
}

/**
 * 移除現有的導航欄
 */
function removeExistingNavigation() {
    // 移除現有的頂部導航欄
    const existingNav = document.querySelector('nav');
    if (existingNav) {
        existingNav.remove();
    }
    
    // 移除現有的側邊欄
    const existingSidebar = document.querySelector('aside, #sidebar');
    if (existingSidebar) {
        existingSidebar.remove();
    }
    
    // 移除現有的遮罩
    const existingOverlay = document.querySelector('#sidebar-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
}

/**
 * 創建頂部導航欄
 */
function createTopNavigation(pageTitle) {
    const nav = document.createElement('nav');
    nav.className = 'bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50';
    nav.innerHTML = `
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- 左側：Logo 和漢堡菜單 -->
                <div class="flex items-center">
                    <!-- 漢堡菜單按鈕 (移動端) -->
                    <button id="sidebar-toggle" class="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                    
                    <!-- Logo -->
                    <div class="flex items-center ml-2 lg:ml-0">
                        <i class="fas fa-stethoscope text-2xl text-primary-600 dark:text-primary-400 mr-3"></i>
                        <h1 class="text-xl font-bold text-gray-900 dark:text-white">${pageTitle}</h1>
                    </div>
                </div>
                
                <!-- 右側：明暗模式切換 -->
                <div class="flex items-center">
                    <button id="theme-toggle" class="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                        <i id="theme-icon" class="fas fa-moon text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // 插入到 body 的開頭
    document.body.insertBefore(nav, document.body.firstChild);
}

/**
 * 創建側邊欄
 */
function createSidebar(currentPage) {
    // 側邊欄遮罩
    const overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden hidden';
    document.body.appendChild(overlay);
    
    // 側邊欄
    const sidebar = document.createElement('aside');
    sidebar.id = 'sidebar';
    sidebar.className = 'fixed top-16 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 overflow-y-auto';
    
    sidebar.innerHTML = `
        <div class="p-6">
            <!-- 主要導航 -->
            <nav class="space-y-2">
                <a href="index.html" class="sidebar-nav-link flex items-center px-4 py-3 ${currentPage === 'index' ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'} rounded-lg transition-colors duration-200 ${currentPage === 'index' ? 'font-medium' : ''}">
                    <i class="fas fa-home mr-3"></i>
                    首頁
                </a>
                
                <a href="knowledge-base.html" class="sidebar-nav-link flex items-center px-4 py-3 ${currentPage === 'knowledge-base' ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'} rounded-lg transition-colors duration-200 ${currentPage === 'knowledge-base' ? 'font-medium' : ''}">
                    <i class="fas fa-book mr-3"></i>
                    知識庫
                </a>
                
                <a href="risk-calculator.html" class="sidebar-nav-link flex items-center px-4 py-3 ${currentPage === 'risk-calculator' ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'} rounded-lg transition-colors duration-200 ${currentPage === 'risk-calculator' ? 'font-medium' : ''}">
                    <i class="fas fa-calculator mr-3"></i>
                    風險計算器
                </a>
                
                <a href="about-us.html" class="sidebar-nav-link flex items-center px-4 py-3 ${currentPage === 'about-us' ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'} rounded-lg transition-colors duration-200 ${currentPage === 'about-us' ? 'font-medium' : ''}">
                    <i class="fas fa-info-circle mr-3"></i>
                    關於我們
                </a>
            </nav>

            <!-- 分隔線 -->
            <div class="my-6 border-t border-gray-200 dark:border-gray-700"></div>

            <!-- 醫療工具分類 -->
            <div class="space-y-4">
                <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">醫療工具分類</h3>
                
                <!-- 分類導航將由 JavaScript 動態生成 -->
                <div id="categories-nav" class="space-y-2">
                    <!-- 動態內容 -->
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(sidebar);
}

/**
 * 初始化主題切換功能
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // 檢查本地存儲的主題偏好
    const currentTheme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // 應用主題
    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
        themeIcon.className = 'fas fa-sun text-xl';
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.className = 'fas fa-moon text-xl';
    }
    
    // 主題切換事件
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        
        if (isDark) {
            document.documentElement.classList.remove('dark');
            themeIcon.className = 'fas fa-moon text-xl';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            themeIcon.className = 'fas fa-sun text-xl';
            localStorage.setItem('theme', 'dark');
        }
    });
}

/**
 * 初始化側邊欄切換功能
 */
function initSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    // 切換側邊欄
    function toggleSidebar() {
        const isHidden = sidebar.classList.contains('-translate-x-full');
        
        if (isHidden) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
        } else {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        }
    }
    
    // 事件監聽
    sidebarToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);
    
    // ESC 鍵關閉側邊欄
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !sidebar.classList.contains('-translate-x-full')) {
            toggleSidebar();
        }
    });
}

/**
 * 初始化分類導航功能
 */
function initCategoriesNavigation() {
    // 確保 CATEGORIES 已載入
    if (typeof CATEGORIES === 'undefined') {
        console.warn('CATEGORIES 未定義，請確保已載入 tools-config.js');
        return;
    }
    
    const categoriesNav = document.getElementById('categories-nav');
    
    // 按照首頁顯示順序排列分類（與 TOOLS_CONFIG 順序一致）
    const categoryOrder = ['tools', 'ent', 'internal-medicine', 'infection-disease', 'disease'];
    
    categoryOrder.forEach(key => {
        const category = CATEGORIES[key];
        if (!category) return;
        const categoryElement = document.createElement('div');
        categoryElement.className = 'group';
        
        const categoryId = `category-${key}`;
        
        categoryElement.innerHTML = `
            <button id="${categoryId}" class="w-full flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 group-hover:text-${category.color}-600 dark:group-hover:text-${category.color}-400">
                <div class="flex items-center">
                    <i class="fas ${category.icon} mr-3"></i>
                    <span class="font-medium">${category.name}</span>
                </div>
            </button>
        `;
        
        categoriesNav.appendChild(categoryElement);
        
        // 添加點擊事件來滾動到對應分類
        const button = document.getElementById(categoryId);
        button.addEventListener('click', () => {
            // 檢查當前頁面是否為首頁
            const isIndexPage = window.location.pathname.includes('index.html') || 
                               window.location.pathname === '/' || 
                               window.location.pathname.endsWith('/');
            
            // 在手機端自動收起側邊欄
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            if (sidebar && overlay) {
                // 檢查是否為手機端（側邊欄是否為隱藏狀態）
                const isMobile = window.innerWidth < 1024;
                if (isMobile && !sidebar.classList.contains('-translate-x-full')) {
                    // 延遲收起側邊欄，讓用戶看到點擊效果
                    setTimeout(() => {
                        sidebar.classList.add('-translate-x-full');
                        overlay.classList.add('hidden');
                    }, 150);
                }
            }
            
            if (isIndexPage) {
                // 如果在首頁，滾動到對應區塊
                const targetSection = document.getElementById(`section-${key}`);
                if (targetSection) {
                    // 延遲滾動，確保側邊欄收起動畫完成
                    setTimeout(() => {
                        // 檢查是否使用框架結構
                        const scrollContainer = document.getElementById('main-scroll-container');
                        
                        if (scrollContainer) {
                            // 框架結構：計算在框架內的位置
                            const containerRect = scrollContainer.getBoundingClientRect();
                            const targetRect = targetSection.getBoundingClientRect();
                            const scrollTop = scrollContainer.scrollTop;
                            const targetPosition = targetRect.top - containerRect.top + scrollTop - 20;
                            
                            scrollContainer.scrollTo({
                                top: Math.max(0, targetPosition),
                                behavior: 'smooth'
                            });
                        } else {
                            // 傳統結構：使用原有邏輯
                            const navHeight = 64 + 20;
                            const elementPosition = targetSection.offsetTop;
                            const offsetPosition = elementPosition - navHeight;
                            
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }
                        
                        // 添加高亮效果
                        targetSection.classList.add('ring-2', `ring-${category.color}-500`, 'ring-opacity-50');
                        setTimeout(() => {
                            targetSection.classList.remove('ring-2', `ring-${category.color}-500`, 'ring-opacity-50');
                        }, 2000);
                    }, 200);
                }
            } else {
                // 如果不在首頁，跳轉到首頁並滾動到對應區塊
                // 使用 sessionStorage 來傳遞滾動目標
                sessionStorage.setItem('scrollToSection', key);
                sessionStorage.setItem('highlightColor', category.color);
                window.location.href = 'index.html';
            }
        });
    });
}

/**
 * 初始化側邊欄導航連結的手機端自動收起功能
 */
function initSidebarNavLinks() {
    const navLinks = document.querySelectorAll('.sidebar-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // 檢查是否為手機端
            const isMobile = window.innerWidth < 1024;
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            
            if (isMobile && sidebar && overlay && !sidebar.classList.contains('-translate-x-full')) {
                // 延遲收起側邊欄，讓用戶看到點擊效果
                setTimeout(() => {
                    sidebar.classList.add('-translate-x-full');
                    overlay.classList.add('hidden');
                }, 150);
            }
        });
    });
}

/**
 * 創建完整的頁面框架佈局
 */
function adjustMainContent() {
    // 檢查是否已經有框架結構
    if (document.getElementById('main-frame')) {
        return; // 已經有框架，不重複創建
    }
    
    // 尋找 main 元素
    let main = document.querySelector('main');
    
    if (!main) {
        // 如果沒有 main 元素，為 body 的內容創建包裝器
        const bodyContent = Array.from(document.body.children).filter(child => 
            !child.matches('nav, aside, #sidebar-overlay, script')
        );
        
        main = document.createElement('main');
        bodyContent.forEach(child => main.appendChild(child));
        document.body.appendChild(main);
    }
    
    // 創建頁面框架容器
    const frameContainer = document.createElement('div');
    frameContainer.className = 'fixed top-4 right-4 bottom-4 lg:left-72 left-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-10';
    
    // 創建內容滾動區域
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'h-full overflow-y-auto overflow-x-hidden';
    scrollContainer.id = 'main-scroll-container';
    
    // 創建內容包裝器，添加頂部 padding 來避免遮擋
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'pt-6 px-6 pb-6 lg:pt-8 lg:px-8 lg:pb-8';
    
    // 移動現有的 main 內容到新的結構中，保持原有結構不變
    while (main.firstChild) {
        contentWrapper.appendChild(main.firstChild);
    }
    
    // 組裝新的結構
    scrollContainer.appendChild(contentWrapper);
    frameContainer.appendChild(scrollContainer);
    
    // 替換原有的 main 元素
    main.parentNode.replaceChild(frameContainer, main);
    
    // 更新 main 引用
    frameContainer.id = 'main-frame';
    
    // 添加響應式調整
    adjustFrameForMobile();
}

/**
 * 初始化SPA路由器
 */
function initSPARouter() {
    // 創建SPA路由器實例
    if (!window.spaRouter) {
        window.spaRouter = new SPARouter();
        console.log('SPA路由器已初始化');
        
        // 監聽頁面載入完成事件，更新側邊欄高亮
        window.addEventListener('spa-page-loaded', (event) => {
            updateSidebarHighlight(event.detail.pageName);
        });
    }
}

/**
 * 更新側邊欄的高亮狀態
 */
function updateSidebarHighlight(currentPage) {
    // 移除所有現有的高亮狀態
    const navLinks = document.querySelectorAll('.sidebar-nav-link');
    navLinks.forEach(link => {
        link.classList.remove('text-primary-600', 'dark:text-primary-400', 'bg-primary-50', 'dark:bg-primary-900/20', 'font-medium');
        link.classList.add('text-gray-700', 'dark:text-gray-300');
    });
    
    // 根據當前頁面添加高亮
    let targetHref = '';
    if (currentPage === 'index') {
        targetHref = 'index.html';
    } else {
        targetHref = `${currentPage}.html`;
    }
    
    const activeLink = document.querySelector(`a[href="${targetHref}"]`);
    if (activeLink && activeLink.classList.contains('sidebar-nav-link')) {
        activeLink.classList.remove('text-gray-700', 'dark:text-gray-300');
        activeLink.classList.add('text-primary-600', 'dark:text-primary-400', 'bg-primary-50', 'dark:bg-primary-900/20', 'font-medium');
    }
}

// 移除自動調整主內容的事件監聽器，改為在 initHeaderSidebar 中調用

/**
 * 響應式框架調整
 */
function adjustFrameForMobile() {
    function updateFrameLayout() {
        const frame = document.getElementById('main-frame');
        if (!frame) return;
        
        const isMobile = window.innerWidth < 1024;
        
        if (isMobile) {
            // 手機端：全寬度，頂部留空給導航欄
            frame.className = 'fixed top-20 right-4 bottom-4 left-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-10';
        } else {
            // 桌面端：右側框架，左側留空給側邊欄
            frame.className = 'fixed top-4 right-4 bottom-4 left-72 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-10';
        }
    }
    
    // 初始調整
    updateFrameLayout();
    
    // 監聽視窗大小變化
    window.addEventListener('resize', updateFrameLayout);
}

// 導出函數供全域使用
window.initHeaderSidebar = initHeaderSidebar;
window.updateSidebarHighlight = updateSidebarHighlight;
