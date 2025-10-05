import React, { useState } from 'react';
import SimpleGuestLookup from './SimpleGuestLookup';

interface RSVPFormData {
  name: string;
  email: string;
  attending: string;
  guests: string;
  dietary: string;
  message: string;
}

const RSVP: React.FC = () => {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    email: '',
    attending: '',
    guests: '1',
    dietary: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a backend service
    console.log('RSVP Data:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="rsvp" className="section">
        <div className="container">
          <h2>Thank You!</h2>
          <div className="card">
            <p>Your RSVP has been received. We can't wait to celebrate with you!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="section">
      <div className="container">
        <h2>RSVP</h2>
        <p>Please let us know if you'll be joining us by May 1st, 2024</p>
        
        {/* Guest Lookup Component */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <SimpleGuestLookup />
        </div>
        
        <div className="card">
          <h3>Alternative RSVP Form</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
            If you can't find your name above, please use this form:
          </p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="attending">Will you be attending? *</label>
              <select
                id="attending"
                name="attending"
                value={formData.attending}
                onChange={handleChange}
                required
              >
                <option value="">Please select</option>
                <option value="yes">Yes, I'll be there!</option>
                <option value="no">Sorry, can't make it</option>
              </select>
            </div>

            {formData.attending === 'yes' && (
              <>
                <div className="form-group">
                  <label htmlFor="guests">Number of guests (including yourself)</label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="dietary">Dietary restrictions or allergies</label>
                  <textarea
                    id="dietary"
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Please let us know of any dietary needs..."
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="message">Special message for the couple</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Share your well wishes..."
              />
            </div>

            <button type="submit" className="btn">
              Send RSVP
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
