import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Interface for photo objects
interface Photo {
  id: number;
  src: string;
  alt: string;
}

// Dynamic image loading function
const loadGalleryImages = async (): Promise<Photo[]> => {
  try {
    // Try to fetch a gallery manifest file first
    const response = await fetch('/gallery/manifest.json');
    if (response.ok) {
      const manifest = await response.json();
      return manifest.images.map((filename: string, index: number) => ({
        id: index + 1,
        src: `/gallery/${filename}`,
        alt: `Wedding Photo ${index + 1}`
      }));
    }
  } catch (error) {
    console.log('No manifest.json found, trying to auto-discover images...');
  }

  // Fallback: Try to load common image filenames
  const commonFilenames = [
    '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
    '1.JPG', '2.JPG', '3.JPG', '4.JPG', '5.JPG', '6.JPG', '7.JPG', '8.JPG', '9.JPG', '10.JPG',
    '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png',
    '1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg', '7.jpeg', '8.jpeg', '9.jpeg', '10.jpeg'
  ];

  const validImages: Photo[] = [];
  let imageId = 1;

  // Test each potential filename
  for (const filename of commonFilenames) {
    try {
      const img = new Image();
      const imageUrl = `/gallery/${filename}`;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      validImages.push({
        id: imageId++,
        src: imageUrl,
        alt: `Wedding Photo ${imageId - 1}`
      });
    } catch (error) {
      // Image doesn't exist, continue to next
      continue;
    }
  }

  if (validImages.length === 0) {
    // Final fallback to known existing images
    return [
      { id: 1, src: '/gallery/1.jpg', alt: 'Wedding Photo 1' },
      { id: 2, src: '/gallery/2.JPG', alt: 'Wedding Photo 2' },
      { id: 3, src: '/gallery/3.JPG', alt: 'Wedding Photo 3' },
      { id: 4, src: '/gallery/4.JPG', alt: 'Wedding Photo 4' },
      { id: 5, src: '/gallery/5.JPG', alt: 'Wedding Photo 5' },
      { id: 6, src: '/gallery/6.jpg', alt: 'Wedding Photo 6' },
      { id: 7, src: '/gallery/7.jpg', alt: 'Wedding Photo 7' },
      { id: 8, src: '/gallery/8.jpg', alt: 'Wedding Photo 8' },
      { id: 9, src: '/gallery/9.jpg', alt: 'Wedding Photo 9' },
      { id: 10, src: '/gallery/10.jpg', alt: 'Wedding Photo 10' }
    ];
  }

  return validImages;
};

// Individual tile component with smooth image cycling
const PhotoTile: React.FC<{ 
  tileIndex: number; 
  photos: any[]; 
  className: string;
  updateTrigger: number;
  isSelected: boolean;
  onHoverChange: (isHovered: boolean) => void;
  assignedImageIndex?: number;
  onImageIndexChange: (tileIndex: number, oldIndex: number, newIndex: number) => void;
  getNextUniqueImage?: (currentIndex: number) => number;
}> = ({ 
  tileIndex, 
  photos, 
  className,
  updateTrigger,
  isSelected,
  onHoverChange,
  assignedImageIndex,
  onImageIndexChange,
  getNextUniqueImage
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  // Initialize with assigned image or random starting image
  useEffect(() => {
    let startIndex: number;
    if (assignedImageIndex !== undefined) {
      startIndex = assignedImageIndex;
    } else {
      startIndex = Math.floor(Math.random() * photos.length);
    }
    setCurrentImageIndex(startIndex);
    setNextImageIndex(startIndex);
  }, [photos.length, assignedImageIndex]);

  // Smooth transition when this tile is selected for update (only if preview not open)
  useEffect(() => {
    if (isSelected && updateTrigger > 0 && !isPreviewOpen) {
      const currentIndex = currentImageIndex;
      let newIndex: number;
      
      // Use parent's unique image selection if available
      if (getNextUniqueImage) {
        newIndex = getNextUniqueImage(currentIndex);
      } else {
        // Fallback to random selection avoiding current image
        do {
          newIndex = Math.floor(Math.random() * photos.length);
        } while (newIndex === currentIndex && photos.length > 1);
      }
      
      // Notify parent of the image change
      onImageIndexChange(tileIndex, currentIndex, newIndex);
      
      // Start transition
      setNextImageIndex(newIndex);
      setIsTransitioning(true);
      
      // Complete transition after fade out
      setTimeout(() => {
        setCurrentImageIndex(newIndex);
        setIsTransitioning(false);
      }, 500); // Half of the transition duration
    }
  }, [updateTrigger, isSelected, currentImageIndex, photos.length, isPreviewOpen, tileIndex, onImageIndexChange, getNextUniqueImage]);

  // Handle click to open preview
  const handleClick = () => {
    setIsPreviewOpen(true);
    onHoverChange(true); // Still pause transitions when preview is open
    setPreviewImage(photos[currentImageIndex].src);
  };

  const handleClosePreview = () => {
    console.log('🔄 Closing preview...');
    setIsPreviewOpen(false);
    onHoverChange(false);
    setPreviewImage('');
  };

  // Handle escape key to close preview
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isPreviewOpen) {
        handleClosePreview();
      }
    };

    if (isPreviewOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isPreviewOpen]);

  const currentPhoto = photos[currentImageIndex];
  const nextPhoto = photos[nextImageIndex];

  return (
    <div 
      className={`photo-tile photos-animate-item ${className}`}
      onClick={handleClick}
    >
      <div className="tile-inner">
        {/* Current Image */}
        <img 
          src={currentPhoto.src} 
          alt={currentPhoto.alt}
          className={`tile-image current ${isTransitioning ? 'fade-out' : 'fade-in'}`}
          key={`current-${tileIndex}-${currentImageIndex}`}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            console.log(`Failed to load: ${currentPhoto.src}`);
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        {/* Next Image - for smooth transition */}
        {isTransitioning && (
          <img 
            src={nextPhoto.src} 
            alt={nextPhoto.alt}
            className="tile-image next fade-in"
            key={`next-${tileIndex}-${nextImageIndex}`}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              console.log(`Failed to load: ${nextPhoto.src}`);
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        )}
        {/* Click hint overlay */}
        <div className="click-hint">
          <span>Click to preview</span>
        </div>
      </div>
      {/* Preview positioned outside tile container using Portal for proper full-screen display */}
      {isPreviewOpen && previewImage && createPortal(
        <div 
          className="tile-preview-large"
          onClick={(e) => {
            // Only close if clicking on the overlay itself, not on child elements
            if (e.target === e.currentTarget) {
              console.log('🔄 Backdrop clicked - closing preview');
              handleClosePreview();
            }
          }}
        >
          <div className="preview-modal">
            <button 
              className="preview-close-btn" 
              onClick={(e) => {
                e.stopPropagation();
                console.log('🔄 Close button clicked');
                handleClosePreview();
              }} 
              aria-label="Close preview"
            >
              ×
            </button>
            <img 
              src={previewImage} 
              alt="Large Preview"
              className="preview-image-large"
              loading="eager"
              decoding="async"
              onClick={(e) => e.stopPropagation()}
              onLoad={(e) => {
                const img = e.target as HTMLImageElement;
                console.log(`Image dimensions: ${img.naturalWidth}x${img.naturalHeight}`);
              }}
            />
            <div className="preview-info" onClick={(e) => e.stopPropagation()}>
              <p>Full Size Preview</p>
              <span className="preview-hint">Click outside the image, press ESC, or click × to close</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

const Photos: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(null);
  const [currentTileSequence, setCurrentTileSequence] = useState(0);
  const [isAnyTileHovered, setIsAnyTileHovered] = useState(false);
  const [usedImages, setUsedImages] = useState<Set<number>>(new Set());
  const [tileImageAssignments, setTileImageAssignments] = useState<{ [key: number]: number }>({});
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);

  // Load photos dynamically on component mount
  useEffect(() => {
    const loadPhotos = async () => {
      setIsLoadingPhotos(true);
      try {
        const galleryImages = await loadGalleryImages();
        setPhotos(galleryImages);
        console.log(`Loaded ${galleryImages.length} images from gallery`);
      } catch (error) {
        console.error('Failed to load gallery images:', error);
        // Fallback to empty array or default images
        setPhotos([]);
      }
      setIsLoadingPhotos(false);
    };

    loadPhotos();
  }, []);

  // Initialize unique images for each tile (only after photos are loaded)
  useEffect(() => {
    if (photos.length === 0 || isLoadingPhotos) return;
    
    const numberOfTiles = 12; // Increased to 12 tiles for better coverage
    const assignments: { [key: number]: number } = {};
    const used = new Set<number>();
    
    for (let i = 0; i < numberOfTiles; i++) {
      let imageIndex: number;
      do {
        imageIndex = Math.floor(Math.random() * photos.length);
      } while (used.has(imageIndex) && used.size < photos.length);
      
      assignments[i] = imageIndex;
      used.add(imageIndex);
    }
    
    setTileImageAssignments(assignments);
    setUsedImages(used);
  }, [photos, isLoadingPhotos]);

  // Handle image index changes from tiles
  const handleImageIndexChange = (tileIndex: number, oldIndex: number, newIndex: number) => {
    setUsedImages(prev => {
      const newUsed = new Set(prev);
      newUsed.delete(oldIndex);
      newUsed.add(newIndex);
      return newUsed;
    });
    
    setTileImageAssignments(prev => ({
      ...prev,
      [tileIndex]: newIndex
    }));
  };

  // Get next available unique image
  const getNextUniqueImage = (currentIndex: number): number => {
    const availableImages = [];
    for (let i = 0; i < photos.length; i++) {
      if (i !== currentIndex && !usedImages.has(i)) {
        availableImages.push(i);
      }
    }
    
    if (availableImages.length === 0) {
      // If all images are used, allow reuse but avoid current
      return (currentIndex + 1) % photos.length;
    }
    
    return availableImages[Math.floor(Math.random() * availableImages.length)];
  };

  // Sequential tile updates every 5 seconds (paused when hovering)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnyTileHovered) {
        const numberOfTiles = 12; // Updated to 12 tiles for better layout
        
        // Update tiles in sequence: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, then repeat
        const nextTileIndex = currentTileSequence % numberOfTiles;
        
        setSelectedTileIndex(nextTileIndex);
        setUpdateTrigger(prev => prev + 1);
        setCurrentTileSequence(prev => prev + 1);
        
        // Clear selection after a brief moment to prepare for next update
        setTimeout(() => {
          setSelectedTileIndex(null);
        }, 100);
      }
    }, 7000); // 7 seconds

    return () => clearInterval(interval);
  }, [currentTileSequence, isAnyTileHovered]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isAnimated) {
              const container = entry.target as HTMLElement;
              const animateItems = container.querySelectorAll('.photos-animate-item');
              
              container.classList.add('animate-slide-up');
              
              // Staggered animation for photo tiles
              animateItems.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add('animate-slide-up');
                }, index * 100); // 100ms delay between each tile
              });
              
              setIsAnimated(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );

      if (contentRef.current) {
        observer.observe(contentRef.current);
      }

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [isAnimated]);

  // Handle hover state changes from tiles
  const handleTileHoverChange = (isHovered: boolean) => {
    setIsAnyTileHovered(isHovered);
  };

  // Create tiles (optimized layout with 12 tiles)
  const numberOfTiles = 12;

  // Show loading state while photos are being loaded
  if (isLoadingPhotos) {
    return (
      <section id="photos" className="section">
        <div className="container photos-content" ref={contentRef}>
          <h2>Our Memories</h2>
          <p className="photos-subtitle">Loading our beautiful memories...</p>
          <div className="photo-grid">
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '2rem',
              color: '#666'
            }}>
              📸 Discovering gallery images...
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show message if no photos found
  if (photos.length === 0) {
    return (
      <section id="photos" className="section">
        <div className="container photos-content" ref={contentRef}>
          <h2>Our Memories</h2>
          <p className="photos-subtitle">A glimpse into our beautiful journey together</p>
          <div className="photo-grid">
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '2rem',
              color: '#666'
            }}>
              📷 No images found in gallery. Please add some photos to the /public/gallery/ folder.
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="photos" className="section">
      <div className="container photos-content" ref={contentRef}>
        <h2>Our Memories</h2>
        <p className="photos-subtitle">A glimpse into our beautiful journey together</p>
        
        <div className="photo-grid">
          {Array.from({ length: numberOfTiles }, (_, index) => (
            <PhotoTile
              key={index}
              tileIndex={index}
              photos={photos}
              className={getTileSize(index)}
              updateTrigger={updateTrigger}
              isSelected={selectedTileIndex === index}
              onHoverChange={handleTileHoverChange}
              assignedImageIndex={tileImageAssignments[index]}
              onImageIndexChange={handleImageIndexChange}
              getNextUniqueImage={getNextUniqueImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Function to assign different tile sizes (Windows 8 style) - Optimized for better layout
const getTileSize = (index: number): string => {
  // Pattern optimized for 4-column grid with 12 tiles to fill empty spaces
  const sizePattern = [
    'large',   // 0: 2x2
    'small',   // 1: 1x1  
    'small',   // 2: 1x1
    'medium',  // 3: 2x1
    'small',   // 4: 1x1
    'small',   // 5: 1x1
    'large',   // 6: 2x2
    'medium',  // 7: 2x1
    'small',   // 8: 1x1
    'small',   // 9: 1x1
    'small',   // 10: 1x1
    'small'    // 11: 1x1
  ];
  return sizePattern[index % sizePattern.length];
};

export default Photos;
