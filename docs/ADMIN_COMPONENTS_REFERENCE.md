# Admin Components Reference Guide

## Component Architecture

### Main Admin Component
**File:** `src/pages/Admin.jsx`
**Purpose:** Main container with sidebar navigation and conditional rendering

**Key Features:**
- Authentication check
- Sidebar navigation
- Profile dropdown
- Conditional page rendering based on `activeMenu` state

**State Variables:**
```javascript
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [activeMenu, setActiveMenu] = useState('Dashboard');
const [showProfileDropdown, setShowProfileDropdown] = useState(false);
const [adminProfile, setAdminProfile] = useState(null);
```

**Menu Items:**
- Dashboard
- Bookings
- Team Access
- Calendar
- Feedback
- Settings

---

## Content Components

### 1. DashboardContent Component
**File:** `src/components/admin/DashboardContent.jsx`

**Props:** None (standalone component)

**State:**
```javascript
const [chartView, setChartView] = useState('monthly');
```

**Data Structures:**
```javascript
// Stats cards
stats = [
  { label, value, change, icon }
]

// Alerts
alerts = [
  { type, message, time, color }
]

// Bookings
bookings = [
  { user, service, date, status, avatar }
]

// Chart data
chartData = [
  { month, value }
]
```

**Key Sections:**
1. Header with systems online indicator
2. Stats cards grid (4 columns)
3. Forge Activity chart with toggle
4. System Alerts panel
5. Recent Bookings table
6. Footer with links

---

### 2. BookingsContent Component
**File:** `src/components/admin/BookingsContent.jsx`

**Props:** None (standalone component)

**State:**
```javascript
const [currentPage, setCurrentPage] = useState(1);
const [searchQuery, setSearchQuery] = useState('');
```

**Data Structures:**
```javascript
// Stats
stats = [
  { label, value, icon, color }
]

// Bookings
bookings = [
  { client, service, date, status, avatar }
]

// Utilization data
utilizationData = [
  { day, value }
]
```

**Helper Functions:**
```javascript
getStatusColor(status) {
  // Returns Tailwind classes based on status
  // CONFIRMED: green
  // PENDING: yellow
  // RESCHEDULED: blue
}
```

**Key Sections:**
1. Header with search bar
2. Stats cards grid (4 columns)
3. Filter and Export buttons
4. Bookings table with pagination
5. Utilization trend chart
6. Automate confirmation card

---

### 3. CalendarContent Component
**File:** `src/components/admin/CalendarContent.jsx`

**Props:** None (standalone component)

**State:**
```javascript
const [viewMode, setViewMode] = useState('month');
const [selectedCategory, setSelectedCategory] = useState('all');
const [selectedTeamMember, setSelectedTeamMember] = useState('all');
const [showKickoff, setShowKickoff] = useState(true);
const [showConsultation, setShowConsultation] = useState(true);
```

**Data Structures:**
```javascript
// Today's agenda
todayAgenda = [
  { time, title, client, type, color }
]

// Deadlines
deadlines = [
  { project, client, date, priority }
]

// Calendar days
calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

// Events by date
events = {
  2: [{ title, type }],
  5: [{ title, type }],
  // ...
}
```

**Key Sections:**
1. Header with search and view toggles
2. Filter dropdowns and checkboxes
3. Calendar grid (7x5)
4. Today's Agenda sidebar
5. Critical Deadlines section
6. Admin profile card

---

### 4. SettingsContent Component
**File:** `src/components/admin/SettingsContent.jsx`

**Props:** None (standalone component)

**State:**
```javascript
const [activeTab, setActiveTab] = useState('general');
const [developerMode, setDeveloperMode] = useState(false);
const [formData, setFormData] = useState({
  brandName: 'BitForge IT Suite',
  contactEmail: 'admin@bitforge.io',
  timezone: 'UTC',
  language: 'en-US'
});
```

**Data Structures:**
```javascript
// Tabs
tabs = [
  { id: 'general', label: 'GENERAL' },
  { id: 'security', label: 'SECURITY' },
  { id: 'notifications', label: 'NOTIFICATIONS' },
  { id: 'api', label: 'API KEYS' }
]
```

**Functions:**
```javascript
handleInputChange(e) {
  // Updates formData state
}

handleReset() {
  // Resets form to defaults
}

handleSave() {
  // Saves settings (mock alert)
}
```

**Key Sections:**
1. Header with tabs navigation
2. General settings form
3. Security settings panel
4. Notifications preferences
5. API keys management
6. Right sidebar:
   - Forge Maintenance card
   - System Status card
   - Admin profile card

---

## Reusable Components

### Card Component
**File:** `src/components/Card.jsx`

**Props:**
```javascript
{
  children,      // React nodes
  className,     // Additional CSS classes
  hover          // Boolean for hover effect
}
```

**Usage:**
```jsx
<Card className="p-6">
  <h2>Title</h2>
  <p>Content</p>
</Card>
```

---

### Badge Component
**File:** `src/components/Badge.jsx`

**Props:**
```javascript
{
  children,      // Badge text
  active,        // Boolean for active state
  className      // Additional CSS classes
}
```

