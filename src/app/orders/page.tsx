"use client";
import { useEffect, useState } from "react";
import { db, auth } from "../../lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { formatRupiah, formatIndonesianDate } from "../../lib/indonesian-utils";
import { Order } from "../../types";
import Link from "next/link";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email) {
        fetchOrders();
      } else {
        setOrders([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      // For now, we'll fetch all orders since we don't have user association
      // In a real app, you'd filter by user ID
      const q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const userOrders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Order));
      
      setOrders(userOrders);
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

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 mb-4">Please sign in to view your order history.</p>
          <a
            href="/auth"
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>
        <div>Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 mb-4">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/products"
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => {
            const total = order.items?.reduce((sum: number, item) => 
              sum + (item.price * item.quantity), 0) || order.total || 0;
            
            return (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">Order #{order.id.slice(-8)}</h3>
                    <p className="text-gray-600">{formatIndonesianDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-green-700">{formatRupiah(total)}</div>
                    <div className="text-sm text-gray-600">
                      {order.items?.length || 0} item(s)
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Customer Details:</h4>
                  <p className="text-gray-700">Name: {order.name}</p>
                  <p className="text-gray-700">Phone: {order.phone}</p>
                  <p className="text-gray-700">Address: {order.address}</p>
                </div>
                
                {order.items && order.items.length > 0 && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium mb-2">Items:</h4>
                    <ul className="space-y-2">
                      {order.items.map((item, index: number) => (
                        <li key={index} className="flex justify-between items-center">
                          <div className="flex items-center">
                            {item.imageUrl && (
                              <img 
                                src={item.imageUrl} 
                                alt={item.name} 
                                className="w-12 h-12 object-cover rounded mr-3" 
                              />
                            )}
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-600">
                                {formatRupiah(item.price)} x {item.quantity}
                              </div>
                            </div>
                          </div>
                          <div className="font-semibold">
                            {formatRupiah(item.price * item.quantity)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}