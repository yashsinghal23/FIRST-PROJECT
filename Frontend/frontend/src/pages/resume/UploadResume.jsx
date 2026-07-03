import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import useResume from "../../hooks/useResume";

const UploadResume = () => {

  const navigate = useNavigate();

  const {
    uploadResume,
    loading,
  } = useResume();

  const [filename, setFilename] = useState("");

  const [jobDescription, setJobDescription] = useState("");

  const [selfDescription, setSelfDescription] = useState("");

  const [file, setFile] = useState(null);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!filename || !jobDescription || !selfDescription || !file) {

      return setError(
        "Please fill all fields and choose a PDF."
      );

    }

    try {

      const formData = new FormData();

      formData.append("filename", filename);

      formData.append("jobDescription", jobDescription);

      formData.append("selfDescription", selfDescription);

      formData.append("resume", file);

      const response =
        await uploadResume(formData);

      navigate(`/resume/${response.data._id}`);

    }

    catch (err) {

      setError(
        err.response?.data?.message ||
        "Upload Failed."
      );

    }

  };

  return (

    <Card className="max-w-2xl">

      <h1 className="mb-6 text-3xl font-bold">

        Upload Resume

      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>

          <label className="mb-2 block font-medium">

            Resume Title

          </label>

          <input
            type="text"
            className="w-full rounded-lg border p-3"
            value={filename}
            onChange={(e) =>
              setFilename(e.target.value)
            }
            placeholder="MERN Developer Resume"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">

            Job Description

          </label>

          <textarea
            className="w-full rounded-lg border p-3"
            rows={4}
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
            placeholder="Paste the job description you're targeting"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">

            About You

          </label>

          <textarea
            className="w-full rounded-lg border p-3"
            rows={4}
            value={selfDescription}
            onChange={(e) =>
              setSelfDescription(e.target.value)
            }
            placeholder="Briefly describe your background and goals"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">

            Upload PDF

          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

        </div>

        {error && (

          <p className="text-red-500">

            {error}

          </p>

        )}

        <Button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Uploading..."
            : "Analyze Resume"}

        </Button>

      </form>

      {loading && <Loader />}

    </Card>

  );

};

export default UploadResume;
