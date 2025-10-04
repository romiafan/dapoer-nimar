const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, deleteDoc, doc } = require('firebase/firestore');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) throw new Error('.env.local file not found.');
  const envFile = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) envVars[key.trim()] = value.trim();
  });
  return envVars;
}

const env = loadEnvFile();
const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function cleanupMissingImages() {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  let removed = 0;
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    if (!data.imageUrl || !data.imageUrl.startsWith('http')) {
      await deleteDoc(doc(productsRef, docSnap.id));
      console.log(`Deleted product with missing/invalid image: ${docSnap.id} (${data.name || 'No Name'})`);
      removed++;
    }
  }
  console.log(`\nCleanup complete. Removed ${removed} products with missing/invalid images.`);
}

cleanupMissingImages();
