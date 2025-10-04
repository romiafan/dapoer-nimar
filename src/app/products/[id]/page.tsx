"use client";
import { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import { useParams } from "next/navigation";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { formatRupiah } from "../../../lib/indonesian-utils";
import { Product } from "../../../types";

export default function ProductDetailPage() {
  const { dispatch } = useCart(); // Always call hooks at the top
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const docRef = doc(db, "products", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          setError("Product not found");
        }
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
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return null;

  function handleAddToCart() {
    if (!product) return;
    
    dispatch({
      type: "ADD_ITEM",
      item: {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <button
        onClick={() => window.history.back()}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
      >
        ← Back to Products
      </button>
      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover mb-4 rounded" />
      )}
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      {product.price && (
        <div className="text-green-700 font-bold mb-2">{formatRupiah(product.price)}</div>
      )}
      <p className="text-gray-700 mb-4">{product.description}</p>
      <button
        onClick={handleAddToCart}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors w-full"
        disabled={added}
      >
        {added ? "Added!" : "Add to Cart"}
      </button>
    </div>
  );
}
