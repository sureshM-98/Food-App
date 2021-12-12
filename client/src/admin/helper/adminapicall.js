import { API } from '../../backend';

// Create a product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// Get all products
export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: 'GET',
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// Delete a product
export const deleteProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// Get a product
export const getProduct = productId => {
  return fetch(`${API}/product/${productId}`, {
    method: 'GET',
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// Update a product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
