"use client";
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '../../src/context/AdminContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../src/lib/firebase';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isAdmin, loading } = useAdmin();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need admin privileges to access this page.</p>
          <Link
            href="/auth"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In as Admin
          </Link>
        </div>
      </div>
    );
  }

  async function handleSignOut() {
    await signOut(auth);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/admin" className="flex items-center">
                <span className="text-2xl mr-2">🍩</span>
                <h1 className="text-xl font-bold text-gray-900">Dapoer Nimar Admin</h1>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/admin"
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === '/admin'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/products"
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  pathname.startsWith('/admin/products')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Products
              </Link>
              <Link
                href="/admin/orders"
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  pathname.startsWith('/admin/orders')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Orders
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 text-sm"
              >
                View Store
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}