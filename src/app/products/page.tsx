import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Product } from "../../types";
import ProductsClient from "./ProductsClient";

// Server-side data fetching for better SEO and performance
async function getProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products: Product[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  // Fetch products on the server side
  const products = await getProducts();
  
  return <ProductsClient initialProducts={products} />;
}
