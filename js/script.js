// --- VARIÁVEIS GLOBAIS ---
let currentInstruments = []; 
let searchTerm = '';

// --- CONFIGURAÇÃO VISUAL (Cores mais sóbrias/institucionais) ---
const typeInfo = {
    // Usando cores mais fechadas para combinar com o tom "Gov"
    equipment: { label: 'AHU', icon: '🏭', color: 'slate' },
    pressure: { label: 'Pressão', icon: '⏲️', color: 'blue' },
    temperature: { label: 'Temperatura', icon: '🌡️', color: 'red' }, 
    humidity: { label: 'Umidade', icon: '💧', color: 'cyan' },
    valve: { label: 'Válvula/Mec.', icon: '🔧', color: 'orange' },
    detect: { label: 'Detecção', icon: '🚨', color: 'red' },
    general: { label: 'Geral', icon: '📦', color: 'slate' }
};

const moduleInfo = {
    hvac: { name: 'HVAC & Utilidades' },
    production: { name: 'Produção' }
};

// --- ELEMENTOS DO DOM ---
const ahuSelector = document.getElementById('ahu-selector');
const gridContainer = document.getElementById('grid-container');

// --- FETCH ---
async function loadSystemData(systemId) {
    gridContainer.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center h-40 text-hemo-brand animate-pulse opacity-70">
            <span class="text-4xl mb-2">📥</span> 
            <span class="font-semibold text-sm uppercase tracking-wide">Carregando dados...</span>
        </div>
    `;

    try {
        const response = await fetch(`json/${systemId}.json`);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const data = await response.json();
        currentInstruments = data;
        renderGrid();
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
        gridContainer.innerHTML = `
            <div class="col-span-full text-center p-8 text-hemo-brand bg-red-50 border border-red-100 rounded-lg">
                <h3 class="font-bold text-lg mb-2">Erro de Conexão</h3>
                <p class="text-gray-600 text-sm">Não foi possível carregar o arquivo: <strong>${systemId}</strong></p>
            </div>
        `;
    }
}

// --- RENDER GRID (ESTILO GOV/INSTITUCIONAL) ---
function renderGrid() {
    const countDisplay = document.getElementById('count-display');
    const totalDisplay = document.getElementById('total-display');

    const filtered = currentInstruments.filter(inst => 
        inst.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
        inst.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    countDisplay.innerText = filtered.length;
    totalDisplay.innerText = filtered.length !== currentInstruments.length ? currentInstruments.length : currentInstruments.length;
    gridContainer.innerHTML = '';

    if (filtered.length === 0) {
        if (currentInstruments.length === 0) return; 
        gridContainer.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center h-64 text-gray-300 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                <span class="text-4xl mb-2">🔍</span>
                <p class="text-sm font-medium">Nenhum registro encontrado</p>
            </div>`;
        return;
    }

    filtered.forEach(inst => {
        const typeData = typeInfo[inst.type] || typeInfo.general;
        
        // CARD: Branco, limpo, sombra suave. Hover com borda Vinho.
        const containerClasses = 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-hemo-brand hover:-translate-y-0.5';
        const indicatorClasses = 'bg-gray-200 group-hover:bg-hemo-brand transition-colors';

        const card = document.createElement('button');
        card.className = `group relative text-left p-4 rounded-lg border transition-all duration-200 flex flex-col h-full ${containerClasses}`;
        
        card.onclick = () => { openModal(inst); };

        let imageHtml = '';
        if (inst.image && inst.image.trim() !== '') {
            imageHtml = `
                <div class="mb-4 flex items-center justify-center h-32 w-full bg-gray-50 rounded border border-gray-100 group-hover:border-red-50 transition-colors">
                    <img src="${inst.image}" alt="${inst.code}" 
                            onerror="this.onerror=null; this.parentNode.innerHTML='<div class=\'text-gray-300 text-4xl\'>${typeData.icon}</div>'" 
                            class="h-full w-full object-contain p-2 mix-blend-multiply transition-transform duration-500 group-hover:scale-105">
                </div>`;
        } else {
            imageHtml = `
                <div class="mb-4 flex items-center justify-center h-32 w-full bg-gray-50 rounded border border-gray-100 text-4xl text-gray-300 group-hover:text-hemo-brand transition-colors">
                    ${typeData.icon}
                </div>`;
        }

        card.innerHTML = `
            ${imageHtml}
            <div class="flex flex-col flex-grow w-full">
                <div class="flex items-center justify-between gap-2 mb-2 w-full">
                    <span class="font-mono font-bold text-hemo-brand text-[10px] bg-red-50 px-2 py-0.5 rounded border border-red-100 truncate max-w-[85%]">
                        ${inst.code}
                    </span>
                    <div class="h-1.5 w-1.5 rounded-full ${indicatorClasses}"></div>
                </div>

                <h3 class="text-xs font-bold text-gray-700 mb-2 line-clamp-2 leading-snug group-hover:text-hemo-brand transition-colors uppercase tracking-tight">
                    ${inst.name}
                </h3>
                
                <div class="flex justify-between items-end border-t border-gray-100 pt-2 mt-auto w-full">
                    <div class="text-[10px] text-gray-400 font-mono">
                        <span class="font-bold text-gray-500">RNG:</span> ${inst.range}
                    </div>
                    <div class="text-[10px] text-gray-400 font-mono">
                         ${inst.unit}
                    </div>
                </div>
            </div>
        `;
        gridContainer.appendChild(card);
    });
}

