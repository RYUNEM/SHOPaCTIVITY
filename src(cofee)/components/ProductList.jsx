import { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../services/productService';
import { ProductForm } from './ProductForm';
import '../style/shop.css';

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
            </div>
          </li>
        ))}
      </ul>

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
    </div>
  );
}
