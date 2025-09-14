"use client";
import { useCart } from "../../context/CartContext";

function formatRupiah(amount: number) {
  return "Rp" + amount.toLocaleString("id-ID");
}

export default function CartPage() {
  const { state, dispatch } = useCart();
  const items = state.items;

  function handleRemove(id: string) {
    dispatch({ type: "REMOVE_ITEM", id });
  }

  function handleClear() {
    dispatch({ type: "CLEAR_CART" });
  }

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {items.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div>
          <ul className="divide-y divide-gray-200 mb-6">
            {items.map(item => (
              <li key={item.id} className="flex items-center py-4">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                )}
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{item.name}</div>
                  <div className="text-green-700 font-bold">{formatRupiah(item.price)}</div>
                  <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
