import '../style/shop.css';
import { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/productService';

export function ProductForm({ existing, onSaved }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    details: '',
    image: ''
  });

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(f => ({ ...f, image: reader.result })); // base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (existing) {
      await updateProduct(existing.id, form);
    } else {
      await createProduct(form);
    }
    onSaved();
    setForm({
      name: '',
      description: '',
      price: '',
      details: '',
      image: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <textarea
        name="details"
        placeholder="Details"
        value={form.details}
        onChange={handleChange}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {form.image && (
        <img
          src={form.image}
          alt="Preview"
          style={{ width: '100px', marginTop: '10px', borderRadius: '8px' }}
        />
      )}
      <button type="submit">
        {existing ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
