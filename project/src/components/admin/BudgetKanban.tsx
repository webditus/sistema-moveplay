import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Calendar, MapPin, DollarSign, User } from 'lucide-react';
import { Budget } from '../../context/BudgetContext';

interface BudgetKanbanProps {
  budgets: Budget[];
}

const stages = [
  { id: 'received', title: 'Recebidos', color: 'bg-blue-500' },
  { id: 'contact', title: 'Em Contato', color: 'bg-yellow-500' },
  { id: 'proposal', title: 'Proposta', color: 'bg-purple-500' },
  { id: 'negotiation', title: 'Negociação', color: 'bg-orange-500' },
  { id: 'closed', title: 'Fechados', color: 'bg-green-500' },
];

const BudgetKanban: React.FC<BudgetKanbanProps> = ({ budgets }) => {
  const handleDragEnd = (result: any) => {
    // Implementar lógica de arrastar e soltar
    console.log('Drag ended:', result);
  };

  const getBudgetsByStage = (stageId: string) => {
    // Por enquanto, distribuir aleatoriamente. Em produção, usar o campo 'stage' do orçamento
    return budgets.filter((_, index) => {
      const stageIndex = stages.findIndex(s => s.id === stageId);
      return index % stages.length === stageIndex;
    });
  };

  const statusColors = {
    hot: 'border-l-4 border-l-red-500',
    warm: 'border-l-4 border-l-yellow-500',
    cold: 'border-l-4 border-l-blue-500'
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-accent/20">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {stages.map((stage) => (
            <div key={stage.id} className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                <h3 className="font-semibold text-white">{stage.title}</h3>
                <span className="bg-gray-700 text-secondary px-2 py-1 rounded-full text-xs">
                  {getBudgetsByStage(stage.id).length}
                </span>
              </div>

              <Droppable droppableId={stage.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-3 min-h-[400px] p-3 rounded-lg transition-colors ${
                      snapshot.isDraggingOver ? 'bg-accent/10' : 'bg-gray-700/20'
                    }`}
                  >
                    {getBudgetsByStage(stage.id).map((budget, index) => (
                      <Draggable key={budget.id} draggableId={budget.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-4 bg-gray-800 rounded-lg border border-accent/20 cursor-pointer transition-all duration-200 hover:border-accent/40 ${
                              snapshot.isDragging ? 'shadow-lg rotate-3' : ''
                            } ${statusColors[budget.status]}`}
                          >
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-medium text-white text-sm">
                                    {budget.clientInfo.name} {budget.clientInfo.surname}
                                  </h4>
                                  <p className="text-xs text-accent font-mono">{budget.id}</p>
                                </div>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  budget.status === 'hot' ? 'bg-red-500/20 text-red-400' :
                                  budget.status === 'warm' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-blue-500/20 text-blue-400'
                                }`}>
                                  {budget.status === 'hot' ? '🔥' : budget.status === 'warm' ? '🌡️' : '❄️'}
                                </div>
                              </div>

                              <div className="space-y-2 text-xs text-secondary">
                                <div className="flex items-center space-x-2">
                                  <User className="h-3 w-3" />
                                  <span className="truncate">{budget.clientInfo.eventName}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-3 w-3" />
                                  <span>{budget.clientInfo.city}/{budget.clientInfo.state}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(budget.clientInfo.eventDate).toLocaleDateString('pt-BR')}</span>
                                </div>
                              </div>

                              <div className="pt-2 border-t border-accent/10">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-secondary">{budget.items.length} itens</span>
                                  <span className="text-accent font-bold text-sm">
                                    R$ {budget.total.toLocaleString('pt-BR')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default BudgetKanban;