"use client";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

function formatRupiah(amount: number) {
  return "Rp" + amount.toLocaleString("id-ID");
}

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(items);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Product List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.length === 0 ? (
            <div>No products found.</div>
          ) : (
            products.map(product => (
              <a
                key={product.id}
                href={`/products/${product.id}`}
                className="bg-white rounded shadow p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {product.imageUrl && (
                  <img src={product.imageUrl} alt={product.name} className="w-32 h-32 object-cover mb-2 rounded" />
                )}
                <h2 className="text-lg font-semibold mb-1 text-gray-900">{product.name}</h2>
                {product.price && (
                  <div className="text-green-700 font-bold mb-1">{formatRupiah(product.price)}</div>
                )}
                <p className="text-gray-800 mb-2 text-center">{product.description}</p>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
