// src/services/api.js
const API_URL = 'http://localhost:3001/api';

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    credentials: 'include', // Para enviar cookies
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    // Se receber 401 (Unauthorized), limpa o token e redireciona para o login
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return;
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Erro na requisição');
    }

    // Se a resposta for 204 (No Content), retorna null
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

// Serviço de Autenticação
export const authService = {
  async login(email, senha) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: { email, senha },
    });

    if (data.token) {
      localStorage.setItem('token', data.token);
      if (data.usuario) {
        localStorage.setItem('user', JSON.stringify(data.usuario));
      }
    }

    return data;
  },

  async getProfile() {
    return await apiRequest('/auth/me');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
};

// Serviço de Veículos
export const veiculosService = {
  async getAll() {
    return await apiRequest('/veiculos');
  },

  async getById(id) {
    return await apiRequest(`/veiculos/${id}`);
  },

  async create(veiculoData) {
    return await apiRequest('/veiculos', {
      method: 'POST',
      body: veiculoData,
    });
  },

  async update(id, veiculoData) {
    return await apiRequest(`/veiculos/${id}`, {
      method: 'PUT',
      body: veiculoData,
    });
  },

  async delete(id) {
    return await apiRequest(`/veiculos/${id}`, {
      method: 'DELETE',
    });
  },

  async updateKm(id, kmAtual) {
    return await apiRequest(`/veiculos/${id}/km`, {
      method: 'PATCH',
      body: { kmAtual },
    });
  },

  async getByStatus(status) {
    return await apiRequest(`/veiculos/status/${status}`);
  },

  async getEstatisticas() {
    return await apiRequest('/veiculos/estatisticas');
  }
};


// Add this after the other service exports in api.js
export const usuariosService = {
  async getAll() {
    return apiRequest('/usuarios');
  },

  async getById(id) {
    return apiRequest(`/usuarios/${id}`);
  },

  async create(usuarioData) {
    return apiRequest('/usuarios', {
      method: 'POST',
      body: usuarioData
    });
  },

  async update(id, usuarioData) {
    return apiRequest(`/usuarios/${id}`, {
      method: 'PUT',
      body: usuarioData
    });
  },

  async delete(id) {
    return apiRequest(`/usuarios/${id}`, {
      method: 'DELETE'
    });
  },

  async updateStatus(id, status) {
    return apiRequest(`/usuarios/${id}/status`, {
      method: 'PATCH',
      body: { status }
    });
  }
};

// Adicione este método ao objeto portaria no arquivo api.js
export const portaria = {
  create: async (data) => {
    const response = await apiRequest('/portarias', {
      method: 'POST',
      body: data
    });
    return response;
  },

  // Adicione este novo método
  getUltimoRegistro: async (veiculoId) => {
    try {
      const response = await apiRequest(`/portaria/veiculos/${veiculoId}/ultimo-registro`);
      return response;
    } catch (error) {
      // Se for 404, não há registros anteriores (fluxo normal)
      if (error.response?.status === 404) {
        return { ultimoKm: null };
      }
      throw error;
    }
  }
};

// Exporta a função de requisição caso precise ser usada diretamente
export default apiRequest;