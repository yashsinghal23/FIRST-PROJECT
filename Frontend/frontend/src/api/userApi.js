import api from "./axios.js";

// Get Current User
export const getCurrentUser = async () => {
  const response = await api.get("/user/me");
  return response.data;
};

// Update Profile
export const updateProfile = async (userData) => {
  const response = await api.patch("/user/updateProfile", userData);
  return response.data;
};

// Change Password
export const changePassword = async (passwordData) => {
  const response = await api.patch(
    "/user/changePassword",
    passwordData
  );
  return response.data;
};