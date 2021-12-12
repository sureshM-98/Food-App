import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';
import AdminRoutes from './auth/helper/AdminRoutes';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#2e7d32',
    },
    primary: {
      main: '#1b5e20',
    },
  },
});

const Routes = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/cart" exact component={Cart} />
          <PrivateRoutes path="/user/dashboard" exact component={UserDashBoard} />
          <AdminRoutes path="/admin/dashboard" exact component={AdminDashBoard} />
          <AdminRoutes path="/admin/create/product" exact component={AddProduct} />
          <AdminRoutes path="/admin/products" exact component={ManageProducts} />
          <AdminRoutes path="/admin/product/update/:productId" exact component={UpdateProduct} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Routes;
