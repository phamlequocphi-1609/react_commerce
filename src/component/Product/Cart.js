// import {useContext, useEffect, useState} from 'react'
// import { Link } from 'react-router-dom'
// import Api from '../../Api'
// import { CartContext } from '../context/CartContext'
// function Cart(){
//     const [item, setItem] = useState([])
//     // console.log(item)
//     const [total, setTotal] = useState(0)
//     const qtyContext = useContext(CartContext)
//     useEffect(() => {
//           let cart  = JSON.parse(localStorage.getItem("cart"))
//           Api.post("/product/cart", cart)
//           .then(res => {
//               setItem(res.data.data)
//           })
//           .catch(error => console.log(error))
//       }, [])
//     useEffect(() => {
//         let totalProduct = 0
//         item.map((value) => 
//           totalProduct += value.price * value.qty
//         )
//         setTotal(totalProduct)
//     }, [item])
//     // console.log(total)
//     const handleIncrease = (idCart) => {
//         let getCart = JSON.parse(localStorage.getItem("cart"))
//         console.log(getCart)
//         if(getCart.hasOwnProperty(idCart)){
//           let productIncrease = getCart[idCart]
//            productIncrease++
//            getCart[idCart] = productIncrease
//            localStorage.setItem("cart", JSON.stringify(getCart))
//            let total = 0
//            if(Object.keys(getCart).length > 0){
//               Object.keys(getCart).map((key) =>
//                 total += getCart[key]
//               )
//            }
//            qtyContext.getQty(total)

//            setItem(prev => {
//              return prev.map(value => {
//                  if(value.id === idCart){
//                      return {...value, qty: value.qty + 1}
//                  }
//                  return value
//              })
//            })
//         }
      
//     }
//     const handleDecrease = (idCart) => {
//         let getCart = JSON.parse(localStorage.getItem("cart"))
//         if(getCart.hasOwnProperty(idCart) && getCart[idCart] > 1){
//           let productDecrease = getCart[idCart]
//           productDecrease--
//           getCart[idCart] = productDecrease
//           localStorage.setItem("cart", JSON.stringify(getCart))
//           let total = 0
//           if(Object.keys(getCart).length > 0){
//             Object.keys(getCart).map((key) => 
//                 total += getCart[key]
//             )
//           }
//           qtyContext.getQty(total)
//           setItem(prev => {
//             return prev.map((value) => {
//                 if(value.id === idCart){
//                     return {...value, qty: value.qty - 1}
//                 }
//                 return value
//             })
//           })
//         }     
//     }
//     function handleDelete(idCart){
//         let getCart = JSON.parse(localStorage.getItem("cart"))
//         if(getCart.hasOwnProperty(idCart)){
//             delete getCart[idCart]
//             localStorage.setItem("cart", JSON.stringify(getCart))
//             setItem(prev => prev.filter(value => value.id !== idCart))
//             let total = 0
//             if(Object.keys(getCart).length > 0){
//               Object.keys(getCart).map((key) =>
//                 total += getCart[key]
//               )
//             }
//             qtyContext.getQty(total)
            
//         }
//     }
//     function renderCart(){
//         if(item.length > 0){
//           return item.map((value, key) => {
//             const imageArray = JSON.parse(value.image)
//             const firstImage = imageArray[0]
//             return(
//               <tr key={key}>
//                 <td className="cart_product">
//                     <Link to="">
//                       <img style={{width: "100px"}}
//                            src={"http://localhost/laravel8/public/upload/product/" + value.id_user + "/" + firstImage} alt="" 
//                       />
//                     </Link>
//                 </td>
//               <td className="cart_description">
//                     <h4>
//                         <Link to="" 
//                               style={{fontSize: "16px"}}>
//                               {value.name}
//                         </Link>
//                     </h4>
//               </td>
//               <td className="cart_price">
//                     <p>{value.price}</p>
//               </td>
//               <td className="cart_quantity">
//                     <div className="cart_quantity_button">
//                         <Link className="cart_quantity_up" to="" onClick={() => handleIncrease(value.id)} > + </Link>
//                              <input className="cart_quantity_input" type="text" name="quantity" value={value.qty} autoComplete="off" size={2} />
//                         <Link className="cart_quantity_down" to="" onClick={() => handleDecrease(value.id)}> - </Link>
//                     </div>
//               </td>         
//               <td className="cart_total">
//                      <p className="cart_total_price">${value.price * value.qty}</p>
//               </td>
//               <td className="cart_delete">
//                     <Link className="cart_quantity_delete" to=""
//                       onClick={() => handleDelete(value.id)}>
//                       <i className="fa fa-times"/>
//                     </Link>
//               </td>
//             </tr>
//             )
//           })
//         }
//     }
//     return(
//       <>
//       <section id="cart_items" >
//       <div className="container">
//             <div className="breadcrumbs">
//               <ol className="breadcrumb">
//                 <li><Link to="/">Home</Link></li>
//                 <li className="active">Shopping Cart</li>
//               </ol>
//             </div>
//             <div className="table-responsive cart_info">
//               <table className="table table-condensed">
//                   <thead>
//                     <tr className="cart_menu">
//                             <td className="image">Item</td>
//                             <td className="description" />
//                             <td className="price">Price</td>
//                             <td className="quantity">Quantity</td>
//                             <td className="total">Total</td>
//                             <td></td>
//                     </tr>
//                   </thead>
//                 <tbody >
//                       {renderCart()}
//                 </tbody>
//               </table>
//             </div>
//          </div>
//       </section>
      
