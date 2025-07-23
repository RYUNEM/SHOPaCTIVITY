import React, { useState } from 'react';
import { Button, Modal, Form, Card, Row, Col } from 'react-bootstrap';

const initialProducts = [
  { id: 1, name: 'Product 1', price: 199, image: 'https://via.placeholder.com/150', description: 'Description 1' },
  { id: 2, name: 'Product 2', price: 299, image: 'https://via.placeholder.com/150', description: 'Description 2' },
  { id: 3, name: 'Product 3', price: 399, image: 'https://via.placeholder.com/150', description: 'Description 3' },
  { id: 4, name: 'Product 4', price: 499, image: 'https://via.placeholder.com/150', description: 'Description 4' },
];

export default function DashHome() {
  const [products, setProducts] = useState(initialProducts);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [current, setCurrent] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', image: '', description: '' });

  // Handlers for Add Modal
  const handleAdd = () => {
    setForm({ name: '', price: '', image: '', description: '' });
    setShowAdd(true);
  };
  const handleAddSave = () => {
    setProducts([
      ...products,
      { ...form, id: Date.now(), price: Number(form.price) }
    ]);
    setShowAdd(false);
  };

  // Handlers for Edit Modal
  const handleEdit = (product) => {
    setCurrent(product);
    setForm(product);
    setShowEdit(true);
  };
  const handleEditSave = () => {
    setProducts(products.map(p => p.id === current.id ? { ...form, id: current.id, price: Number(form.price) } : p));
    setShowEdit(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Products</h2>
        <Button variant="primary" onClick={handleAdd}>Add Product</Button>
      </div>
      <Row xs={1} sm={2} md={2} lg={3} xl={3} className="g-4">
        {products.map(product => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={product.image} style={{ objectFit: 'cover', height: 180 }} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <b>₱{product.price}</b><br/>
                  <span className="text-muted" style={{ fontSize: '0.9em' }}>{product.description}</span>
                </Card.Text>
                <Button variant="outline-secondary" size="sm" onClick={() => handleEdit(product)}>
                  Edit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Product Modal */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddSave}>Add</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleEditSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
} 