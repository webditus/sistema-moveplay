import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { budgetCategories } from '../../data/budgetItems';
import { BudgetItem } from '../../context/BudgetContext';

interface BudgetItemsSelectorProps {
  selectedItems: BudgetItem[];
  onItemToggle: (itemId: string, category: string) => void;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onBack: () => void;
  onNext: () => void;
}

const BudgetItemsSelector: React.FC<BudgetItemsSelectorProps> = ({
  selectedItems,
  onItemToggle,
  onQuantityChange,
  onBack,
  onNext
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simular seleção do item de upload de projeto
      onItemToggle('upload-projeto', 'design');
    }
  };

  const isItemSelected = (itemId: string) => {
    return selectedItems.some(item => item.id === itemId);
  };

  const getItemQuantity = (itemId: string) => {
    const item = selectedItems.find(item => item.id === itemId);
    return item?.quantity || 1;
  };

  const total = selectedItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Selecione os Itens do seu Estande</h2>
        <p className="text-secondary/80">Escolha os componentes que deseja incluir no seu orçamento</p>
      </div>

      {Object.entries(budgetCategories).map(([categoryKey, category]) => (
        <div key={categoryKey} className="bg-gray-700/30 rounded-xl p-6 border border-accent/10">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <span className="text-2xl mr-3">{category.icon}</span>
            {category.name}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.items.map((item) => {
              const selected = isItemSelected(item.id);
              const quantity = getItemQuantity(item.id);

              return (
                <div
                  key={item.id}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selected
                      ? 'border-accent bg-accent/10 shadow-lg'
                      : 'border-secondary/20 bg-gray-800/30 hover:border-accent/50'
                  }`}
                  onClick={() => onItemToggle(item.id, item.category)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-white text-sm">{item.name}</h4>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selected ? 'bg-accent border-accent' : 'border-secondary/30'
                    }`}>
                      {selected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </div>

                  <div className="text-accent font-bold text-lg mb-3">
                    {item.price > 0 ? `R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'Gratuito'}
                  </div>

                  {/* Upload de arquivo para projeto próprio */}
                  {item.id === 'upload-projeto' && (
                    <div className="mt-3">
                      <input
                        type="file"
                        id="projeto-upload"
                        accept=".pdf,.dwg,.skp,.3ds,.obj"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="projeto-upload"
                        className="block w-full p-2 border border-accent/30 rounded text-center text-xs text-secondary hover:bg-accent/10 transition-colors cursor-pointer"
                      >
                        {uploadedFile ? uploadedFile.name : 'Clique para anexar arquivo'}
                      </label>
                    </div>
                  )}

                  {/* Controle de quantidade */}
                  {selected && item.price > 0 && (
                    <div className="flex items-center justify-between mt-3 p-2 bg-gray-900/50 rounded">
                      <span className="text-xs text-secondary">Quantidade:</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuantityChange(item.id, quantity - 1);
                          }}
                          className="w-6 h-6 bg-accent/20 hover:bg-accent/30 rounded flex items-center justify-center transition-colors"
                        >
                          <Minus className="h-3 w-3 text-accent" />
                        </button>
                        <span className="text-white font-medium min-w-[20px] text-center">{quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuantityChange(item.id, quantity + 1);
                          }}
                          className="w-6 h-6 bg-accent/20 hover:bg-accent/30 rounded flex items-center justify-center transition-colors"
                        >
                          <Plus className="h-3 w-3 text-accent" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Resumo fixo */}
      <div className="sticky bottom-0 bg-gray-800/90 backdrop-blur-sm border-t border-accent/20 p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <p className="text-sm text-secondary">Total Estimado</p>
            <p className="text-2xl font-bold text-accent">
              R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-secondary mt-1">
              {selectedItems.length} {selectedItems.length === 1 ? 'item selecionado' : 'itens selecionados'}
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onBack}
              className="flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Voltar
            </button>
            <button
              onClick={onNext}
              className="flex items-center px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Revisar Orçamento
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetItemsSelector;