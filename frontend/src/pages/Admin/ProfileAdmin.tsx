import React, { useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/Header";

const ProfileAdmin: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Admin name",
    email: "admin123@gmail.com",
    password: "********",
  });

  // Handle profile image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow">
        {/* Header */}
        <Header />

        {/* Profile Form */}
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            {/* Profile Picture Section */}
            <div className="flex justify-center mb-5 relative">
              <label
                htmlFor="profileImageInput"
                className="w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer overflow-hidden"
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="rounded-full object-cover w-full h-full"
                  />
                ) : (
                  <img
                    src="src/images/UserAdmin.png"
                    alt="Default Profile"
                    className="rounded-full object-cover w-full h-full"
                  />
                )}
              </label>
              <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Name Input */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  !isEditing ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
                }`}
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  !isEditing ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
                }`}
              />
            </div>

            {/* Password Display */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  !isEditing ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
                }`}
              />
            </div>

            {/* Action Buttons */}
            <div className="text-right">
              {isEditing ? (
                <button
                  type="button"
                  onClick={toggleEditMode}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  type="button"
                  onClick={toggleEditMode}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;