//       <section id="do_action">
//           <div className="container">
//               <div className="heading">
//                   <h3>What would you like to do next?</h3>
//                   <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
//               </div>
//               <div className="row">
//                   <div className="col-sm-6">
//                     <div className="chose_area">
//                       <ul className="user_option">
//                         <li>
//                           <input type="checkbox" />
//                           <label>Use Coupon Code</label>
//                         </li>
//                         <li>
//                           <input type="checkbox" />
//                           <label>Use Gift Voucher</label>
//                         </li>
//                         <li>
//                           <input type="checkbox" />
//                           <label>Estimate Shipping &amp; Taxes</label>
//                         </li>
//                       </ul>
//                       <ul className="user_info">
//                         <li className="single_field">
//                           <label>Country:</label>
//                           <select>
//                               <option>United States</option>
//                               <option>Bangladesh</option>
//                               <option>UK</option>
//                               <option>India</option>
//                               <option>Pakistan</option>
//                               <option>Ucrane</option>
//                               <option>Canada</option>
//                               <option>Dubai</option>
//                           </select>
//                         </li>
//                         <li className="single_field">
//                           <label>Region / State:</label>
//                           <select>
//                                 <option>Select</option>
//                                 <option>Dhaka</option>
//                                 <option>London</option>
//                                 <option>Dillih</option>
//                                 <option>Lahore</option>
//                                 <option>Alaska</option>
//                                 <option>Canada</option>
//                                 <option>Dubai</option>
//                           </select>
//                         </li>
//                         <li className="single_field zip-field">
//                             <label>Zip Code:</label>
//                             <input type="text" />
//                         </li>
//                       </ul>
//                           <Link className="btn btn-default update" to="">Get Quotes</Link>
//                           <Link className="btn btn-default check_out" to="">Continue</Link>
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="total_area">
//                       <ul>
//                           <li>Cart Sub Total<span>{total} VND</span></li>
//                           <li>Eco Tax <span>10000 VND</span></li>
//                           <li>Shipping Cost <span>Free</span></li>
//                           <li>Total <span>{total + 10000} VND</span></li>
//                       </ul>
//                           <Link className="btn btn-default update" to="">Update</Link>
//                           <Link className="btn btn-default check_out" to="">Check Out</Link>
//                     </div>
//                 </div>
//               </div>
//           </div>
//          </section>
//       </>
//     )
// }
// export default Cart



import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Api from '../../Api'
import {useDispatch} from 'react-redux'
import { DecreaseNewQty, IncreaseNewQty, DeleteNewQty } from '../../action/qty'

