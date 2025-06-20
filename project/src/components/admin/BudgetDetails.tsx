import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  FileText,
  DollarSign,
  Edit,
  MessageCircle,
  Download
} from 'lucide-react';
import { useBudget } from '../../context/BudgetContext';

const BudgetDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBudget } = useBudget();

  const budget = id ? getBudget(id) : null;

  if (!budget) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-white mb-2">Orçamento não encontrado</h2>
        <p className="text-secondary mb-6">O orçamento solicitado não existe ou foi removido.</p>
        <button
          onClick={() => navigate('/admin/budgets')}
          className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors"
        >
          Voltar para Lista
        </button>
      </div>
    );
  }

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/budgets')}
            className="p-2 text-secondary hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Detalhes do Orçamento</h1>
            <p className="text-secondary">ID: {budget.id}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[budget.status]}`}>
            {statusLabels[budget.status]}
          </div>
          <button className="px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg border border-accent/30 transition-colors">
            <Edit className="h-4 w-4 mr-2 inline" />
            Editar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações do Cliente */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-accent/20">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <User className="h-5 w-5 mr-2 text-accent" />
              Informações do Cliente
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-secondary mb-1">Nome Completo</p>
                <p className="text-white font-medium">{budget.clientInfo.name} {budget.clientInfo.surname}</p>
              </div>
              <div>
                <p className="text-sm text-secondary mb-1">WhatsApp</p>
                <div className="flex items-center space-x-2">
                  <p className="text-white font-medium">{budget.clientInfo.whatsapp}</p>
                  <button className="text-green-500 hover:text-green-400">
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm text-secondary mb-1">Email</p>
                <div className="flex items-center space-x-2">
                  <p className="text-white font-medium">{budget.clientInfo.email}</p>
                  <button className="text-blue-500 hover:text-blue-400">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm text-secondary mb-1">Forma de Pagamento</p>
                <p className="text-white font-medium capitalize">{budget.clientInfo.paymentMethod.replace('-', ' ')}</p>
              </div>
            </div>
          </div>

          {/* Informações do Evento */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-accent/20">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-accent" />
              Informações do Evento
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-secondary mb-1">Nome do Evento</p>
                <p className="text-white font-medium">{budget.clientInfo.eventName}</p>
              </div>
              
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-secondary mb-1">Local do Evento</p>
                  <p className="text-white">
                    {budget.clientInfo.address}, {budget.clientInfo.number}
                  </p>
                  <p className="text-white">
                    {budget.clientInfo.city}/{budget.clientInfo.state} - CEP: {budget.clientInfo.cep}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-secondary mb-1">Data de Montagem</p>
                  <p className="text-white font-medium">
                    {new Date(budget.clientInfo.assemblyDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Data do Evento</p>
                  <p className="text-white font-medium">
                    {new Date(budget.clientInfo.eventDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Data de Desmontagem</p>
                  <p className="text-white font-medium">
                    {new Date(budget.clientInfo.disassemblyDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-secondary mb-1">Prazo para Orçamento</p>
                <p className="text-white font-medium">
                  {new Date(budget.clientInfo.budgetDeadline).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>

          {/* Itens Selecionados */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-accent/20">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-accent" />
              Itens Selecionados ({budget.items.length})
            </h3>
            
            <div className="space-y-3">
              {budget.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-sm text-secondary">{item.category}</p>
                    {item.quantity && item.quantity > 1 && (
                      <p className="text-sm text-accent">Quantidade: {item.quantity}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-accent font-bold">
                      R$ {(item.price * (item.quantity || 1)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    {item.quantity && item.quantity > 1 && (
                      <p className="text-xs text-secondary">
                        R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} cada
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Resumo Financeiro */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-accent/20">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-accent" />
              Resumo Financeiro
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-secondary">Subtotal</span>
                <span className="text-white font-medium">
                  R$ {budget.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-accent/20">
                <span className="text-lg font-semibold text-white">Total</span>
                <span className="text-2xl font-bold text-accent">
                  R$ {budget.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-accent/20">
            <h3 className="text-lg font-semibold text-white mb-6">Ações Rápidas</h3>
            
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-green-600/20 hover:bg-green-600/30 rounded-lg border border-green-600/30 text-green-400 transition-colors">
                <MessageCircle className="h-4 w-4 mr-2 inline" />
                Enviar WhatsApp
              </button>
              <button className="w-full p-3 text-left bg-blue-600/20 hover:bg-blue-600/30 rounded-lg border border-blue-600/30 text-blue-400 transition-colors">
                <Mail className="h-4 w-4 mr-2 inline" />
                Enviar Email
              </button>
              <button className="w-full p-3 text-left bg-red-600/20 hover:bg-red-600/30 rounded-lg border border-red-600/30 text-red-400 transition-colors">
                <Download className="h-4 w-4 mr-2 inline" />
                Baixar PDF
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-accent/20">
            <h3 className="text-lg font-semibold text-white mb-6">Timeline</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-medium">Orçamento Criado</p>
                  <p className="text-sm text-secondary">
                    {new Date(budget.createdAt).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
              
              {budget.notes.map((note, index) =>  (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <div>
                    <p className="text-white">{note}</p>
                    <p className="text-sm text-secondary">Sistema</p>
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

export default BudgetDetails;