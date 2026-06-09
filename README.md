# Crescent Dashboard

A comprehensive donation management dashboard built for non-profit organizations to track donations, manage donors, and analyze fundraising performance.

## 🚀 Live Demo

[View Live Application](https://crescent-dashboard.vercel.app)

## ✨ Core Features

### 🔐 Authentication System
- Multi-step registration process (5 steps)
- Login with email and password
- Two-factor authentication (2FA) verification
- Password reset with OTP verification
- Secure session management with Redux Persist

### 📊 Analytics Dashboard
- Real-time donation statistics
- Interactive charts and graphs
- Filter by time period (Today, This Week, This Month)
- Top donors tracking
- Quick links for navigation
- Donation pattern analysis

### 👥 Donor Management
- View all donors with detailed profiles
- Categorize donors by donation type:
  - Round-up donations
  - Recurring donations
  - One-time donations
- Search and filter donors
- Donor engagement tracking

### 💰 Deposits & Payouts
- View deposit history and balances
- Payout scheduling and management
- PDF receipt generation for deposits
- Stripe Connect integration
- Balance tracking (available/pending)

### 🔗 Integrations
- Connect with third-party platforms:
  - Webflow
  - Slack
  - Google Sheets
  - Hubspot
- Toggle integration status
- Easy connection management

### 📈 Reports
- Comprehensive donation reports
- Export data to Excel format
- Filter by status (Processing, Completed, Failed, Refunded, Canceled)
- Search functionality
- Receipt resend capability
- Detailed transaction history

### 💳 Subscription Management
- View active subscription plans
- Subscription history tracking
- Billing history with invoices
- Plan upgrade/downgrade options
- Cancel subscription management

### 👤 Profile Management
- Edit organization profile
- Access control management
- Cause/envelope management
- Profile customization

### ⚙️ Settings
- Notification preferences
- Account settings
- Security settings
- Customization options

## 🛠 Technology Stack

### Frontend Framework
- **React 18.3.1** - UI library
- **TypeScript 5.6.2** - Type safety
- **Vite 6.0.5** - Build tool and dev server

### State Management
- **Redux Toolkit 2.10.1** - State management
- **Redux Persist 6.0.0** - State persistence
- **RTK Query** - API data fetching

### UI Components & Styling
- **Ant Design 5.23.2** - UI component library
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **PostCSS 8.5.1** - CSS processing
- **React Icons 5.4.0** - Icon library

### Routing & Navigation
- **React Router DOM 7.1.3** - Client-side routing

### Data Visualization
- **Recharts 2.15.3** - Chart library

### Date & Time Handling
- **Dayjs 1.11.13** - Date manipulation
- **Moment 2.30.1** - Date utilities

### File Export & Generation
- **XLSX 0.18.5** - Excel file generation
- **jsPDF 3.0.4** - PDF generation
- **html2canvas 1.4.1** - HTML to canvas
- **file-saver 2.0.5** - File saving

### Additional Libraries
- **qrcode.react 4.2.0** - QR code generation
- **react-otp-input 3.1.1** - OTP input component
- **sweetalert2 11.23.0** - Alert notifications
- **localforage 1.10.0** - Offline storage
- **match-sorter 8.0.0** - Data sorting
- **sort-by 1.2.0** - Data sorting utilities

### Code Quality
- **ESLint 9.17.0** - Code linting
- **TypeScript ESLint 8.18.2** - TypeScript linting

### Deployment
- **Vercel** - Cloud hosting platform
- **API Proxy** - Backend integration at `http://13.55.115.124:5000`

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🏗 Project Structure

```
src/
├── components/          # Reusable components
│   ├── AuthComponents/ # Authentication components
│   ├── DashboardComponnets/
│   ├── DonorComponnet/
│   ├── EditProfileComponents/
│   ├── PagesComponents/
│   ├── ProfileComponents/
│   ├── SettingsComponents/
│   └── layouts/        # Layout components
├── pages/              # Page components
│   ├── Analytics/
│   ├── Auth/
│   ├── Cancel/
│   ├── Deposits/
│   ├── Donors/
│   ├── Integration/
│   ├── NotFound/
│   ├── Profile/
│   ├── Reports/
│   ├── Settings/
│   ├── Subscriptions/
│   └── Success/
├── redux/              # Redux store and slices
│   ├── api/           # API configurations
│   ├── features/      # Redux slices
│   └── utils/         # Redux utilities
├── routes/            # Route configurations
└── main.tsx          # Application entry point
```

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_base_url
```

## 📝 API Integration

The application uses Redux Toolkit Query for API communication with the backend. All API calls are configured in `src/redux/api/baseApi.ts` with automatic token injection and error handling.

## 🎯 Key Features Implementation

### Authentication Flow
- Multi-step registration with validation
- JWT token-based authentication
- Automatic token refresh
- Protected routes with `PrivateRoute` component

### Data Export
- Excel export for reports and donor data
- PDF generation for deposit receipts
- Customizable export formats

### Responsive Design
- Mobile-first approach
- Responsive layouts for all screen sizes
- Touch-friendly interface

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👥 Support

For support, please contact the development team.
