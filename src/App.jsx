import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Tambahkan FaTimes (X), FaChevronLeft (<), dan FaChevronRight (>)
import { FaInstagram, FaGithub, FaLinkedin, FaLeaf, FaBuilding, FaBookOpen, FaClone, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 
import './App.css';

import profilePic from './assets/profile.gif'; 

// Import GIF Galeri
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
  // STATE untuk menyimpan index gambar yang sedang dibuka di Lightbox
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const galleryGifs = [gif1, gif2, gif3, gif4, gif5, gif6, gif7, gif8, gif9];

  // FUNGSI NAVIGASI LIGHTBOX
  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  
  const showPrev = (e) => {
    e.stopPropagation(); // Mencegah klik tembus ke background (yang menutup lightbox)
    setSelectedImageIndex((prev) => (prev === 0 ? galleryGifs.length - 1 : prev - 1));
  };
  
  const showNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === galleryGifs.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {/* Bagian Profil & Projects tetap sama */}
          <motion.img variants={itemVariants} src={profilePic} alt="Profile" className="profile-pic" />
          <motion.h1 variants={itemVariants}>Ismet Maulana Azhari</motion.h1>
          <motion.p variants={itemVariants}>
            Informatics Student | Web & Mobile Developer
            <br/>
            Passionate about Data, Cloud, and Software Engineering.
          </motion.p>
          <motion.h2 variants={itemVariants} className="section-title connect-section">Connect With Me</motion.h2>
          <div className="social-links-container">
            <motion.a variants={itemVariants} href="#" target="_blank" rel="noreferrer" className="link-button">
              <FaGithub size={20} /> GitHub
            </motion.a>
            <motion.a variants={itemVariants} href="#" target="_blank" rel="noreferrer" className="link-button">
              <FaLinkedin size={20} color="#0a66c2" /> LinkedIn
            </motion.a>
            <motion.a variants={itemVariants} href="#" target="_blank" rel="noreferrer" className="link-button">
              <FaInstagram size={20} color="#e1306c" /> Instagram
            </motion.a>
          </div>

          <motion.h2 variants={itemVariants} className="section-title gif-section">
            <FaClone size={18} style={{marginRight: 8, verticalAlign: 'middle'}} /> Recent Creations
          </motion.h2>

          {/* GRID GALERI */}
          <motion.div
            className="gif-grid"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            animate="visible"
          >
            {galleryGifs.map((gif, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="gif-item"
                onClick={() => openLightbox(index)} // Buka lightbox saat diklik
              >
                <img src={gif} alt={`Creation ${index + 1}`} loading="lazy" />
                {/* Efek hover overlay */}
                <div className="gif-overlay">
                  <span>View</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* KOMPONEN LIGHTBOX / POP-UP */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox} // Tutup jika background diklik
          >
            {/* Tombol Close di Kanan Atas */}
            <button className="lightbox-close" onClick={closeLightbox}>
              <FaTimes size={30} />
            </button>

            {/* Tombol Kiri */}
            <button className="lightbox-nav left" onClick={showPrev}>
              <FaChevronLeft size={40} />
            </button>

            {/* Gambar Utama yang Sedang Dibuka */}
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Cegah tutup saat gambar diklik
            >
              <img src={galleryGifs[selectedImageIndex]} alt="Enlarged view" />
            </motion.div>

            {/* Tombol Kanan */}
            <button className="lightbox-nav right" onClick={showNext}>
              <FaChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;