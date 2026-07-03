import Card from "../common/Card";
import { Link } from "react-router-dom";

const ResumeCard = ({ resume }) => {
  return (
    <Card>

      <h2 className="text-lg font-semibold">

        {resume.filename}

      </h2>

      <p className="mt-2 text-gray-500">

        ATS Score : {resume.atsScore}

      </p>

      <p className="mt-2 text-sm text-gray-400">

        {new Date(resume.createdAt).toLocaleDateString()}

      </p>

      <Link
        to={`/resume/${resume._id}`}
        className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        View Report
      </Link>

    </Card>
  );
};

export default ResumeCard;