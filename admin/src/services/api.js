import { showToast } from '../context/ToastContext';

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

const handleMutation = async (promise, successMsg, successTitle = 'Saved Successfully!') => {
  try {
    const res = await promise;
    const data = await res.json();
    if (data && data.success) {
      showToast(successMsg, successTitle, 'success');
    } else {
      showToast(data?.message || 'Action could not be completed.', 'Action Failed', 'error');
    }
    return data;
  } catch (err) {
    showToast('Failed to connect to server. Please try again.', 'Network Error', 'error');
    throw err;
  }
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
    return handleMutation(
      fetch(`${API_BASE}/services`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(serviceData)
      }),
      'Core service created and published to website!',
      'Service Created'
    );
  },

  updateService: async (id, serviceData) => {
    return handleMutation(
      fetch(`${API_BASE}/services/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(serviceData)
      }),
      'Core service updated and saved live!',
      'Service Saved'
    );
  },

  deleteService: async (id) => {
    return handleMutation(
      fetch(`${API_BASE}/services/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }),
      'Core service removed successfully.',
      'Service Deleted'
    );
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
    return handleMutation(
      fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(projectData)
      }),
      'Portfolio project created and published to website!',
      'Project Created'
    );
  },

  updateProject: async (id, projectData) => {
    return handleMutation(
      fetch(`${API_BASE}/projects/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(projectData)
      }),
      'Portfolio project updated and saved live!',
      'Project Saved'
    );
  },

  deleteProject: async (id) => {
    return handleMutation(
      fetch(`${API_BASE}/projects/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }),
      'Portfolio project removed successfully.',
      'Project Deleted'
    );
  },

  // Contact / Enquiries
  submitEnquiry: async (enquiryData) => {
    return handleMutation(
      fetch(`${API_BASE}/enquiries`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(enquiryData)
      }),
      'Your inquiry has been submitted! Our team will contact you shortly.',
      'Inquiry Submitted'
    );
  },

  getEnquiries: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/enquiries${query ? `?${query}` : ''}`, {
      headers: getHeaders(true)
    });
    return res.json();
  },

  updateEnquiryStatus: async (id, data) => {
    return handleMutation(
      fetch(`${API_BASE}/enquiries/${id}`, {
        method: 'PATCH',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Client enquiry notes and status updated successfully!',
      'Enquiry Updated'
    );
  },

  deleteEnquiry: async (id) => {
    return handleMutation(
      fetch(`${API_BASE}/enquiries/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }),
      'Client enquiry record removed successfully.',
      'Enquiry Deleted'
    );
  },

  // Settings
  getSettings: async () => {
    const res = await fetch(`${API_BASE}/settings`);
    return res.json();
  },

  updateSettings: async (settingsData) => {
    return handleMutation(
      fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(settingsData)
      }),
      'Website configuration saved and live across the website!',
      'Settings Saved'
    );
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
    return handleMutation(
      fetch(`${API_BASE}/faqs`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(faqData)
      }),
      'FAQ question created and published!',
      'FAQ Created'
    );
  },

  updateFAQ: async (id, faqData) => {
    return handleMutation(
      fetch(`${API_BASE}/faqs/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(faqData)
      }),
      'FAQ question updated and saved live!',
      'FAQ Saved'
    );
  },

  deleteFAQ: async (id) => {
    return handleMutation(
      fetch(`${API_BASE}/faqs/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }),
      'FAQ item removed successfully.',
      'FAQ Deleted'
    );
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
    return handleMutation(
      fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(productData)
      }),
      'Product created and published to product catalog!',
      'Product Created'
    );
  },

  updateProduct: async (id, productData) => {
    return handleMutation(
      fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(productData)
      }),
      'Product updated and saved live!',
      'Product Saved'
    );
  },

  deleteProduct: async (id) => {
    return handleMutation(
      fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }),
      'Product removed successfully from catalog.',
      'Product Deleted'
    );
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
    return handleMutation(
      fetch(`${API_BASE}/other-services`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Enterprise service created and published!',
      'Service Created'
    );
  },

  updateOtherService: async (id, data) => {
    return handleMutation(
      fetch(`${API_BASE}/other-services/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Enterprise service updated and saved live!',
      'Service Saved'
    );
  },

  deleteOtherService: async (id) => {
    return handleMutation(
      fetch(`${API_BASE}/other-services/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }),
      'Enterprise service removed successfully.',
      'Service Deleted'
    );
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
    return handleMutation(
      fetch(`${API_BASE}/team`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Team member added to company roster!',
      'Team Member Created'
    );
  },

  updateTeamMember: async (id, data) => {
    return handleMutation(
      fetch(`${API_BASE}/team/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Team member profile saved live!',
      'Profile Updated'
    );
  },

  deleteTeamMember: async (id) => {
    return handleMutation(
      fetch(`${API_BASE}/team/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }),
      'Team member removed successfully.',
      'Member Deleted'
    );
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
    return handleMutation(
      fetch(`${API_BASE}/careers`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Job opening created and published to Careers page!',
      'Job Opening Created'
    );
  },

  updateJob: async (id, data) => {
    return handleMutation(
      fetch(`${API_BASE}/careers/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Job opening updated and saved live!',
      'Job Opening Saved'
    );
  },

  deleteJob: async (id) => {
    return handleMutation(
      fetch(`${API_BASE}/careers/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }),
      'Job opening removed successfully.',
      'Job Deleted'
    );
  },

  getPerks: async () => {
    const res = await fetch(`${API_BASE}/careers/perks`);
    return res.json();
  },

  createPerk: async (data) => {
    return handleMutation(
      fetch(`${API_BASE}/careers/perks`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Company perk created and published!',
      'Perk Created'
    );
  },

  updatePerk: async (id, data) => {
    return handleMutation(
      fetch(`${API_BASE}/careers/perks/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Company perk updated and saved live!',
      'Perk Saved'
    );
  },

  deletePerk: async (id) => {
    return handleMutation(
      fetch(`${API_BASE}/careers/perks/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }),
      'Company perk removed successfully.',
      'Perk Deleted'
    );
  },

  // Career Applications
  getApplicationsAdmin: async () => {
    const res = await fetch(`${API_BASE}/careers/applications/admin`, {
      headers: getHeaders(true)
    });
    return res.json();
  },

  updateApplicationStatus: async (id, status) => {
    return handleMutation(
      fetch(`${API_BASE}/careers/applications/${id}/status`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify({ status })
      }),
      'Candidate application status updated successfully!',
      'Status Saved'
    );
  },

  deleteApplication: async (id) => {
    return handleMutation(
      fetch(`${API_BASE}/careers/applications/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }),
      'Application record removed successfully.',
      'Application Deleted'
    );
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
    return handleMutation(
      fetch(`${API_BASE}/programs`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Program created and published to live catalog!',
      'Program Created'
    );
  },

  updateProgram: async (id, data) => {
    return handleMutation(
      fetch(`${API_BASE}/programs/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Program details updated and saved live!',
      'Program Saved'
    );
  },

  deleteProgram: async (id) => {
    return handleMutation(
      fetch(`${API_BASE}/programs/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }),
      'Program removed successfully.',
      'Program Deleted'
    );
  },

  // Page Content (Home, About, Legal, etc.)
  getPageContent: async (pageKey) => {
    const res = await fetch(`${API_BASE}/content/${pageKey}`);
    return res.json();
  },

  updatePageContent: async (pageKey, data) => {
    return handleMutation(
      fetch(`${API_BASE}/content/${pageKey}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Page content updated and published live across website!',
      'Content Published'
    );
  },

  // Industries
  getIndustries: async () => {
    const res = await fetch(`${API_BASE}/content/industries`);
    return res.json();
  },

  createIndustry: async (data) => {
    return handleMutation(
      fetch(`${API_BASE}/content/industries`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Industry focus segment created and published!',
      'Industry Created'
    );
  },

  updateIndustry: async (id, data) => {
    return handleMutation(
      fetch(`${API_BASE}/content/industries/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Industry focus segment updated and saved live!',
      'Industry Saved'
    );
  },

  deleteIndustry: async (id) => {
    return handleMutation(
      fetch(`${API_BASE}/content/industries/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }),
      'Industry focus segment removed successfully.',
      'Industry Deleted'
    );
  },

  // Process Steps
  getProcessSteps: async () => {
    const res = await fetch(`${API_BASE}/content/process`);
    return res.json();
  },

  createProcessStep: async (data) => {
    return handleMutation(
      fetch(`${API_BASE}/content/process/step`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'New delivery phase step created and published live!',
      'Process Step Created'
    );
  },

  updateProcessStep: async (id, data) => {
    return handleMutation(
      fetch(`${API_BASE}/content/process/step/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Process methodology step updated and saved live!',
      'Process Saved'
    );
  },

  deleteProcessStep: async (id) => {
    return handleMutation(
      fetch(`${API_BASE}/content/process/step/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }),
      'Process methodology step removed successfully.',
      'Process Step Deleted'
    );
  },

  // Engineering Standards
  createEngineeringStandard: async (data) => {
    return handleMutation(
      fetch(`${API_BASE}/content/process/standard`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'New engineering code standard created and saved live!',
      'Standard Created'
    );
  },

  updateEngineeringStandard: async (id, data) => {
    return handleMutation(
      fetch(`${API_BASE}/content/process/standard/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Engineering standard updated and saved live!',
      'Standard Saved'
    );
  },

  deleteEngineeringStandard: async (id) => {
    return handleMutation(
      fetch(`${API_BASE}/content/process/standard/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }),
      'Engineering standard removed successfully.',
      'Standard Deleted'
    );
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
    return handleMutation(
      fetch(`${API_BASE}/logos`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Partner logo added to showcase!',
      'Logo Added'
    );
  },

  updateLogo: async (id, data) => {
    return handleMutation(
      fetch(`${API_BASE}/logos/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(data)
      }),
      'Partner logo updated and saved live!',
      'Logo Saved'
    );
  },

  deleteLogo: async (id) => {
    return handleMutation(
      fetch(`${API_BASE}/logos/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }),
      'Partner logo removed successfully.',
      'Logo Deleted'
    );
  }
};
