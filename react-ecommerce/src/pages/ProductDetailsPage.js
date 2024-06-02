import React from 'react'
import NavBar from '../features/navbar/Navbar';
import ProductList from '../features/product-list/component/ProductList';
import ProductDetails from '../features/product-list/component/ProductDatails';

 function ProductDetailsPage() {
  return (
    <div> 
        <NavBar>
<ProductDetails></ProductDetails>
        </NavBar>
    </div>
  );
}
export default ProductDetailsPage;