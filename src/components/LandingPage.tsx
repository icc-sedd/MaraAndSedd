import React, { useState } from 'react';
import Header from './Header';

const LandingPage: React.FC = () => {
  const [guestId, setGuestId] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    
    // Only allow alphabetic characters and limit to 5 characters
    if (/^[A-Z]*$/.test(value) && value.length <= 5) {
      setGuestId(value);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (guestId.length !== 5) {
      setError('Guest ID must be exactly 5 letters');
      return;
    }
    
    // Redirect to the same page with the GuestID parameter
    window.location.href = `${window.location.origin}/?GuestID=${guestId}`;
  };

  return (
    <div className="landing-page">
      {/* Use the existing header component */}
      <Header />
      
      {/* Guest ID Input Section */}
      <section className="section" style={{ minHeight: 'calc(100vh - 80vh)' }}>
        <div className="container">
          <div className="card" style={{ maxWidth: '600px', textAlign: 'center' }}>
            <h2 style={{ 
              color: '#b8941f', 
              fontFamily: 'Dancing Script, cursive', 
              fontSize: '3rem', 
              marginBottom: '1rem' 
            }}>
              🔐 Private Invitation
            </h2>
            
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#4a3728', 
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              This wedding website is exclusively for invited guests.
              <br />
              Please enter your 5-letter Guest ID to access your invitation.
            </p>

            <form className="form" onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
              <div className="form-group">
                <label htmlFor="guestId" style={{ textAlign: 'center', fontSize: '1.1rem' }}>
                  🎫 Enter Your Guest ID
                </label>
                <input
                  type="text"
                  id="guestId"
                  name="guestId"
                  value={guestId}
                  onChange={handleInputChange}
                  placeholder="ABCDE"
                  maxLength={5}
                  style={{ 
                    textAlign: 'center', 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold',
                    letterSpacing: '0.3rem',
                    textTransform: 'uppercase'
                  }}
                  autoComplete="off"
                />
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: '#666', 
                  marginTop: '0.5rem',
                  fontStyle: 'italic'
                }}>
                  5 letters only (A-Z)
                </div>
              </div>

              {error && (
                <div style={{
                  background: '#f8d7da',
                  border: '1px solid #f5c6cb',
                  borderRadius: '10px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  color: '#721c24'
                }}>
                  ❌ {error}
                </div>
              )}

              <button 
                type="submit" 
                className="btn"
                disabled={guestId.length !== 5}
                style={{ 
                  opacity: guestId.length !== 5 ? 0.6 : 1,
                  cursor: guestId.length !== 5 ? 'not-allowed' : 'pointer'
                }}
              >
                🎉 Access My Invitation
              </button>
            </form>

            <div style={{
              background: 'rgba(255, 200, 87, 0.1)',
              border: '1px solid rgba(255, 200, 87, 0.3)',
              borderRadius: '15px',
              padding: '1.5rem',
              fontSize: '0.95rem',
              color: '#4a3728'
            }}>
              <h4 style={{ 
                color: '#b8941f', 
                marginBottom: '0.8rem',
                fontSize: '1.1rem'
              }}>
                ❓ Need Help?
              </h4>
              <p style={{ margin: 0, lineHeight: '1.5' }}>
                If you can't find your Guest ID or believe you should have received an invitation, 
                please contact the couple directly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
