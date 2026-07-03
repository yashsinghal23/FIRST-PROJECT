import api from "./axios.js";

// Upload Resume
export const uploadResume = async (formData) => {
  const response = await api.post(
    "/resume/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Resume History
export const getResumeHistory = async () => {
  const response = await api.get("/resume/history");
  return response.data;
};

// Single Resume
export const getResumeById = async (id) => {
  const response = await api.get(`/resume/${id}`);
  return response.data;
};

// Delete Resume
export const deleteResume = async (id) => {
  const response = await api.delete(`/resume/${id}`);
  return response.data;
};