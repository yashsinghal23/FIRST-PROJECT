const Loader = ({
  size = "h-10 w-10",
}) => {
  return (
    <div className="flex items-center justify-center py-6">

      <div
        className={`
          ${size}
          animate-spin
          rounded-full
          border-4
          border-blue-600
          border-t-transparent
        `}
      />

    </div>
  );
};

export default Loader;