# Wedding Website

A beautiful, responsive wedding website built with React and TypeScript.

🌐 **Live Site**: [https://icc-sedd.github.io/MaraAndSedd](https://icc-sedd.github.io/MaraAndSedd)

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

### GitHub Pages (Automatic)

This project is configured for automatic deployment to GitHub Pages:

1. **Automatic Deployment**: Every push to the `main` branch triggers a GitHub Actions workflow that builds and deploys the site
2. **Live URL**: The site is available at [https://icc-sedd.github.io/MaraAndSedd](https://icc-sedd.github.io/MaraAndSedd)
3. **Manual Deployment**: You can also deploy manually using:
   ```bash
   npm run deploy
   ```

### Other Deployment Options

This project can also be deployed to other static hosting services:

- **Netlify**: Connect your Git repository for automatic deployments
- **Vercel**: Deploy with zero configuration  
- **Firebase Hosting**: Google's hosting platform

### GitHub Pages Setup

If you fork this repository, update the `homepage` field in `package.json`:

```json
{
  "homepage": "https://your-username.github.io/your-repository-name"
}
```

Then enable GitHub Pages in your repository settings:
1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` 
4. Folder: `/ (root)`

## License

This project is open source and available under the ISC License.
