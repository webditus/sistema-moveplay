import React from 'react';
import { ChevronLeft, Download, MessageCircle, Mail, FileText, Calendar, MapPin, User } from 'lucide-react';
import { ClientInfo, BudgetItem } from '../../context/BudgetContext';

interface BudgetSummaryProps {
  clientInfo: ClientInfo;
  selectedItems: BudgetItem[];
  total: number;
  onBack: () => void;
  onSendWhatsApp: () => void;
  onSendEmail: () => void;
  onDownloadPDF: () => void;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({
  clientInfo,
  selectedItems,
  total,
  onBack,
  onSendWhatsApp,
  onSendEmail,
  onDownloadPDF
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Resumo do Orçamento</h2>
        <p className="text-secondary/80">Revise todas as informações antes de enviar</p>
      </div>

      {/* Informações do Cliente */}
      <div className="bg-gray-700/30 rounded-xl p-6 border border-accent/10">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <User className="h-5 w-5 mr-2 text-accent" />
          Dados do Cliente
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-secondary mb-1">Nome Completo</p>
            <p className="text-white font-medium">{clientInfo.name} {clientInfo.surname}</p>
          </div>
          <div>
            <p className="text-sm text-secondary mb-1">WhatsApp</p>
            <p className="text-white font-medium">{clientInfo.whatsapp}</p>
          </div>
          <div>
            <p className="text-sm text-secondary mb-1">Email</p>
            <p className="text-white font-medium">{clientInfo.email}</p>
          </div>
          <div>
            <p className="text-sm text-secondary mb-1">Forma de Pagamento</p>
            <p className="text-white font-medium capitalize">{clientInfo.paymentMethod.replace('-', ' ')}</p>
          </div>
        </div>
      </div>

      {/* Informações do Evento */}
      <div className="bg-gray-700/30 rounded-xl p-6 border border-accent/10">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-accent" />
          Informações do Evento
        </h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-secondary mb-1">Nome do Evento</p>
            <p className="text-white font-medium">{clientInfo.eventName}</p>
          </div>
          
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-secondary mb-1">Local do Evento</p>
              <p className="text-white">
                {clientInfo.address}, {clientInfo.number} - {clientInfo.city}/{clientInfo.state}
              </p>
              <p className="text-secondary text-sm">CEP: {clientInfo.cep}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-secondary mb-1">Montagem</p>
              <p className="text-white font-medium">
                {new Date(clientInfo.assemblyDate).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div>
              <p className="text-sm text-secondary mb-1">Evento</p>
              <p className="text-white font-medium">
                {new Date(clientInfo.eventDate).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div>
              <p className="text-sm text-secondary mb-1">Desmontagem</p>
              <p className="text-white font-medium">
                {new Date(clientInfo.disassemblyDate).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-secondary mb-1">Prazo para Orçamento</p>
            <p className="text-white font-medium">
              {new Date(clientInfo.budgetDeadline).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>

      {/* Itens Selecionados */}
      <div className="bg-gray-700/30 rounded-xl p-6 border border-accent/10">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-accent" />
          Itens Selecionados ({selectedItems.length})
        </h3>
        
        <div className="space-y-3">
          {selectedItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <div className="flex-1">
                <p className="text-white font-medium">{item.name}</p>
                {item.quantity && item.quantity > 1 && (
                  <p className="text-sm text-secondary">Quantidade: {item.quantity}</p>
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

        <div className="border-t border-accent/20 mt-6 pt-6">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-white">Total Estimado</p>
            <p className="text-3xl font-bold text-accent">
              R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <p className="text-sm text-secondary mt-2">
            * Valores estimados. Orçamento final pode variar após análise técnica.
          </p>
        </div>
      </div>

      {/* Ações */}
      <div className="space-y-4">
        {/* Botões de Envio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={onSendWhatsApp}
            className="flex items-center justify-center px-6 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Enviar WhatsApp
          </button>
          
          <button
            onClick={onSendEmail}
            className="flex items-center justify-center px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <Mail className="h-5 w-5 mr-2" />
            Enviar Email
          </button>
          
          <button
            onClick={onDownloadPDF}
            className="flex items-center justify-center px-6 py-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <Download className="h-5 w-5 mr-2" />
            Baixar PDF
          </button>
        </div>

        {/* Botão Voltar */}
        <div className="flex justify-center">
          <button
            onClick={onBack}
            className="flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-all duration-300"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Voltar para Seleção de Itens
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;