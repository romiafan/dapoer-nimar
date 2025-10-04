"use client";
import { useCart } from "../../context/CartContext";
import { db } from "../../lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { formatRupiah } from "../../lib/indonesian-utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handlePayment() {
    setLoading(true);
    setError(null);
    
    const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // First, create the order in Firestore
      const orderDoc = await addDoc(collection(db, "orders"), {
        orderId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        items: state.items,
        total,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: Timestamp.now(),
      });

      // Prepare payment data
      const paymentData = {
        orderId,
        amount: total,
        customerDetails: {
          firstName: formData.name.split(' ')[0],
          lastName: formData.name.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
        items: state.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      // Create payment via API
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (result.success && result.paymentUrl) {
        // Clear cart and redirect to payment
        dispatch({ type: "CLEAR_CART" });
        window.location.href = result.paymentUrl;
      } else {
        setError(result.error || 'Failed to create payment. Please try again.');
      }
    } catch (err: unknown) {
      console.error('Checkout error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.address) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    await handlePayment();
  }

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious donuts before checkout!</p>
            <Link
              href="/products"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Browse Donuts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              {state.items.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-lg" 
                    />
                  ) : (
                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🍩</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-orange-600 font-bold">
                      {formatRupiah(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="font-semibold text-gray-800">
                    {formatRupiah(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Items ({totalItems})</span>
                <span>{formatRupiah(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">{formatRupiah(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your email (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your delivery address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="12345"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay Now ${formatRupiah(total)}`
                  )}
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  You will be redirected to Midtrans for secure payment
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
