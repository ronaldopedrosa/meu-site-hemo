// --- DADOS DOS INSTRUMENTOS ---
const instruments = [
    { id: 1, code: 'AHU-0209', name: 'Unidade de Tratamento de Ar Principal', type: 'equipment', module: 'hvac', range: '55.775,2', unit: 'kcal/h', image: 'fotos/ahu.jpg', description: 'MODELO: LRT-H 16.0 ATI - NÚMERO DE SÉRIE: 836 - TAG: AHU-0209 - BLOCO: 02 ' },
    { id: 2, code: 'AHU-0209 YS-001', name: 'Detector de Fumaça em Duto', type: 'detect', module: 'hvac', range: '0°C a 60°C', unit: '°C', image: 'fotos/SM-501-P.jpg', description: 'Detector de fumaça fotoelétrico SM-501-P para dutos proporciona a detecção precoce de fumaça e produtos de combustão presentes no ar que circula pelos dutos de sistemas de climatização (HVAC)' },
    { id: 3, code: 'AHU-0209 MT-TT-001', name: 'Transmissor de Temperatura e Umidade', type: 'temperature', module: 'hvac', range: '0-100', unit: '°C', image: 'fotos/MT-TT.jpg', description: 'Monitoramento da temperatura de retorno do motor do ventilador para proteção contra superaquecimento.' },
    { id: 4, code: 'AHU-0209 PDSH-001', name: 'Chave de Pressão Alta (Pressostato )', type: 'pressure', module: 'hvac', range: '40-600', unit: 'Pa', image: 'fotos/PDSH.jpeg', description: 'Pressostato de segurança para indicar obstrução severa nos filtros.' },
    { id: 5, code: 'AHU-0209 PDT-001', name: 'Transmissor Pressão Diferencial', type: 'pressure', module: 'hvac', range: '-100 a -2500', unit: 'Pa', image: 'fotos/PDT_22ADP-584.jpg', description: 'Medição contínua da saturação do primeiro estágio de filtragem (G4).' },
    { id: 6, code: 'AHU-0209 PDV-001', name: 'Tubo Pilot', type: 'valve', module: 'hvac', range: '0-100', unit: '%', image: '', description: 'Atuador modulante para controle fino da pressão no duto de insuflamento.' },
    { id: 7, code: 'AHU-0209 DPAE-001', name: 'Damper de Ar Externo', type: 'valve', module: 'hvac', range: 'On/Off', unit: '-', image: 'fotos/AMB24-3-S.jpg', description: 'Atuador para damper, 180 in-lb [20 Nm], Sem função de segurança, AC/DC 24 V, On/Off, 3 fios, 1x SPDT' },
    { id: 8, code: 'AHU-0209 DPR-001', name: 'Damper de Retorno', type: 'valve', module: 'hvac', range: 'On/Off', unit: '', image: 'fotos/AMB24-3-S.jpg', description: 'Regulador mecânico auto-operado para estabilização de pressão.' },
    { id: 9, code: 'AHU-0209 PDI-001', name: 'Indicador de Pressão, Manômetro', type: 'pressure', module: 'hvac', range: '500-0-500', unit: 'Pa', image: 'fotos/PDI.jpeg', description: 'Manômetro de coluna inclinada ou Magnehelic para leitura local no campo.' },
    { id: 10, code: 'AHU-0209 PDT-002', name: 'Transmissor Pressão Diferencial', type: 'pressure', module: 'hvac', range: '-100 a-2500', unit: 'Pa', image: 'fotos/PDT_22ADP-584.jpg', description: 'Medição contínua da saturação do primeiro estágio de filtragem (G4).' },
    { id: 11, code: 'AHU-0209 HSE-001', name: 'Chave de Segurança', type: 'general', module: 'hvac', range: '0-100', unit: '', image: 'fotos/HSE.jpeg', description: 'Sensor capacitivo para controle da umidade do ar de retorno ou insuflamento.' },
    { id: 12, code: 'AHU-0209 PDSH-002', name: 'Chave de Pressão Alta (Pressostato )', type: 'pressure', module: 'hvac', range: '40-600', unit: 'Pa', image: 'fotos/PDSH.jpeg', description: 'Pressostato de segurança para indicar obstrução severa nos filtros.' },
    { id: 13, code: 'AHU-0209 PDI-002', name: 'Indicador de Pressão, Manômetro', type: 'pressure', module: 'hvac', range: '500-0-500', unit: 'Pa', image: 'fotos/PDI.jpeg', description: 'Indicador local redundante para a seção de filtragem fina.' },
    { id: 15, code: 'AHU-0209 YS-002', name: 'Detector de Fumaça em Duto', type: 'detect', module: 'hvac', range: '0°C a 60°C', unit: '°C', image: 'fotos/SM-501-P.jpg', description: 'Detector de fumaça fotoelétrico SM-501-P para dutos proporciona a detecção precoce de fumaça e produtos de combustão presentes no ar que circula pelos dutos de sistemas de climatização (HVAC)' },
    { id: 16, code: 'AHU-0209 TT-002', name: 'Transmissor de Temperatura', type: 'temperature', module: 'hvac', range: '0-50', unit: '°C', image: 'fotos/MT-TT.jpg', description: 'Sensor principal para malha de controle de temperatura do ar insuflado na sala.' },
    { id: 17, code: "AHU-0209 TSH-001", name: "Switch de Temperatura Alta", type: "temperature", module: "hvac", range: ">4", unit: "°C", image: "", description: "Termostato de segurança (high-limit) para desligamento de emergência." },
];

// --- Configuração Visual ---
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

let searchTerm = '';

// --- FUNÇÕES DO MODAL ---
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

// Tornar closeModal acessível globalmente (para o botão X)
window.closeModal = closeModal;

// --- RENDERIZAÇÃO ---
function renderGrid() {
    const container = document.getElementById('grid-container');
    const countDisplay = document.getElementById('count-display');
    const totalDisplay = document.getElementById('total-display');

    const filtered = instruments.filter(inst => 
        inst.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
        inst.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    countDisplay.innerText = filtered.length;
    totalDisplay.innerText = `/ ${instruments.length}`;
    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = `
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
        container.appendChild(card);
    });
}

document.getElementById('search-input').addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderGrid();
});

// Inicialização
renderGrid();