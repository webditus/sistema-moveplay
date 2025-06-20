import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  MapPin,
  DollarSign,
  User,
  Phone,
  Mail,
  FileText
} from 'lucide-react';
import { useBudget } from '../../context/BudgetContext';
import BudgetKanban from './BudgetKanban';
import BudgetDetails from './BudgetDetails';

const BudgetManagement: React.FC = () => {
  const { budgets } = useBudget();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

  const filteredBudgets = budgets.filter(budget => {
    const matchesSearch = 
      budget.clientInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      budget.clientInfo.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      budget.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || budget.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    hot: 'text-red-400 bg-red-500/10 border-red-500/20',
    warm: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    cold: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
  };

  const statusLabels = {
    hot: 'Quente',
    warm: 'Morno',
    cold: 'Frio'
  };

  return (
    <Routes>
      <Route path="/" element={
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Gestão de Orçamentos</h1>
              <p className="text-secondary">Gerencie todos os orçamentos e acompanhe o progresso</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setViewMode(viewMode === 'list' ? 'kanban' : 'list')}
                className="px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg border border-accent/30 transition-colors"
              >
                {viewMode === 'list' ? 'Visualização Kanban' : 'Visualização Lista'}
              </button>
              <button className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors">
                <Plus className="h-4 w-4 mr-2 inline" />
                Novo Orçamento
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-accent/20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary" />
                  <input
                    type="text"
                    placeholder="Buscar por cliente, evento ou ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-accent/20 rounded-lg text-white placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-10 pr-8 py-3 bg-gray-700/50 border border-accent/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                  >
                    <option value="all">Todos</option>
                    <option value="hot">Quente</option>
                    <option value="warm">Morno</option>
                    <option value="cold">Frio</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          {viewMode === 'kanban' ? (
            <BudgetKanban budgets={filteredBudgets} />
          ) : (
            <div className="bg-gray-800/50 rounded-xl border border-accent/20 overflow-hidden">
              {filteredBudgets.length > 0 ? (
                <div className="divide-y divide-accent/10">
                  {filteredBudgets.map((budget) => (
                    <div key={budget.id} className="p-6 hover:bg-gray-700/30 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[budget.status]}`}>
                            {statusLabels[budget.status]}
                          </div>
                          <span className="text-accent font-mono text-sm">{budget.id}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => navigate(`/admin/budgets/${budget.id}`)}
                            className="p-2 text-secondary hover:text-accent transition-colors"
                            title="Ver detalhes"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-secondary hover:text-blue-400 transition-colors" title="Editar">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-secondary hover:text-red-400 transition-colors" title="Excluir">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 text-sm">
                            <User className="h-4 w-4 text-accent" />
                            <span className="text-white font-medium">
                              {budget.clientInfo.name} {budget.clientInfo.surname}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-secondary">
                            <Phone className="h-4 w-4" />
                            <span>{budget.clientInfo.whatsapp}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-secondary">
                            <Mail className="h-4 w-4" />
                            <span>{budget.clientInfo.email}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 text-sm">
                            <FileText className="h-4 w-4 text-accent" />
                            <span className="text-white">{budget.clientInfo.eventName}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-secondary">
                            <MapPin className="h-4 w-4" />
                            <span>{budget.clientInfo.city}/{budget.clientInfo.state}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-secondary">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(budget.clientInfo.eventDate).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 text-sm">
                            <DollarSign className="h-4 w-4 text-accent" />
                            <span className="text-white font-bold text-lg">
                              R$ {budget.total.toLocaleString('pt-BR')}
                            </span>
                          </div>
                          <div className="text-sm text-secondary">
                            {budget.items.length} itens selecionados
                          </div>
                          <div className="text-sm text-secondary">
                            Criado em {new Date(budget.createdAt).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <FileText className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Nenhum orçamento encontrado</h3>
                  <p className="text-secondary">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Tente ajustar os filtros de busca' 
                      : 'Os orçamentos criados aparecerão aqui'
                    }
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      } />
      <Route path="/:id" element={<BudgetDetails />} />
    </Routes>
  );
};

export default BudgetManagement;