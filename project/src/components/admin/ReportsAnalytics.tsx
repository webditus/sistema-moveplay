import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  MapPin,
  Download,
  Filter
} from 'lucide-react';
import { useBudget } from '../../context/BudgetContext';

const ReportsAnalytics: React.FC = () => {
  const { budgets } = useBudget();
  const [dateRange, setDateRange] = useState('30');
  const [statusFilter, setStatusFilter] = useState('all');

  // Cálculos básicos
  const totalBudgets = budgets.length;
  const totalValue = budgets.reduce((sum, budget) => sum + budget.total, 0);
  const avgBudgetValue = totalBudgets > 0 ? totalValue / totalBudgets : 0;

  // Distribuição por status
  const statusDistribution = {
    hot: budgets.filter(b => b.status === 'hot').length,
    warm: budgets.filter(b => b.status === 'warm').length,
    cold: budgets.filter(b => b.status === 'cold').length
  };

  // Distribuição por cidade
  const cityDistribution = budgets.reduce((acc, budget) => {
    const city = budget.clientInfo.city;
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCities = Object.entries(cityDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Orçamentos por mês
  const monthlyData = budgets.reduce((acc, budget) => {
    const month = new Date(budget.createdAt).toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'short' 
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = [
    {
      title: 'Total de Orçamentos',
      value: totalBudgets,
      icon: BarChart3,
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
      title: 'Taxa de Conversão',
      value: '24%',
      icon: Users,
      color: 'bg-accent',
      change: '+3%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Relatórios e Analytics</h1>
          <p className="text-secondary">Acompanhe o desempenho e métricas dos orçamentos</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-accent/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
            <option value="365">Último ano</option>
          </select>
          <button className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors">
            <Download className="h-4 w-4 mr-2 inline" />
            Exportar
          </button>
        </div>
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
                <stat.icon className="h-6 w-6 text-white" />
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
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-white">Quente</span>
              </div>
              <div className="text-right">
                <span className="text-red-400 font-semibold">{statusDistribution.hot}</span>
                <p className="text-xs text-secondary">
                  {totalBudgets > 0 ? ((statusDistribution.hot / totalBudgets) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-white">Morno</span>
              </div>
              <div className="text-right">
                <span className="text-yellow-400 font-semibold">{statusDistribution.warm}</span>
                <p className="text-xs text-secondary">
                  {totalBudgets > 0 ? ((statusDistribution.warm / totalBudgets) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-white">Frio</span>
              </div>
              <div className="text-right">
                <span className="text-blue-400 font-semibold">{statusDistribution.cold}</span>
                <p className="text-xs text-secondary">
                  {totalBudgets > 0 ? ((statusDistribution.cold / totalBudgets) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-accent/20">
          <h3 className="text-lg font-semibold text-white mb-6">Top Cidades</h3>
          <div className="space-y-4">
            {topCities.length > 0 ? (
              topCities.map(([city, count], index) => (
                <div key={city} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span className="text-white">{city}</span>
                    </div>
                  </div>
                  <span className="text-accent font-semibold">{count}</span>
                </div>
              ))
            ) : (
              <p className="text-secondary text-center py-4">Nenhum dado disponível</p>
            )}
          </div>
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-accent/20">
        <h3 className="text-lg font-semibold text-white mb-6">Orçamentos por Mês</h3>
        <div className="space-y-4">
          {Object.entries(monthlyData).length > 0 ? (
            Object.entries(monthlyData).map(([month, count]) => (
              <div key={month} className="flex items-center space-x-4">
                <div className="w-20 text-sm text-secondary">{month}</div>
                <div className="flex-1 bg-gray-700/30 rounded-full h-6 relative">
                  <div 
                    className="bg-accent rounded-full h-6 flex items-center justify-end pr-2"
                    style={{ width: `${(count / Math.max(...Object.values(monthlyData))) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-white">{count}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-secondary text-center py-8">Nenhum dado disponível</p>
          )}
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-gray-800/50 rounded-xl border border-accent/20 overflow-hidden">
        <div className="p-6 border-b border-accent/20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Relatório Detalhado</h3>
            <div className="flex items-center space-x-3">
              <Filter className="h-4 w-4 text-secondary" />
              <select className="px-3 py-1 bg-gray-700/50 border border-accent/20 rounded text-white text-sm">
                <option>Todos os status</option>
                <option>Quente</option>
                <option>Morno</option>
                <option>Frio</option>
              </select>
            </div>
          </div>
        </div>

        {budgets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Evento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Cidade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-accent/10">
                {budgets.slice(0, 10).map((budget) => (
                  <tr key={budget.id} className="hover:bg-gray-700/20">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">
                          {budget.clientInfo.name} {budget.clientInfo.surname}
                        </div>
                        <div className="text-sm text-secondary">{budget.clientInfo.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {budget.clientInfo.eventName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                      {budget.clientInfo.city}/{budget.clientInfo.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        budget.status === 'hot' ? 'bg-red-500/20 text-red-400' :
                        budget.status === 'warm' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {budget.status === 'hot' ? 'Quente' : budget.status === 'warm' ? 'Morno' : 'Frio'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-accent">
                      R$ {budget.total.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                      {new Date(budget.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <BarChart3 className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Nenhum dado disponível</h3>
            <p className="text-secondary">Os relatórios aparecerão quando houver orçamentos criados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsAnalytics;