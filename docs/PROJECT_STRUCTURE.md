# BitForge Project Structure

## Directory Layout

```
bitforge-project/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── Badge.jsx          # Reusable badge component
│   │   ├── Button.jsx          # Primary/Secondary button component
│   │   ├── Card.jsx            # Card container with hover effects
│   │   ├── Input.jsx           # Form input component
│   │   └── Navigation.jsx      # Sticky navigation bar
│   ├── pages/
│   │   ├── Admin.jsx           # Admin Dashboard with RBAC
│   │   ├── Booking.jsx         # 3-step booking wizard
│   │   ├── Feedback.jsx        # Feedback form with rating
│   │   ├── Home.jsx            # Landing page
│   │   ├── Portfolio.jsx       # Portfolio & Services showcase
│   │   └── Team.jsx            # Team members directory
│   ├── App.css
│   ├── App.jsx                 # Main app with routing
│   ├── index.css               # Tailwind directives & custom styles
│   └── main.jsx                # React entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js           # PostCSS configuration
├── README.md
├── tailwind.config.js          # Tailwind CSS configuration
└── vite.config.js              # Vite configuration
```

## Component Architecture

### Reusable Components (`src/components/`)

#### Badge.jsx
- Props: `children`, `active`, `className`
- Usage: Status indicators, role labels, feature tags
- Variants: Active (blue), Inactive (grey)

#### Button.jsx
- Props: `children`, `variant`, `onClick`, `type`, `className`, `disabled`
- Variants: `primary` (solid blue), `secondary` (outlined)
- Features: Hover effects, disabled state, custom classes

#### Card.jsx
- Props: `children`, `className`, `hover`
- Features: Border, shadow, optional hover scale effect
- Usage: Content containers, project cards, stat cards

#### Input.jsx
- Props: `type`, `placeholder`, `value`, `onChange`, `name`, `required`, `className`
- Features: Focus ring, validation, custom styling
- Usage: Forms, search fields

#### Navigation.jsx
- Features: Sticky positioning, mobile menu, active link highlighting
- Responsive: Desktop horizontal menu, mobile hamburger menu
- Links: Home, Portfolio, Services, Team, Booking, Contact

### Pages (`src/pages/`)

#### Home.jsx
- Sections: Hero, Marquee, Mission Stats, CTA
- Features: Full viewport hero, animated marquee, stat cards
- CTAs: "Get Started", "View Our Work"

#### Portfolio.jsx
- Sections: Portfolio Grid, Services, Contact Options
- Features: 6 project cards, 4 service cards, 3 contact buttons
- Layout: 3-column grid (responsive)

#### Booking.jsx
- Steps: Select Service → Choose Date & Time → Confirm
- Features: Step indicator, calendar, time slots, form validation
- State Management: Multi-step form with local state

#### Team.jsx
- Features: Department tabs, team grid, featured member
- Filtering: All, Management, Design, Development, QA
- Layout: 4-column grid (responsive)

#### Feedback.jsx
- Features: Form validation, 5-star rating, success state
- Fields: Name, Email, Service, Message, Rating
- Security: Encryption notice

#### Admin.jsx
- Features: Sidebar nav, metrics, employee table, audit log
- RBAC: Role-based access levels (Admin, Developer, QA)
- Layout: Sidebar + main content area

## Routing Structure

```javascript
/ (Home)
├── /portfolio (Portfolio & Services)
├── /booking (Booking & Reservation)
├── /team (Meet the Team)
├── /feedback (Feedback Form)
└── /admin (Admin Dashboard - No Navigation)
```

## Styling Architecture

### Tailwind Configuration (`tailwind.config.js`)
- Custom colors: bg-primary, bg-surface, accent-blue, etc.
- Custom fonts: Syne, DM Sans, JetBrains Mono
- Custom shadows: blue-glow, card

### Custom CSS (`src/index.css`)
- Component classes: `.btn-primary`, `.btn-secondary`, `.card`, `.badge`
- Animations: `@keyframes marquee`
- Scrollbar styling
- Base styles with `@layer`

## State Management

- **Local State**: React `useState` for component-level state
- **Form State**: Controlled components with state objects
- **Navigation State**: React Router for routing
- **No Global State**: Simple application, no Redux/Context needed

## Data Flow

1. **Static Data**: Hardcoded in components (team members, services, projects)
2. **Form Data**: Controlled inputs with onChange handlers
3. **Navigation**: React Router with Link components
4. **User Actions**: Event handlers (onClick, onChange, onSubmit)

## Build Configuration

### Vite (`vite.config.js`)
- React plugin for JSX support
- Fast HMR (Hot Module Replacement)
- Optimized production builds

### PostCSS (`postcss.config.js`)
- Tailwind CSS processing
- Autoprefixer for browser compatibility

### ESLint (`eslint.config.js`)
- React hooks rules
- React refresh plugin
- Code quality enforcement

## Development Workflow

1. **Start Dev Server**: `npm run dev`
2. **Make Changes**: Edit files in `src/`
3. **Hot Reload**: Changes reflect instantly
4. **Build**: `npm run build`
5. **Preview**: `npm run preview`

## Production Build

- Output: `dist/` directory
- Optimized: Minified CSS/JS, tree-shaking
- Assets: Hashed filenames for caching
- Size: ~270KB JS, ~21KB CSS (gzipped: ~83KB JS, ~5KB CSS)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features
- CSS Grid and Flexbox
- CSS Custom Properties

## Performance Optimizations

- Code splitting with React Router
- Lazy loading (can be added)
- Optimized images (external URLs)
- Minimal dependencies
- Tree-shaking in production

## Future Enhancements

- [ ] Backend API integration
- [ ] Authentication system
- [ ] Database for bookings
- [ ] Email notifications
- [ ] Image optimization
- [ ] SEO improvements
- [ ] Analytics integration
- [ ] Progressive Web App (PWA)
- [ ] Internationalization (i18n)
- [ ] Dark/Light mode toggle
