import React, { useState, useEffect } from 'react';
import { Building2, Calculator, FileText, Send, Download, MessageCircle, Mail } from 'lucide-react';
import ClientInfoForm from './ClientInfoForm';
import BudgetItemsSelector from './BudgetItemsSelector';
import BudgetSummary from './BudgetSummary';
import { budgetCategories } from '../../data/budgetItems';
import { BudgetItem, ClientInfo } from '../../context/BudgetContext';
import { generatePDF } from '../../utils/pdfGenerator';

const PublicBudgetGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: '',
    surname: '',
    whatsapp: '',
    email: '',
    eventName: '',
    cep: '',
    address: '',
    number: '',
    city: '',
    state: '',
    assemblyDate: '',
    eventDate: '',
    disassemblyDate: '',
    budgetDeadline: '',
    paymentMethod: 'pix'
  });
  const [selectedItems, setSelectedItems] = useState<BudgetItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = selectedItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setTotal(newTotal);
  }, [selectedItems]);

  const handleItemToggle = (itemId: string, category: string) => {
    const allItems = Object.values(budgetCategories).flatMap(cat => cat.items);
    const item = allItems.find(i => i.id === itemId);
    
    if (!item) return;

    setSelectedItems(prev => {
      const exists = prev.find(i => i.id === itemId);
      if (exists) {
        return prev.filter(i => i.id !== itemId);
      } else {
        return [...prev, { ...item, selected: true, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setSelectedItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleSendWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/5511991964667?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSendEmail = () => {
    const subject = `Orçamento - ${clientInfo.eventName}`;
    const body = generateEmailMessage();
    const emailUrl = `mailto:jubarobertotavares@moveplaycenografia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl, '_blank');
  };

  const handleDownloadPDF = async () => {
    await generatePDF(clientInfo, selectedItems, total);
  };

  const generateWhatsAppMessage = () => {
    return `🎪 *SOLICITAÇÃO DE ORÇAMENTO - MOVEPLAY CENOGRAFIA*

👤 *DADOS DO CLIENTE*
Nome: ${clientInfo.name} ${clientInfo.surname}
WhatsApp: ${clientInfo.whatsapp}
Email: ${clientInfo.email}

🎯 *EVENTO*
Nome: ${clientInfo.eventName}
Local: ${clientInfo.address}, ${clientInfo.number} - ${clientInfo.city}/${clientInfo.state}
CEP: ${clientInfo.cep}

📅 *CRONOGRAMA*
Montagem: ${new Date(clientInfo.assemblyDate).toLocaleDateString('pt-BR')}
Evento: ${new Date(clientInfo.eventDate).toLocaleDateString('pt-BR')}
Desmontagem: ${new Date(clientInfo.disassemblyDate).toLocaleDateString('pt-BR')}
Prazo para orçamento: ${new Date(clientInfo.budgetDeadline).toLocaleDateString('pt-BR')}

💰 *ITENS SELECIONADOS*
${selectedItems.map(item => `• ${item.name} ${item.quantity && item.quantity > 1 ? `(${item.quantity}x)` : ''} - R$ ${(item.price * (item.quantity || 1)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`).join('\n')}

💵 *TOTAL ESTIMADO: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}*

Forma de pagamento preferida: ${clientInfo.paymentMethod.toUpperCase()}

Aguardo retorno! 🚀`;
  };

  const generateEmailMessage = () => {
    return `Prezados,

Gostaria de solicitar um orçamento para cenografia de estande corporativo.

DADOS DO CLIENTE
Nome: ${clientInfo.name} ${clientInfo.surname}
WhatsApp: ${clientInfo.whatsapp}
Email: ${clientInfo.email}

INFORMAÇÕES DO EVENTO
Nome: ${clientInfo.eventName}
Endereço: ${clientInfo.address}, ${clientInfo.number} - ${clientInfo.city}/${clientInfo.state}
CEP: ${clientInfo.cep}

CRONOGRAMA
Data de Montagem: ${new Date(clientInfo.assemblyDate).toLocaleDateString('pt-BR')}
Data do Evento: ${new Date(clientInfo.eventDate).toLocaleDateString('pt-BR')}
Data de Desmontagem: ${new Date(clientInfo.disassemblyDate).toLocaleDateString('pt-BR')}
Prazo para receber orçamento: ${new Date(clientInfo.budgetDeadline).toLocaleDateString('pt-BR')}

ITENS SELECIONADOS
${selectedItems.map(item => `- ${item.name} ${item.quantity && item.quantity > 1 ? `(${item.quantity} unidades)` : ''} - R$ ${(item.price * (item.quantity || 1)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`).join('\n')}

TOTAL ESTIMADO: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

Forma de pagamento preferida: ${clientInfo.paymentMethod.toUpperCase()}

Aguardo retorno.

Atenciosamente,
${clientInfo.name} ${clientInfo.surname}`;
  };

  const steps = [
    { number: 1, title: 'Informações do Cliente', icon: Building2 },
    { number: 2, title: 'Seleção de Itens', icon: Calculator },
    { number: 3, title: 'Resumo do Orçamento', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-gray-900 to-primary">
      {/* Header */}
      <header className="bg-primary/90 backdrop-blur-sm border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-accent" />
              <div>
                <h1 className="text-2xl font-bold text-white">MovePlay Cenografia</h1>
                <p className="text-secondary/80 text-sm">Gerador de Orçamento</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                currentStep >= step.number 
                  ? 'bg-accent border-accent text-white' 
                  : 'border-secondary/30 text-secondary/60'
              }`}>
                <step.icon className="h-5 w-5" />
              </div>
              <div className={`ml-3 ${currentStep >= step.number ? 'text-white' : 'text-secondary/60'}`}>
                <p className="text-sm font-medium">{step.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`mx-6 h-0.5 w-16 transition-all duration-300 ${
                  currentStep > step.number ? 'bg-accent' : 'bg-secondary/20'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-accent/20 p-8 animate-fade-in">
          {currentStep === 1 && (
            <ClientInfoForm 
              clientInfo={clientInfo}
              setClientInfo={setClientInfo}
              onNext={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <BudgetItemsSelector
              selectedItems={selectedItems}
              onItemToggle={handleItemToggle}
              onQuantityChange={handleQuantityChange}
              onBack={() => setCurrentStep(1)}
              onNext={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 3 && (
            <BudgetSummary
              clientInfo={clientInfo}
              selectedItems={selectedItems}
              total={total}
              onBack={() => setCurrentStep(2)}
              onSendWhatsApp={handleSendWhatsApp}
              onSendEmail={handleSendEmail}
              onDownloadPDF={handleDownloadPDF}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicBudgetGenerator;