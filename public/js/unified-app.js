// =================================================================
// 醫療工具百寶箱 - 統一應用程式檔案
// 整合所有JavaScript功能，解決衝突並提供一致的使用者體驗
// =================================================================

// =================================================================
// 1. 工具配置 (基於 tools-config.js 的完整結構)
// =================================================================

// 分類定義
const CATEGORIES = {
    tools: {
        name: '看診小工具',
        color: 'blue',
        icon: 'fa-tools'
    },
    'infection-disease': {
        name: '感染疾病',
        color: 'purple',
        icon: 'fa-virus'
    },
    ent: {
        name: '耳鼻喉頭頸外科',
        color: 'orange',
        icon: 'fa-head-side-mask'
    },
    'internal-medicine': {
        name: '內科疾病',
        color: 'yellow',
        icon: 'fa-heartbeat'
    },
    disease: {
        name: '疾病/衛教',
        color: 'green',
        icon: 'fa-book-medical'
    },
    pediatrics: {
        name: '兒科',
        color: 'pink',
        icon: 'fa-baby'
    }
};

// 工具列表 - 按分類組織
const TOOLS_CONFIG = {
    tools: [
        { 
            href: 'amoxicillin-dose-calculator.html', 
            text: '兒童Amoxicillin劑量計算', 
            icon: 'fa-calculator',
            description: '快速計算兒童Amoxicillin用藥劑量'
        },
        { 
            href: 'pediatric-antibiotic-calculator.html', 
            text: '兒童抗生素計算機', 
            icon: 'fa-pills',
            description: '兒童抗生素劑量計算工具'
        },
        { 
            href: 'children-steroid-dose-calculator.html', 
            text: '兒童類固醇計算機', 
            icon: 'fa-syringe',
            description: '兒童類固醇用藥劑量計算'
        },
        { 
            href: 'health-check-analyzer.html', 
            text: '健檢報告數值分析器', 
            icon: 'fa-chart-line',
            description: '分析健康檢查報告數值'
        },
        { 
            href: 'lipid-calculator.html', 
            text: '血脂計算機', 
            icon: 'fa-vial',
            description: '血脂相關數值計算'
        },
        { 
            href: 'cloud-report-organizer.html', 
            text: '健保雲端報告整理工具2.0', 
            icon: 'fa-cloud',
            description: '整理健保雲端報告資料'
        },
        { 
            href: 'timer-for-bppv.html', 
            text: 'BPPV復位計時工具', 
            icon: 'fa-stopwatch',
            description: 'BPPV復位治療計時器'
        }
    ],

    ent: [
        { 
            href: 'nasal-spray.html', 
            text: '鼻噴劑', 
            icon: 'fa-spray-can',
            description: '鼻噴劑使用指導'
        },
        { 
            href: 'inferior-turbinate-rfa.html', 
            text: '下鼻甲RFA', 
            icon: 'fa-bolt',
            description: '下鼻甲射頻消融術'
        },
        { 
            href: 'osas.html', 
            text: '睡眠呼吸中止症候群', 
            icon: 'fa-bed',
            description: '睡眠呼吸中止症相關資訊'
        },
        { 
            href: 'trigeminal-neuralgia.html', 
            text: '三叉神經痛', 
            icon: 'fa-brain',
            description: '三叉神經痛診療資訊'
        },
        { 
            href: 'vertigo.html', 
            text: '眩暈', 
            icon: 'fa-dizzy',
            description: '眩暈症狀診療指引'
        },
        { 
            href: 'bppv.html', 
            text: '頭暈目眩(BPPV)衛教', 
            icon: 'fa-sync-alt',
            description: 'BPPV診斷與治療指引'
        },
        { 
            href: 'carotid-ultrasound.html', 
            text: '頸動脈超音波', 
            icon: 'fa-wave-square',
            description: '頸動脈超音波檢查'
        },
        { 
            href: 'papilloma-hpv.html', 
            text: '乳突瘤與HPV病毒/疫苗', 
            icon: 'fa-shield-virus',
            description: '乳突瘤與HPV相關資訊'
        }
    ],

    'internal-medicine': [
        { 
            href: 'hyperthyroidism.html', 
            text: '甲狀腺亢進', 
            icon: 'fa-thyroid',
            description: '甲狀腺亢進診療資訊'
        },
        { 
            href: 'diabetes-education.html', 
            text: '糖尿病衛教', 
            icon: 'fa-tint',
            description: '糖尿病患者衛教資料'
        },
        { 
            href: 'diabetes-medication.html', 
            text: '糖尿病藥物', 
            icon: 'fa-capsules',
            description: '糖尿病藥物治療資訊'
        },
        { 
            href: 'hypertension.html', 
            text: '高血壓衛教', 
            icon: 'fa-heartbeat',
            description: '高血壓患者衛教指導'
        },
        { 
            href: 'hypertension-medication.html', 
            text: '高血壓藥物', 
            icon: 'fa-pills',
            description: '高血壓藥物治療指引'
        },
        { 
            href: 'thyroid-medication-pregnancy.html', 
            text: '懷孕甲狀腺用藥', 
            icon: 'fa-baby',
            description: '懷孕期間甲狀腺用藥指引'
        },
        { 
            href: 'smoking-cessation-meds.html', 
            text: '戒菸用藥', 
            icon: 'fa-smoking-ban',
            description: '戒菸藥物治療資訊'
        },
        { 
            href: 'anemia.html', 
            text: '貧血', 
            icon: 'fa-tint',
            description: '貧血診療與治療'
        }
    ],

    'infection-disease': [
        { 
            href: 'children-vaccine.html', 
            text: '兒童公費/自費疫苗統整', 
            icon: 'fa-syringe',
            description: '兒童疫苗接種時程表'
        },
        { 
            href: 'covid-medication.html', 
            text: 'COVID及用藥', 
            icon: 'fa-virus',
            description: 'COVID-19相關用藥資訊'
        },
        { 
            href: 'measles.html', 
            text: '麻疹', 
            icon: 'fa-disease',
            description: '麻疹診療與預防資訊'
        },
        { 
            href: 'pneumococcus-vaccine.html', 
            text: '肺炎鏈球菌及疫苗', 
            icon: 'fa-lungs',
            description: '肺炎鏈球菌疫苗資訊'
        },
        { 
            href: 'enterovirus.html', 
            text: '腸病毒', 
            icon: 'fa-bacteria',
            description: '腸病毒感染診療資訊'
        },
        { 
            href: 'vzv.html', 
            text: '帶狀皰疹(皮蛇)及疫苗', 
            icon: 'fa-shield-alt',
            description: '帶狀皰疹診療與疫苗'
        }
    ],

    disease: [
        { 
            href: 'my-plate-education.html', 
            text: 'My Plate 餐盤衛教', 
            icon: 'fa-utensils',
            description: '健康飲食餐盤衛教'
        },
        { 
            href: 'constipation.html', 
            text: '便祕', 
            icon: 'fa-stomach',
            description: '便祕診療與衛教'
        },
        { 
            href: 'insomnia.html', 
            text: '失眠', 
            icon: 'fa-moon',
            description: '失眠診療與衛教'
        },
        { 
            href: 'mounjaro.html', 
            text: '猛健樂', 
            icon: 'fa-capsules',
            description: '猛健樂用藥資訊'
        }
    ],

    pediatrics: [
        { 
            href: 'children-asthma.html', 
            text: '兒童氣喘', 
            icon: 'fa-lungs',
            description: '兒童氣喘診療指引'
        },
        { 
            href: 'asthma-control.html', 
            text: '氣喘控制(大人)', 
            icon: 'fa-wind',
            description: '成人氣喘控制指引'
        }
    ]
};

// =================================================================
// 2. 工具管理類別 (基於 tools-config.js)
// =================================================================

class ToolsManager {
    constructor() {
        this.categories = CATEGORIES;
        this.tools = TOOLS_CONFIG;
    }

    // 新增工具的方法
    addTool(category, toolData) {
        if (!this.tools[category]) {
            console.error(`分類 "${category}" 不存在`);
            return false;
        }

        // 驗證必要欄位
        const requiredFields = ['href', 'text', 'icon'];
        for (let field of requiredFields) {
            if (!toolData[field]) {
                console.error(`缺少必要欄位: ${field}`);
                return false;
            }
        }

        // 添加預設描述
        if (!toolData.description) {
            toolData.description = toolData.text;
        }

        this.tools[category].push(toolData);
        return true;
    }

    // 獲取所有工具（轉換為舊格式以兼容現有代碼）
    getAllTools() {
        const allTools = [];
        
        Object.keys(this.tools).forEach(category => {
            const categoryColor = this.categories[category].color;
            
            this.tools[category].forEach(tool => {
                allTools.push({
                    href: tool.href,
                    text: tool.text,
                    category: category,
                    color: categoryColor,
                    icon: tool.icon,
                    description: tool.description
                });
            });
        });
        
        return allTools;
    }

    // 獲取特定分類的工具
    getToolsByCategory(category) {
        return this.tools[category] || [];
    }

