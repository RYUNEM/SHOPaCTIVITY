  import { useNavigate } from 'react-router-dom';
  import { useEffect, useState } from 'react';
  import { checkoutCart } from '../services/productService';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '../style/cart.css';

  export function Cart({ cartItems, dispatch }) {
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      const totalPrice = cartItems.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantity,
        0
      );
      setTotal(totalPrice.toFixed(2));
    }, [cartItems]);

    const handleCheckout = () => {
      setShowModal(true);
    };

    const confirmPayment = async () => {
      try {
        await checkoutCart(cartItems); // ✅ Deducts quantity and saves checkout
        dispatch({ type: 'CLEAR_CART' });
        setShowModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        console.error('Checkout failed:', error);
        alert('Checkout failed. Please try again.');
      }
    };

    return (
      <div className="container my-4">
        <h2 className="mb-4">🛒 Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="alert alert-info">Your cart is empty.</div>
        ) : (
          <>
            <ul className="list-group mb-3">
              {cartItems.map((item, idx) => (
                <li
                  key={idx}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      width="60"
                      className="me-3 rounded"
                    />
                    <div>
                      <h6 className="mb-1">{item.name}</h6>
                      <small>${item.price} × {item.quantity}</small>
                    </div>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      dispatch({ type: 'REMOVE_FROM_CART', id: item.id })
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>
                Total: <strong>${total}</strong>
              </h5>
              <button className="btn btn-success" onClick={handleCheckout}>
                Checkout 💳
              </button>
            </div>
          </>
        )}

        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          ← Back to Shop
        </button>

        {/* ✅ Modal */}
        {showModal && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Checkout</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Are you sure you want to pay <strong>${total}</strong>?
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={confirmPayment}>
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
