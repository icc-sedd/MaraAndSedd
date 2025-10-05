import React, { useEffect, useRef, useState } from 'react';
import Map from './Map';
import Countdown from './Countdown';
import SimpleGuestLookup from './SimpleGuestLookup';

const Details: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isAnimated) {
              // Add animation classes with staggered delays
              const elements = entry.target.querySelectorAll('.details-animate-item');
              elements.forEach((element, index) => {
                setTimeout(() => {
                  element.classList.add('animate-slide-up');
                }, index * 200); // 200ms delay between each element
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
    <section id="details" className="section">
      <div className="container details-content" ref={contentRef}>
        <h2>Wedding Details</h2>
        
        <div className="details-animate-item">
          <Countdown />
        </div>
        
        <div className="guest-lookup-container details-animate-item">
          <h3>Guest Seating Details</h3>
          <SimpleGuestLookup />
        </div>
        
        <div className="card details-animate-item">
          <h3>Ceremony</h3>
          <div className="map-section-2col">
            <div className="map-details">
              <p><strong>Venue:</strong> Our Lady of Sorrows Parish Church</p>
              <p><strong>Date:</strong> Friday, December 13, 2025</p>
              <p><strong>Time:</strong> 2:00 PM</p>
              <p><strong>Address:</strong> 2130 F.B. Harrison St, Pasay City, Metro Manila</p>              
              <a 
                href="https://maps.app.goo.gl/ksbcdo1fJZp9PRMX6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-link"
              >
                📍 Open in Google Maps
              </a>
            </div>
            <div className="map-container">
              <Map 
                googleMapsUrl="https://maps.app.goo.gl/ksbcdo1fJZp9PRMX6"
                title="Church Location"
              />
            </div>
          </div>
        </div>

        <div className="card details-animate-item">
          <h3>Reception</h3>
          <div className="map-section-2col">
            <div className="map-details">
            <p><strong>Venue:</strong> Admiral Baysuites (East Wing)</p>
            <p><strong>Date:</strong> Friday, December 13, 2025</p>
              <p><strong>Time:</strong> 4:30 PM - 9:00 PM</p>
              <p><strong>Address:</strong> 2138 Aldecoa St, Malate, Manila, 1004 Metro Manila</p>
              <a 
                href="https://maps.app.goo.gl/oecVip2xPSMtoNtj9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-link"
              >
                📍 Open in Google Maps
              </a>
            </div>
            <div className="map-container">
              <Map 
                googleMapsUrl="https://maps.app.goo.gl/oecVip2xPSMtoNtj9"
                title="Reception Venue Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;