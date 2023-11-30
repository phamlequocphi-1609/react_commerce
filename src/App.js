// import { useLocation } from "react-router-dom";
// import Footer from "./component/Layout/Footer";
// import Header from "./component/Layout/Header";
// import Menuleft from "./component/Layout/Menuleft";
// import Slider from "./component/Layout/Slider"
// import Menuacc from "./component/Layout/Menuacc";
// import {useEffect, useState } from "react";
// import { CartContext } from "./component/context/CartContext";

// function App(props) {
//   const path = useLocation()
//   const isCart = path.pathname === "/product/cart" 
//   const [tongQty, setTongQty] = useState(0)
//   const [tongWishlist, setTongWishList] = useState(0)
//   function getQty(data){
//       setTongQty(data)
//   }
// //   console.log(tongQty)
//   function getWishlist(data){
//     setTongWishList(data)
//   }
//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem("cart") || "{}")
//     let qty = 0
//     Object.keys(cart).forEach(key => (qty += cart[key])) 
//     setTongQty(qty)
//     const WishlistCart = JSON.parse(localStorage.getItem("WishlistCart") || "[]")
//     let wishlist = WishlistCart.length
//     setTongWishList(wishlist)
//   },[])
//   return (
//       <>
//          <CartContext.Provider value={{
//                     tongQty: tongQty,
//                     getQty: getQty,
//                     tongWishlist: tongWishlist,
//                     getWishlist: getWishlist,
//                 }}>
//                 <Header/>
//                 {path.pathname === '/' ? <Slider/> : ''}
//                 <section>
//                     <div className="container">
//                         <div className="row"> 
//                         {!isCart && (
//                             <>
//                             {path['pathname'].includes("account") || path['pathname'].includes("myproduct") ? <Menuacc/> : <Menuleft/>}     
//                             </>
//                         )}                            
//                         {props.children}
//                         </div>
//                     </div>
//                 </section>
//                 <Footer/>        
//         </CartContext.Provider>  
//       </>
//   );
// }
// export default App;


import { useLocation } from "react-router-dom";
import Footer from "./component/Layout/Footer";
import Header from "./component/Layout/Header";
import Menuleft from "./component/Layout/Menuleft";
import Slider from "./component/Layout/Slider"
import Menuacc from "./component/Layout/Menuacc";
import {useDispatch} from "react-redux"
import { IncreaseNewQty } from "./action/qty";
import { useEffect } from "react";
import { IncreaseWishlist } from "./action/wishlist";


function App(props) {
  const path = useLocation()
  const isCart = path.pathname === "/product/cart" 
  const dispatch = useDispatch()
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart")) || {}
    let qty = 0
    Object.keys(cart).map((key) => 
        qty += cart[key]
    )
    const actionqty = IncreaseNewQty(qty)
    dispatch(actionqty)
    let wishlist = JSON.parse(localStorage.getItem("WishlistCart")) || []
    const actionWishlist = IncreaseWishlist(wishlist.length)
    dispatch(actionWishlist)
  }, [dispatch])
  return (
      <>
              <Header/>
              {path.pathname === '/' ? <Slider/> : ''}
              <section>
                  <div className="container">
                      <div className="row"> 
                      {!isCart && (
                          <>
                          {path['pathname'].includes("account") || path['pathname'].includes("myproduct") ? <Menuacc/> : <Menuleft/>}     
                          </>
                      )}                            
                      {props.children}
                      </div>
                  </div>
              </section>
              <Footer/>       
      </>
  );
}
export default App;