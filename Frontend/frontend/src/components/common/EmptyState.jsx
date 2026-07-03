import Card from "./Card";

const EmptyState = ({
  title,
  description,
}) => {
  return (
    <Card className="text-center">

      <h2 className="text-2xl font-bold">

        {title}

      </h2>

      <p className="mt-3 text-gray-500">

        {description}

      </p>

    </Card>
  );
};

export default EmptyState;