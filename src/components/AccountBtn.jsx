import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const AccountButton = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition"
      >
        <User size={20} />

      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
          <Link to="/account">
          <button className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 rounded-lg">
            <User size={16} />
            Account
          </button>
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-600 hover:bg-gray-100 rounded-lg"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountButton;
