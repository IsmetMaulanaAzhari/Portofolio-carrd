import React from 'react';
import { motion } from 'framer-motion';
// Menambahkan FaClone untuk ikon galeri
import { FaInstagram, FaGithub, FaLinkedin, FaLeaf, FaBuilding, FaBookOpen, FaClone } from 'react-icons/fa'; 
import './App.css';

// 1. IMPORT FOTO PROFIL KAMU
import profilePic from './assets/profile.gif'; // Pastikan file ini ada!

// 2. IMPORT KE-9 GIF GALERI KAMU
// Ganti nama-nama file di bawah ini sesuai dengan file GIF yang kamu taruh di folder assets/
import gif1 from './assets/creation1.gif';
import gif2 from './assets/creation2.gif';
import gif3 from './assets/creation3.gif';
import gif4 from './assets/creation4.gif';
import gif5 from './assets/creation5.gif';
import gif6 from './assets/creation6.gif';
import gif7 from './assets/creation7.gif';
import gif8 from './assets/creation8.gif';
import gif9 from './assets/creation9.gif';

function App() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // 3. BUAT DAFTAR (ARRAY) GIF UNTUK DI-LOOPING
  const galleryGifs = [gif1, gif2, gif3, gif4, gif5, gif6, gif7, gif8, gif9];

  return (
    <div className="container">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {/* === SECTION PROFIL === */}
        <motion.img
          variants={itemVariants}
          src={profilePic} 
          alt="Profile"
          className="profile-pic"
        />
        <motion.h1 variants={itemVariants}>Ismet Maulana Azhari</motion.h1>
        <motion.p variants={itemVariants}>
          Informatics Student | Web & Mobile Developer
          <br/>
          Passionate about Data, Cloud, and Software Engineering.
        </motion.p>
        
        {/* === SECTION CONNECT (Tambahkan class connect-section) === */}
        <motion.h2 variants={itemVariants} className="section-title connect-section">Connect With Me</motion.h2>
        <motion.a variants={itemVariants} href="https://github.com/username-kamu" target="_blank" rel="noreferrer" className="link-button">
          <FaGithub size={20} /> GitHub
        </motion.a>
        <motion.a variants={itemVariants} href="https://linkedin.com/in/username-kamu" target="_blank" rel="noreferrer" className="link-button">
          <FaLinkedin size={20} color="#0a66c2" /> LinkedIn
        </motion.a>
        <motion.a variants={itemVariants} href="https://instagram.com/username-kamu" target="_blank" rel="noreferrer" className="link-button">
          <FaInstagram size={20} color="#e1306c" /> Instagram
        </motion.a>

        {/* === SECTION TERBARU: GIF GALERI (3x3) === */}
        {/* Judul Baru */}
        <motion.h2 variants={itemVariants} className="section-title gif-section">
          <FaClone size={18} style={{marginRight: 8, verticalAlign: 'middle'}} /> Recent Creations
        </motion.h2>

        {/* Kontainer Grid GIF */}
        <motion.div
          className="gif-grid"
          variants={{
            // Stagger khusus untuk galeri agar muncul satu per satu dengan cepat
            visible: { transition: { staggerChildren: 0.08 } } 
          }}
          initial="hidden"
          animate="visible"
        >
          {/* Loop melalui array galleryGifs dan render setiap GIF */}
          {galleryGifs.map((gif, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="gif-item"
            >
              <img src={gif} alt={`Creation ${index + 1}`} loading="lazy" />
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
}

export default App;