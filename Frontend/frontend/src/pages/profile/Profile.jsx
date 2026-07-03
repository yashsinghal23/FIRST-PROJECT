import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import useAuth from "../../hooks/useAuth";
import {
  updateProfile,
  changePassword,
} from "../../api/userApi";

const Profile = () => {

  const navigate = useNavigate();

  const {
    user,
    logout,
    getMe,
  } = useAuth();

  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    fullname: user?.fullname || "",
    email: user?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleProfileChange = (e) => {

    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });

  };

  const handlePasswordChange = (e) => {

    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });

  };

  const updateUserProfile = async (e) => {

    e.preventDefault();

    await updateProfile(profileData);

    await getMe();

    alert("Profile Updated");

  };

  const updateUserPassword = async (e) => {

    e.preventDefault();

    await changePassword(passwordData);

    alert("Password Changed");

    setPasswordData({
      oldPassword: "",
      newPassword: "",
    });

  };

  const handleLogout = async () => {

    await logout();

    navigate("/login");

  };

  return (

    <div className="space-y-6">

      <Card>

        <h1 className="mb-6 text-3xl font-bold">
          Profile
        </h1>

        <form
          onSubmit={updateUserProfile}
          className="space-y-4"
        >

          <Input
            label="Username"
            name="username"
            value={profileData.username}
            onChange={handleProfileChange}
          />

          <Input
            label="Full Name"
            name="fullname"
            value={profileData.fullname}
            onChange={handleProfileChange}
          />

          <Input
            label="Email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
          />

          <Button type="submit">
            Update Profile
          </Button>

        </form>

      </Card>

      <Card>

        <h2 className="mb-6 text-2xl font-semibold">
          Change Password
        </h2>

        <form
          onSubmit={updateUserPassword}
          className="space-y-4"
        >

          <Input
            label="Current Password"
            type="password"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
          />

          <Input
            label="New Password"
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />

          <Button type="submit">
            Change Password
          </Button>

        </form>

      </Card>

      <Button
        className="bg-red-600 hover:bg-red-700"
        onClick={handleLogout}
      >
        Logout
      </Button>

    </div>
  );
};

export default Profile;