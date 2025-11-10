# Tajir E-Commerce Application

A modern React + Vite e-commerce platform with comprehensive features for buyers and sellers.

## 🚀 Features

### User Features
- **Product Browsing**: Search, filter, and browse products with advanced filtering
- **Shopping Cart**: Add products to cart and manage quantities
- **Order Management**: Track order history and status
- **Reviews & Ratings**: Leave product reviews and ratings
- **User Authentication**: Secure login/signup with token-based auth
- **Profile Management**: Update profile information and preferences

### Seller Features
- **Inventory Management**: Add and manage product listings
- **Order Processing**: View and manage customer orders
- **Analytics**: Track sales and performance metrics
- **Brand Management**: Create and manage product brands
- **Discount Management**: Set up promotional discounts

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Modern browser (Chrome, Firefox, Safari, Edge)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd tajir
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

## 🚀 Getting Started

### Development Server
```bash
npm run dev
```
Runs the app in development mode at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Creates optimized production build in the `dist` folder

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally

### Run Tests
```bash
npm run test
```
Run unit and integration tests in watch mode

### View Test Coverage
```bash
npm run coverage
```
Generate and view code coverage report

### Lint Code
```bash
npm lint
```
Check code quality and style

## 📁 Project Structure

```
src/
├── Component/           # Reusable React components
├── config/              # API and application configuration
├── constants/           # Application constants and enums
├── contexts/            # React Context for state management
├── hooks/               # Custom React hooks
├── utils/               # Utility functions and helpers
├── style/               # CSS stylesheets
├── test/                # Test files and utilities
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

## 🎨 Technology Stack

### Frontend
- **React 18.2** - UI library
- **React Router 6** - Client-side routing
- **Material-UI (MUI)** - Component library
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Build tool
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Testing
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing
- **@testing-library/jest-dom** - DOM matchers

### Development
- **ESLint** - Code linting
- **Postcss** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🔧 Configuration

### Environment Variables
Create a `.env` file with the following variables:
```env
VITE_API_BASE_URL=http://your-api-url
VITE_APP_ENV=development
VITE_LOG_LEVEL=debug
```

### API Configuration
Modify `src/config/api.js` to change API endpoints and URLs.

### Vite Configuration
Modify `vite.config.js` for build and dev server settings.

## 📊 State Management

The application uses React Context API for state management:

- **UserContext** - User authentication and profile
- **CartContext** - Shopping cart management
- **SellerContext** - Seller-specific data

## 🔐 Authentication

The application uses JWT token-based authentication:

1. Token is stored in cookies
2. Automatically attached to API requests
3. Expired tokens trigger re-login
4. Logout clears token and user state

## 🌐 API Integration

All API calls go through the centralized Axios client with:
- Automatic token injection
- Global error handling
- Request/response interceptors
- Retry logic for failed requests
- Timeout management

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Run Tests with UI
```bash
npm run test:ui
```

### View Coverage
```bash
npm run coverage
```

### Test Structure
- `src/test/setup.js` - Global test setup
- `src/test/test-utils.jsx` - Custom render function
- `src/test/*.test.js` - Test files

## 📝 Code Style

This project follows ESLint configuration with React best practices:
- Functional components preferred
- Hooks over class components
- Proper dependency arrays
- Consistent naming conventions

## 🐛 Error Handling

The application includes:
- **Error Boundaries** - Catch component crashes
- **API Error Interceptors** - Handle HTTP errors
- **Toast Notifications** - User-friendly error messages
- **Console Logging** - Development debugging

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS responsive utilities
- MUI responsive components
- Tested on all device sizes

## 🚀 Performance Optimization

- Code splitting with React.lazy()
- Image lazy loading
- API response caching
- Bundle size optimization
- Minification and gzip compression

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Material-UI Documentation](https://mui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Run linting and tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Follow the bug report template

---

**Last Updated**: November 2024
