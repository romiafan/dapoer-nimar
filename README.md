# Dapoer Nimar - E-Commerce Donut Shop

A modern e-commerce web application for a donut shop built with Next.js 15, TypeScript, Firebase, and Tailwind CSS. Features a complete shopping ## 📈 Changelog

### Version 0.3.0 (September 18, 2025) - Complete Admin System

- ✅ **Complete Admin E-commerce System**: Full admin panel with authentication, dashboard, and management tools
- ✅ **Admin Authentication**: Role-based access control with email whitelist system
- ✅ **Product Management**: Complete CRUD operations for products with rich forms and image preview
- ✅ **Order Management**: Full order lifecycle tracking with status updates and payment monitoring
- ✅ **Payment Integration**: Production-ready Midtrans integration with transaction verification
- ✅ **Admin Dashboard**: Statistics overview, quick actions, and recent activity monitoring
- ✅ **Enhanced Cart**: Quantity controls, persistent state, and improved UX
- ✅ **Professional UI**: Responsive admin interface with Tailwind CSS
- ✅ **Real-time Updates**: Live data synchronization with Firebase Firestore

### Version 0.2.0 (September 15, 2025) - Major Feature Release

- ✅ **Complete E-commerce Implementation**: Full shopping cart system with product management
- ✅ **Firebase Integration**: Real-time database with Firestore, environment variable optimization
- ✅ **Enhanced Product Experience**: Bulk quantity selection, add to cart, product detail pages
- ✅ **TypeScript Implementation**: Full type safety with comprehensive type definitions
- ✅ **Payment Infrastructure**: Prepared integration for Midtrans and Xendit payment providers
- ✅ **UI/UX Improvements**: Responsive design, loading states, visual feedback
- ✅ **Development Tools**: Seed scripts, cleanup utilities, enhanced build configuration, admin panel, product management, and payment integration with Midtrans.

## 🚀 Features

### 🛒 Customer Features

#### Product Management
- **Product Grid Display**: Responsive grid layout showing donut products with images, prices, and descriptions
- **Product Detail Pages**: Individual product pages with detailed information and back navigation
- **Bulk Quantity Selection**: +/- buttons and direct input for selecting quantities (with hidden spinner arrows for clean UI)
- **Product Categories**: Organized product categorization with visual tags
- **Firebase Integration**: Real-time product data from Firestore database

#### Shopping Cart
- **Add to Cart**: Quick add-to-cart functionality from both product grid and detail pages
- **Quantity Management**: Increase/decrease quantities, remove items, and clear cart
- **Visual Feedback**: "Added!" confirmation messages and cart state updates
- **Persistent State**: Cart state maintained using React Context API and localStorage
- **Indonesian Currency**: Prices displayed in Indonesian Rupiah (IDR) format

#### Payment System
- **Midtrans Integration**: Secure payment processing for Indonesian market
- **Multiple Payment Methods**: Bank transfer, e-wallets, credit cards
- **Transaction Verification**: Real-time payment status tracking
- **Order Confirmation**: Automated order processing and confirmation

### 🔧 Admin Features

#### Admin Authentication
- **Role-Based Access**: Email-based admin authentication system
- **Secure Login**: Protected admin routes with environment variable configuration
- **Session Management**: Persistent admin sessions with Firebase Auth

#### Admin Dashboard
- **Statistics Overview**: Total products, orders, revenue, and recent activity
- **Quick Actions**: Fast access to common admin tasks
- **Recent Data**: Latest products and orders display
- **Revenue Analytics**: Real-time revenue calculations and reporting

#### Product Management (Admin)
- **Complete CRUD Operations**: Create, read, update, delete products
- **Rich Product Forms**: Image preview, category selection, availability toggle
- **Search & Filter**: Find products by name, description, or category
- **Bulk Operations**: Enable/disable multiple products, batch operations
- **Image Management**: URL-based image integration with preview

#### Order Management
- **Order Tracking**: Complete order lifecycle management
- **Status Updates**: pending → processing → shipped → delivered → cancelled
- **Payment Tracking**: Monitor payment status (pending/paid/failed/refunded)
- **Customer Information**: Full customer details and contact information
- **Order Details**: Complete order breakdown with items and totals

### User Experience

- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Interactive Elements**: Hover effects, smooth transitions, and loading states
- **Clean UI**: Modern design with donut emojis as fallback images
- **Navigation**: Seamless navigation between customer and admin interfaces

### Technical Features

- **Next.js 15**: Latest Next.js with App Router and Turbopack for fast development
- **TypeScript**: Full type safety throughout the application
- **Firebase/Firestore**: Backend database with real-time updates
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Payment Integration**: Production-ready Midtrans integration for Indonesian market

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
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin panel (dashboard, products, orders)
│   ├── api/               # API routes (payment processing)
│   └── payment/           # Payment success/failure pages
├── components/            # Reusable React components
│   ├── layout/            # Layout components
│   └── admin/             # Admin-specific components
├── context/               # React Context providers
│   ├── CartContext.tsx    # Shopping cart state management
│   └── AdminContext.tsx   # Admin authentication
├── lib/                   # Utility functions and configurations
│   ├── firebase.ts        # Firebase configuration
│   ├── indonesian-utils.ts # Currency formatting
│   └── payment.ts         # Midtrans payment integration
└── types/                 # TypeScript type definitions
```

## 🔐 Admin Panel

### Access
- **URL**: `/admin`
- **Credentials**: `admin@dapoer-nimar.com` / `adminpassword`
- **Features**: Dashboard, product management, order management

### Admin Capabilities
- **Product Management**: Add, edit, delete, and manage product availability
- **Order Processing**: Track orders from pending to delivered
- **Payment Monitoring**: Monitor payment status and process refunds
- **Analytics**: Revenue tracking and business insights

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

# Payment Integration (Midtrans)
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_IS_PRODUCTION=false

# Admin Configuration
ADMIN_EMAIL=admin@dapoer-nimar.com
ADMIN_PASSWORD=adminpassword
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

- ✅ **Complete Admin System**: Full admin panel with authentication, product management, and order tracking
- ✅ **Midtrans Payment Integration**: Production-ready payment processing for Indonesian market
- ✅ **Enhanced Cart System**: Quantity controls, persistent state, and improved user experience
- ✅ **Order Management**: Complete order lifecycle from creation to delivery
- ✅ **Real-time Analytics**: Revenue tracking, order statistics, and business insights
- ✅ **Professional Admin UI**: Responsive admin interface with dashboard and management tools

### Key Components

#### Admin System
- **AdminContext** (`src/context/AdminContext.tsx`): Admin authentication and role management
- **AdminLayout** (`components/admin/AdminLayout.tsx`): Admin panel layout with navigation
- **Admin Dashboard** (`src/app/admin/page.tsx`): Statistics, quick actions, and overview
- **Product Management** (`src/app/admin/products/`): CRUD operations for product catalog
- **Order Management** (`src/app/admin/orders/page.tsx`): Order tracking and status management

#### Customer Features
- **ProductsClient** (`src/app/products/ProductsClient.tsx`): Client-side product grid with cart integration
- **Cart Context** (`src/context/CartContext.tsx`): Global cart state management with quantity controls
- **Payment Integration** (`src/lib/payment.ts`): Midtrans payment processing with transaction verification

#### Core Infrastructure
- **Firebase Configuration** (`src/lib/firebase.ts`): Environment variable validation and Firestore connection
- **Payment API** (`src/app/api/payment/route.ts`): Server-side payment processing endpoints

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
