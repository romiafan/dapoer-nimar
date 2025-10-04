const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local');
  
  if (!fs.existsSync(envPath)) {
    throw new Error('.env.local file not found. Please ensure it exists in the project root.');
  }
  
  const envFile = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  });
  
  return envVars;
}

const env = loadEnvFile();

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Validate configuration
const requiredKeys = Object.keys(firebaseConfig);
const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);

if (missingKeys.length > 0) {
  throw new Error(`Missing Firebase configuration: ${missingKeys.join(', ')}`);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleDonuts = [
  {
    name: "Classic Glazed",
    description: "Our signature glazed donut with a perfect sweet glaze coating. Light, fluffy, and irresistibly delicious.",
    price: 15000,
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop&crop=center",
    category: "classic",
    available: true
  },
  {
    name: "Chocolate Frosted",
    description: "Rich chocolate frosting on our fluffy cake donut. A chocolate lover's dream come true.",
    price: 18000,
    imageUrl: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=400&fit=crop&crop=center",
    category: "chocolate",
    available: true
  },
  {
    name: "Sprinkle Paradise",
    description: "Colorful sprinkles on vanilla frosting that bring joy to every bite. Perfect for celebrations!",
    price: 20000,
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop&crop=center",
    category: "specialty",
    available: true
  },
  {
    name: "Boston Cream",
    description: "Filled with rich vanilla custard and topped with chocolate glaze. A classic favorite.",
    price: 22000,
    imageUrl: "https://images.unsplash.com/photo-1628191010210-a59de3ba286c?w=400&h=400&fit=crop&crop=center",
    category: "filled",
    available: true
  },
  {
    name: "Strawberry Frosted",
    description: "Sweet strawberry frosting with a hint of real strawberry flavor. Light and refreshing.",
    price: 18000,
    imageUrl: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=400&h=400&fit=crop&crop=center",
    category: "fruity",
    available: true
  },
  {
    name: "Old Fashioned",
    description: "Traditional cake donut with a slightly crispy exterior and tender interior. Simply perfect.",
    price: 16000,
    imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop&crop=center",
    category: "classic",
    available: true
  },
  {
    name: "Maple Bacon",
    description: "Sweet maple glaze topped with crispy bacon bits. The perfect sweet and savory combination.",
    price: 25000,
    imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=400&fit=crop&crop=center",
    category: "specialty",
    available: true
  },
  {
    name: "Cinnamon Sugar",
    description: "Warm cinnamon and sugar coating on a fresh cake donut. Comfort food at its finest.",
    price: 17000,
    imageUrl: "https://images.unsplash.com/photo-1514517604298-cf80e0fb7d2e?w=400&h=400&fit=crop&crop=center",
    category: "classic",
    available: true
  },
  {
    name: "Jelly Filled",
    description: "Classic yeast donut filled with sweet strawberry jam. A timeless favorite.",
    price: 19000,
    imageUrl: "https://images.unsplash.com/photo-1568659551060-61cbbfa46a54?w=400&h=400&fit=crop&crop=center",
    category: "filled",
    available: true
  },
  {
    name: "Double Chocolate",
    description: "Chocolate cake donut with rich chocolate frosting and chocolate chips. For serious chocolate lovers.",
    price: 23000,
    imageUrl: "https://images.unsplash.com/photo-1612198461241-1f94f8582fbc?w=400&h=400&fit=crop&crop=center",
    category: "chocolate",
    available: true
  }
];

async function seedProducts() {
  try {
    console.log('🍩 Adding sample donut products to Firestore...');
    console.log('Connected to project:', firebaseConfig.projectId);
    
    let addedCount = 0;
    
    for (const donut of sampleDonuts) {
      try {
        const docRef = await addDoc(collection(db, 'products'), donut);
        console.log(`✅ Added "${donut.name}" - Rp${donut.price.toLocaleString('id-ID')} (ID: ${docRef.id})`);
        addedCount++;
      } catch (error) {
        console.error(`❌ Failed to add "${donut.name}":`, error.message);
      }
    }
    
    console.log(`\n🎉 Successfully added ${addedCount}/${sampleDonuts.length} donut products!`);
    console.log('🌐 You can now visit your app to see the products.');
    
  } catch (error) {
    console.error('❌ Error connecting to Firestore:', error.message);
    console.log('\n💡 Make sure your Firebase project is set up correctly and Firestore is enabled.');
  }
}

seedProducts();