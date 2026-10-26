const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

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

  // Projects / Portfolio
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
  },

  // Products
  getProducts: async () => {
    const res = await fetch(`${API_BASE}/products`);
    return res.json();
  },

  getAllProductsAdmin: async () => {
    const res = await fetch(`${API_BASE}/products/admin/all`, {
      headers: getHeaders(true)
    });
    return res.json();
  },

  getProductById: async (id) => {
    const res = await fetch(`${API_BASE}/products/${id}`);
    return res.json();
  },

  createProduct: async (productData) => {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(productData)
    });
    return res.json();
  },

  updateProduct: async (id, productData) => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(productData)
    });
    return res.json();
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return res.json();
  },

  // Other Services
  getOtherServices: async () => {
    const res = await fetch(`${API_BASE}/other-services`);
    return res.json();
  },

  getAllOtherServicesAdmin: async () => {
    const res = await fetch(`${API_BASE}/other-services/admin/all`, {
      headers: getHeaders(true)
    });
    return res.json();
  },

  createOtherService: async (data) => {
    const res = await fetch(`${API_BASE}/other-services`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateOtherService: async (id, data) => {
    const res = await fetch(`${API_BASE}/other-services/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteOtherService: async (id) => {
    const res = await fetch(`${API_BASE}/other-services/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return res.json();
  },

  // Team
  getTeam: async () => {
    const res = await fetch(`${API_BASE}/team`);
    return res.json();
  },

  getAllTeamAdmin: async () => {
    const res = await fetch(`${API_BASE}/team/admin/all`, {
      headers: getHeaders(true)
    });
    return res.json();
  },

  createTeamMember: async (data) => {
    const res = await fetch(`${API_BASE}/team`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateTeamMember: async (id, data) => {
    const res = await fetch(`${API_BASE}/team/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteTeamMember: async (id) => {
    const res = await fetch(`${API_BASE}/team/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return res.json();
  },

  // Careers (Jobs & Perks)
  getCareers: async () => {
    const res = await fetch(`${API_BASE}/careers`);
    return res.json();
  },

  getAllCareersAdmin: async () => {
    const res = await fetch(`${API_BASE}/careers/admin/all`, {
      headers: getHeaders(true)
    });
    return res.json();
  },

  createJob: async (data) => {
    const res = await fetch(`${API_BASE}/careers`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateJob: async (id, data) => {
    const res = await fetch(`${API_BASE}/careers/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteJob: async (id) => {
    const res = await fetch(`${API_BASE}/careers/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return res.json();
  },

  getPerks: async () => {
    const res = await fetch(`${API_BASE}/careers/perks`);
    return res.json();
  },

  createPerk: async (data) => {
    const res = await fetch(`${API_BASE}/careers/perks`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updatePerk: async (id, data) => {
    const res = await fetch(`${API_BASE}/careers/perks/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deletePerk: async (id) => {
    const res = await fetch(`${API_BASE}/careers/perks/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return res.json();
  },

  // Programs
  getPrograms: async () => {
    const res = await fetch(`${API_BASE}/programs`);
    return res.json();
  },

  getProgramById: async (id) => {
    const res = await fetch(`${API_BASE}/programs/${id}`);
    return res.json();
  },

  createProgram: async (data) => {
    const res = await fetch(`${API_BASE}/programs`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateProgram: async (id, data) => {
    const res = await fetch(`${API_BASE}/programs/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteProgram: async (id) => {
    const res = await fetch(`${API_BASE}/programs/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return res.json();
  },

  // Page Content (Home, About, Legal, etc.)
  getPageContent: async (pageKey) => {
    const res = await fetch(`${API_BASE}/content/${pageKey}`);
    return res.json();
  },

  updatePageContent: async (pageKey, data) => {
    const res = await fetch(`${API_BASE}/content/${pageKey}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Industries
  getIndustries: async () => {
    const res = await fetch(`${API_BASE}/content/industries`);
    return res.json();
  },

  createIndustry: async (data) => {
    const res = await fetch(`${API_BASE}/content/industries`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateIndustry: async (id, data) => {
    const res = await fetch(`${API_BASE}/content/industries/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteIndustry: async (id) => {
    const res = await fetch(`${API_BASE}/content/industries/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return res.json();
  },

  // Process Steps
  getProcessSteps: async () => {
    const res = await fetch(`${API_BASE}/content/process`);
    return res.json();
  },

  updateProcessStep: async (id, data) => {
    const res = await fetch(`${API_BASE}/content/process/step/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Client Partner Logos
  getLogos: async () => {
    const res = await fetch(`${API_BASE}/logos`);
    return res.json();
  },

  getAllLogosAdmin: async () => {
    const res = await fetch(`${API_BASE}/logos/admin/all`, {
      headers: getHeaders(true)
    });
    return res.json();
  },

  createLogo: async (data) => {
    const res = await fetch(`${API_BASE}/logos`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateLogo: async (id, data) => {
    const res = await fetch(`${API_BASE}/logos/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteLogo: async (id) => {
    const res = await fetch(`${API_BASE}/logos/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return res.json();
  }
};
