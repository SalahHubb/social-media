import { createContext, useState } from "react";
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <AuthContext.Provider value={{ isMobileMenuOpen, toggleMobileMenu }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };

//   <div
//     className={`fixed top-0 left-0 min-h-screen w-64 bg-slate-100 shadow-lg transform transition-transform duration-300 ease-in-out ${
//       isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//     } lg:hidden z-50`}
//   ></div>
