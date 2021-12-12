import React from 'react';
import Menu from './Menu';

const Base = ({ title = 'My Title', description = 'My description', className = 'bg-light p-4', children }) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-light text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-light mt-auto pt-3">
      <div className="container-fluid bg-dark text-white text-center p-4">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
      <div className="container-fluid bg-secondary text-center d-block  py-2">
        <span className="text-white">Copyright ©2021. By Suresh.</span>
      </div>
    </footer>
  </div>
);

export default Base;
