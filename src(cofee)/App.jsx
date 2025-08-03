import './style/shop.css';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useReducer } from 'react';
import { cartReducer } from './reducers/cartReducer';

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <Router>
      <div className="shop-container">

        {/* Navbar */}
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>
                Cart 🛒 ({cart.length})
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Top Bar */}
        <div className="top-bar">
          <span>Get 10% Off Your First Order</span>
          <span>Free Delivery in the UK</span>
          <span>Taste For Everyone</span>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <header className="hero">
                  <h1>The Smokey <span>COFFEE</span></h1>
                  <p>Discover the essence of exquisite coffee blends, roasted from the finest beans.</p>
                  <div className="hero-buttons">
                    <button>Shop Beans</button>
                    <button className="outline">Our Coffee</button>
                  </div>
                </header>

                <section className="categories">
                  <div className="category">☕ Iced Coffee</div>
                  <div className="category">🍰 Coffee Cake</div>
                  <div className="category">🥐 Croissant</div>
                  <div className="category">🌱 Coffee Beans</div>
                  <div className="category">🏠 Coffee Shops</div>
                </section>

                <main>
                  <section className="product-section">
                    <h2 className="section-title">Tang-Tastic Coffee</h2>
                    <ProductList
                      onAddToCart={(product) =>
                        dispatch({ type: 'ADD_TO_CART', product })
                      }
                    />
                  </section>
                </main>
              </>
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cart}
                dispatch={dispatch}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
