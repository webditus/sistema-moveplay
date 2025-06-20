import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, DollarSign } from 'lucide-react';
import { budgetCategories } from '../../data/budgetItems';

const ItemsManagement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('structure');
  const [showCosts, setShowCosts] = useState(false);

  const categories = Object.entries(budgetCategories);
  const currentCategory = budgetCategories[selectedCategory as keyof typeof budgetCategories];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestão de Itens</h1>
          <p className="text-secondary">Gerencie os itens disponíveis para orçamento</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCosts(!showCosts)}
            className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            {showCosts ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showCosts ? 'Ocultar Custos' : 'Mostrar Custos'}
          </button>
          <button className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors">
            <Plus className="h-4 w-4 mr-2 inline" />
            Novo Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-accent/20">
          <h3 className="text-lg font-semibold text-white mb-4">Categorias</h3>
          <div className="space-y-2">
            {categories.map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedCategory === key
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'text-secondary hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{category.icon}</span>
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-xs opacity-60">{category.items.length} itens</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Items List */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800/50 rounded-xl border border-accent/20 overflow-hidden">
            <div className="p-6 border-b border-accent/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{currentCategory.icon}</span>
                  <h3 className="text-xl font-semibold text-white">{currentCategory.name}</h3>
                </div>
                <span className="text-sm text-secondary">{currentCategory.items.length} itens</span>
              </div>
            </div>

            <div className="divide-y divide-accent/10">
              {currentCategory.items.map((item) => (
                <div key={item.id} className="p-6 hover:bg-gray-700/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-2">{item.name}</h4>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-accent" />
                          <span className="text-accent font-bold">
                            {item.price > 0 
                              ? `R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                              : 'Gratuito'
                            }
                          </span>
                        </div>
                        
                        {showCosts && item.cost !== undefined && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-secondary">Custo:</span>
                            <span className="text-red-400 font-medium">
                              R$ {item.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        )}

                        {showCosts && item.cost !== undefined && item.price > 0 && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-secondary">Margem:</span>
                            <span className="text-green-400 font-medium">
                              {(((item.price - item.cost) / item.price) * 100).toFixed(1)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-secondary hover:text-blue-400 transition-colors" title="Editar">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-secondary hover:text-red-400 transition-colors" title="Excluir">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsManagement;