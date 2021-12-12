import { makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import { getAllProducts } from './helper/coreapicalls';
import HomeSlider from './HomeSlider';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
}));

const Home = () => {
  const classes = useStyles();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getAllProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <div>
      <div className={classes.toolbar}></div>
      <HomeSlider />

      <Base title="Home Page" description="Hungry? You're in the right place">
        <div className="row text-center">
          <h1>Menu Items</h1>
          <div className="row">
            {products.map((product, index) => {
              return (
                <div key={index} className="col-4 mb-4">
                  <Card product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </Base>
    </div>
  );
};
export default Home;
