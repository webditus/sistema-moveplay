import React from 'react';
import { 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  MapPin,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useBudget } from '../../context/BudgetContext';

const Dashboard: React.FC = () => {
  const { budgets } = useBudget();

  // Estatísticas básicas
  const totalBudgets = budgets.length;
  const hotBudgets = budgets.filter(b => b.status === 'hot').length;
  const warmBudgets = budgets.filter(b => b.status === 'warm').length;
  const coldBudgets = budgets.filter(b => b.status === 'cold').length;

  const totalValue = budgets.reduce((sum, budget) => sum + budget.total, 0);
  const avgBudgetValue = totalBudgets > 0 ? totalValue / totalBudgets : 0;

  // Orçamentos recentes
  const recentBudgets = budgets
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      title: 'Total de Orçamentos',
      value: totalBudgets,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Valor Total',
      value: `R$ ${totalValue.toLocaleString('pt-BR')}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Ticket Médio',
      value: `R$ ${avgBudgetValue.toLocaleString('pt-BR')}`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+5%'
    },
    {
      title: 'Clientes Ativos',
      value: totalBudgets,
      icon: Users,
      color: 'bg-accent',
      change: '+15%'
    }
  ];

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
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-xl p-6 border border-accent/20">
        <h1 className="text-2xl font-bold text-white mb-2">
          Bem-vindo ao Dashboard
        </h1>
        <p className="text-secondary">
          Acompanhe o desempenho dos seus orçamentos e gerencie seus projetos.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-green-400 mt-2">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}/20`}>
                <stat.icon className={`h-6 w-6 text-white`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-accent/20">
          <h3 className="text-lg font-semibold text-white mb-6">Distribuição por Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-white">Quente</span>
              </div>
              <span className="text-red-400 font-semibold">{hotBudgets}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-white">Morno</span>
              </div>
              <span className="text-yellow-400 font-semibold">{warmBudgets}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-white">Frio</span>
              </div>
              <span className="text-blue-400 font-semibold">{coldBudgets}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-accent/20">
          <h3 className="text-lg font-semibold text-white mb-6">Ações Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full p-3 text-left bg-accent/20 hover:bg-accent/30 rounded-lg border border-accent/30 text-white transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-accent" />
                <span>Novo Orçamento Manual</span>
              </div>
            </button>
            <button className="w-full p-3 text-left bg-gray-700/50 hover:bg-gray-700/70 rounded-lg border border-gray-600/30 text-white transition-colors">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-secondary" />
                <span>Gerenciar Clientes</span>
              </div>
            </button>
            <button className="w-full p-3 text-left bg-gray-700/50 hover:bg-gray-700/70 rounded-lg border border-gray-600/30 text-white transition-colors">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-secondary" />
                <span>Relatório Completo</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Budgets */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-accent/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Orçamentos Recentes</h3>
          <button className="text-accent hover:text-accent/80 text-sm font-medium">
            Ver todos
          </button>
        </div>
        
        {recentBudgets.length > 0 ? (
          <div className="space-y-4">
            {recentBudgets.map((budget) => (
              <div key={budget.id} className="p-4 bg-gray-700/30 rounded-lg border border-accent/10 hover:border-accent/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[budget.status]}`}>
                      {statusLabels[budget.status]}
                    </div>
                    <span className="text-white font-medium">{budget.clientInfo.name} {budget.clientInfo.surname}</span>
                  </div>
                  <span className="text-accent font-bold">
                    R$ {budget.total.toLocaleString('pt-BR')}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-secondary">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{budget.clientInfo.eventName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{budget.clientInfo.city}/{budget.clientInfo.state}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(budget.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-secondary mx-auto mb-3" />
            <p className="text-secondary">Nenhum orçamento encontrado</p>
            <p className="text-sm text-secondary/60 mt-1">
              Os orçamentos criados na página pública aparecerão aqui
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;