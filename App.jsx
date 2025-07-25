import './style/shop.css';
import { ProductList } from './components/ProductList';

export default function App() {
  return (
    <div className="shop-container">

      {/* Top Bar */}
      <div className="top-bar">
        <span>Get 10% Off Your First Order</span>
        <span>Free Delivery in the UK</span>
        <span>Taste For Everyone</span>
      </div>

      {/* Hero Section */}
      <header className="hero">
        <h1>The Smokey <span>COFFEE</span></h1>
        <p>Discover the essence of exquisite coffee blends, roasted from the finest beans.</p>
        <div className="hero-buttons">
          <button>Shop Beans</button>
          <button className="outline">Our Coffee</button>
        </div>
      </header>

      {/* Categories */}
      <section className="categories">
        <div className="category">☕ Iced Coffee</div>
        <div className="category">🍰 Coffee Cake</div>
        <div className="category">🥐 Croissant</div>
        <div className="category">🌱 Coffee Beans</div>
        <div className="category">🏠 Coffee Shops</div>
      </section>

      {/* Product Management Section */}
      <main>
        <section className="product-section">
          <h2 className="section-title">Tang-Tastic Coffee</h2>
          <ProductList />
        </section>
      </main>

    </div>
  );
}
