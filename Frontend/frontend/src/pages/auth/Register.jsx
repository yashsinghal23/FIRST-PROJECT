import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import useAuth from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();

  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
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

    const {
      username,
      fullname,
      email,
      password,
    } = formData;

    if (
      !username ||
      !fullname ||
      !email ||
      !password
    ) {
      return setError("Please fill all fields.");
    }

    try {
      await register(formData);

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed."
      );
    }
  };

  return (
    <Card>

      <h2 className="mb-6 text-center text-3xl font-bold">
        Register
      </h2>

      <form onSubmit={handleSubmit}>

        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Choose a username"
          required
        />

        <Input
          label="Full Name"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />

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
          placeholder="Create a password"
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
          {loading ? "Creating Account..." : "Register"}
        </Button>

      </form>

      {loading && <Loader size="h-6 w-6" />}

      <p className="mt-6 text-center text-sm">

        Already have an account?

        <Link
          to="/login"
          className="ml-2 text-blue-600 hover:underline"
        >
          Login
        </Link>

      </p>

    </Card>
  );
};

export default Register;