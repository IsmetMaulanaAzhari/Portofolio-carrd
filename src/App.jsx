import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaGithub, FaLinkedin, FaLeaf, FaBuilding, FaBookOpen } from 'react-icons/fa';
import './App.css';

// PENTING: Pastikan nama file di bawah ini sesuai dengan yang kamu taruh di folder src/assets
import profilePic from './assets/profile.gif'; 

function App() {
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
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {/* Foto Profil */}
        <motion.img
          variants={itemVariants}
          src={profilePic} 
          alt="Profile"
          className="profile-pic"
        />

        {/* Nama & Bio */}
        <motion.h1 variants={itemVariants}>Ismet Maulana Azhari</motion.h1>
        <motion.p variants={itemVariants}>
          Informatics Student | Web & Mobile Developer
          <br/>
          Passionate about Data, Cloud, and Software Engineering.
        </motion.p>

        {/* Section: Projects */}
        <motion.h2 variants={itemVariants} className="section-title">Featured Projects</motion.h2>

        <motion.a variants={itemVariants} href="#" target="_blank" rel="noreferrer" className="link-button">
          <FaLeaf size={20} color="#4ade80" /> AgroWaste Platform
        </motion.a>

        <motion.a variants={itemVariants} href="#" target="_blank" rel="noreferrer" className="link-button">
          <FaBuilding size={20} color="#60a5fa" /> Sistem Pinjam Ruangan
        </motion.a>

        <motion.a variants={itemVariants} href="#" target="_blank" rel="noreferrer" className="link-button">
          <FaBookOpen size={20} color="#f472b6" /> book_share App
        </motion.a>

        {/* Section: Socials */}
        <motion.h2 variants={itemVariants} className="section-title">Connect With Me</motion.h2>

        <motion.a variants={itemVariants} href="https://github.com/username-kamu" target="_blank" rel="noreferrer" className="link-button">
          <FaGithub size={20} /> GitHub
        </motion.a>

        <motion.a variants={itemVariants} href="https://linkedin.com/in/username-kamu" target="_blank" rel="noreferrer" className="link-button">
          <FaLinkedin size={20} color="#0a66c2" /> LinkedIn
        </motion.a>
        
        <motion.a variants={itemVariants} href="https://instagram.com/username-kamu" target="_blank" rel="noreferrer" className="link-button">
          <FaInstagram size={20} color="#e1306c" /> Instagram
        </motion.a>

      </motion.div>
    </div>
  );
}

export default App;