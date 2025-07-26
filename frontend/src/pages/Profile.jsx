import React from "react";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add more user info or password reset here */}
    </div>
  );
};

export default Profile;