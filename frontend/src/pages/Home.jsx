import React, { useContext } from "react";
import Navbar from "../components/NavBar.jsx";
import Main from "../components/Main.jsx";
import CreateStoryModal from "../components/CreateStroyModal.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import EditProfile from "../components/EditProfile.jsx";

const Home = () => {
  const {
    isCreateStroyModalOpen,
    closeCreateStoryModal,
    isEditProfileOpen,
    closeEditProfile,
  } = useContext(AuthContext);

  return (
    <div className="w-screen h-screen flex bg-slate-50 relative">
      <Navbar />
      <Main />
      <CreateStoryModal
        open={isCreateStroyModalOpen}
        onClose={closeCreateStoryModal}
      />
      <EditProfile open={isEditProfileOpen} onClose={closeEditProfile} />
    </div>
  );
};

export default Home;