    // 新增分類的方法
    addCategory(categoryId, categoryData) {
        this.categories[categoryId] = categoryData;
        this.tools[categoryId] = [];
    }
}

// =================================================================
// 3. SPA 路由系統 (基於 spa-router.js)
// =================================================================

class SPARouter {
    constructor() {
        this.cache = new Map();
        this.scrollPositions = new Map();
        this.currentPage = this.extractPageName(window.location.pathname);
        this.init();
    }

    init() {
        document.addEventListener('click', this.handleLinkClick.bind(this));
        window.addEventListener('popstate', this.handlePopState.bind(this));
        history.replaceState({ page: this.currentPage }, '', window.location.href);
    }

    extractPageName(path) {
        const fileName = path.split('/').pop();
        return fileName.replace('.html', '') || 'index';
    }

    async handleLinkClick(event) {
        const link = event.target.closest('a');
        if (!link || !this.isInternalLink(link)) return;

        // 檢查是否為 SPA 連結或者是內部 HTML 連結
        const isSpaLink = link.classList.contains('spa-link') || link.href.endsWith('.html');
        if (!isSpaLink) return;

        event.preventDefault();
        const href = link.getAttribute('href');
        const pageName = this.extractPageName(href);

        if (pageName !== this.currentPage) {
            this.saveScrollPosition();
            await this.loadPage(pageName, href);
        }
    }

    isInternalLink(link) {
        return link.href && link.host === window.location.host && !link.href.startsWith('javascript:');
    }

    async handlePopState(event) {
        if (event.state && event.state.page) {
            this.saveScrollPosition();
            await this.loadPage(event.state.page, `${event.state.page}.html`, false);
        }
    }