// --- MODAL ---
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
            <div class="h-48 md:h-auto md:w-1/3 bg-gray-50 flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-gray-100">
                 <img src="${inst.image}" alt="${inst.code}" class="max-h-full max-w-full object-contain mix-blend-multiply" 
                 onerror="this.onerror=null; this.parentNode.innerHTML='<div class=\'text-gray-300 text-6xl\'>${typeData.icon}</div>'">
            </div>
        `;
    } else {
        largeImageHtml = `
            <div class="h-48 md:h-auto md:w-1/3 bg-gray-50 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-gray-100 text-gray-300">
                 <div class="text-6xl mb-2 text-hemo-brand opacity-40">${typeData.icon}</div>
                 <div class="text-xs font-mono text-gray-400">Sem imagem</div>
            </div>
        `;
    }

    modalInjection.innerHTML = `
        <div class="flex flex-col md:flex-row md:min-h-[400px]">
            ${largeImageHtml}
            
            <div class="p-6 md:p-8 flex-1 flex flex-col bg-white">
                <div class="mb-4 border-b border-gray-100 pb-4">
                    <div class="flex justify-between items-start mb-2">
                         <div class="inline-block bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            ${moduleData.name}
                        </div>
                    </div>
                    <h2 class="text-xl md:text-2xl font-bold text-hemo-brand mb-1 leading-tight uppercase">${inst.name}</h2>
                    <h3 class="text-sm font-mono text-gray-500 font-bold flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-hemo-brand"></span>
                        ${inst.code}
                    </h3>
                </div>

                 <div class="mb-6 flex-grow">
                     <h4 class="text-[10px] text-gray-400 font-bold uppercase mb-2 tracking-wider flex items-center gap-2">
                        Descrição Funcional
                     </h4>
                     <p class="text-gray-600 text-sm leading-relaxed text-justify bg-gray-50 p-3 rounded border border-gray-100">
                        ${inst.description || 'Nenhuma descrição técnica disponível.'}
                     </p>
                 </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-gray-50 p-3 rounded border border-gray-100">
                        <div class="text-[10px] text-gray-400 uppercase mb-1 font-bold">Faixa (Range)</div>
                        <div class="text-base font-mono font-bold text-gray-700">${inst.range}</div>
                    </div>
                    <div class="bg-gray-50 p-3 rounded border border-gray-100">
                        <div class="text-[10px] text-gray-400 uppercase mb-1 font-bold">Unidade</div>
                        <div class="text-base font-mono font-bold text-gray-700">${inst.unit}</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    modalBackdrop.classList.remove('hidden');
    requestAnimationFrame(() => {
        modalBackdrop.classList.remove('opacity-0');
        modalContentBox.classList.remove('scale-95', 'opacity-0');
        modalContentBox.classList.add('scale-100', 'opacity-100');
    });
    body.classList.add('modal-open');
}

function closeModal() {
    modalBackdrop.classList.add('opacity-0');
    modalContentBox.classList.remove('scale-100', 'opacity-100');
    modalContentBox.classList.add('scale-95', 'opacity-0');
    body.classList.remove('modal-open');
    setTimeout(() => { modalBackdrop.classList.add('hidden'); }, 300);
}

modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
});
window.closeModal = closeModal;

if (ahuSelector) {
    ahuSelector.addEventListener('change', (e) => {
        loadSystemData(e.target.value);
    });
    loadSystemData(ahuSelector.value);
}

document.getElementById('search-input').addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderGrid();
});