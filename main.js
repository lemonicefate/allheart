// main.js

// 1. 定義所有按鈕的資料
const buttons = [
    { href: 'amoxicillin-dose-calculator.html', text: '兒童Amoxicillin劑量計算', category: 'tools', color: 'blue' },
    { href: 'pediatric-antibiotic-calculator.html', text: '兒童抗生素計算機', category: 'tools', color: 'blue' },
    { href: 'health-check-analyzer.html', text: '健檢報告數值分析器', category: 'tools', color: 'blue' },
    { href: 'lipid-calculator.html', text: '血脂計算機', category: 'tools', color: 'blue' },
    { href: 'cloud-report-organizer.html', text: '健保雲端報告整理工具', category: 'tools', color: 'blue' },
    { href: 'timer-for-bppv.html', text: 'BPPV復位計時工具', category: 'tools', color: 'blue' },

    { href: 'nasal-spray.html', text: '鼻噴劑', category: 'ent', color: 'orange' },
    { href: 'inferior-turbinate-rfa.html', text: '下鼻甲RFA', category: 'ent', color: 'orange' },
    { href: 'osas.html', text: '睡眠呼吸中止症候群', category: 'ent', color: 'orange' },
    { href: 'trigeminal-neuralgia.html', text: '三叉神經痛', category: 'ent', color: 'orange' },
    { href: 'vertigo.html', text: '眩暈', category: 'ent', color: 'orange' },
    { href: 'papilloma-hpv.html', text: '乳突瘤與HPV病毒/疫苗', category: 'ent', color: 'orange' },


    { href: 'my-plate-education.html', text: 'My Plate 餐盤衛教', category: 'disease', color: 'green' },
    { href: 'mounjaro.html', text: '猛健樂', category: 'disease', color: 'green' },
    
    
    { href: 'hyperthyroidism.html', text: '甲狀腺亢進', category: 'internal-medicine', color: 'yellow' },
    { href: 'diabetes-education.html', text: '糖尿病衛教', category: 'internal-medicine', color: 'yellow' },
    { href: 'hypertension.html', text: '高血壓衛教', category: 'internal-medicine', color: 'yellow' },
    { href: 'thyroid-medication-pregnancy.html', text: '懷孕甲狀腺用藥', category: 'internal-medicine', color: 'yellow' },
    { href: 'smoking-cessation-meds.html', text: '戒菸用藥', category: 'internal-medicine', color: 'yellow' },

    { href: 'covid-medication.html', text: 'COVID及用藥', category: 'infection-disease', color: 'purple' },
    { href: 'measles.html', text: '麻疹', category: 'infection-disease', color: 'purple' },
    { href: 'pneumococcus-vaccine.html', text: '肺炎鏈球菌及疫苗', category: 'infection-disease', color: 'purple' },
    { href: 'enterovirus.html', text: '腸病毒', category: 'infection-disease', color: 'purple' },
    { href: 'VZV.html', text: '帶狀皰疹(皮蛇)及疫苗', category: 'infection-disease', color: 'purple' },

];  

// 2. 頁面載入完成後執行
document.addEventListener('DOMContentLoaded', () => {
    // 迴圈遍歷所有按鈕資料
    buttons.forEach(button => {
        // 找到這個按鈕應該被放到哪個 grid 裡
        const gridId = `${button.category}-grid`; // 例如 'tools-grid', 'ent-grid'
        const gridContainer = document.getElementById(gridId);

        if (gridContainer) {
            // 3. 建立按鈕的 HTML 字串
            const buttonHTML = `
                <a href="${button.href}" class="bg-${button.color}-50 p-6 rounded-md border border-gray-200 shadow-sm hover:shadow-md hover:bg-${button.color}-100 hover:scale-105 transition-all duration-300">
                    <h3 class="text-lg font-semibold text-black">${button.text}</h3>
                </a>
            `;
            // 4. 將建立好的 HTML 插入到對應的 grid 容器中
            gridContainer.insertAdjacentHTML('beforeend', buttonHTML);
        }
    });
});
