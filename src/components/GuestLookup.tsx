import React, { useState, useEffect } from 'react';
import { googleSheetsService, GuestReservation } from '../services/googleSheetsService';

interface GuestLookupProps {
  spreadsheetId: string;
}

const GuestLookup: React.FC<GuestLookupProps> = ({ spreadsheetId }) => {
  const [searchName, setSearchName] = useState('');
  const [guest, setGuest] = useState<GuestReservation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allGuests, setAllGuests] = useState<GuestReservation[]>([]);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    initializeAndCheckAuth();
  }, [spreadsheetId]);

  const loadGoogleSheetsAPI = () => {
    return new Promise<void>((resolve, reject) => {
      // Check if script already exists
      if (document.querySelector('script[src*="apis.google.com"]')) {
        // Wait for gapi to be available
        const checkGapi = () => {
          if (window.gapi) {
            resolve();
          } else {
            setTimeout(checkGapi, 100);
          }
        };
        checkGapi();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        // Wait for gapi to be available after script loads
        const checkGapi = () => {
          if (window.gapi) {
            resolve();
          } else if (Date.now() - startTime > 10000) {
            reject(new Error('Google API failed to load within 10 seconds'));
          } else {
            setTimeout(checkGapi, 100);
          }
        };
        const startTime = Date.now();
        checkGapi();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Google API script'));
      };
      
      document.head.appendChild(script);
    });
  };

  const initializeAndCheckAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Loading Google API...');
      // First load the Google API script
      await loadGoogleSheetsAPI();
      console.log('Google API loaded successfully');
      
      // Then initialize the service
      console.log('Initializing Google Sheets service...');
      await googleSheetsService.initialize();
      console.log('Google Sheets service initialized');
      
      setIsSignedIn(googleSheetsService.getSignInStatus());
      
      // Finally fetch guests
      console.log('Fetching guests...');
      await fetchAllGuests();
    } catch (err: any) {
      console.error('Initialization error:', err);
      setError(`Failed to initialize Google Sheets API: ${err.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await googleSheetsService.signIn();
      setIsSignedIn(true);
      setNeedsAuth(false);
      setError(null);
      await fetchAllGuests();
    } catch (err) {
      setError('Failed to sign in to Google. Please try again.');
      console.error('Sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllGuests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const guests = await googleSheetsService.getGuestReservations(spreadsheetId);
      setAllGuests(guests);
      setNeedsAuth(false);
    } catch (err: any) {
      console.error('Error fetching guests:', err);
      
      if (err.message?.includes('Authentication required') || err.status === 403 || err.status === 401) {
        setNeedsAuth(true);
        setError('This Google Sheet requires authentication. Please sign in to view guest reservations.');
      } else if (err.message?.includes('Google API failed to load')) {
        setError('Failed to load Google API. Please check your internet connection and try again.');
      } else {
        setError(`Failed to load guest list: ${err.message || 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchName.trim()) {
      setError('Please enter a name to search');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const foundGuest = await googleSheetsService.findGuestByName(spreadsheetId, searchName);
      setGuest(foundGuest);
      
      if (!foundGuest) {
        setError(`No reservation found for "${searchName}". Please check the spelling or contact us.`);
      }
    } catch (err) {
      setError('Error searching for guest. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const totalReservedSeats = allGuests.reduce((total, guest) => total + guest.seats, 0);
  const totalKidsSeats = allGuests.reduce((total, guest) => total + guest.kidsSeats, 0);

  return (
    <div className="guest-lookup-container">
      <h3>Find Your Seat Reservation</h3>
      
      {needsAuth && !isSignedIn && (
        <div className="auth-section">
          <p>This feature requires Google authentication to access the guest list.</p>
          <button 
            onClick={handleSignIn}
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in with Google'}
          </button>
        </div>
      )}
      
      {(!needsAuth || isSignedIn) && (
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Enter your name or Guest ID to find your reservation..."
              className="search-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={isLoading || !searchName.trim()}
            >
              {isLoading ? 'Searching...' : 'Find Reservation'}
            </button>
          </div>
        </form>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {guest && (
        <div className="guest-info-card">
          <h4>🎉 Reservation Found!</h4>
          <div className="guest-details">
            <p><strong>Name:</strong> {guest.name}</p>
            <p><strong>Guest ID:</strong> {guest.guestId}</p>
            <p><strong>Adult Seats:</strong> {guest.seats}</p>
            {guest.kidsSeats > 0 && <p><strong>Kids Seats:</strong> {guest.kidsSeats}</p>}
            <p><strong>Total Seats:</strong> {guest.seats + guest.kidsSeats}</p>
          </div>
        </div>
      )}

      {allGuests.length > 0 && (
        <div className="guest-stats">
          <p className="stats-text">
            <strong>Total Guests:</strong> {allGuests.length} | 
            <strong> Adult Seats:</strong> {totalReservedSeats} |
            <strong> Kids Seats:</strong> {totalKidsSeats} |
            <strong> Total Seats:</strong> {totalReservedSeats + totalKidsSeats}
          </p>
        </div>
      )}
    </div>
  );
};

export default GuestLookup;
