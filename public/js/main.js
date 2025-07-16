// main.js - 主要頁面邏輯

// 1. 初始化工具管理器
let toolsManager;

// 2. 頁面載入完成後執行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化工具管理器
    toolsManager = new ToolsManager();
    
    // 獲取所有工具資料
    const buttons = toolsManager.getAllTools();
    
    // 渲染所有工具卡片
    renderTools(buttons);
    
    // 添加淡入動畫
    animateCards();
});

// 3. 渲染工具卡片的函數
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

// 4. 創建工具卡片 HTML 的函數
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

// 5. 卡片動畫函數
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

// 6. 動態新增工具的函數（供開發者使用）
function addNewTool(category, toolData) {
    if (toolsManager.addTool(category, toolData)) {
        // 重新渲染該分類的工具
        refreshCategory(category);
        console.log(`成功新增工具: ${toolData.text}`);
        return true;
    }
    return false;
}

// 7. 重新渲染特定分類的函數
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

// 8. 導出函數供全域使用
window.addNewTool = addNewTool;
window.refreshCategory = refreshCategory;
