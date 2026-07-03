import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setError("Please fill all fields.");
    }

    try {
      await login(formData);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed."
      );
    }
  };

  return (
    <Card>

      <h2 className="mb-6 text-center text-3xl font-bold">
        Login
      </h2>

      <form onSubmit={handleSubmit}>

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        {error && (
          <p className="mb-4 text-sm text-red-500">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

      </form>

      {loading && <Loader size="h-6 w-6" />}

      <p className="mt-6 text-center text-sm">

        Don't have an account?

        <Link
          to="/register"
          className="ml-2 text-blue-600 hover:underline"
        >
          Register
        </Link>

      </p>

    </Card>
  );
};

export default Login;