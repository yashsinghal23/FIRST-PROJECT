import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md">

      <div className="p-6">

        <h1 className="text-2xl font-bold text-blue-600">

          ResumeAI

        </h1>

      </div>

      <nav className="flex flex-col gap-2 p-4">

        <NavLink
          to="/dashboard"
          className="rounded-lg p-3 hover:bg-blue-100"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/resume/upload"
          className="rounded-lg p-3 hover:bg-blue-100"
        >
          Upload Resume
        </NavLink>

        <NavLink
          to="/resume/history"
          className="rounded-lg p-3 hover:bg-blue-100"
        >
          Resume History
        </NavLink>

        <NavLink
          to="/profile"
          className="rounded-lg p-3 hover:bg-blue-100"
        >
          Profile
        </NavLink>

      </nav>

    </aside>
  );
};

export default Sidebar;