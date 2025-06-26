import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, getProducts, uploadImage } from '../../services/api';
function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', price: '', imageUrl: '' });
  const [file, setFile] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const res = await getProducts();
        const product = res.data.find(p => p._id === id);
        if (product) setForm(product);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const res = await uploadImage(formData);
      form.imageUrl = res.data.url;
    }
    if (id) {
      await updateProduct(id, form);
    } else {
      await createProduct(form);
    }
    navigate('/');
  };
  return (
    <div className="col-md-6 offset-md-3">
      <h2>{id ? 'Edit' : 'Add'} Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input type="number" name="price" className="form-control" value={form.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Image</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
          {form.imageUrl && <img src={form.imageUrl} alt="" width="150" className="mt-2" />}
        </div>
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default ProductFormPage;