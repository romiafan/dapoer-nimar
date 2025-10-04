"use client";
import { formatRupiah } from "../../lib/indonesian-utils";
import { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

interface ProductsClientProps {
  initialProducts: Product[];
}

export default function ProductsClient({ initialProducts }: ProductsClientProps) {
  const { dispatch } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{[id: string]: number}>({});

  function handleQuantityChange(id: string, value: number) {
    setQuantities(q => ({ ...q, [id]: Math.max(1, value) }));
  }

  function handleAddToCart(product: Product) {
    const qty = quantities[product.id] || 1;
    dispatch({
      type: "ADD_ITEM",
      item: {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: qty,
      },
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Delicious Donuts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🍩</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No donuts available</h3>
              <p className="text-gray-500">Check back soon for fresh, delicious donuts!</p>
            </div>
          ) : (
            initialProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <a
                  href={`/products/${product.id}`}
                  style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                >
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-40 h-40 object-cover mb-4 rounded-full border-4 border-orange-100" 
                    />
                  ) : (
                    <div className="w-40 h-40 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-6xl">🍩</span>
                    </div>
                  )}
                  <h2 className="text-xl font-bold mb-2 text-gray-900 text-center">{product.name}</h2>
                  {product.price && (
                    <div className="text-2xl font-bold text-orange-600 mb-3">{formatRupiah(product.price)}</div>
                  )}
                  <p className="text-gray-600 text-center text-sm leading-relaxed">{product.description}</p>
                  {product.category && (
                    <span className="mt-3 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  )}
                </a>
                <div className="mt-4 w-full flex flex-col items-center gap-2">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <button
                      type="button"
                      className="px-2 py-1 bg-orange-200 rounded text-orange-700 font-bold"
                      onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)}
                      disabled={(quantities[product.id] || 1) <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={quantities[product.id] || 1}
                      onChange={e => handleQuantityChange(product.id, Number(e.target.value))}
                      className="w-12 text-center border border-orange-300 rounded px-2 py-1 hide-number-arrows"
                      style={{ MozAppearance: 'textfield' }}
                    />

<style jsx>{`
  input.hide-number-arrows::-webkit-outer-spin-button,
  input.hide-number-arrows::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input.hide-number-arrows {
    -moz-appearance: textfield;
  }
`}</style>
                    <button
                      type="button"
                      className="px-2 py-1 bg-orange-200 rounded text-orange-700 font-bold"
                      onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    disabled={addedId === product.id}
                  >
                    {addedId === product.id ? "Added!" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}