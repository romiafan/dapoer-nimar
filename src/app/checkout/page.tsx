"use client";
import { useCart } from "../../context/CartContext";
import { db } from "../../lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { formatRupiah } from "../../lib/indonesian-utils";

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    try {
      await addDoc(collection(db, "orders"), {
        name,
        address,
        phone,
        items: state.items,
        total,
        createdAt: Timestamp.now(),
      });
      setSuccess(true);
      dispatch({ type: "CLEAR_CART" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
        <h2 className="text-xl font-bold mb-4">Order Placed!</h2>
        <p>Thank you for your order. We will contact you soon.</p>
      </div>
    );
  }

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
      {state.items.length === 0 ? (
        <div className="text-center text-gray-600">Your cart is empty.</div>
      ) : (
        <>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <ul className="divide-y divide-gray-200 mb-4">
              {state.items.map(item => (
                <li key={item.id} className="flex items-center py-3">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded mr-3" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-green-700 font-bold">{formatRupiah(item.price)} x {item.quantity}</div>
                  </div>
                  <div className="font-semibold text-gray-800">{formatRupiah(item.price * item.quantity)}</div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span className="text-green-700">{formatRupiah(total)}</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-3 rounded font-semibold hover:bg-green-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Placing Order..." : `Place Order (${formatRupiah(total)})`}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
