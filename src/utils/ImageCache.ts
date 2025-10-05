// Image cache utility for better performance
class ImageCache {
  private static cache = new Map<string, HTMLImageElement>();
  
  static preloadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      // Check if image is already cached
      if (this.cache.has(src)) {
        resolve(this.cache.get(src)!);
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        this.cache.set(src, img);
        resolve(img);
      };
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }
  
  static getCachedImage(src: string): HTMLImageElement | null {
    return this.cache.get(src) || null;
  }
  
  static isCached(src: string): boolean {
    return this.cache.has(src);
  }
  
  static clearCache(): void {
    this.cache.clear();
  }
  
  static getCacheSize(): number {
    return this.cache.size;
  }
}

export default ImageCache;
