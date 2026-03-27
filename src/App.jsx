import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import './App.css';
// Nanti jika kamu sudah punya file GIF/Foto di folder src/assets, hapus komentar di bawah ini:
// import profilePic from './assets/profile.gif';

function App() {
  // Konfigurasi animasi dari framer-motion
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="container">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } } // Efek muncul berurutan
        }}
      >
        {/* Foto Profil / GIF */}
        <motion.img
          variants={itemVariants}
          // src={profilePic} // Gunakan ini kalau file fotonya sudah di-import
          src="https://via.placeholder.com/150" // Ini gambar sementara, hapus nanti
          alt="Profile"
          className="profile-pic"
        />

        {/* Nama & Bio */}
        <motion.h1 variants={itemVariants}>Ismet Maulana Azhari</motion.h1>
        <motion.p variants={itemVariants}>
          Informatics Student | Web Developer
          <br/>
          Selamat datang di portofolio saya!
        </motion.p>

        {/* Tombol Links */}
        <motion.a variants={itemVariants} href="https://github.com/username-kamu" target="_blank" rel="noreferrer" className="link-button">
          <FaGithub size={20} /> GitHub
        </motion.a>

        <motion.a variants={itemVariants} href="https://linkedin.com/in/username-kamu" target="_blank" rel="noreferrer" className="link-button">
          <FaLinkedin size={20} /> LinkedIn
        </motion.a>

        <motion.a variants={itemVariants} href="https://instagram.com/username-kamu" target="_blank" rel="noreferrer" className="link-button">
          <FaInstagram size={20} /> Instagram
        </motion.a>

      </motion.div>
    </div>
  );
}

export default App;