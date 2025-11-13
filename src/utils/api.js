const API_BASE_URL = 'http://localhost:4000';

// Get auth token from Firebase
const getAuthToken = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    return user.accessToken;
  }
  return null;
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = await getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }
  
  return response.json();
};

// API functions
export const api = {
  // Partners
  getPartners: (search = '', sort = '') => 
    apiRequest(`/partners?search=${search}&sort=${sort}`),
  
  getPartner: (id) => 
    apiRequest(`/partners/${id}`),
  
  getTopPartners: () => 
    apiRequest('/partners/top-rated'),
  
  createPartner: (data) => 
    apiRequest('/partners', { method: 'POST', body: JSON.stringify(data) }),
  
  updatePartner: (id, data) => 
    apiRequest(`/partners/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  
  deletePartner: (id) => 
    apiRequest(`/partners/${id}`, { method: 'DELETE' }),

  // Requests
  sendRequest: (data) => 
    apiRequest('/requests', { method: 'POST', body: JSON.stringify(data) }),
  
  getMyRequests: (email) => 
    apiRequest(`/requests/${email}`),
  
  updateRequest: (id, data) => 
    apiRequest(`/requests/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  
  deleteRequest: (id) => 
    apiRequest(`/requests/${id}`, { method: 'DELETE' }),

  // Profile
  getProfile: (email) => 
    apiRequest(`/profile/${email}`),
  
  verifyAuth: () => 
    apiRequest('/auth/verify', { method: 'POST' }),
};