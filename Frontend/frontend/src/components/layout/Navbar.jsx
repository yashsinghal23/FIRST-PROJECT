import useAuth from "../../hooks/useAuth";

const Navbar = () => {

  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">

      <h2 className="text-2xl font-semibold">

        AI Resume Analyzer

      </h2>

      <div>

        <p className="font-medium">

          Welcome,

          {" "}

          {user?.fullname || "User"}

        </p>

      </div>

    </header>
  );
};

export default Navbar;