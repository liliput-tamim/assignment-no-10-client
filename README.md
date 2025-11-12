# StudyMate Frontend

React frontend for StudyMate - Find Your Perfect Study Partner application.

## 🚀 Features

- **Firebase Authentication** - Email/password and Google sign-in
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Partner Discovery** - Search and filter study partners
- **Profile Management** - Create and manage study partner profiles
- **Connection System** - Send and manage partner requests
- **Private Routes** - Protected pages with authentication
- **Toast Notifications** - User feedback with react-toastify

## 📋 Prerequisites

- Node.js (v18 or higher)
- Firebase project configured

## 🛠️ Installation

1. **Navigate to client directory:**
```bash
cd assingment-no-10-client
npm install
```

2. **Configure Firebase:**
Update `src/utils/firebase.js` with your Firebase config:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  // ... other config
};
```

3. **Start development server:**
```bash
npm run dev
```

## 📱 Pages & Features

### Public Pages
- **Home** - Hero section, top partners, how it works, testimonials
- **Find Partners** - Browse all study partners with search/filter
- **Login/Register** - Authentication with Firebase
- **Partner Details** - View detailed partner information

### Protected Pages (Login Required)
- **Create Profile** - Create study partner profile
- **My Connections** - Manage sent partner requests
- **Profile** - View user profile information

## 🎨 Design System

- **Primary Color**: Indigo (#4f46e5)
- **Typography**: Inter font family
- **Components**: Consistent button styles, cards, forms
- **Icons**: React Icons (Font Awesome)
- **Responsive**: Mobile-first with Tailwind breakpoints

## 🔧 Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase Auth** - Authentication service
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications
- **React Icons** - Icon library

## 📁 Project Structure

```
assingment-no-10-client/
├── public/
├── src/
│   ├── components/
│   │   ├── Header/           # Navigation header
│   │   ├── Footer/           # Site footer
│   │   ├── Banner/           # Hero carousel
│   │   ├── TopPartners/      # Featured partners
│   │   ├── HowItWorks/       # Process steps
│   │   ├── Testimonials/     # User reviews
│   │   ├── Logo/             # Brand logo
│   │   ├── PrivateRoute/     # Route protection
│   │   └── UpdateModal/      # Edit modal
│   ├── pages/
│   │   ├── Home/             # Landing page
│   │   ├── FindPartners/     # Partner discovery
│   │   ├── Login/            # Authentication
│   │   ├── Register/         # User registration
│   │   ├── Profile/          # User profile
│   │   ├── CreateProfile/    # Profile creation
│   │   ├── MyConnections/    # Connection management
│   │   ├── PartnerDetails/   # Partner details
│   │   └── NotFound/         # 404 page
│   ├── context/
│   │   └── AuthContext.jsx   # Authentication state
│   ├── utils/
│   │   └── firebase.js       # Firebase configuration
│   ├── App.jsx               # Main app component
│   └── main.jsx              # App entry point
├── package.json
└── README.md
```

## 🚀 Deployment

### Netlify Deployment

1. **Build the project:**
```bash
npm run build
```

2. **Deploy to Netlify:**
- Connect GitHub repository
- Set build command: `npm run build`
- Set publish directory: `dist`
- Add environment variables if needed

### Firebase Hosting

1. **Install Firebase CLI:**
```bash
npm install -g firebase-tools
```

2. **Initialize and deploy:**
```bash
firebase login
firebase init hosting
npm run build
firebase deploy
```

### Surge Deployment

1. **Install Surge:**
```bash
npm install -g surge
```

2. **Build and deploy:**
```bash
npm run build
cd dist
surge
```

## 🔐 Environment Variables

Create `.env.local` file for local development:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration with email/password
- [ ] User login with email/password
- [ ] Google authentication
- [ ] Create partner profile
- [ ] Search and filter partners
- [ ] Send partner requests
- [ ] View partner details
- [ ] Update connection information
- [ ] Delete connections
- [ ] Responsive design on mobile/tablet
- [ ] Toast notifications working
- [ ] Private route protection

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with proper commit messages
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is licensed under the ISC License.