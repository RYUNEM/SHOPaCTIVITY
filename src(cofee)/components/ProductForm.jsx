import '../style/shop.css';
import { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/productService';

export function ProductForm({ existing, onSaved }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    details: '',
    image: ''
  });

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name || '',
        description: existing.description || '',
        price: existing.price || '',
        quantity: existing.quantity || '',
        details: existing.details || '',
        image: existing.image || ''
      });
    }
  }, [existing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) || 0 : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existing) {
        await updateProduct(existing.id, form);
      } else {
        await createProduct(form);
      }

      if (onSaved) onSaved(); // refresh list + close modal
    } catch (err) {
      console.error('Product save failed:', err);
      alert('Failed to save product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        required
        min="0"
      />
      <textarea
        name="details"
        placeholder="Details"
        value={form.details}
        onChange={handleChange}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {form.image && (
        <img
          src={form.image}
          alt="Preview"
          style={{ width: '100px', marginTop: '10px', borderRadius: '8px' }}
        />
      )}
      <button type="submit" className="save-btn">
        {existing ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
}
