import { useEffect } from "react";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import ResumeCard from "../../components/resume/ResumeCard";
import useResume from "../../hooks/useResume";

const ResumeHistory = () => {

  const {
    history,
    loading,
    getResumeHistory,
  } = useResume();

  useEffect(() => {
    getResumeHistory();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Resume History
      </h1>

      {history.length === 0 ? (

        <EmptyState
          title="No Resumes Yet"
          description="Upload a resume to see it show up here."
        />

      ) : (

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {history.map((resume) => (
            <ResumeCard key={resume._id} resume={resume} />
          ))}

        </div>

      )}

    </div>
  );

};

export default ResumeHistory;
