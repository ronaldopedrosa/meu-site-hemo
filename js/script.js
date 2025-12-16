// --- VARIÁVEIS GLOBAIS ---
let currentInstruments = []; // Começa vazia
let searchTerm = '';

// --- CONFIGURAÇÃO VISUAL (FIXA) ---
const typeInfo = {
    equipment: { label: 'AHU', icon: '🏭', color: 'blue' },
    pressure: { label: 'Instrumentação de Pressão', icon: '⏲️', color: 'cyan' },
    temperature: { label: 'Sensor de Temperatura', icon: '🌡️', color: 'red' },
    humidity: { label: 'Sensor de Umidade', icon: '💧', color: 'indigo' },
    valve: { label: 'Válvula / Mecânico', icon: '🔧', color: 'orange' },
    detect: { label: 'Detectores', icon: '🔥', color: 'red' },
    general: { label: 'Uso Geral', icon: '📦', color: 'slate' }
};

const moduleInfo = {
    hvac: { name: 'Sistemas HVAC & Utilidades' },
    production: { name: 'Área de Produção' }
};

// --- ELEMENTOS DO DOM ---
const ahuSelector = document.getElementById('ahu-selector');
const systemTitle = document.getElementById('system-title');
const gridContainer = document.getElementById('grid-container');

// --- FUNÇÃO DE CARREGAMENTO (FETCH) ---
async function loadSystemData(systemId) {
    // 1. Mostra um aviso de "Carregando..." enquanto busca
    gridContainer.innerHTML = `
        <div class="col-span-full flex justify-center items-center h-40 text-slate-400 animate-pulse">
            <span class="text-2xl mr-2">🔄</span> Carregando dados do sistema...
        </div>
    `;

    try {
        // 2. Busca o arquivo JSON baseado no ID (ex: json/ahu-0209.json)
        const response = await fetch(`json/${systemId}.json`);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        // 3. Converte o texto do arquivo para Objeto JavaScript real
        const data = await response.json();
        
        // 4. Salva na variável global e desenha na tela
        currentInstruments = data;
        renderGrid();

    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
        gridContainer.innerHTML = `
            <div class="col-span-full text-center p-6 text-red-400 border border-red-900/50 rounded-xl bg-red-900/20">
                <h3 class="font-bold text-lg mb-2">Erro de Conexão</h3>
                <p>Não foi possível carregar os dados de ${systemId}.</p>
                <p class="text-xs mt-2 opacity-70">${error.message}</p>
            </div>
        `;
    }
}


// --- ESCUTA A MUDANÇA NO SELETOR ---
if (ahuSelector) {
    ahuSelector.addEventListener('change', (e) => {
        const selectedSystem = e.target.value; // ex: "ahu-0201"
        loadSystemData(selectedSystem);
    });
}

// --- BARRA DE BUSCA ---
document.getElementById('search-input').addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderGrid();
});


