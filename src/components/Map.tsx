import React from 'react';

interface MapProps {
  googleMapsUrl: string;
  title: string;
}

const Map: React.FC<MapProps> = ({ googleMapsUrl, title }) => {
  // Create embed URLs using the exact coordinates provided
  const getEmbedUrl = (shareUrl: string): string => {
    if (shareUrl.includes('ksbcdo1fJZp9PRMX6')) {
      // Church location - coordinates: 14.5515349,120.9901059
      const lat = 14.5515349;
      const lng = 120.9926808;
      return `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15444.123456789!2d${lng}!3d${lat}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca21ac302007%3A0x0!2zMTTCsDMzJzA1LjUiTiAxMjDCsDU5JzI0LjQiRQ!5e0!3m2!1sen!2sph!4v1692876543210&q=${lat},${lng}`;
    }
    
    if (shareUrl.includes('oecVip2xPSMtoNtj9')) {
      // Reception location - coordinates: 14.5654733,120.9830819
      const lat = 14.5654733;
      const lng = 120.9830819;
      return `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15444.123456789!2d${lng}!3d${lat}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca21ac302007%3A0x0!2zMTTCsDMzJzU5LjciTiAxMjDCsDU5JzAxLjEiRQ!5e0!3m2!1sen!2sph!4v1692876543210&q=${lat},${lng}`;
    }
    
    // Fallback for any other URLs
    return `https://maps.google.com/maps?q=${encodeURIComponent(shareUrl)}&output=embed`;
  };

  const embedUrl = getEmbedUrl(googleMapsUrl);

  return (
    <div className="mini-map">
      <iframe
        src={embedUrl}
        width="100%"
        height="200"
        style={{ border: 0, borderRadius: '8px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      ></iframe>
    </div>
  );
};

export default Map;
