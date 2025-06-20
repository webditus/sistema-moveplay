import React, { useState } from 'react';
import { User, Phone, Mail, Calendar, MapPin, Clock } from 'lucide-react';
import { ClientInfo } from '../../context/BudgetContext';

interface ClientInfoFormProps {
  clientInfo: ClientInfo;
  setClientInfo: (info: ClientInfo) => void;
  onNext: () => void;
}

const ClientInfoForm: React.FC<ClientInfoFormProps> = ({ clientInfo, setClientInfo, onNext }) => {
  const [errors, setErrors] = useState<Partial<ClientInfo>>({});

  const handleCEPChange = async (cep: string) => {
    const formattedCEP = cep.replace(/\D/g, '');
    setClientInfo({ ...clientInfo, cep: formattedCEP });

    if (formattedCEP.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formattedCEP}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setClientInfo({
            ...clientInfo,
            cep: formattedCEP,
            address: data.logradouro,
            city: data.localidade,
            state: data.uf
          });
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const validateForm = () => {
    const newErrors: Partial<ClientInfo> = {};

    if (!clientInfo.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!clientInfo.surname.trim()) newErrors.surname = 'Sobrenome é obrigatório';
    if (!clientInfo.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp é obrigatório';
    if (!clientInfo.email.trim()) newErrors.email = 'Email é obrigatório';
    if (!clientInfo.eventName.trim()) newErrors.eventName = 'Nome do evento é obrigatório';
    if (!clientInfo.cep.trim()) newErrors.cep = 'CEP é obrigatório';
    if (!clientInfo.assemblyDate) newErrors.assemblyDate = 'Data de montagem é obrigatória';
    if (!clientInfo.eventDate) newErrors.eventDate = 'Data do evento é obrigatória';
    if (!clientInfo.disassemblyDate) newErrors.disassemblyDate = 'Data de desmontagem é obrigatória';
    if (!clientInfo.budgetDeadline) newErrors.budgetDeadline = 'Prazo para orçamento é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Informações do Cliente e Evento</h2>
        <p className="text-secondary/80">Preencha os dados para gerar seu orçamento personalizado</p>
      </div>

      {/* Dados do Cliente */}
      <div className="bg-gray-700/30 rounded-xl p-6 border border-accent/10">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <User className="h-5 w-5 mr-2 text-accent" />
          Dados do Responsável
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Nome *</label>
            <input
              type="text"
              value={clientInfo.name}
              onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800/50 border border-accent/20 rounded-lg text-white placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
              placeholder="Digite seu nome"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Sobrenome *</label>
            <input
              type="text"
              value={clientInfo.surname}
              onChange={(e) => setClientInfo({ ...clientInfo, surname: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800/50 border border-accent/20 rounded-lg text-white placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
              placeholder="Digite seu sobrenome"
            />
            {errors.surname && <p className="text-red-400 text-sm mt-1">{errors.surname}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">WhatsApp *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
              <input
                type="tel"
                value={clientInfo.whatsapp}
                onChange={(e) => setClientInfo({ ...clientInfo, whatsapp: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-accent/20 rounded-lg text-white placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                placeholder="(11) 99999-9999"
              />
            </div>
            {errors.whatsapp && <p className="text-red-400 text-sm mt-1">{errors.whatsapp}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Email *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
              <input
                type="email"
                value={clientInfo.email}
                onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-accent/20 rounded-lg text-white placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                placeholder="seu@email.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>
      </div>

      {/* Dados do Evento */}
      <div className="bg-gray-700/30 rounded-xl p-6 border border-accent/10">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-accent" />
          Informações do Evento
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Nome do Evento *</label>
            <input
              type="text"
              value={clientInfo.eventName}
              onChange={(e) => setClientInfo({ ...clientInfo, eventName: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800/50 border border-accent/20 rounded-lg text-white placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
              placeholder="Ex: Feira Nacional de Tecnologia 2024"
            />
            {errors.eventName && <p className="text-red-400 text-sm mt-1">{errors.eventName}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">CEP *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
                <input
                  type="text"
                  value={clientInfo.cep}
                  onChange={(e) => handleCEPChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-accent/20 rounded-lg text-white placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                  placeholder="00000-000"
                  maxLength={8}
                />
              </div>
              {errors.cep && <p className="text-red-400 text-sm mt-1">{errors.cep}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-secondary mb-2">Endereço</label>
              <input
                type="text"
                value={clientInfo.address}
                onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-accent/20 rounded-lg text-white placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                placeholder="Preenchido automaticamente pelo CEP"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Número *</label>
              <input
                type="text"
                value={clientInfo.number}
                onChange={(e) => setClientInfo({ ...clientInfo, number: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-accent/20 rounded-lg text-white placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                placeholder="123 ou S/N"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Cidade</label>
              <input
                type="text"
                value={clientInfo.city}
                className="w-full px-4 py-3 bg-gray-800/50 border border-accent/20 rounded-lg text-white placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Estado</label>
              <input
                type="text"
                value={clientInfo.state}
                className="w-full px-4 py-3 bg-gray-800/50 border border-accent/20 rounded-lg text-white placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cronograma */}
      <div className="bg-gray-700/30 rounded-xl p-6 border border-accent/10">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-accent" />
          Cronograma do Evento
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Data de Montagem *</label>
            <input
              type="date"
              value={clientInfo.assemblyDate}
              onChange={(e) => setClientInfo({ ...clientInfo, assemblyDate: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800/50 border border-accent/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
            />
            {errors.assemblyDate && <p className="text-red-400 text-sm mt-1">{errors.assemblyDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Data do Evento *</label>
            <input
              type="date"
              value={clientInfo.eventDate}
              onChange={(e) => setClientInfo({ ...clientInfo, eventDate: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800/50 border border-accent/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
            />
            {errors.eventDate && <p className="text-red-400 text-sm mt-1">{errors.eventDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Data de Desmontagem *</label>
            <input
              type="date"
              value={clientInfo.disassemblyDate}
              onChange={(e) => setClientInfo({ ...clientInfo, disassemblyDate: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800/50 border border-accent/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
            />
            {errors.disassemblyDate && <p className="text-red-400 text-sm mt-1">{errors.disassemblyDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Prazo para Orçamento *</label>
            <input
              type="date"
              value={clientInfo.budgetDeadline}
              onChange={(e) => setClientInfo({ ...clientInfo, budgetDeadline: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800/50 border border-accent/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
            />
            {errors.budgetDeadline && <p className="text-red-400 text-sm mt-1">{errors.budgetDeadline}</p>}
          </div>
        </div>
      </div>

      {/* Forma de Pagamento */}
      <div className="bg-gray-700/30 rounded-xl p-6 border border-accent/10">
        <h3 className="text-xl font-semibold text-white mb-6">Forma de Pagamento Preferida</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: 'pix', label: 'PIX' },
            { value: 'cartao-vista', label: 'Cartão à Vista' },
            { value: 'cartao-parcelado', label: 'Cartão Parcelado' },
            { value: 'boleto', label: 'Boleto' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="paymentMethod"
                value={option.value}
                checked={clientInfo.paymentMethod === option.value}
                onChange={(e) => setClientInfo({ ...clientInfo, paymentMethod: e.target.value })}
                className="w-4 h-4 text-accent border-2 border-accent/30 focus:ring-accent/50 focus:ring-2"
              />
              <span className="text-secondary group-hover:text-white transition-colors duration-200">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          Próximo: Selecionar Itens
        </button>
      </div>
    </form>
  );
};

export default ClientInfoForm;