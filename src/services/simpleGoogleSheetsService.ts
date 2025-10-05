// Simple Google Sheets API service for public sheets
export interface GuestReservation {
  name: string;
  seats: number;
  kidsSeats: number;
  guestId: string;
}

class SimpleGoogleSheetsService {
  private spreadsheetId: string;
  private apiKey: string;

  constructor(spreadsheetId: string, apiKey: string) {
    this.spreadsheetId = spreadsheetId;
    this.apiKey = apiKey;
  }

  async getGuestData(): Promise<GuestReservation[]> {
    try {
      // For public sheets, we can use the Google Sheets API without OAuth
      const range = 'Sheet1!A:D'; // Assuming columns A-D contain: Name, Seats, Kids Seat, Guest ID
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}?key=${this.apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.values || data.values.length === 0) {
        return [];
      }
      
      // Skip header row and convert to GuestReservation objects
      const guests: GuestReservation[] = data.values.slice(1).map((row: any[]) => ({
        name: row[0] || '',
        seats: parseInt(row[1]) || 0,
        kidsSeats: parseInt(row[2]) || 0,
        guestId: row[3] || ''
      }));
      
      return guests;
    } catch (error) {
      console.error('Error fetching guest data:', error);
      throw error;
    }
  }

  async findGuestByName(name: string): Promise<GuestReservation | null> {
    try {
      const guests = await this.getGuestData();
      const foundGuest = guests.find(guest => 
        guest.name.toLowerCase().includes(name.toLowerCase())
      );
      return foundGuest || null;
    } catch (error) {
      console.error('Error searching for guest:', error);
      throw error;
    }
  }

  async findGuestById(guestId: string): Promise<GuestReservation | null> {
    try {
      const guests = await this.getGuestData();
      const foundGuest = guests.find(guest => 
        guest.guestId === guestId
      );
      return foundGuest || null;
    } catch (error) {
      console.error('Error searching for guest by ID:', error);
      throw error;
    }
  }
}

export default SimpleGoogleSheetsService;
