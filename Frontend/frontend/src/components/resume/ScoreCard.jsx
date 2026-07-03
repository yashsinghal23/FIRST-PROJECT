import Card from "../common/Card";

const ScoreCard = ({ score }) => {
  return (
    <Card className="flex h-44 w-44 items-center justify-center">

      <div className="flex h-32 w-32 items-center justify-center rounded-full border-8 border-green-500">

        <div className="text-center">

          <h1 className="text-4xl font-bold">

            {score}

          </h1>

          <p className="text-gray-500">

            ATS

          </p>

        </div>

      </div>

    </Card>
  );
};

export default ScoreCard;