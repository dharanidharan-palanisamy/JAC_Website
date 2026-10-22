const API_BASE = '/api';

const getHeaders = (includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (includeAuth) {
    const token = localStorage.getItem('jac_admin_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const api = {
  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders(true)
    });
    return res.json();
  },

  // Services
  getServices: async () => {
    const res = await fetch(`${API_BASE}/services`);
    return res.json();
  },

  getAllServicesAdmin: async () => {
    const res = await fetch(`${API_BASE}/services/admin/all`, {
      headers: getHeaders(true)
    });
    return res.json();
  },

  getServiceBySlug: async (slug) => {
    const res = await fetch(`${API_BASE}/services/${slug}`);
    return res.json();
  },

  createService: async (serviceData) => {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(serviceData)
    });
    return res.json();
  },

  updateService: async (id, serviceData) => {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(serviceData)
    });
    return res.json();
  },

  deleteService: async (id) => {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return res.json();
  },

  // Projects
  getProjects: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/projects${query ? `?${query}` : ''}`);
    return res.json();
  },

  getAllProjectsAdmin: async () => {
    const res = await fetch(`${API_BASE}/projects/admin/all`, {
      headers: getHeaders(true)
    });
    return res.json();
  },

  getProjectBySlug: async (slug) => {
    const res = await fetch(`${API_BASE}/projects/${slug}`);
    return res.json();
  },

  createProject: async (projectData) => {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(projectData)
    });
    return res.json();
  },

  updateProject: async (id, projectData) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(projectData)
    });
    return res.json();
  },

  deleteProject: async (id) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return res.json();
  },

  // Contact / Enquiries
  submitEnquiry: async (enquiryData) => {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(enquiryData)
    });
    return res.json();
  },

  getEnquiries: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/enquiries${query ? `?${query}` : ''}`, {
      headers: getHeaders(true)
    });
    return res.json();
  },

  updateEnquiryStatus: async (id, data) => {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
      method: 'PATCH',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteEnquiry: async (id) => {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return res.json();
  },

  // Settings
  getSettings: async () => {
    const res = await fetch(`${API_BASE}/settings`);
    return res.json();
  },

  updateSettings: async (settingsData) => {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(settingsData)
    });
    return res.json();
  },

  // FAQs
  getFAQs: async () => {
    const res = await fetch(`${API_BASE}/faqs`);
    return res.json();
  },

  getAllFAQsAdmin: async () => {
    const res = await fetch(`${API_BASE}/faqs/admin/all`, {
      headers: getHeaders(true)
    });
    return res.json();
  },

  createFAQ: async (faqData) => {
    const res = await fetch(`${API_BASE}/faqs`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(faqData)
    });
    return res.json();
  },

  updateFAQ: async (id, faqData) => {
    const res = await fetch(`${API_BASE}/faqs/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(faqData)
    });
    return res.json();
  },

  deleteFAQ: async (id) => {
    const res = await fetch(`${API_BASE}/faqs/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return res.json();
  },

  // Stats
  getDashboardStats: async () => {
    const res = await fetch(`${API_BASE}/stats`, {
      headers: getHeaders(true)
    });
    return res.json();
  }
};
