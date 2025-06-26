// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getProducts, deleteProduct } from '../services/api';

// function ProductListPage() {
//   const [products, setProducts] = useState([]);

//   const fetchProducts = async () => {
//     const res = await getProducts();
//     setProducts(res.data);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure?')) {
//       await deleteProduct(id);
//       fetchProducts();
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <h2>Product List</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Title</th>
//             <th>Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product._id}>
//               <td><img src={product.imageUrl} alt="" width="100" /></td>
//               <td>{product.title}</td>
//               <td>${product.price}</td>
//               <td>
//                 <Link className="btn btn-warning me-2" to={`/edit-product/${product._id}`}>Edit</Link>
//                 <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ProductListPage;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/api';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const role = localStorage.getItem('role'); // Get user role from localStorage

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const addToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = storedCart.find(item => item._id === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      storedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(storedCart));
    alert('Added to cart');
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td><img src={product.imageUrl} alt="" width="100" /></td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>
                  {role === 'admin' ? (
                    <>
                      <Link className="btn btn-warning me-2" to={`/edit-product/${product._id}`}>Edit</Link>
                      <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                    </>
                  ) : (
                    <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductListPage;
