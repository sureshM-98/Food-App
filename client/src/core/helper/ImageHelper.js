import React from 'react';
import { API } from '../../backend';

const ImageHelper = ({ product }) => {
  const imageUrl = product ? `${API}/product/photo/${product._id}` : 'https://images.pexels.com/photos/3219547/pexels-photo-3219547.jpeg?cs=srgb&dl=pexels-engin-akyurt-3219547.jpg&fm=jpg';
  return (
    <div className="rounded border border-white p-1">
      <img src={imageUrl} alt="photo" style={{ maxHeight: '100%', maxWidth: '100%' }} className="mb-3 rounded" />
    </div>
  );
};

export default ImageHelper;
