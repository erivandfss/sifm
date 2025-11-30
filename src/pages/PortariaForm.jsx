import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api';
import AssinaturaDigital from '../components/assinatura/AssinaturaDigital';

const PortariaForm = () => {
  const [formData, setFormData] = useState({
    motoristaId: '',
    veiculoId: '',
    kmAtual: '',
    observacoes: '',
    assinatura: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [veiculos, setVeiculos] = useState([]);
  const [motoristas, setMotoristas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingKm, setLoadingKm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [veiculosRes, motoristasRes] = await Promise.all([
          api.veiculos.list(),
          api.motoristas.list()
        ]);
        setVeiculos(veiculosRes.data);
        setMotoristas(motoristasRes.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error('Erro ao carregar veículos e motoristas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVeiculoChange = async (e) => {
    const veiculoId = e.target.value;
    
    setFormData(prev => ({
      ...prev,
      veiculoId,
      kmAtual: ''
    }));

    if (!veiculoId) return;
    
    setLoadingKm(true);
    try {
      const { ultimoKm, dataUltimoRegistro, tipo } = await api.portaria.getUltimoRegistro(veiculoId);
      
      if (ultimoKm) {
        const dataFormatada = new Date(dataUltimoRegistro).toLocaleString('pt-BR');
        const tipoFormatado = tipo === 'saida' ? 'saída' : 'retorno';
        
        setFormData(prev => ({
          ...prev,
          kmAtual: ultimoKm.toString(),
          observacoes: `Último KM registrado: ${ultimoKm} (${dataFormatada}, ${tipoFormatado})\n${prev.observacoes || ''}` 
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar último KM:', error);
      toast.error('Não foi possível carregar o último registro de KM');
    } finally {
      setLoadingKm(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAssinatura = (assinatura) => {
    setFormData(prev => ({
      ...prev,
      assinatura
    }));
  };

  const validateForm = () => {
    if (!formData.motoristaId) {
      toast.error('Selecione um motorista');
      return false;
    }
    if (!formData.veiculoId) {
      toast.error('Selecione um veículo');
      return false;
    }
    if (!formData.kmAtual) {
      toast.error('Informe o KM atual');
      return false;
    }
    if (!formData.assinatura) {
      toast.error('A assinatura é obrigatória');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await api.portaria.create({
        ...formData,
        motoristaId: Number(formData.motoristaId),
        veiculoId: Number(formData.veiculoId),
        kmAtual: Number(formData.kmAtual)
      });
      
      toast.success('Portaria registrada com sucesso!');
      navigate('/portaria');
    } catch (error) {
      console.error('Erro ao salvar portaria:', error);
      const errorMessage = error.response?.data?.error || 'Erro ao salvar portaria. Tente novamente.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="h5 mb-0">Registrar Portaria</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="motoristaId" className="form-label">Motorista</label>
                <select
                  id="motoristaId"
                  className="form-select"
                  name="motoristaId"
                  value={formData.motoristaId}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Selecione um motorista</option>
                  {motoristas.map(motorista => (
                    <option key={motorista.id} value={motorista.id}>
                      {motorista.nome} - {motorista.cnh}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="veiculoId" className="form-label">Veículo</label>
                <select
                  id="veiculoId"
                  className="form-select"
                  name="veiculoId"
                  value={formData.veiculoId}
                  onChange={handleVeiculoChange}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Selecione um veículo</option>
                  {veiculos.map(veiculo => (
                    <option key={veiculo.id} value={veiculo.id}>
                      {veiculo.placa} - {veiculo.modelo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="kmAtual" className="form-label">KM Atual</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="kmAtual"
                  name="kmAtual"
                  value={formData.kmAtual}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.1"
                  disabled={isSubmitting || loadingKm}
                />
                {loadingKm && (
                  <span className="input-group-text">
                    <div className="spinner-border spinner-border-sm text-primary" role="status">
                      <span className="visually-hidden">Carregando...</span>
                    </div>
                  </span>
                )}
              </div>
              {loadingKm && <small className="text-muted">Buscando último registro de KM...</small>}
            </div>

            <div className="mb-4">
              <label className="form-label">Observações</label>
              <textarea
                className="form-control"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                rows="3"
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Assinatura do Motorista</label>
              <AssinaturaDigital 
                onSave={handleAssinatura}
                disabled={isSubmitting}
              />
            </div>

            <div className="d-flex justify-content-between">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
              >
                <i className="bi bi-arrow-left me-2"></i>Voltar
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting || !formData.assinatura}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Salvando...
                  </>
                ) : (
                  <><i className="bi bi-check-circle me-2"></i>Salvar Portaria</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PortariaForm;