import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createProduct } from './helper/adminapicall';

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    getaRedirect: false,
    formData: new FormData(),
  });

  const { name, description, price, photo, loading, error, createdProduct, getaRedirect, formData } = values;

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });
    createProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          price: '',
          photo: '',
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div className="alert alert-success mt-3" style={{ display: createdProduct ? '' : 'none' }}>
      <h4>{createdProduct} created successfully</h4>
    </div>
  );

  const createProductForm = () => (
    <form className="py-2">
      <span>Upload photo</span>
      <div className="form-group my-2">
        <label className="btn btn-block btn-success">
          <input onChange={handleChange('photo')} type="file" name="photo" accept="image" placeholder="choose a file" />
        </label>
      </div>
      <div className="form-group my-2">
        <input onChange={handleChange('name')} name="photo" className="form-control" placeholder="Name" value={name} />
      </div>
      <div className="form-group my-2">
        <textarea onChange={handleChange('description')} name="photo" className="form-control" placeholder="Description" value={description} />
      </div>
      <div className="form-group my-2">
        <input onChange={handleChange('price')} type="number" className="form-control" placeholder="Price" value={price} />
      </div>

      <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-4">
        Create Product
      </button>
    </form>
  );

  return (
    <Base title="Add a product here!" description="Welcome to product creation section" className="container bg-primary p-4">
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
