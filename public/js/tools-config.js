// tools-config.js - 工具配置文件
// 這個文件專門用來管理所有工具的資料，方便新增和維護

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
            href: 'hypertension.html', 
            text: '高血壓衛教', 
            icon: 'fa-heartbeat',
            description: '高血壓患者衛教指導'
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
    ]
};

// 工具管理類別
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

// 導出給其他文件使用
window.ToolsManager = ToolsManager;
window.CATEGORIES = CATEGORIES;
window.TOOLS_CONFIG = TOOLS_CONFIG;
