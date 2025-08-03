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

  const load = async () => {
    const items = await getAllProducts();
    setProducts(items);
    setEditing(null);
    setShowModal(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (product) => {
    setEditing(product);
    setShowModal(true);
  };

  const handleAddToCart = (product) => {
    if (onAddToCart) onAddToCart(product);
    setAddedProductName(product.name);
    setShowCartAlert(true);
    setTimeout(() => setShowCartAlert(false), 1500);
  };

  return (
    <div className="product-list-container">
      <div className="add-product-header">
        <h2>Products</h2>
        <button className="add-btn" onClick={() => {
          setEditing(null);
          setShowModal(true);
        }}>
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
              <small>${p.price}</small>
              {p.details && <small>{p.details}</small>}
            </div>
            <div className="product-actions">
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={async () => {
                await deleteProduct(p.id);
                load();
              }}>
                Delete
              </button>
              {onAddToCart && (
                <button className="cart-btn" onClick={() => handleAddToCart(p)}>
                  Add to Cart 🛒
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editing ? 'Edit Product' : 'Add Product'}</h3>
            <ProductForm existing={editing} onSaved={load} />
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Alert Dialog */}
      {showCartAlert && (
        <div className="alert-dialog">
          ✅ <strong>{addedProductName}</strong> added to cart!
        </div>
      )}
    </div>
  );
}
