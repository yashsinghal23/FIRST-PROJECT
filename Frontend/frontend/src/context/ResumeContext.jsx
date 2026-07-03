import { createContext, useState } from "react";

import {
  uploadResume as uploadResumeApi,
  getResumeHistory as getResumeHistoryApi,
  getResumeById as getResumeByIdApi,
  deleteResume as deleteResumeApi,
} from "../api/resumeApi.js";

const ResumeContext = createContext();

const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState(null);

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);

  // Upload Resume

  const uploadResume = async (formData) => {
    try {
      setLoading(true);

      const response = await uploadResumeApi(formData);

      return response;
    } finally {
      setLoading(false);
    }
  };

  // Get Resume History

  const getResumeHistory = async () => {
    try {
      setLoading(true);

      const response = await getResumeHistoryApi();

      setHistory(response.resumes);

      return response;
    } finally {
      setLoading(false);
    }
  };

  // Get Single Resume

  const getResumeById = async (id) => {
    try {
      setLoading(true);

      const response = await getResumeByIdApi(id);

      setResume(response.data);

      return response;
    } finally {
      setLoading(false);
    }
  };

  // Delete Resume

  const removeResume = async (id) => {
    try {
      setLoading(true);

      const response = await deleteResumeApi(id);

      setHistory((prev) =>
        prev.filter((item) => item._id !== id)
      );

      return response;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        history,
        loading,

        uploadResume,
        getResumeHistory,
        getResumeById,
        removeResume,

        setResume,
        setHistory,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeProvider;
export {ResumeContext}