**Usage:**
```jsx
<Badge active>CONFIRMED</Badge>
<Badge>PENDING</Badge>
```

---

### Button Component
**File:** `src/components/Button.jsx`

**Props:**
```javascript
{
  children,      // Button text
  variant,       // 'primary' | 'secondary'
  onClick,       // Click handler
  type,          // 'button' | 'submit'
  className,     // Additional CSS classes
  disabled       // Boolean
}
```

**Usage:**
```jsx
<Button variant="primary" onClick={handleClick}>
  Save Changes
</Button>
```

---

## Styling Conventions

### Tailwind Classes

**Layout:**
```css
.grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
.flex items-center justify-between
.space-y-4
```

**Cards:**
```css
.card p-6                    /* Base card */
.bg-bg-surface              /* Card background */
.border border-border-color /* Card border */
.rounded-lg                 /* Rounded corners */
```

**Typography:**
```css
.font-syne font-bold text-4xl    /* Main headings */
.font-dm-sans                    /* Body text */
.font-jetbrains text-xs uppercase /* Labels */
.text-text-muted                 /* Secondary text */
```

**Buttons:**
```css
.btn-primary    /* Blue button */
.btn-secondary  /* Outlined button */
```

**Badges:**
```css
.badge-active   /* Blue badge */
.badge-inactive /* Gray badge */
```

**Status Colors:**
```css
.bg-green-500/20 text-green-400 border-green-500/50  /* Success */
.bg-yellow-500/20 text-yellow-400 border-yellow-500/50 /* Warning */
.bg-red-500/20 text-red-400 border-red-500/50       /* Error */
.bg-blue-500/20 text-blue-400 border-blue-500/50    /* Info */
```

---

## Icon Library

All icons use inline SVG with Heroicons-style paths:

**Common Icons:**
```jsx
// Dashboard
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
</svg>

// Calendar
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>

// Settings
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

// Search
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>

// Edit
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
</svg>

// Delete
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
```

---

## Data Flow

### Navigation Flow
```
User clicks sidebar item
  ↓
setActiveMenu(itemName)
  ↓
Admin.jsx conditional rendering
  ↓
Appropriate content component renders
```

### Form Flow (Settings)
```
User types in input
  ↓
handleInputChange(e)
  ↓
setFormData({ ...prev, [name]: value })
  ↓
Input value updates
```

### Toggle Flow
```
User clicks toggle
  ↓
setState(!state)
  ↓
UI updates with new state
```

---

## Responsive Breakpoints

```javascript
// Mobile: < 768px
// Tablet: 768px - 1024px
// Desktop: > 1024px

// Tailwind breakpoints used:
md:  // 768px
lg:  // 1024px
xl:  // 1280px
```

**Example:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* 1 column on mobile, 2 on tablet, 4 on desktop */}
</div>
```

---

## Best Practices

### Component Structure
1. Import statements
2. Component definition
3. State declarations
4. Data structures
5. Helper functions
6. Return JSX

### State Management
- Use `useState` for local state
- Keep state close to where it's used
- Lift state up only when needed

### Styling
- Use Tailwind utility classes
- Follow design system colors
- Maintain consistent spacing
- Use responsive classes

### Performance
- Avoid inline functions in JSX
- Use `key` prop in lists
- Memoize expensive calculations
- Lazy load heavy components

### Accessibility
- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation
- Maintain color contrast

---

## Common Patterns

### Stats Card Pattern
```jsx
<Card className="p-6">
  <div className="flex items-start justify-between mb-4">
    <div className={color}>{icon}</div>
  </div>
  <p className="text-text-muted text-sm mb-1 font-jetbrains uppercase">
    {label}
  </p>
  <p className="font-syne font-bold text-3xl text-white">
    {value}
  </p>
</Card>
```

### Table Pattern
```jsx
<table className="w-full">
  <thead>
    <tr className="border-b border-border-color">
      <th className="text-left py-3 px-4 font-jetbrains text-xs text-text-muted uppercase">
        Column Name
      </th>
    </tr>
  </thead>
  <tbody>
    {data.map((item, index) => (
      <tr key={index} className="border-b border-border-color hover:bg-bg-card transition-colors">
        <td className="py-4 px-4">{item.value}</td>
      </tr>
    ))}
  </tbody>
</table>
```

### Toggle Pattern
```jsx
<label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={state}
    onChange={(e) => setState(e.target.checked)}
    className="sr-only peer"
  />
  <div className="w-11 h-6 bg-bg-surface peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue"></div>
</label>
```

---

## Troubleshooting

### Component not rendering
- Check import path
- Verify component export
- Check conditional logic in Admin.jsx

### Styles not applying
- Verify Tailwind class names
- Check for typos
- Ensure Tailwind config includes file

### State not updating
- Check useState initialization
- Verify event handler binding
- Use React DevTools to inspect state

### Icons not showing
- Check SVG viewBox
- Verify stroke attributes
- Ensure proper className

---

**Last Updated:** January 2024
**Maintained By:** BitForge Development Team