// --- RENDERIZAÇÃO (CARD E GRID) ---
function renderGrid() {
    const countDisplay = document.getElementById('count-display');
    const totalDisplay = document.getElementById('total-display');

    const filtered = currentInstruments.filter(inst => 
        inst.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
        inst.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    countDisplay.innerText = filtered.length;
    totalDisplay.innerText = `/ ${currentInstruments.length}`;
    gridContainer.innerHTML = '';

    if (filtered.length === 0) {
        if (currentInstruments.length === 0) return; // Se ainda não carregou nada, não mostra "não encontrado"
        gridContainer.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center h-64 text-slate-500 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/20">
                <span class="text-4xl mb-2">🔍</span>
                <p>Nenhum instrumento encontrado</p>
            </div>`;
        return;
    }

    filtered.forEach(inst => {
        const typeData = typeInfo[inst.type] || typeInfo.general;
        const containerClasses = 'bg-slate-800/40 border-l-slate-600 border-slate-700 hover:bg-slate-700/60 hover:border-l-blue-400 hover:shadow-md hover:-translate-y-1';
        const indicatorClasses = 'bg-slate-600 group-hover:bg-blue-400 transition-colors';

        const card = document.createElement('button');
        card.className = `group relative text-left p-4 rounded-xl border-l-[6px] border-y border-r transition-all duration-200 flex flex-col h-full ${containerClasses}`;
        
        card.onclick = () => { openModal(inst); };

        let imageHtml = '';
        if (inst.image && inst.image.trim() !== '') {
            imageHtml = `
                <div class="mb-4 flex items-center justify-center h-40 w-full bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700/50 group-hover:border-slate-600 transition-colors">
                    <img src="${inst.image}" alt="${inst.code}" 
                            onerror="this.onerror=null; this.parentNode.innerHTML='<div class=\'text-slate-600 text-4xl\'>${typeData.icon}</div>'" 
                            class="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110">
                </div>`;
        } else {
            imageHtml = `
                <div class="mb-4 flex items-center justify-center h-40 w-full bg-slate-900/50 rounded-lg border border-slate-700/50 text-5xl text-slate-600 group-hover:text-blue-400 transition-colors shadow-inner">
                    ${typeData.icon}
                </div>`;
        }

        card.innerHTML = `
            ${imageHtml}
            <div class="flex flex-col flex-grow w-full">
                <div class="flex items-center justify-between gap-2 mb-2 w-full">
                    <span class="font-mono font-bold text-white text-xs bg-slate-900/80 px-2 py-1 rounded border border-slate-700 truncate max-w-[80%] group-hover:border-blue-500/50 transition-colors">${inst.code}</span>
                    <div class="h-2 w-2 rounded-full ${indicatorClasses}"></div>
                </div>
                <h3 class="text-xs font-medium text-slate-200 mb-3 line-clamp-2 min-h-[2.5rem] uppercase tracking-wide group-hover:text-white">${inst.name}</h3>
                
                <div class="grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-mono border-t border-slate-700/50 pt-3 mt-auto w-full group-hover:border-slate-600">
                    <div><span class="text-slate-600 uppercase">Rng:</span> ${inst.range}</div>
                    <div class="text-right"><span class="text-slate-600 uppercase">Und:</span> ${inst.unit}</div>
                </div>
            </div>
        `;
        gridContainer.appendChild(card);
    });
}

// --- FUNÇÕES DO MODAL (Mantive igual, só colei aqui para não faltar) ---
const modalBackdrop = document.getElementById('modal-backdrop');
const modalContentBox = document.getElementById('modal-content-box');
const modalInjection = document.getElementById('modal-details-injection');
const body = document.body;

function openModal(inst) {
    const typeData = typeInfo[inst.type] || typeInfo.general;
    const moduleData = moduleInfo[inst.module] || { name: 'Geral' };
    
    let largeImageHtml;
    if (inst.image && inst.image.trim() !== '') {
        largeImageHtml = `
            <div class="h-64 md:h-auto md:w-2/5 bg-slate-900/50 flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-700">
                 <img src="${inst.image}" alt="${inst.code}" class="max-h-full max-w-full object-contain drop-shadow-lg" onerror="this.onerror=null; this.parentNode.innerHTML='<div class=\'text-slate-500 text-6xl\'>${typeData.icon}</div><div class=\'text-slate-400 mt-2\'>Imagem indisponível</div>'">
            </div>
        `;
    } else {
        largeImageHtml = `
            <div class="h-64 md:h-auto md:w-2/5 bg-slate-900/50 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-700 text-slate-600">
                 <div class="text-8xl mb-4 opacity-80">${typeData.icon}</div>
                 <div class="text-sm font-mono tracking-wider opacity-60">TAG: ${inst.code}</div>
            </div>
        `;
    }

    modalInjection.innerHTML = `
        <div class="flex flex-col md:flex-row md:min-h-[400px]">
            ${largeImageHtml}
            <div class="p-6 md:p-8 flex-1 flex flex-col">
                <div class="mb-6">
                    <div class="inline-block bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 border border-blue-500/30">
                        ${moduleData.name}
                    </div>
                    <h2 class="text-3xl font-bold text-white mb-2 leading-tight">${inst.name}</h2>
                    <h3 class="text-xl text-blue-400 font-mono bg-slate-900/50 inline-block px-3 py-1 rounded-md border border-slate-700/50">${inst.code}</h3>
                </div>

                <div class="flex items-center gap-3 mb-6 pb-6 border-b border-slate-700/50">
                     <span class="text-3xl">${typeData.icon}</span>
                     <div>
                        <div class="text-xs text-slate-500 uppercase">Tipo de Instrumento</div>
                        <div class="text-lg font-semibold text-${typeData.color}-300">${typeData.label}</div>
                     </div>
                </div>

                 <div class="mb-6 flex-grow">
                     <h4 class="text-sm text-slate-400 font-bold uppercase mb-2 tracking-wider">Descrição Funcional</h4>
                     <p class="text-slate-300 leading-relaxed text-sm">
                        ${inst.description || 'Nenhuma descrição funcional detalhada disponível para este tag no momento. Consulte a documentação técnica de P&ID.'}
                     </p>
                 </div>

                <div class="grid grid-cols-2 gap-4 bg-slate-900/30 p-4 rounded-xl border border-slate-700/50 mt-auto">
                    <div>
                        <div class="text-xs text-slate-500 uppercase mb-1 font-bold flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            Faixa (Range)
                        </div>
                        <div class="text-xl font-mono text-white">${inst.range}</div>
                    </div>
                    <div>
                        <div class="text-xs text-slate-500 uppercase mb-1 font-bold flex items-center gap-1">
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                            Unidade Eng.
                        </div>
                        <div class="text-xl font-mono text-white">${inst.unit}</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    modalBackdrop.classList.remove('hidden');
    setTimeout(() => {
        modalBackdrop.classList.remove('opacity-0');
        modalContentBox.classList.remove('scale-95', 'opacity-0');
        modalContentBox.classList.add('scale-100', 'opacity-100');
        body.classList.add('modal-open');
    }, 10);
}

function closeModal() {
    modalBackdrop.classList.add('opacity-0');
    modalContentBox.classList.remove('scale-100', 'opacity-100');
    modalContentBox.classList.add('scale-95', 'opacity-0');
    body.classList.remove('modal-open');

    setTimeout(() => {
        modalBackdrop.classList.add('hidden');
    }, 300);
}

// Fechar modal clicando fora
modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
        closeModal();
    }
});
window.closeModal = closeModal;

// --- INICIALIZAÇÃO ---
// Carrega o valor inicial do select (normalmente ahu-0209)
if(ahuSelector) {
    loadSystemData(ahuSelector.value);
}