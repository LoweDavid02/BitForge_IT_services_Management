# BitForge IT Services Management Platform

A comprehensive IT services management platform built with React, Vite, and Tailwind CSS. Features a modern admin dashboard with analytics, booking management, and client engagement tools.

## 🌐 Live Demo

**https://lowedavid02.github.io/BitForge_IT_services_Management/**

## 🔑 Admin Access

- **Username**: `admin`
- **Password**: `BitForge2026!`

## ✨ Features

### Public Pages
- **Home**: Modern landing page with hero section and service overview
- **Portfolio**: Showcase of completed projects and case studies
- **Team**: Meet the team behind BitForge IT
- **Feedback**: Client testimonials and feedback system
- **Booking**: Service booking and consultation scheduling

### Admin Dashboard
- **Dashboard**: Overview with key metrics and system status
- **Analytics**: Comprehensive analytics with interactive charts
  - Revenue growth trends
  - Service performance metrics
  - User engagement analytics
  - Geographic distribution
  - Conversion funnel
  - Client retention metrics
- **Bookings**: Manage client bookings and appointments
- **Calendar**: Schedule and event management
- **Settings**: System configuration and preferences
- **Profile**: Admin profile management with avatar customization

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone git@github.com:LoweDavid02/BitForge_IT_services_Management.git

# Navigate to project directory
cd BitForge_IT_services_Management

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Deployment

```bash
# Deploy to GitHub Pages
npm run deploy
```

## 📚 Documentation

Complete documentation is available in the `/docs` folder:

### Quick Links
- **[📖 Documentation Index](./docs/INDEX.md)** - Complete documentation overview
- **[🚀 Quick Deploy Guide](./docs/QUICK_DEPLOY.md)** - Fast deployment reference
- **[🌐 Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)** - Full deployment instructions
- **[📊 Analytics Features](./docs/ANALYTICS_FUNCTIONAL_FEATURES.md)** - Analytics documentation
- **[👤 Admin Profile](./docs/ADMIN_PROFILE_IMPLEMENTATION.md)** - Profile system guide
- **[📁 Project Structure](./docs/PROJECT_STRUCTURE.md)** - Architecture overview

### Documentation Categories
- **Deployment**: GitHub Pages setup and deployment guides
- **Admin Features**: Dashboard, analytics, profile, and sidebar documentation
- **Analytics**: Interactive charts, data export, and filtering
- **Implementation**: Feature implementation and update summaries
- **Verification**: Testing checklists and verification procedures

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.6
- **Build Tool**: Vite 8.0.16
- **Styling**: Tailwind CSS 3.4.19
- **Routing**: React Router DOM 7.16.0
- **Fonts**: Syne, DM Sans, JetBrains Mono
- **Deployment**: GitHub Pages

## 🎨 Design System

### Colors
- **Primary**: #0066FF (Accent Blue)
- **Background**: #000000 (Primary), #0D1117 (Surface), #161B22 (Card)
- **Text**: #FFFFFF (Primary), #A0AEC0 (Muted)
- **Border**: #1C2333

### Typography
- **Headings**: Syne (Bold)
- **Body**: DM Sans
- **Code/Labels**: JetBrains Mono

## 📂 Project Structure

```
bitforge-project/
├── docs/                    # Complete documentation
├── src/
│   ├── assets/             # Images and static files
│   ├── components/         # Reusable components
│   │   ├── admin/         # Admin-specific components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Admin.jsx
│   │   ├── AdminProfile.jsx
│   │   └── ...
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Public assets
├── dist/                  # Build output
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
└── tailwind.config.js     # Tailwind configuration
```

## 🔧 Configuration

### Vite Configuration
The project is configured for GitHub Pages deployment with the base path set to `/BitForge_IT_services_Management/`.

### Environment
- Node.js 18+ recommended
- npm or yarn package manager

## 📊 Analytics Features

The analytics dashboard includes:
- **Time Range Selector**: Filter data by Today, Week, Month, Quarter, Year
- **Data Export**: Export analytics in JSON or CSV format
- **Interactive Charts**: Hover tooltips and dynamic visualizations
- **Service Filtering**: Filter metrics by service type
- **Real-time Refresh**: Update data with loading states

## 🔐 Authentication

Simple username/password authentication for admin access:
- Username: `admin`
- Password: `BitForge2026!`

## 🌟 Key Features

### Admin Dashboard
- ✅ Fixed sidebar navigation
- ✅ Logout confirmation modal
- ✅ Profile management with avatar upload
- ✅ Responsive design
- ✅ Dark theme UI

### Analytics
- ✅ Revenue growth tracking
- ✅ Service performance metrics
- ✅ User engagement analytics
- ✅ Geographic distribution
- ✅ Conversion funnel analysis
- ✅ Client retention metrics
- ✅ Export functionality

### User Experience
- ✅ Smooth animations and transitions
- ✅ Interactive hover states
- ✅ Loading states for async operations
- ✅ Form validation
- ✅ Responsive mobile design

## 🚀 Deployment

The project is deployed on GitHub Pages and automatically builds from the `gh-pages` branch.

### Deploy Command
```bash
npm run deploy
```

This command:
1. Builds the project (`npm run build`)
2. Deploys to GitHub Pages (`gh-pages -d dist`)

See [DEPLOYMENT_GUIDE.md](./docs/DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📝 License

This project is private and proprietary.

## 👥 Contributors

- Development Team: BitForge IT Services

## 📞 Support

For documentation and guides, see the `/docs` folder or visit the [Documentation Index](./docs/INDEX.md).

---

**Live URL**: https://lowedavid02.github.io/BitForge_IT_services_Management/

**Repository**: https://github.com/LoweDavid02/BitForge_IT_services_Management

**Status**: ✅ Production Ready
