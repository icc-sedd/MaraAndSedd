# Dynamic Gallery System

The wedding website now has a dynamic photo gallery system that automatically detects and displays all images in the `/public/gallery/` folder.

## How It Works

### 1. Automatic Image Discovery
The system uses two methods to find gallery images:

1. **Manifest File** (Recommended): Reads `/public/gallery/manifest.json` for the complete list of images
2. **Auto-Discovery**: Falls back to testing common image filenames if no manifest exists

### 2. Adding New Photos

To add new photos to your gallery:

1. **Simple Method**: 
   - Copy your images to `/public/gallery/` folder
   - Run `npm run generate-gallery` to update the manifest
   - The website will automatically display all images

2. **Manual Method**:
   - Copy images to `/public/gallery/` folder  
   - The system will try to auto-discover them (slower but works)

### 3. Supported Image Formats
- `.jpg` / `.jpeg`
- `.png` 
- `.gif`
- `.webp`
- `.svg`

### 4. Gallery Management Commands

```bash
# Generate/update the manifest file with all current gallery images
npm run generate-gallery

# Start the development server
npm start

# Build for production
npm build
```

### 5. How Photos Are Displayed

- **Grid Layout**: 12-tile Windows 8-style layout with varied sizes
- **Unique Display**: Each tile shows a different image at any given time
- **Cycling**: Photos change every 7 seconds in a sequential pattern
- **Click Preview**: Click any photo for full-screen preview
- **Mobile Responsive**: Optimized layout for all screen sizes

### 6. Technical Details

The system:
- Loads photos asynchronously when the component mounts
- Shows loading state while discovering images
- Falls back gracefully if no images are found
- Maintains unique image assignment across all tiles
- Supports unlimited number of gallery images

### 7. File Structure

```
public/
  gallery/
    manifest.json          (Auto-generated list of images)
    1.jpg                 (Your wedding photos)
    2.JPG
    wedding-001.png
    celebration-002.jpg
    ...                   (Any image files you add)
```

### 8. Troubleshooting

- If images don't appear, run `npm run generate-gallery`
- Check browser console for any loading errors
- Ensure images are in `/public/gallery/` folder
- Verify image file extensions are supported

The system is designed to be maintenance-free - just add images to the gallery folder and optionally regenerate the manifest for optimal performance.
