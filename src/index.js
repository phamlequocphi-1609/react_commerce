import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import Home from './component/Home';
import Blog from './component/Blog/Index';
import Detail from './component/Blog/Detail';
import Login from './component/members/Index';
import AccountLogin from './component/members/AccountMember'
import ProductAdd from './component/Product/ProductAdd';
import Myproduct from './component/Product/Myproduct';
import ProductEdit from './component/Product/ProductEdit';
import ProductDetail from './component/Product/ProductDetail';
import Cart from './component/Product/Cart';
import ProductList from './component/Product/ProductList';
import ProductWishlist from './component/Product/ProductWishlist';
import PaginationNext from './component/Blog/PaginationNext';
import {Provider} from 'react-redux'
import store from "./Store";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <React.StrictMode>
                <Router>
                    <App>
                        <Routes>
                            <Route index path='/' element = {<Home />} />
                            <Route path='/login' element = {<Login/>}/>
                            <Route path='/blog/list' element = {<Blog/>} />
                            <Route path='/blog/detail/:id' element = {<Detail/>}/>  
                            <Route path='/blog/detail-pagination/:id' element = {<PaginationNext/>}/>
                            <Route path='/account/update/' element = {<AccountLogin/>}/> 
                            <Route path='/product/add' element = {<ProductAdd/>}/>
                            <Route path='/myproduct' element = {<Myproduct/>}/>
                            <Route path='/user/product/update/:id' element = {<ProductEdit/>}/>
                            <Route path='/product/detail/:id' element = {<ProductDetail/>}/>
                            <Route path='/product/cart' element = {<Cart/>}/>
                            <Route path='/product/list' element = {<ProductList/>}/>
                            <Route path='/product/wishlist' element = {<ProductWishlist/>}/>
                        </Routes>
                    </App>
                </Router>
        </React.StrictMode>
    </Provider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
