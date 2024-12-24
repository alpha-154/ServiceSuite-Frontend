import axios from "axios";

// Creating an Axios instance for API requests
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Base URL from environment variables
  timeout: 120000, // Request timeout
});

// Adding a request interceptor to include the token in headers
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      // Attach the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle errors before the request is sent
    return Promise.reject(error);
  }
);

// Define API functions
const registerUser = (registrationData) => {
  return apiClient.post("/api/user/register", registrationData);
};

const generateToken = (loginData) => {
  return apiClient.post("/api/user/generate-token", loginData);
};

const registerUserWithGoogle = (registrationData) => {
  return apiClient.post("/api/user/register-with-google", registrationData);
};

const fetchUserProfile = () => {
  return apiClient.get("/api/user/profile");
};

const searchServices = ({query}) => {
  return apiClient.post("/api/service/search-services", {
    query: query
});
}
  
const fetchAllServices = () => {
  return apiClient.get("/api/service/get-all-services");
};

const fetchServiceById = (serviceId) => {
  return apiClient.get(`/api/service/get-service/${serviceId}`)
}

const addService = (serviceData) => {
  return apiClient.post("/api/service/create-service", serviceData);
}

const fetchAddedServices = (uid) => {
  return apiClient.get(`/api/service/get-added-services/${uid}`);
};

const deleteAddedService = ({uid, serviceId}) => {
  return apiClient.delete("api/service/delete-service",{
    data: {
      uid,
      serviceId
    }
  })
}

const updateAddedService = (serviceData) => {
  return apiClient.patch("/api/service/update-service", serviceData);
}

const bookService = (bookedServiceData) => {
  return apiClient.post("/api/service/book-service", bookedServiceData);
}

const fetchBookedServices = (uid) => {
  return apiClient.get(`/api/service/get-booked-services/${uid}`);
}

const fetchTodoServices = (uid) => {
  return apiClient.get(`/api/service/get-todo-services/${uid}`);
}

const updateToDoServiceStatus = (todoServiceData) => {
  return apiClient.patch("/api/service//update-todo-service", todoServiceData);
}

export {
  registerUser,
  generateToken,
  registerUserWithGoogle,
  fetchUserProfile,
  searchServices,
  fetchAllServices,
  fetchServiceById,
  addService,
  fetchAddedServices,
  deleteAddedService,
  updateAddedService,
  bookService,
  fetchBookedServices,
  fetchTodoServices,
  updateToDoServiceStatus 
};
