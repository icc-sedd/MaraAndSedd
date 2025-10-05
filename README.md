# Wedding Website

A beautiful, responsive wedding website built with React and TypeScript.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Wedding Information**: Details about the ceremony and reception
- **Our Story**: A personal section about the couple
- **RSVP Form**: Interactive form for guests to respond
- **Modern Styling**: Beautiful gradient backgrounds and clean typography

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the project files
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:

```bash
npm start
```

This will start the application on `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

## Customization

### Updating Wedding Information

1. **Names and Date**: Edit `src/components/Header.tsx`
2. **Our Story**: Update `src/components/About.tsx`
3. **Wedding Details**: Modify `src/components/Details.tsx`
4. **Contact Information**: Update `src/components/Footer.tsx`

### Styling

The main styles are in `src/index.css`. You can customize:
- Colors (currently using a purple gradient theme)
- Fonts (currently using Georgia serif font)
- Layout and spacing

### RSVP Form

The RSVP form in `src/components/RSVP.tsx` currently logs responses to the console. To make it functional, you'll need to:

1. Set up a backend service (Firebase, Netlify Forms, etc.)
2. Update the `handleSubmit` function to send data to your chosen service

## Technologies Used

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **CSS3**: Modern styling with flexbox and gradients
- **React Scripts**: Create React App tooling

## Deployment

This project can be deployed to any static hosting service:

- **Netlify**: Connect your Git repository for automatic deployments
- **Vercel**: Deploy with zero configuration
- **GitHub Pages**: Free hosting for GitHub repositories
- **Firebase Hosting**: Google's hosting platform

## License

This project is open source and available under the ISC License.
