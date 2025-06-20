import jsPDF from 'jspdf';
import { ClientInfo, BudgetItem } from '../context/BudgetContext';

export const generatePDF = async (
  clientInfo: ClientInfo,
  selectedItems: BudgetItem[],
  total: number
): Promise<void> => {
  const pdf = new jsPDF();
  
  // Configurações
  const pageWidth = pdf.internal.pageSize.width;
  const margin = 20;
  let yPosition = 30;

  // Header com logo e informações da empresa
  pdf.setFillColor(3, 3, 3); // #030303
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('MovePlay Cenografia', margin, 25);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Especializada em Estandes Corporativos', margin, 32);

  yPosition = 60;

  // Título do documento
  pdf.setTextColor(35, 86, 78); // #23564E
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ORÇAMENTO', margin, yPosition);
  
  yPosition += 20;

  // Informações do cliente
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('DADOS DO CLIENTE', margin, yPosition);
  
  yPosition += 10;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  
  const clientData = [
    `Nome: ${clientInfo.name} ${clientInfo.surname}`,
    `WhatsApp: ${clientInfo.whatsapp}`,
    `Email: ${clientInfo.email}`,
    `Evento: ${clientInfo.eventName}`,
    `Local: ${clientInfo.address}, ${clientInfo.number} - ${clientInfo.city}/${clientInfo.state}`,
    `CEP: ${clientInfo.cep}`,
    `Data do Evento: ${new Date(clientInfo.eventDate).toLocaleDateString('pt-BR')}`,
    `Montagem: ${new Date(clientInfo.assemblyDate).toLocaleDateString('pt-BR')}`,
    `Desmontagem: ${new Date(clientInfo.disassemblyDate).toLocaleDateString('pt-BR')}`
  ];

  clientData.forEach(line => {
    pdf.text(line, margin, yPosition);
    yPosition += 6;
  });

  yPosition += 10;

  // Itens selecionados
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ITENS SELECIONADOS', margin, yPosition);
  
  yPosition += 15;

  // Cabeçalho da tabela
  pdf.setFillColor(248, 244, 225); // #F8F4E1
  pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 10, 'F');
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Item', margin + 5, yPosition);
  pdf.text('Qtd', pageWidth - 80, yPosition);
  pdf.text('Valor Unit.', pageWidth - 60, yPosition);
  pdf.text('Total', pageWidth - 30, yPosition);
  
  yPosition += 15;

  // Itens
  pdf.setFont('helvetica', 'normal');
  selectedItems.forEach(item => {
    const quantity = item.quantity || 1;
    const itemTotal = item.price * quantity;
    
    pdf.text(item.name, margin + 5, yPosition);
    pdf.text(quantity.toString(), pageWidth - 80, yPosition);
    pdf.text(`R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, pageWidth - 60, yPosition);
    pdf.text(`R$ ${itemTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, pageWidth - 30, yPosition);
    
    yPosition += 8;
    
    // Nova página se necessário
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = 30;
    }
  });

  // Total
  yPosition += 10;
  pdf.setDrawColor(35, 86, 78);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  
  yPosition += 10;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(35, 86, 78);
  pdf.text('TOTAL ESTIMADO:', margin, yPosition);
  pdf.text(`R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, pageWidth - 60, yPosition);

  yPosition += 20;

  // Observações
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  
  const observations = [
    '• Valores estimados sujeitos a alteração após análise técnica',
    '• Prazo de validade: 30 dias',
    '• Forma de pagamento: ' + clientInfo.paymentMethod.toUpperCase(),
    '• Modelo de comodato - equipamentos retornam após o evento'
  ];

  observations.forEach(obs => {
    pdf.text(obs, margin, yPosition);
    yPosition += 6;
  });

  // Footer
  yPosition = 280;
  pdf.setFillColor(3, 3, 3);
  pdf.rect(0, yPosition, pageWidth, 20, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(8);
  pdf.text('MovePlay Cenografia | WhatsApp: (11) 99196-4667 | Email: jubarobertotavares@moveplaycenografia.com', margin, yPosition + 10);

  // Salvar o PDF
  const fileName = `Orcamento_${clientInfo.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};