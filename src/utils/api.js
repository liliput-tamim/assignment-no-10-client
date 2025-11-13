const API_BASE_URL = 'http://localhost:4000';

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
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
  // Study Sessions
  getStudySessions: () => 
    apiRequest('/study-sessions'),
  
  getStudySession: (id) => 
    apiRequest(`/study-sessions/${id}`),
  
  createStudySession: (data) => 
    apiRequest('/study-sessions', { method: 'POST', body: JSON.stringify(data) }),
  
  updateStudySession: (id, data) => 
    apiRequest(`/study-sessions/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  
  deleteStudySession: (id) => 
    apiRequest(`/study-sessions/${id}`, { method: 'DELETE' }),

  // Bookings
  createBooking: (data) => 
    apiRequest('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  
  getUserBookings: (email) => 
    apiRequest(`/bookings/${email}`),
  
  getAllBookings: () => 
    apiRequest('/bookings'),
  
  cancelBooking: (id) => 
    apiRequest(`/bookings/${id}`, { method: 'DELETE' }),

  // Users
  createUser: (data) => 
    apiRequest('/users', { method: 'POST', body: JSON.stringify(data) }),
  
  getUser: (email) => 
    apiRequest(`/users/${email}`),
};