    async loadPage(pageName, url, addToHistory = true) {
        try {
            let content = this.cache.get(pageName);
            if (!content) {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Failed to load page: ${response.statusText}`);
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                content = {
                    title: doc.querySelector('title')?.textContent || '醫療工具百寶箱',
                    main: doc.querySelector('main')?.innerHTML || ''
                };
                this.cache.set(pageName, content);
            }

            return new Promise((resolve) => {
                this.updatePage(pageName, content, url, addToHistory, resolve);
            });
        } catch (error) {
            console.error('Error loading page:', error);
            return Promise.reject(error);
        }
    }

    updatePage(pageName, content, url, addToHistory, onComplete) {
        document.title = content.title;
        
        // 檢查是否有框架結構
        const mainFrame = document.getElementById('main-frame');
        const scrollContainer = document.getElementById('main-scroll-container');
        const contentWrapper = scrollContainer?.querySelector('div');

        if (contentWrapper && mainFrame) {
            // 使用框架結構
            mainFrame.style.opacity = '0';
            setTimeout(() => {
                contentWrapper.innerHTML = content.main;
                this.currentPage = pageName;
                if (addToHistory) {
                    history.pushState({ page: pageName }, content.title, url);
                }
                this.restoreScrollPosition(pageName);
                updateSidebarHighlight(pageName);
                mainFrame.style.opacity = '1';
                window.dispatchEvent(new CustomEvent('spa-page-loaded', { detail: { pageName } }));
                
                // 如果是首頁，重新初始化
                if (pageName === 'index' && typeof window.initIndexPage === 'function') {
                    setTimeout(() => {
                        window.initIndexPage();
                        if (onComplete) onComplete();
                    }, 100);
                } else {
                    if (onComplete) onComplete();
                }
            }, 150);
        } else {
            // 使用傳統頁面結構
            const mainContent = document.querySelector('main');
            if (mainContent) {
                // 淡出效果
                mainContent.style.opacity = '0';
                setTimeout(() => {
                    mainContent.innerHTML = content.main;
                    this.currentPage = pageName;
                    if (addToHistory) {
                        history.pushState({ page: pageName }, content.title, url);
                    }
                    this.restoreScrollPosition(pageName);
                    updateSidebarHighlight(pageName);
                    // 淡入效果
                    mainContent.style.opacity = '1';
                    
                    // 如果是首頁，重新初始化
                    if (pageName === 'index' && typeof window.initIndexPage === 'function') {
                        setTimeout(() => {
                            window.initIndexPage();
                            if (onComplete) onComplete();
                        }, 100);
                    } else {
                        if (onComplete) onComplete();
                    }
                    
                    window.dispatchEvent(new CustomEvent('spa-page-loaded', { detail: { pageName } }));
                }, 150);
            } else {
                if (onComplete) onComplete();
            }
        }
    }

    saveScrollPosition() {
        if (this.currentPage) {
            const scrollContainer = document.getElementById('main-scroll-container');
            if (scrollContainer) {
                // 框架結構
                this.scrollPositions.set(this.currentPage, scrollContainer.scrollTop);
            } else {
                // 傳統頁面結構
                this.scrollPositions.set(this.currentPage, window.pageYOffset || document.documentElement.scrollTop);
            }
        }
    }

    restoreScrollPosition(pageName) {
        const position = this.scrollPositions.get(pageName) || 0;
        const scrollContainer = document.getElementById('main-scroll-container');
        
        if (scrollContainer) {
            // 框架結構
            scrollContainer.scrollTo({ top: position, behavior: 'smooth' });
        } else {
            // 傳統頁面結構
            window.scrollTo({ top: position, behavior: 'smooth' });
        }
    }
}

// =================================================================
// 4. 主頁工具渲染 (基於 main.js，但使用新的資料結構)
// =================================================================

// 初始化工具管理器
let toolsManager;

// 主頁初始化函數
function initIndexPage() {
    console.log('統一檔案：執行 initIndexPage');
    
    // 檢查是否已經有現有的 initIndexPage 函數
    if (window.initIndexPage && window.initIndexPage !== initIndexPage) {
        console.log('發現現有的 initIndexPage，執行現有版本');
        return window.initIndexPage();
    }
    
    // 初始化工具管理器
    toolsManager = new ToolsManager();
    
    // 檢查容器類型
    const toolsContainer = document.getElementById('tools-container');
    const toolsCategories = document.getElementById('tools-categories');
    
    if (toolsCategories) {
        console.log('使用 tools-categories 容器結構');
        // 使用新的渲染方式適配 index.html
        renderToolsCategoriesForIndex();
    } else if (toolsContainer) {
        console.log('使用 tools-container 容器結構');
        // 獲取所有工具資料
        const buttons = toolsManager.getAllTools();
        
        // 渲染所有工具卡片
        renderTools(buttons);
        
        // 添加淡入動畫
        animateCards();
    } else {
        console.warn('未找到工具容器');
    }
}

// 為 index.html 特殊設計的渲染函數
function renderToolsCategoriesForIndex() {
    const container = document.getElementById('tools-categories');
    if (!container) return;
    
    // 清空現有內容
    container.innerHTML = '';
    
    // 遍歷所有分類
    Object.entries(TOOLS_CONFIG).forEach(([categoryKey, tools]) => {
        const categoryInfo = CATEGORIES[categoryKey];
        if (categoryInfo && tools.length > 0) {
            // 創建分類區塊
            const categorySection = document.createElement('div');
            categorySection.className = 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300';
            categorySection.id = `section-${categoryKey}`;
            
            categorySection.innerHTML = `
                <!-- 分類標題 -->
                <div class="flex items-center mb-8">
                    <div class="bg-${categoryInfo.color}-500 p-3 rounded-xl mr-4">
                        <i class="fas ${categoryInfo.icon} text-white text-xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white">${categoryInfo.name}</h3>
                    <div class="ml-4 px-3 py-1 bg-${categoryInfo.color}-100 dark:bg-${categoryInfo.color}-900/30 text-${categoryInfo.color}-700 dark:text-${categoryInfo.color}-300 text-sm font-medium rounded-full">
                        ${tools.length} 個頁面
                    </div>
                </div>
                
                <!-- 工具卡片網格 -->
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4" id="${categoryKey}-tools-grid">
                </div>
            `;
            
            container.appendChild(categorySection);
            
            // 渲染該分類下的所有工具
            const toolsGrid = document.getElementById(`${categoryKey}-tools-grid`);
            tools.forEach((tool, index) => {
                const toolCard = document.createElement('a');
                toolCard.href = tool.href;
                toolCard.className = `group bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-white dark:hover:bg-gray-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:border-${categoryInfo.color}-200 dark:hover:border-${categoryInfo.color}-400`;
                toolCard.style.animationDelay = `${index * 0.05}s`;
                
                toolCard.innerHTML = `
                    <!-- 工具圖標 -->
                    <div class="flex items-center justify-center w-10 h-10 bg-${categoryInfo.color}-100 dark:bg-${categoryInfo.color}-900/30 rounded-lg mb-3 group-hover:bg-${categoryInfo.color}-200 dark:group-hover:bg-${categoryInfo.color}-900/50 transition-colors duration-200">
                        <i class="fas ${tool.icon} text-${categoryInfo.color}-600 dark:text-${categoryInfo.color}-400 text-lg"></i>
                    </div>
                    
                    <!-- 工具標題 -->
                    <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-2 group-hover:text-${categoryInfo.color}-600 dark:group-hover:text-${categoryInfo.color}-400 transition-colors duration-200 leading-tight">
                        ${tool.text}
                    </h4>
                    
                    <!-- 工具描述 -->
                    <p class="text-xs text-gray-600 dark:text-gray-300 mb-3 leading-relaxed line-clamp-2">
                        ${tool.description || '實用的醫療工具'}
                    </p>
                    
                    <!-- 使用按鈕 -->
                    <div class="flex items-center justify-between">
                        <span class="text-${categoryInfo.color}-600 dark:text-${categoryInfo.color}-400 font-medium text-xs">
                            立即使用
                        </span>
                        <i class="fas fa-arrow-right text-${categoryInfo.color}-500 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300 text-xs"></i>
                    </div>
                `;
                
                toolsGrid.appendChild(toolCard);
            });
        }
    });
}

// 渲染工具卡片的函數
function renderTools(buttons) {
    buttons.forEach((button, index) => {
        // 找到這個按鈕應該被放到哪個 grid 裡
        const gridId = `${button.category}-grid`;
        const gridContainer = document.getElementById(gridId);

        if (gridContainer) {
            // 建立按鈕的 HTML 字串
            const buttonHTML = createToolCard(button, index);
            // 將建立好的 HTML 插入到對應的 grid 容器中
            gridContainer.insertAdjacentHTML('beforeend', buttonHTML);
        }
    });
}

// 創建工具卡片 HTML 的函數
function createToolCard(button, index) {
    return `
        <a href="${button.href}" 
           class="card-hover group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-${button.color}-200 transition-all duration-300 overflow-hidden"
           style="animation-delay: ${index * 0.1}s"
           title="${button.description || button.text}">
            
            <!-- 背景漸層效果 -->
            <div class="absolute inset-0 bg-gradient-to-br from-${button.color}-50 to-${button.color}-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- 內容 -->
            <div class="relative z-10">
                <!-- 圖標區域 -->
                <div class="flex items-center justify-center w-16 h-16 bg-${button.color}-100 rounded-xl mb-4 group-hover:bg-${button.color}-200 transition-colors duration-300">
                    <i class="fas ${button.icon} text-2xl text-${button.color}-600 group-hover:text-${button.color}-700"></i>
                </div>
                
                <!-- 標題 -->
                <h3 class="text-lg font-bold text-gray-800 group-hover:text-${button.color}-800 transition-colors duration-300 leading-tight">
                    ${button.text}
                </h3>
                
                <!-- 描述（如果有的話） -->
                ${button.description && button.description !== button.text ? 
                    `<p class="text-sm text-gray-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        ${button.description}
                    </p>` : ''
                }
                
                <!-- 箭頭圖標 -->
                <div class="flex justify-end mt-4">
                    <i class="fas fa-arrow-right text-${button.color}-500 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300"></i>
                </div>
            </div>
            
            <!-- 裝飾性元素 -->
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-${button.color}-200 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
        </a>
    `;
}

// 卡片動畫函數
function animateCards() {
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            
            requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }, index * 100);
    });
}

// 動態新增工具的函數（供開發者使用）
function addNewTool(category, toolData) {
    if (toolsManager.addTool(category, toolData)) {
        // 重新渲染該分類的工具
        refreshCategory(category);
        console.log(`成功新增工具: ${toolData.text}`);
        return true;
    }
    return false;
}

// 重新渲染特定分類的函數
function refreshCategory(category) {
    const gridContainer = document.getElementById(`${category}-grid`);
    if (gridContainer) {
        // 清空現有內容
        gridContainer.innerHTML = '';
        
        // 重新渲染該分類的工具
        const categoryTools = toolsManager.getToolsByCategory(category);
        const categoryColor = toolsManager.categories[category].color;
        
        categoryTools.forEach((tool, index) => {
            const toolWithCategory = {
                ...tool,
                category: category,
                color: categoryColor
            };
            const buttonHTML = createToolCard(toolWithCategory, index);
            gridContainer.insertAdjacentHTML('beforeend', buttonHTML);
        });
        
        // 重新添加動畫
        animateCards();
    }
}

// =================================================================
// 5. 頂部欄和側邊欄組件 (基於 header-sidebar.js)
// =================================================================

let isSidebarOpen = false;

// 主要初始化函數
function initHeaderSidebar(options = {}) {
    const config = {
        currentPage: 'index',
        pageTitle: '醫療工具百寶箱',
        enableSPA: true,
        ...options
    };

    // 檢查配置是否載入
    if (typeof CATEGORIES === 'undefined' || typeof TOOLS_CONFIG === 'undefined') {
        console.error('FATAL: Configuration not found. Cannot build page.');
        document.body.innerHTML = '<p class="text-red-500 text-center p-8">錯誤：無法載入網站配置。</p>';
        return;
    }

    // 創建DOM結構
    createDOM(config.currentPage);
    
    // 設置事件監聽器
    setupEventListeners();
    
    // 移除主題應用，讓各頁面自行處理主題
    
    // 初始化SPA路由（如果啟用）
    if (config.enableSPA && !window.spaRouter) {
        window.spaRouter = new SPARouter();
    }
    
    // 如果是首頁，初始化工具顯示
    if (config.currentPage === 'index') {
        initIndexPage();
    }
}

// 創建DOM結構
function createDOM(currentPage) {
    const body = document.body;
    
    // 只創建側邊欄，不創建頂部導航欄
    let sidebar = document.getElementById('sidebar');
    if (!sidebar) {
        sidebar = document.createElement('aside');
        sidebar.id = 'sidebar';
        sidebar.className = 'bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed top-0 left-0 w-72 h-full z-50 transform -translate-x-full transition-transform lg:translate-x-0';
        body.prepend(sidebar);
    }
    sidebar.innerHTML = getSidebarContent(currentPage);

    // 不創建主要內容框架，讓頁面保持原有結構
    // 移除框架相關代碼，避免與原有頁面結構衝突
}

// 頂部導航欄相關函數已移除，避免與原有頁面結構衝突

// 獲取側邊欄內容
function getSidebarContent(currentPage) {
    let menuHtml = '';
    
    // 只顯示分類按鈕，不顯示具體工具
    Object.keys(CATEGORIES).forEach(categoryKey => {
        const category = CATEGORIES[categoryKey];
        const toolsInCategory = TOOLS_CONFIG[categoryKey] || [];
        
        if (toolsInCategory.length === 0) return; // 跳過空分類
        
        menuHtml += `
            <div class="mb-2">
                <a href="javascript:void(0)" 
                   onclick="navigateToCategory('${categoryKey}')"
                   class="flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2 transition-all duration-200 text-gray-700 dark:text-gray-300 hover:bg-${category.color}-50 dark:hover:bg-${category.color}-900/20 hover:text-${category.color}-700 dark:hover:text-${category.color}-300 group">
                    <div class="w-10 h-10 bg-${category.color}-100 dark:bg-${category.color}-900/30 rounded-lg flex items-center justify-center mr-3 group-hover:bg-${category.color}-200 dark:group-hover:bg-${category.color}-900/50 transition-colors duration-200">
                        <i class="fas ${category.icon} text-${category.color}-600 dark:text-${category.color}-400"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold">${category.name}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">${toolsInCategory.length} 個工具</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-400 group-hover:text-${category.color}-500 transition-colors duration-200"></i>
                </a>
            </div>
        `;
    });

    return `
        <div class="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <a href="javascript:void(0)" onclick="navigateToHome()" class="flex items-center cursor-pointer">
                <div class="h-8 w-8 bg-primary-600 rounded-md flex items-center justify-center">
                    <i class="fas fa-heartbeat text-white"></i>
                </div>
                <span class="ml-3 text-lg font-semibold text-gray-900 dark:text-white">醫療工具百寶箱</span>
            </a>
        </div>
        <div class="overflow-y-auto h-[calc(100vh-4rem)] pb-4 pt-4">
            <div class="px-2">
                <h3 class="px-2 mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    工具分類
                </h3>
                ${menuHtml}
            </div>
        </div>
    `;
}

// 設置事件監聽器
function setupEventListeners() {
    document.body.addEventListener('click', (event) => {
        // 移除頂部導航欄相關的事件監聽器
        if (event.target.closest('#sidebar-overlay')) closeSidebar();
    });
}

// 切換側邊欄
function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    sidebar.classList.toggle('-translate-x-full');
    
    let overlay = document.getElementById('sidebar-overlay');
    if (isSidebarOpen) {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'sidebar-overlay';
            overlay.className = 'fixed inset-0 bg-black/30 z-40 lg:hidden';
            document.body.appendChild(overlay);
        }
    } else {
        if (overlay) overlay.remove();
    }
}

// 關閉側邊欄
function closeSidebar() {
    isSidebarOpen = false;
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.add('-translate-x-full');
    const overlay = document.getElementById('sidebar-overlay');
    if (overlay) overlay.remove();
}

// 主題切換相關函數已移除，因為沒有頂部導航欄了
// 如果需要主題切換，可以在各個頁面中單獨實現

// 更新側邊欄高亮
function updateSidebarHighlight(currentPage) {
    // 由於新的側邊欄只有分類按鈕，不需要高亮特定工具
    // 保留此函數以維持兼容性
}

// 導航到分類功能
function navigateToCategory(categoryKey) {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop().replace('.html', '') || 'index';
    
    // 關閉移動端側邊欄
    closeSidebar();
    
    if (currentPage === 'index') {
        // 如果已經在首頁，直接滾動到對應分類
        scrollToCategory(categoryKey);
    } else {
        // 如果在其他頁面，使用 SPA 路由跳轉到首頁
        // 使用 sessionStorage 記住要滾動的分類
        sessionStorage.setItem('scrollToSection', categoryKey);
        sessionStorage.setItem('highlightColor', CATEGORIES[categoryKey].color);
        
        // 使用 SPA 路由跳轉
        if (window.spaRouter) {
            window.spaRouter.loadPage('index', 'index.html').then(() => {
                // 頁面載入完成後滾動到分類
                setTimeout(() => {
                    scrollToCategory(categoryKey);
                }, 300);
            });
        } else {
            // 如果 SPA 路由不可用，則直接跳轉
            window.location.href = 'index.html';
        }
    }
}

// 導航到首頁功能
function navigateToHome() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop().replace('.html', '') || 'index';
    
    // 關閉移動端側邊欄
    closeSidebar();
    
    if (currentPage === 'index') {
        // 如果已經在首頁，滾動到頂部
        scrollToTop();
    } else {
        // 清除任何待滾動的分類設定
        sessionStorage.removeItem('scrollToSection');
        sessionStorage.removeItem('highlightColor');
        
        // 使用 SPA 路由跳轉到首頁
        if (window.spaRouter) {
            window.spaRouter.loadPage('index', 'index.html').then(() => {
                // 頁面載入完成後滾動到頂部
                setTimeout(() => {
                    scrollToTop();
                }, 300);
            });
        } else {
            // 如果 SPA 路由不可用，則直接跳轉
            window.location.href = 'index.html';
        }
    }
}

// 滾動到頂部功能
function scrollToTop() {
    const scrollContainer = document.getElementById('main-scroll-container');
    
    if (scrollContainer) {
        // 框架結構
        scrollContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        // 傳統頁面結構
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// 滾動到指定分類
function scrollToCategory(categoryKey) {
    setTimeout(() => {
        const targetSection = document.getElementById(`section-${categoryKey}`);
        if (targetSection) {
            // 使用傳統的頁面滾動，不檢測框架結構
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = Math.max(0, elementPosition - 20); // 留一點上邊距
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // 添加高亮效果
            const categoryColor = CATEGORIES[categoryKey].color;
            targetSection.classList.add('ring-2', `ring-${categoryColor}-500`, 'ring-opacity-50');
            setTimeout(() => {
                targetSection.classList.remove('ring-2', `ring-${categoryColor}-500`, 'ring-opacity-50');
            }, 2000);
        } else {
            console.warn(`找不到分類區塊: section-${categoryKey}`);
        }
    }, 500); // 增加等待時間，確保頁面完全載入
}

// =================================================================
// 6. 全域導出和初始化
// =================================================================

// 導出給其他文件使用
window.ToolsManager = ToolsManager;
window.SPARouter = SPARouter;
window.CATEGORIES = CATEGORIES;
window.TOOLS_CONFIG = TOOLS_CONFIG;

// 導出主要函數
window.initHeaderSidebar = initHeaderSidebar;
window.initIndexPage = initIndexPage;
window.addNewTool = addNewTool;
window.refreshCategory = refreshCategory;
window.updateSidebarHighlight = updateSidebarHighlight;
window.navigateToCategory = navigateToCategory;
window.scrollToCategory = scrollToCategory;
window.navigateToHome = navigateToHome;
window.scrollToTop = scrollToTop;

// 自動初始化（當DOM載入完成時）
document.addEventListener('DOMContentLoaded', () => {
    console.log('統一檔案：DOMContentLoaded 事件觸發');
    
    // 檢查是否有特定的初始化配置
    const initConfig = window.medicalToolsConfig || {};
    
    // 自動檢測當前頁面
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop().replace('.html', '') || 'index';
    
    // 合併配置
    const config = {
        currentPage: pageName,
        pageTitle: document.title || '醫療工具百寶箱',
        enableSPA: true,
        ...initConfig
    };
    
    console.log('統一檔案：檢測到頁面:', pageName);
    
    // 延遲初始化，讓頁面自己的腳本先執行
    setTimeout(() => {
        console.log('統一檔案：開始初始化應用');
        initHeaderSidebar(config);
    }, 100);
});

// =================================================================
// 7. 向後兼容性支援
// =================================================================

// 為了向後兼容，提供舊版本的函數名稱
window.createToolCard = createToolCard;
window.renderTools = renderTools;
window.animateCards = animateCards;

console.log('🚀 醫療工具百寶箱統一應用程式已載入完成！');
console.log('📋 包含功能：工具配置、SPA路由、主頁渲染、側邊欄組件、分類導航');
console.log('🔧 使用方式：所有功能已自動初始化，無需額外設定');
console.log('🎯 側邊欄：顯示分類按鈕，點擊可導航到首頁對應分類');
console.log('⚠️ 已移除頂部導航欄，避免與原有頁面結構衝突');