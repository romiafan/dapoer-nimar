# Dapoer Nimar - E-Commerce Donut Shop

A modern e-commerce web application for a donut shop built with Next.js 15, TypeScript, Firebase, and Tailwind CSS. Features a complete shopping cart system, product management, and payment integration.

## 🚀 Features

### Product Management

- **Product Grid Display**: Responsive grid layout showing donut products with images, prices, and descriptions
- **Product Detail Pages**: Individual product pages with detailed information and back navigation
- **Bulk Quantity Selection**: +/- buttons and direct input for selecting quantities (with hidden spinner arrows for clean UI)
- **Product Categories**: Organized product categorization with visual tags
- **Firebase Integration**: Real-time product data from Firestore database

### Shopping Cart

- **Add to Cart**: Quick add-to-cart functionality from both product grid and detail pages
- **Quantity Management**: Increase/decrease quantities, remove items, and clear cart
- **Visual Feedback**: "Added!" confirmation messages and cart state updates
- **Persistent State**: Cart state maintained using React Context API
- **Indonesian Currency**: Prices displayed in Indonesian Rupiah (IDR) format

### User Experience

- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Interactive Elements**: Hover effects, smooth transitions, and loading states
- **Clean UI**: Modern design with donut emojis as fallback images
- **Navigation**: Seamless navigation between product list and detail pages

### Technical Features

- **Next.js 15**: Latest Next.js with App Router and Turbopack for fast development
- **TypeScript**: Full type safety throughout the application
- **Firebase/Firestore**: Backend database with real-time updates
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Payment Integration**: Prepared for Midtrans and Xendit payment providers

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + styled-jsx
- **Database**: Firebase/Firestore
- **State Management**: React Context API
- **Build Tool**: Turbopack (experimental)
- **Deployment**: Vercel-ready

## 📦 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── products/          # Product listing and detail pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout process
│   ├── orders/            # Order history
│   └── auth/              # Authentication pages
├── components/            # Reusable React components
├── context/               # React Context providers (Cart)
├── lib/                   # Utility functions and configurations
│   ├── firebase.ts        # Firebase configuration
│   ├── indonesian-utils.ts # Currency formatting
│   └── payment.ts         # Payment integration
└── types/                 # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project with Firestore database
- Environment variables configured

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd dapoer-nimar
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file with your Firebase configuration:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Server-side Firebase (for admin operations)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY=your_private_key
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

### Database Setup

Use the provided seed script to populate your Firestore with sample products:

```bash
node scripts/seed-products.js
```

## � Changelog

### Version 0.2.0 (September 15, 2025) - Major Feature Release
- ✅ **Complete E-commerce Implementation**: Full shopping cart system with product management
- ✅ **Firebase Integration**: Real-time database with Firestore, environment variable optimization
- ✅ **Enhanced Product Experience**: Bulk quantity selection, add to cart, product detail pages
- ✅ **TypeScript Implementation**: Full type safety with comprehensive type definitions
- ✅ **Payment Infrastructure**: Prepared integration for Midtrans and Xendit payment providers
- ✅ **UI/UX Improvements**: Responsive design, loading states, visual feedback
- ✅ **Development Tools**: Seed scripts, cleanup utilities, enhanced build configuration

### Version 0.1.0 (Initial Release)
- 🎯 **Project Setup**: Next.js 15 with App Router and Turbopack
- 🎯 **Basic Structure**: Initial project scaffolding and configuration

## �🔧 Development Notes

### Recent Updates (September 2025)

- ✅ **Fixed Firebase Environment Variables**: Resolved Turbopack compatibility issues with server-side environment validation
- ✅ **Enhanced Product Grid**: Added bulk quantity selection with +/- buttons and clean number inputs (no spinner arrows)
- ✅ **Improved UX**: Added "Add to Cart" functionality with visual feedback and temporary confirmation messages
- ✅ **Navigation Enhancement**: Added back buttons on product detail pages for better user flow
- ✅ **Cart Integration**: Full shopping cart functionality with React Context state management

### Key Components

#### ProductsClient (`src/app/products/ProductsClient.tsx`)

- Client-side product grid with cart integration
- Quantity selectors with increment/decrement buttons
- Add to cart functionality with loading states
- Responsive grid layout with hover effects

#### Cart Context (`src/context/CartContext.tsx`)

- Global cart state management
- Add, remove, and update item quantities
- Calculate totals and manage cart persistence

#### Firebase Configuration (`src/lib/firebase.ts`)

- Environment variable validation (server-side only for Turbopack compatibility)
- Firestore database connection
- Product data fetching and management

## 🚦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Populate database with sample products
```

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Environment Variables**: Ensure both `NEXT_PUBLIC_` and server-side variables are set
2. **Turbopack Compatibility**: Some environment variables may not load in development - use server-side validation
3. **Styled-JSX**: Place style tags carefully to avoid parsing errors in React components

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: Single column product grid
- **Tablet**: 2-column grid layout
- **Desktop**: 3-column grid with enhanced hover effects

## 🔐 Environment Configuration

Required environment variables for full functionality:

- Firebase configuration (client and server-side)
- Payment provider credentials (Midtrans, Xendit)
- Development/production environment flags

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
