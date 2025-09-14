# Sivi Meka - Professional CV Builder

A modern, expressive Vue.js web application for building professional CVs with style.

## Features

- **Professional Design**: Modern and expressive UI with gradient backgrounds and glassmorphism effects
- **Comprehensive Form**: Includes all essential CV sections:
  - Personal Information (Name, Email)
  - Job Information (Title, Description)
  - Professional Summary
  - Skills
  - Education (Dynamic add/remove)
  - Work Experience (Dynamic add/remove)
  - Certifications (Dynamic add/remove)
  - Key Projects (Dynamic add/remove)
- **Dynamic Fields**: Add/remove multiple entries for education, work experience, certifications, and projects
- **Form Validation**: Required field validation with user-friendly error messages
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Two-Screen Flow**: Clean form submission flow with dedicated thank you page
- **Data Persistence**: Form data is temporarily stored for the thank you page summary

## Screenshots

### Desktop CV Form
![CV Form](https://github.com/user-attachments/assets/ac8ab60a-3bfc-4ceb-bfac-9e6c5ef4e9d6)

### Thank You Page
![Thank You Page](https://github.com/user-attachments/assets/42341d4d-3149-43d1-99aa-de9f42257981)

### Mobile Responsive Design
![Mobile View](https://github.com/user-attachments/assets/0730a14c-d5cb-40c2-bb55-273068a6a5c9)

## Technology Stack

- **Vue.js 3**: Modern JavaScript framework
- **Vue Router**: Client-side routing
- **Vite**: Fast build tool and development server
- **Modern CSS**: Custom styling with gradients, backdrop filters, and responsive design

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/EvanieWares/sivimeka.git
cd sivimeka

# Install dependencies
npm install
```

### Development Server

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Build for production
npm run build
```

### Preview Production Build

```bash
# Preview production build
npm run preview
```

## Usage

1. **Fill the Form**: Complete the CV form with your personal and professional information
2. **Dynamic Sections**: Use the "Add" buttons to include multiple education entries, work experiences, certifications, and projects
3. **Submit**: Click "Submit CV" to complete the process
4. **Confirmation**: View the thank you page with a summary of your submission
5. **Create Another**: Use "Create Another CV" to start fresh

## Project Structure

```
src/
├── components/          # Reusable components
├── views/              # Page components
│   ├── CVForm.vue     # Main CV form
│   └── ThankYou.vue   # Thank you page
├── router/            # Vue Router configuration
├── assets/            # CSS and static assets
├── App.vue           # Root component
└── main.js          # Application entry point
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
