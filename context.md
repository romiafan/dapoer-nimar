CONTEXT FOR GITHUB COPILOT AGENT
Project Overview

We are building a clean, simple, and modern e-commerce website for a UMKM (Micro, Small, and Medium Enterprise) based in Indonesia. The primary goal is to create a fast, reliable, and easy-to-manage online store.
Tech Stack

    Framework: Next.js (with App Router)

    Language: TypeScript

    Styling: Tailwind CSS

    Backend & Database: Firebase (Firestore for database, Firebase Authentication for users)

    Deployment: Vercel

Key Objectives & Best Practices

    Clean Code: Write readable, well-commented, and maintainable code. Follow standard TypeScript and React best practices.

    Component-Based Architecture: Break down the UI into small, reusable components. Keep components focused on a single responsibility.

    Server-Side Rendering (SSR) & Static Site Generation (SSG): Use Next.js data fetching methods (getServerSideProps or getStaticProps) appropriately for performance and SEO. For the product list, SSR is preferred to ensure data is always fresh.

    Environment Variables: All sensitive keys and configuration (especially Firebase credentials) MUST be stored in .env.local and accessed via process.env. Do not hardcode them.

    Indonesian Context: The store will cater to the Indonesian market. This means future integrations will include local payment gateways (like Midtrans/Xendit) and local shipping couriers. The currency should be formatted as "Rp".

    State Management: For the shopping cart, we will start with React's built-in Context API for simplicity.

Project Roadmap (High-Level)

    Phase 1: Setup & Foundation: Initialize project, set up Firebase, create basic layout.

    Phase 2: Core E-commerce Features: Display products, create product detail pages, implement shopping cart.

    Phase 3: Checkout & Orders: Implement user authentication, checkout flow, payment gateway integration, and order creation.

    Phase 4: Final Touches & Deployment: Finalize styling, ensure responsiveness, and deploy to Vercel.

INITIAL PROMPT FOR GITHUB COPILOT AGENT

"Hello! We are starting Phase 1 of our e-commerce project as outlined in the context above.

Your first task is to help me initialize the project and create the basic structure. Please provide the following:

    The exact npx command to create a new Next.js project named dapoer-nimar using TypeScript, Tailwind CSS, and ESLint.

    After that, generate the code for a basic Layout component. This component should be located at components/layout/Layout.tsx. It should include a simple Header, Footer, and a main element that will render the page's children props. The Header should have a placeholder for a logo and navigation links. The Footer should contain a copyright notice for the current year.

Let's start with these two steps."
