// Jangan lupa import useState dan AnimatePresence
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Kembalikan ikon navigasi Lightbox
import {
  FaPalette,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope
} from 'react-icons/fa';
import './App.css';
import './Gallery.css'; // <-- IMPORT FILE CSS BARU

// Auto-load semua gambar dari assets supaya tidak perlu tambah import manual.
const allAssetImages = import.meta.glob('./assets/*.{png,jpg,jpeg,gif,webp,avif}', {
  eager: true,
  import: 'default'
});

const getFileName = (path) => path.split('/').pop() || '';

const naturalSort = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

const profilePic = allAssetImages['./assets/profile.gif'];

const galleryItems = Object.entries(allAssetImages)
  .filter(([path]) => getFileName(path) !== 'profile.gif')
  .map(([path, src]) => {
    const fileName = getFileName(path);
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    return {
      fileName,
      src,
      isStatic: extension !== 'gif'
    };
  })
  .sort((a, b) => naturalSort(a.fileName, b.fileName));

const normalizeAssetToken = (value = '') =>
  value.toLowerCase().replace(/\.(gif|png|jpg|jpeg|webp|avif)$/, '').trim();

const allAnimationItems = galleryItems.filter((item) => !item.isStatic);
const staticItems = galleryItems.filter((item) => item.isStatic);

// Mode manual urutan animasi.
// Boleh isi pakai nama dengan ekstensi ('anim1.gif') atau tanpa ekstensi ('anim1').
const manualAnimationOrder = [
  // 'anim1',
  // 'anim2.gif',
  // 'funny-cat',
];

const findAnimationByToken = (token) => {
  const normalizedToken = normalizeAssetToken(token);
  return allAnimationItems.find(
    (item) => normalizeAssetToken(item.fileName) === normalizedToken
  );
};

const animationItems =
  manualAnimationOrder.length > 0
    ? manualAnimationOrder
        .map((token) => findAnimationByToken(token))
        .filter(Boolean)
    : allAnimationItems;

const arrangeCenteredGridPattern = (animations, statics) => {
  if (animations.length === 0 || statics.length === 0) {
    return galleryItems;
  }

  const groupsCount = Math.max(statics.length, Math.ceil(animations.length / 8));
  const arranged = [];
  let animationCursor = 0;

  for (let groupIndex = 0; groupIndex < groupsCount; groupIndex += 1) {
    const centerImage = statics[groupIndex % statics.length];

    for (let slot = 0; slot < 9; slot += 1) {
      if (slot === 4) {
        arranged.push(centerImage);
      } else {
        arranged.push(animations[animationCursor % animations.length]);
        animationCursor += 1;
      }
    }
  }

  return arranged;
};

const arrangedGalleryItems = arrangeCenteredGridPattern(animationItems, staticItems);

const getMediaLabel = (item) => (item.isStatic ? 'Gambar' : 'Animasi');

// Kamu bisa ubah label per file di sini, contoh: 'anim1.gif': 'Tinju'
const customMediaLabels = {
  'anim1.gif': 'Lari',
  'anim2.gif': 'Melompat',
  'Lizard Hello GIF.gif': 'Hello',
};

const getDisplayLabel = (item) => customMediaLabels[item.fileName] || getMediaLabel(item);

const chunkArray = (items, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  return chunks;
};

const galleryGroups = chunkArray(arrangedGalleryItems, 9);

function App() {
  // 1. KEMBALIKAN STATE LIGHTBOX
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const selectedItem = selectedImageIndex !== null ? arrangedGalleryItems[selectedImageIndex] : null;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // 3. KEMBALIKAN FUNGSI NAVIGASI
  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  
  const showPrev = (e) => {
    e.stopPropagation(); 
    setSelectedImageIndex((prev) => (prev === 0 ? arrangedGalleryItems.length - 1 : prev - 1));
  };
  
  const showNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === arrangedGalleryItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="container">
        <motion.div
          className="main-panel"
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
          <motion.a variants={itemVariants} href="https://github.com/IsmetMaulanaAzhari" target="_blank" rel="noreferrer" className="link-button">GitHub</motion.a>
          <motion.a variants={itemVariants} href="https://www.linkedin.com/in/ismetmazhari/" target="_blank" rel="noreferrer" className="link-button">LinkedIn</motion.a>
          <motion.a variants={itemVariants} href="https://instagram.com/ismetazhary" target="_blank" rel="noreferrer" className="link-button">Instagram</motion.a>

          <motion.h2 variants={itemVariants} className="section-title gif-section">
            <FaPalette size={18} style={{marginRight: 8, verticalAlign: 'middle'}} /> Concept Gallery
          </motion.h2>

          <div className="gallery-wrapper">
            {galleryGroups.map((group, groupIndex) => (
              <motion.div
                key={`group-${groupIndex}`}
                className="mixed-grid"
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                initial="hidden"
                animate="visible"
              >
                {group.map((item, indexInGroup) => {
                  const index = groupIndex * 9 + indexInGroup;
                  return (
                    <motion.div
                      key={`${item.fileName}-${index}`}
                      variants={itemVariants}
                      className={`grid-item ${item.isStatic ? 'static-item' : 'anim-item'}`}
                      onClick={() => openLightbox(index)}
                    >
                      <img src={item.src} alt={`Gallery item ${index}`} loading="lazy" />

                      <div className="gif-overlay">
                        <span>{`View ${getMediaLabel(item)}`}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ))}
          </div>

          <motion.footer variants={itemVariants} className="site-footer">
            <p className="footer-title">Find Me Online</p>
            <div className="footer-socials">
              <a
                href="https://github.com/IsmetMaulanaAzhari"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="footer-icon"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/ismetmazhari/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="footer-icon"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://instagram.com/ismetazhary"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="footer-icon"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="mailto:ismetmaulanaazhari@gmail.com"
                aria-label="Email"
                className="footer-icon"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
            <p className="footer-copy">Built with React and Framer Motion.</p>
          </motion.footer>

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
              <img src={selectedItem?.src} alt="Enlarged view" />
              <div className="lightbox-meta">
                <p className="lightbox-type">{getMediaLabel(selectedItem)}</p>
                <p className="lightbox-name">{selectedItem ? getDisplayLabel(selectedItem) : ''}</p>
              </div>
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