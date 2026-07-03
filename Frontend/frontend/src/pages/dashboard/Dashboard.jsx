import { useEffect } from "react";

import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import ResumeCard from "../../components/resume/ResumeCard";
import useAuth from "../../hooks/useAuth";
import useResume from "../../hooks/useResume";

const Dashboard = () => {
  const { user } = useAuth();

  const {
    history,
    loading,
    getResumeHistory,
  } = useResume();

  useEffect(() => {
    getResumeHistory();
  }, []);

  const totalResumes = history.length;

  const highestATS =
    history.length > 0
      ? Math.max(...history.map((r) => r.atsScore))
      : 0;

  const latestResume = history[0];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user?.fullname}
        </h1>

        <p className="text-gray-500">
          Here's your resume analysis overview.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">

        <Card>
          <h2 className="text-lg font-semibold">
            Total Resumes
          </h2>

          <p className="mt-3 text-4xl font-bold">
            {totalResumes}
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">
            Highest ATS Score
          </h2>

          <p className="mt-3 text-4xl font-bold text-green-600">
            {highestATS}
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">
            Latest Upload
          </h2>

          <p className="mt-3 text-lg">
            {latestResume
              ? latestResume.filename
              : "No Resume"}
          </p>
        </Card>

      </div>

      <div>

        <h2 className="mb-4 text-2xl font-semibold">
          Recent Resume
        </h2>

        {latestResume ? (
          <ResumeCard resume={latestResume} />
        ) : (
          <Card>

            <p>No Resume Uploaded Yet.</p>

          </Card>
        )}

      </div>

    </div>
  );
};

export default Dashboard;