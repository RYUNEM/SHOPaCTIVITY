import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase';

// Deduct quantity & add to checkout history
export async function checkoutCart(cartItems) {
  const checkoutData = {
    items: cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1
    })),
    createdAt: new Date()
  };

  // Deduct quantity from each product
  for (const item of cartItems) {
    const productRef = doc(db, 'products', item.id);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      const data = productSnap.data();
      const currentQty = data.quantity || 0;
      const newQty = currentQty - (item.quantity || 1);

      await updateDoc(productRef, {
        quantity: newQty >= 0 ? newQty : 0
      });
    }
  }

  // Add to checkout history
  await addDoc(collection(db, 'checkouts'), checkoutData);
}

const productsCol = collection(db, 'products');

export async function createProduct(data) {
  // data: { name, description, price, details, image }
  const ref = await addDoc(productsCol, {
    ...data,
    createdAt: Date.now()
  });
  return ref.id;
}

export async function getAllProducts() {
  const snapshot = await getDocs(productsCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateProduct(id, data) {
  const ref = doc(db, 'products', id);
  await updateDoc(ref, data);
}

export async function deleteProduct(id) {
  const ref = doc(db, 'products', id);
  await deleteDoc(ref);
}
