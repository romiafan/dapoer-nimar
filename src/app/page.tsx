import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to Dapoer Nimar
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Freshly baked donuts made with love, delivered to your doorstep
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Shop Now
            </Link>
            <a
              href="#about"
              className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold border-2 border-orange-500 hover:bg-orange-50 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Donuts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-48 h-48 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-6xl">🍩</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Classic Glazed</h3>
              <p className="text-gray-600">Our signature glazed donut, perfectly sweet and fluffy</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 bg-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-6xl">🍩</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chocolate Frosted</h3>
              <p className="text-gray-600">Rich chocolate frosting on our fluffy cake donut</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-6xl">🍩</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sprinkle Paradise</h3>
              <p className="text-gray-600">Colorful sprinkles that bring joy to every bite</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">About Dapoer Nimar</h2>
          <p className="text-lg text-gray-600 mb-8">
            Founded with a passion for creating the perfect donut, Dapoer Nimar has been serving 
            fresh, handcrafted donuts to our community. Each donut is made with premium ingredients 
            and baked fresh daily to ensure the highest quality and taste.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl mb-4">🥄</div>
              <h3 className="font-semibold mb-2">Fresh Daily</h3>
              <p className="text-gray-600">Made fresh every morning</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the finest ingredients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Delivered warm to your door</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
