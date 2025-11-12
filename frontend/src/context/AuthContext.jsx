import { createContext, useState } from "react";
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateStroyModalOpen, setIsCreateStoryModalOpen] = useState(false);
  const [bgCreateStoryModal, setBgCreateStoryModal] = useState("#4F46E5");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const openCreateStoryModal = () => setIsCreateStoryModalOpen(true);
  const closeCreateStoryModal = () => setIsCreateStoryModalOpen(false);
  const openEditProfile = () => setIsEditProfileOpen(true);
  const closeEditProfile = () => setIsEditProfileOpen(false);

  const value = {
    isMobileMenuOpen,
    toggleMobileMenu,
    isCreateStroyModalOpen,
    openCreateStoryModal,
    closeCreateStoryModal,
    bgCreateStoryModal,
    setBgCreateStoryModal,
    isEditProfileOpen,
    openEditProfile,
    closeEditProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthProvider };
