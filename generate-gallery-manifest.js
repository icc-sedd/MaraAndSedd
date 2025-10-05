const fs = require('fs');
const path = require('path');

// Generate gallery manifest from all images in public/gallery folder
function generateGalleryManifest() {
  const galleryPath = path.join(__dirname, 'public', 'gallery');
  const manifestPath = path.join(galleryPath, 'manifest.json');
  
  try {
    // Read all files in gallery directory
    const files = fs.readdirSync(galleryPath);
    
    // Filter for image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext) && file !== 'manifest.json';
    }).sort(); // Sort alphabetically
    
    // Create manifest object
    const manifest = {
      images: imageFiles,
      generated: new Date().toISOString(),
      count: imageFiles.length
    };
    
    // Write manifest file
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    
    console.log(`✅ Gallery manifest generated with ${imageFiles.length} images:`);
    imageFiles.forEach(file => console.log(`   📷 ${file}`));
    
  } catch (error) {
    console.error('❌ Error generating gallery manifest:', error.message);
  }
}

// Run the function
generateGalleryManifest();
