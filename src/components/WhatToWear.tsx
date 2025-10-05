import React, { useEffect, useRef, useState } from 'react';

const WhatToWear: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isAnimated) {
              // Add animation classes with staggered delays
              const sections = entry.target.querySelectorAll('.wear-animate-item');
              sections.forEach((section, index) => {
                setTimeout(() => {
                  section.classList.add('animate-slide-up');
                }, index * 300); // 300ms delay between each section
              });
              setIsAnimated(true);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px 0px 0px'
        }
      );

      if (contentRef.current) {
        observer.observe(contentRef.current);
      }

      return () => {
        if (contentRef.current) {
          observer.unobserve(contentRef.current);
        }
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [isAnimated]);

  return (
    <section id="what-to-wear" className="section">
      <div className="container wear-content" ref={contentRef}>
        <h2>What to Wear</h2>
        <div className="card">
          <div className="dress-code-section">
            <div className="wear-animate-item">
              <h4>For VIPs (Ninong and Ninang)</h4>
              <div className="vip-dress-code">
                <div className="dress-code-row">
                  <div className="dress-code-item">
                    <p><strong>Ninong:</strong> Barong Tagalog</p>
                    <div className="dress-code-image">
                      <img 
                        src="/images/ninong-barong.jpg" 
                        alt="Barong Tagalog for Ninong"
                        className="attire-image"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='250' viewBox='0 0 200 250'%3E%3Crect width='200' height='250' fill='%23f8f9fa'/%3E%3Ctext x='100' y='120' text-anchor='middle' font-family='Arial' font-size='14' fill='%23333'%3EBarong Tagalog%3C/text%3E%3Ctext x='100' y='140' text-anchor='middle' font-family='Arial' font-size='12' fill='%23666'%3ETraditional Filipino%3C/text%3E%3Ctext x='100' y='155' text-anchor='middle' font-family='Arial' font-size='12' fill='%23666'%3EFormal Wear%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>
                <div className="dress-code-item">
                  <p><strong>Ninang:</strong> Filipiñana dress</p>
                  <div className="dress-code-image">
                    <img 
                      src="/images/ninang-dress.jpg" 
                      alt="Filipiñana dress for Ninang"
                      className="attire-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='250' viewBox='0 0 200 250'%3E%3Cdefs%3E%3ClinearGradient id='champagne' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23d4af37;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23b8941f;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='200' height='250' fill='url(%23champagne)'/%3E%3Ctext x='100' y='120' text-anchor='middle' font-family='Arial' font-size='14' fill='white'%3EChampagne Gold%3C/text%3E%3Ctext x='100' y='140' text-anchor='middle' font-family='Arial' font-size='12' fill='white'%3EElegant Dress%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            </div>
            
            <div className="wear-animate-item">
              <h4>For All Other Guests</h4>
              <div className="general-dress-code">
                <p><strong>Recommended:</strong> Semi-formal / Cocktail attire</p>
                <p><strong>Colors to Consider:</strong> Elegant colors that complement our theme</p>
                <p><strong>Note:</strong> Please avoid wearing white or champagne gold (reserved for the couple and VIPs)</p>
                
                <div className="dress-code-row">
                  <div className="dress-code-item">
                    <p><strong>Men:</strong> Suit or dress shirt with slacks</p>
                    <div className="dress-code-image">
                      <img 
                        src="https://images.unsplash.com/photo-1594816797358-8b627e7e3717?w=300&h=400&fit=crop&crop=face" 
                        alt="Semi-formal attire for men"
                        className="attire-image"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='250' viewBox='0 0 200 250'%3E%3Cdefs%3E%3ClinearGradient id='mensFormal' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%234c63d2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='200' height='250' fill='url(%23mensFormal)'/%3E%3Ctext x='100' y='115' text-anchor='middle' font-family='Arial' font-size='14' fill='white'%3ESemi-Formal%3C/text%3E%3Ctext x='100' y='135' text-anchor='middle' font-family='Arial' font-size='12' fill='white'%3ESuit or Dress Shirt%3C/text%3E%3Ctext x='100' y='150' text-anchor='middle' font-family='Arial' font-size='12' fill='white'%3Ewith Slacks%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>
                  <div className="dress-code-item">
                    <p><strong>Women:</strong>Elegant blouse with skirt</p>
                    <div className="dress-code-image">
                      <img 
                        src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop&crop=face" 
                        alt="Cocktail dress for women"
                        className="attire-image"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='250' viewBox='0 0 200 250'%3E%3Cdefs%3E%3ClinearGradient id='womensCocktail' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23764ba2;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%235e3a7f;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='200' height='250' fill='url(%23womensCocktail)'/%3E%3Ctext x='100' y='115' text-anchor='middle' font-family='Arial' font-size='14' fill='white'%3ECocktail Dress%3C/text%3E%3Ctext x='100' y='135' text-anchor='middle' font-family='Arial' font-size='12' fill='white'%3EElegant Semi-Formal%3C/text%3E%3Ctext x='100' y='150' text-anchor='middle' font-family='Arial' font-size='12' fill='white'%3EAttire%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatToWear;
