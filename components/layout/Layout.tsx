"use client";
import React, { ReactNode, useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../../src/lib/firebase';
import { useCart } from '../../src/context/CartContext';

const currentYear = new Date().getFullYear();

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { state } = useCart();
  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => setUser(u));
    return () => unsubscribe();
  }, []);
  function handleSignOut() {
    signOut(auth);
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="font-bold text-xl">Logo</div>
        <nav className="flex items-center">
          <ul className="flex space-x-4">
            <li><a href="/" className="text-gray-700 hover:text-blue-600">Home</a></li>
            <li><a href="/products" className="text-gray-700 hover:text-blue-600">Products</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-600">About</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-600">Contact</a></li>
          </ul>
          <a href="/cart" className="ml-6 relative flex items-center group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700 group-hover:text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386a.75.75 0 01.728.546l.72 2.592a.75.75 0 00.728.546h11.482a.75.75 0 01.728.954l-1.386 5.546a.75.75 0 01-.728.546H7.386a.75.75 0 00-.728.546l-.72 2.592A.75.75 0 006.25 19.5h11.5" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="15" cy="20" r="1" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{cartCount}</span>
            )}
          </a>
          {user ? (
            <div className="ml-6 flex items-center space-x-2">
              <span className="text-gray-700 text-sm">{user.email}</span>
              <button onClick={handleSignOut} className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 text-xs">Sign Out</button>
            </div>
          ) : (
            <a href="/auth" className="ml-6 text-blue-600 underline text-sm">Sign In</a>
          )}
        </nav>
      </header>
      <main className="flex-1 p-4">{children}</main>
      <footer className="bg-gray-100 text-center p-4 text-sm text-gray-600">
        &copy; {currentYear} Dapoer Nimar. All rights reserved.
      </footer>
    </div>
  );
}
