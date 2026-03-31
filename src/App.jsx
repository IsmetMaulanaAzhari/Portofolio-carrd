// Jangan lupa import useState dan AnimatePresence
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Kembalikan ikon navigasi Lightbox
import { FaPalette, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 
import './App.css';
import './Gallery.css'; // <-- IMPORT FILE CSS BARU

import profilePic from './assets/profile.gif'; 
import staticWork from './assets/work1.jpg'; 

// Import Animasi
import anim1 from './assets/anim1.gif';
import anim2 from './assets/anim2.gif';
import anim3 from './assets/anim3.gif';
import anim4 from './assets/anim4.gif';
import anim5 from './assets/anim5.gif';
import anim6 from './assets/anim6.gif';
import anim7 from './assets/anim7.gif';
import anim8 from './assets/anim8.gif';

function App() {
  // 1. KEMBALIKAN STATE LIGHTBOX
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const animations = [anim1, anim2, anim3, anim4, anim5, anim6, anim7, anim8];
  const staticIndex = 4;

  // 2. GABUNGKAN DATA: Buat array berisi 9 item urut (animasi 0-3, statis, animasi 4-7)
  const galleryItems = [
    ...animations.slice(0, staticIndex),
    staticWork,
    ...animations.slice(staticIndex)
  ];

  // 3. KEMBALIKAN FUNGSI NAVIGASI
  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  
  const showPrev = (e) => {
    e.stopPropagation(); 
    setSelectedImageIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };
  
  const showNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.img variants={itemVariants} src={profilePic} alt="Profile" className="profile-pic" />
          <motion.h1 variants={itemVariants}>Ismet Maulana Azhari</motion.h1>
          <motion.p variants={itemVariants}>
            Informatics Student | Web & Mobile Developer
            <br/> Passionate about Data, Cloud, and Software Engineering.
          </motion.p>
          
          <motion.h2 variants={itemVariants} className="section-title connect-section">Connect With Me</motion.h2>
          <motion.a variants={itemVariants} href="#" target="_blank" rel="noreferrer" className="link-button">GitHub</motion.a>
          <motion.a variants={itemVariants} href="#" target="_blank" rel="noreferrer" className="link-button">LinkedIn</motion.a>
          <motion.a variants={itemVariants} href="#" target="_blank" rel="noreferrer" className="link-button">Instagram</motion.a>

          <motion.h2 variants={itemVariants} className="section-title gif-section">
            <FaPalette size={18} style={{marginRight: 8, verticalAlign: 'middle'}} /> Concept Gallery
          </motion.h2>

          <motion.div
            className="mixed-grid"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            animate="visible"
          >
            {/* 4. RENDER DARI ARRAY GABUNGAN (galleryItems) */}
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                // Tambahkan class khusus jika indeks adalah staticIndex
                className={`grid-item ${index === staticIndex ? 'static-item' : 'anim-item'}`}
                onClick={() => openLightbox(index)} // <-- Fungsi pencet dikembalikan
              >
                <img src={item} alt={`Gallery item ${index}`} loading="lazy" />
                
                {/* Overlay View (Hover gelap) dikembalikan */}
                <div className="gif-overlay">
                  <span>View</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* 5. KEMBALIKAN MODAL POP-UP LIGHTBOX */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <FaTimes size={30} />
            </button>

            <button className="lightbox-nav left" onClick={showPrev}>
              <FaChevronLeft size={40} />
            </button>

            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={galleryItems[selectedImageIndex]} alt="Enlarged view" />
            </motion.div>

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