function Cart(){
    const [item, setItem] = useState([])
    // console.log(item)
    const [total, setTotal] = useState(0)
    const dispatch = useDispatch()
    
    useEffect(() => {
          let cart  = JSON.parse(localStorage.getItem("cart"))
          Api.post("/product/cart", cart)
          .then(res => {
              setItem(res.data.data)
          })
          .catch(error => console.log(error))
      }, [])
    useEffect(() => {
        let totalProduct = 0
        item.map((value) => 
          totalProduct += value.price * value.qty
        )
        setTotal(totalProduct)
    }, [item])
    // console.log(total)
    const handleIncrease = (idCart) => {
        let getCart = JSON.parse(localStorage.getItem("cart")) || {}
        console.log(getCart)
        if(getCart.hasOwnProperty(idCart)){
          let productIncrease = getCart[idCart]
           productIncrease++
           getCart[idCart] = productIncrease
           localStorage.setItem("cart", JSON.stringify(getCart))
           setItem(prev => {
             return prev.map(value => {
                 if(value.id === idCart){
                     return {...value, qty: value.qty + 1}
                 }
                 return value
             })
           })
           let tongqty = 0
           if(Object.keys(getCart).length > 0){
              Object.keys(getCart).map((key) => 
                tongqty += getCart[key]
              )
              const action = IncreaseNewQty(tongqty)
              dispatch(action)
           }
        }
    }
    const handleDecrease = (idCart) => {
        let getCart = JSON.parse(localStorage.getItem("cart")) || {}
        if(getCart.hasOwnProperty(idCart) && getCart[idCart] > 1){
          let productDecrease = getCart[idCart]
          productDecrease--
          getCart[idCart] = productDecrease
          localStorage.setItem("cart", JSON.stringify(getCart))
          setItem(prev => {
            return prev.map((value) => {
                if(value.id === idCart){
                    return {...value, qty: value.qty - 1}
                }
                return value
            })
          })
          let tongQty = 0
          if(Object.keys(getCart).length > 0){
            Object.keys(getCart).map((key) => 
              tongQty += getCart[key]
            )
            const action = DecreaseNewQty(tongQty)
            dispatch(action)
          }
        }     
    }
    function handleDelete(idCart){
        let getCart = JSON.parse(localStorage.getItem("cart")) || []
        if(getCart.hasOwnProperty(idCart)){
            delete getCart[idCart]
            localStorage.setItem("cart", JSON.stringify(getCart))
            setItem(prev => prev.filter(value => value.id !== idCart))
            let tongQty = 0
            Object.keys(getCart).map((key) => 
              tongQty += getCart[key]
            )
            const action = DeleteNewQty(tongQty)
            dispatch(action)
        }
    }
    function renderCart(){
        if(item.length > 0){
          return item.map((value, key) => {
            const imageArray = JSON.parse(value.image)
            const firstImage = imageArray[0]
            return(
              <tr key={key}>
                <td className="cart_product">
                    <Link to="">
                      <img style={{width: "100px"}}
                           src={"http://localhost/laravel8/public/upload/product/" + value.id_user + "/" + firstImage} alt="" 
                      />
                    </Link>
                </td>
              <td className="cart_description">
                    <h4>
                        <Link to="" 
                              style={{fontSize: "16px"}}>
                              {value.name}
                        </Link>
                    </h4>
              </td>
              <td className="cart_price">
                    <p>{value.price}</p>
              </td>
              <td className="cart_quantity">
                    <div className="cart_quantity_button">
                        <Link className="cart_quantity_up" to="" onClick={() => handleIncrease(value.id)} > + </Link>
                             <input className="cart_quantity_input" type="text" name="quantity" value={value.qty} autoComplete="off" size={2} />
                        <Link className="cart_quantity_down" to="" onClick={() => handleDecrease(value.id)}> - </Link>
                    </div>
              </td>         
              <td className="cart_total">
                     <p className="cart_total_price">${value.price * value.qty}</p>
              </td>
              <td className="cart_delete">
                    <Link className="cart_quantity_delete" to=""
                      onClick={() => handleDelete(value.id)}>
                      <i className="fa fa-times"/>
                    </Link>
              </td>
            </tr>
            )
          })
        }
    }
    return(
      <>
      <section id="cart_items" >
      <div className="container">
            <div className="breadcrumbs">
              <ol className="breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li className="active">Shopping Cart</li>
              </ol>
            </div>
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                  <thead>
                    <tr className="cart_menu">
                            <td className="image">Item</td>
                            <td className="description" />
                            <td className="price">Price</td>
                            <td className="quantity">Quantity</td>
                            <td className="total">Total</td>
                            <td></td>
                    </tr>
                  </thead>
                <tbody >
                      {renderCart()}
                </tbody>
              </table>
            </div>
         </div>
      </section>
      
      <section id="do_action">
          <div className="container">
              <div className="heading">
                  <h3>What would you like to do next?</h3>
                  <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
              </div>
              <div className="row">
                  <div className="col-sm-6">
                    <div className="chose_area">
                      <ul className="user_option">
                        <li>
                          <input type="checkbox" />
                          <label>Use Coupon Code</label>
                        </li>
                        <li>
                          <input type="checkbox" />
                          <label>Use Gift Voucher</label>
                        </li>
                        <li>
                          <input type="checkbox" />
                          <label>Estimate Shipping &amp; Taxes</label>
                        </li>
                      </ul>
                      <ul className="user_info">
                        <li className="single_field">
                          <label>Country:</label>
                          <select>
                              <option>United States</option>
                              <option>Bangladesh</option>
                              <option>UK</option>
                              <option>India</option>
                              <option>Pakistan</option>
                              <option>Ucrane</option>
                              <option>Canada</option>
                              <option>Dubai</option>
                          </select>
                        </li>
                        <li className="single_field">
                          <label>Region / State:</label>
                          <select>
                                <option>Select</option>
                                <option>Dhaka</option>
                                <option>London</option>
                                <option>Dillih</option>
                                <option>Lahore</option>
                                <option>Alaska</option>
                                <option>Canada</option>
                                <option>Dubai</option>
                          </select>
                        </li>
                        <li className="single_field zip-field">
                            <label>Zip Code:</label>
                            <input type="text" />
                        </li>
                      </ul>
                          <Link className="btn btn-default update" to="">Get Quotes</Link>
                          <Link className="btn btn-default check_out" to="">Continue</Link>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="total_area">
                      <ul>
                          <li>Cart Sub Total<span>{total} VND</span></li>
                          <li>Eco Tax <span>10000 VND</span></li>
                          <li>Shipping Cost <span>Free</span></li>
                          <li>Total <span>{total + 10000} VND</span></li>
                      </ul>
                          <Link className="btn btn-default update" to="">Update</Link>
                          <Link className="btn btn-default check_out" to="">Check Out</Link>
                    </div>
                </div>
              </div>
          </div>
         </section>
      </>
    )
}
export default Cart