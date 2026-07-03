import { useEffect } from "react";
import { useParams } from "react-router-dom";

import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import ScoreCard from "../../components/resume/ScoreCard";

import useResume from "../../hooks/useResume";

const difficultyColor = {
  Easy: "text-green-600",
  Medium: "text-yellow-600",
  Hard: "text-red-600",
};

const ResumeDetails = () => {

  const { id } = useParams();

  const {
    resume,
    loading,
    getResumeById,
  } = useResume();

  useEffect(() => {
    getResumeById(id);
  }, [id]);

  if (loading) return <Loader />;

  if (!resume) return <p>Resume Not Found</p>;

  return (
    <div className="space-y-6">

      <div className="flex flex-wrap items-center justify-between gap-6">

        <div>

          <h1 className="text-3xl font-bold">
            {resume.filename}
          </h1>

          <p className="mt-2 text-gray-500">
            AI Resume Report
          </p>

        </div>

        <ScoreCard score={resume.atsScore} />

      </div>

      <Card>

        <h2 className="mb-3 text-xl font-semibold">
          Skills Gap
        </h2>

        <ul className="list-disc space-y-2 pl-5">

          {resume.skillsGap?.map((item, idx) => (

            <li key={idx}>
              <span className="font-medium">{item.skill}</span>
              {item.reason && (
                <span className="text-gray-500"> — {item.reason}</span>
              )}
            </li>

          ))}

          {(!resume.skillsGap || resume.skillsGap.length === 0) && (
            <p className="text-gray-500">No skill gaps identified.</p>
          )}

        </ul>

      </Card>

      <Card>

        <h2 className="mb-3 text-xl font-semibold">
          Technical Questions
        </h2>

        <div className="space-y-4">

          {resume.technicalQuestions?.map((q, idx) => (

            <div key={idx} className="border-b pb-3 last:border-b-0">

              <p className="font-medium">
                {q.question}
                {q.difficulty && (
                  <span className={`ml-2 text-sm ${difficultyColor[q.difficulty] || "text-gray-500"}`}>
                    ({q.difficulty})
                  </span>
                )}
              </p>

              {q.intention && (
                <p className="mt-1 text-sm text-gray-500">Why it's asked: {q.intention}</p>
              )}

              {q.answer && (
                <p className="mt-1 text-sm">Suggested answer: {q.answer}</p>
              )}

            </div>

          ))}

        </div>

      </Card>

      <Card>

        <h2 className="mb-3 text-xl font-semibold">
          Behavioral Questions
        </h2>

        <div className="space-y-4">

          {resume.behavioralQuestions?.map((q, idx) => (

            <div key={idx} className="border-b pb-3 last:border-b-0">

              <p className="font-medium">{q.question}</p>

              {q.intention && (
                <p className="mt-1 text-sm text-gray-500">Why it's asked: {q.intention}</p>
              )}

              {q.answer && (
                <p className="mt-1 text-sm">Suggested answer: {q.answer}</p>
              )}

            </div>

          ))}

        </div>

      </Card>

      <Card>

        <h2 className="mb-3 text-xl font-semibold">
          Preparation Plan
        </h2>

        <div className="space-y-4">

          {resume.preparationPlan?.map((plan, idx) => (

            <div key={idx} className="border-b pb-3 last:border-b-0">

              <p className="font-medium">
                Day {plan.day}: {plan.topic}
              </p>

              {plan.description && (
                <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
              )}

              {plan.resources?.length > 0 && (
                <ul className="mt-1 list-disc pl-5 text-sm text-blue-600">
                  {plan.resources.map((res, rIdx) => (
                    <li key={rIdx}>{res}</li>
                  ))}
                </ul>
              )}

            </div>

          ))}

        </div>

      </Card>

    </div>
  );
};

export default ResumeDetails;
