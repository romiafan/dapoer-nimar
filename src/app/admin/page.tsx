"use client";
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { formatRupiah, formatIndonesianDate } from '../../lib/indonesian-utils';
import { Product, Order } from '../../types';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';
import { AdminProvider } from '../../context/AdminContext';

function AdminDashboardContent() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      // Load products
      const productsQuery = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const productsSnapshot = await getDocs(productsQuery);
      const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      
      // Load orders
      const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(10));
      const ordersSnapshot = await getDocs(ordersQuery);
      const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
      
      // Calculate stats
      const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
      const pendingOrders = orders.filter(order => order.status === 'pending' || !order.status).length;
      
      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders
      });
      
      setRecentOrders(orders.slice(0, 5));
      setRecentProducts(products.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome to your Dapoer Nimar admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🍩</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📦</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">💰</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">{formatRupiah(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">⏳</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <Link
                href="/admin/orders"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{order.name}</p>
                      <p className="text-sm text-gray-600">
                        {formatIndonesianDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        {formatRupiah(order.total || 0)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.items?.length || 0} item(s)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Recent Products</h3>
              <Link
                href="/admin/products"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Manage Products
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentProducts.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No products yet</p>
            ) : (
              <div className="space-y-4">
                {recentProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded-lg mr-3" 
                        />
                      ) : (
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-lg">🍩</span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-orange-600">
                        {formatRupiah(product.price)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.available ? 'Available' : 'Unavailable'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/products/new"
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            <div className="text-2xl mb-2">➕</div>
            <p className="font-medium">Add New Product</p>
          </Link>
          <Link
            href="/admin/orders"
            className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors text-center"
          >
            <div className="text-2xl mb-2">📋</div>
            <p className="font-medium">View All Orders</p>
          </Link>
          <Link
            href="/admin/products"
            className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors text-center"
          >
            <div className="text-2xl mb-2">🔧</div>
            <p className="font-medium">Manage Products</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <AdminDashboardContent />
      </AdminLayout>
    </AdminProvider>
  );
}