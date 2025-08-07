import { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../services/productService';
import { ProductForm } from './ProductForm';
import '../style/shop.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCartAlert, setShowCartAlert] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');

  const loadProducts = async () => {
    try {
      const items = await getAllProducts();
      setProducts(items);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditing(product);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      await loadProducts(); // Refresh after delete
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleAddToCart = (product) => {
    if (onAddToCart) onAddToCart(product);
    setAddedProductName(product.name);
    setShowCartAlert(true);
    setTimeout(() => setShowCartAlert(false), 1500);
  };

  const handleSave = async () => {
    await loadProducts(); // Refresh after save
    setShowModal(false);  // Close modal
  };

  return (
    <div className="product-list-container">
      <div className="add-product-header">
        <h2>Products</h2>
        <button className="add-btn" onClick={handleAdd}>
          + Add Product
        </button>
      </div>

      <ul className="product-list">
        {products.map((p) => (
          <li key={p.id} className="product-card">
            {p.image && (
              <img
                src={p.image}
                alt={p.name || 'Product image'}
                className="product-image"
              />
            )}
            <div className="product-info">
              <strong>{p.name}</strong>
              <p>{p.description}</p>
              <small>₱{p.price}</small>
              {p.details && <small>{p.details}</small>}
              <p><strong>In Stock:</strong> {p.quantity || 0}</p>
            </div>
            <div className="product-actions">
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
              {onAddToCart && (
                <button
                  className="cart-btn"
                  onClick={() => handleAddToCart(p)}
                  disabled={p.quantity <= 0}
                >
                  {p.quantity > 0 ? 'Add to Cart 🛒' : 'Out of Stock'}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {showModal && (
        <div className="custom-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editing ? 'Edit Product' : 'Add Product'}</h3>
            <ProductForm existing={editing} onSaved={handleSave} />
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Cart Alert */}
      {showCartAlert && (
        <div className="alert-dialog">
          ✅ <strong>{addedProductName}</strong> added to cart!
        </div>
      )}
    </div>
  );
}
