import { BudgetItem } from '../context/BudgetContext';

export const budgetCategories = {
  structure: {
    name: 'Estrutura do Estande',
    icon: '🧱',
    items: [
      { id: 'ilha', name: 'Ilha', price: 15000, cost: 8000, category: 'structure', selected: false },
      { id: 'ponta-ilha', name: 'Ponta de ilha', price: 13500, cost: 7200, category: 'structure', selected: false },
      { id: 'meia-ilha', name: 'Meia ilha', price: 11000, cost: 6000, category: 'structure', selected: false },
      { id: 'parede-linear', name: 'Parede / Linear', price: 9000, cost: 5000, category: 'structure', selected: false },
      { id: 'personalizado', name: 'Personalizado', price: 0, cost: 0, category: 'structure', selected: false }
    ]
  },
  design: {
    name: 'Identidade Visual & Design',
    icon: '🎨',
    items: [
      { id: 'projeto-3d', name: 'Projeto 3D pela MovePlay', price: 1500, cost: 500, category: 'design', selected: false },
      { id: 'upload-projeto', name: 'Upload de projeto próprio', price: 0, cost: 0, category: 'design', selected: false },
      { id: 'consultoria-visual', name: 'Consultoria de identidade visual', price: 700, cost: 300, category: 'design', selected: false }
    ]
  },
  lighting: {
    name: 'Iluminação',
    icon: '💡',
    items: [
      { id: 'spot', name: 'Spot', price: 850, cost: 400, category: 'lighting', selected: false },
      { id: 'led', name: 'LED', price: 1200, cost: 600, category: 'lighting', selected: false },
      { id: 'arandelas', name: 'Arandelas', price: 900, cost: 450, category: 'lighting', selected: false },
      { id: 'cenica', name: 'Cênica', price: 1800, cost: 900, category: 'lighting', selected: false },
      { id: 'ambiente', name: 'Ambiente', price: 500, cost: 250, category: 'lighting', selected: false }
    ]
  },
  furniture: {
    name: 'Mobiliário',
    icon: '🪑',
    items: [
      { id: 'balcao', name: 'Balcão', price: 750, cost: 350, category: 'furniture', selected: false },
      { id: 'vitrine', name: 'Vitrine', price: 960, cost: 480, category: 'furniture', selected: false },
      { id: 'mesa-bistro', name: 'Mesa bistrô + 2 cadeiras', price: 580, cost: 290, category: 'furniture', selected: false },
      { id: 'cadeira-giratoria', name: 'Cadeira giratória', price: 290, cost: 145, category: 'furniture', selected: false },
      { id: 'sofa', name: 'Sofá', price: 850, cost: 425, category: 'furniture', selected: false },
      { id: 'estante', name: 'Estante', price: 450, cost: 225, category: 'furniture', selected: false },
      { id: 'armario', name: 'Armário', price: 1100, cost: 550, category: 'furniture', selected: false }
    ]
  },
  technology: {
    name: 'Tecnologia',
    icon: '🖥️',
    items: [
      { id: 'tv-32', name: 'TV 32"', price: 600, cost: 300, category: 'technology', selected: false },
      { id: 'tv-50', name: 'TV 50"', price: 900, cost: 450, category: 'technology', selected: false },
      { id: 'tv-65', name: 'TV 65"', price: 1400, cost: 700, category: 'technology', selected: false },
      { id: 'painel-led', name: 'Painel LED', price: 4500, cost: 2250, category: 'technology', selected: false },
      { id: 'tela-touch', name: 'Tela touch', price: 3200, cost: 1600, category: 'technology', selected: false },
      { id: 'totem', name: 'Totem', price: 2100, cost: 1050, category: 'technology', selected: false },
      { id: 'som', name: 'Som', price: 900, cost: 450, category: 'technology', selected: false },
      { id: 'internet', name: 'Internet', price: 350, cost: 175, category: 'technology', selected: false },
      { id: 'energia-adicional', name: 'Energia adicional', price: 180, cost: 90, category: 'technology', selected: false }
    ]
  },
  decoration: {
    name: 'Decoração',
    icon: '🌿',
    items: [
      { id: 'planta', name: 'Planta', price: 180, cost: 90, category: 'decoration', selected: false },
      { id: 'tapete', name: 'Tapete', price: 480, cost: 240, category: 'decoration', selected: false },
      { id: 'adesivo-piso', name: 'Adesivo piso', price: 780, cost: 390, category: 'decoration', selected: false },
      { id: 'cortina', name: 'Cortina', price: 350, cost: 175, category: 'decoration', selected: false },
      { id: 'painel-dec', name: 'Painel', price: 980, cost: 490, category: 'decoration', selected: false }
    ]
  },
  promotional: {
    name: 'Materiais Promocionais',
    icon: '📦',
    items: [
      { id: 'suporte-catalogo', name: 'Suporte catálogo', price: 300, cost: 150, category: 'promotional', selected: false },
      { id: 'brindes', name: 'Brindes', price: 250, cost: 125, category: 'promotional', selected: false },
      { id: 'bandeja', name: 'Bandeja', price: 120, cost: 60, category: 'promotional', selected: false },
      { id: 'expositor', name: 'Expositor', price: 600, cost: 300, category: 'promotional', selected: false }
    ]
  },
  logistics: {
    name: 'Logística',
    icon: '🚚',
    items: [
      { id: 'transporte', name: 'Transporte', price: 1000, cost: 500, category: 'logistics', selected: false },
      { id: 'armazenamento', name: 'Armazenamento', price: 600, cost: 300, category: 'logistics', selected: false }
    ]
  },
  services: {
    name: 'Serviços Adicionais',
    icon: '🔐',
    items: [
      { id: 'equipe-evento', name: 'Equipe no evento (dia)', price: 850, cost: 425, category: 'services', selected: false },
      { id: 'limpeza', name: 'Limpeza', price: 300, cost: 150, category: 'services', selected: false },
      { id: 'seguranca', name: 'Segurança', price: 700, cost: 350, category: 'services', selected: false },
      { id: 'recepcionista', name: 'Recepcionista', price: 650, cost: 325, category: 'services', selected: false },
      { id: 'coquetel', name: 'Coquetel', price: 1200, cost: 600, category: 'services', selected: false }
    ]
  },
  media: {
    name: 'Registro e Cobertura',
    icon: '📸',
    items: [
      { id: 'fotos-profissionais', name: 'Fotos profissionais', price: 700, cost: 350, category: 'media', selected: false },
      { id: 'video-institucional', name: 'Vídeo institucional (até 1min)', price: 1300, cost: 650, category: 'media', selected: false }
    ]
  }
};

export const getAllItems = (): BudgetItem[] => {
  return Object.values(budgetCategories).flatMap(category => category.items);
};