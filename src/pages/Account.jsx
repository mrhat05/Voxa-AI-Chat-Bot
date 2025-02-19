import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { ArrowLeft } from "lucide-react"; // For the back button icon

function ProfilePage() {
  window.scrollTo({ top: 0, behavior: "instant" });
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const { name, email } = userData;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-6">
      <div className="bg-[#1a1a1a] shadow-xl rounded-2xl p-10 max-w-lg w-full text-center border border-[#333]">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate("/")} 
          className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-4"
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Voxa Branding */}
        <h2 className="text-4xl font-extrabold text-white tracking-wide mb-2">
          Voxa
        </h2>
        <p className="text-gray-400 text-sm mb-6">Your Profile</p>

        <div className="flex flex-col gap-5 ">
          <Input
            value={name}
            readOnly
            label={"Full Name"}
            className="bg-[#222] text-white border border-[#333] focus:border-[#555] focus:ring-0"
          />
          <Input
            value={email}
            readOnly
            label={"Email"}
            className="bg-[#222] text-white border border-[#333] focus:border-[#555] focus:ring-0"
          />
        </div>

        {/* Footer */}
        <div className="mt-6 text-gray-500 text-xs">
          <p>Powered by Voxa • All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
