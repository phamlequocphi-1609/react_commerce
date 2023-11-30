
import { useEffect, useState } from "react"
import Api from "../Api"
import {Link} from 'react-router-dom'
import AddCart from "./Product/AddCart"
import AddWishlist from "./Product/AddWishlist"

function Home(){
  const [item, setItem] = useState([])
  useEffect(() => {
    Api.get('/product')
    .then(res => {
      setItem(res.data.data)
    })
    .catch(error => console.log(error))
  },[])


   function renderProduct (){
      if(item.length > 0){
        return item.map((value, key) => {
          const imageArray = JSON.parse(value.image);
          const firstImage = imageArray[0]     
          return(
            <div className="col-sm-4" key={key} >
                <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                            <img 
                                src = {"http://localhost/laravel8/public/upload/product/" + value.id_user + "/" + firstImage} 
                                alt="" 
                            />
                            <h2>$ {value.price}</h2>
                            <p>{value.name}</p>
                            <AddCart id={value.id} />
                        </div>
                        <div className="product-overlay">
                            <div className="overlay-content">
                              <h2>$ {value.price}</h2>
                              <p>{value.name}</p>
                              {/* Add product to cart */}      
                              <AddCart id={value.id} />
                            </div>
                        </div>
                    </div>
                      <div className="choose">
                        <ul className="nav nav-pills nav-justified">
                          <li>
                              <Link to={"/product/detail/" + value.id}>
                                    <i className="fa fa-plus-square" />Product Detail
                              </Link>
                          </li>
                          <li>
                              <AddWishlist id = {value.id}/>
                          </li>
                          {/*   <li><Link to=""><i className="fa fa-plus-square" />Add to compare</Link></li> */}
                        </ul>
                      </div>
                </div>
          </div>
          )
        })
      }
    }
   
    return(    
      <div className="col-sm-9 padding-right">
            <div className="features_items">
              <h2 className="title text-center">Features Items</h2>
               {renderProduct()}
            </div>
         
      </div>
    )
}
export default Home



// <div className="col-sm-9 padding-right">
// <div className="features_items">{/*features_items*/}
//   <h2 className="title text-center">Features Items</h2>
//   <div className="col-sm-4">
//     <div className="product-image-wrapper">
//       <div className="single-products">
//         <div className="productinfo text-center">
//           <img src={product1} alt="" />
//           <h2>$56</h2>
//           <p>Easy Polo Black Edition</p>
//           <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//         </div>
//         <div className="product-overlay">
//           <div className="overlay-content">
//             <h2>$56</h2>
//             <p>Easy Polo Black Edition</p>
//             <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//           </div>
//         </div>
//       </div>
//       <div className="choose">
//         <ul className="nav nav-pills nav-justified">
//           <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
//           <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
//         </ul>
//       </div>
//     </div>
//   </div>
//   <div className="col-sm-4">
//     <div className="product-image-wrapper">
//       <div className="single-products">
//         <div className="productinfo text-center">
//           <img src={product2 } alt="" />
//           <h2>$56</h2>
//           <p>Easy Polo Black Edition</p>
//           <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//         </div>
//         <div className="product-overlay">
//           <div className="overlay-content">
//             <h2>$56</h2>
//             <p>Easy Polo Black Edition</p>
//             <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//           </div>
//         </div>
//       </div>
//       <div className="choose">
//         <ul className="nav nav-pills nav-justified">
//           <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
//           <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
//         </ul>
//       </div>
//     </div>
//   </div>
//   <div className="col-sm-4">
//     <div className="product-image-wrapper">
//       <div className="single-products">
//         <div className="productinfo text-center">
//           <img src={product3} alt="" />
//           <h2>$56</h2>
//           <p>Easy Polo Black Edition</p>
//           <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//         </div>
//         <div className="product-overlay">
//           <div className="overlay-content">
//             <h2>$56</h2>
//             <p>Easy Polo Black Edition</p>
//             <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//           </div>
//         </div>
//       </div>
//       <div className="choose">
//         <ul className="nav nav-pills nav-justified">
//           <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
//           <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
//         </ul>
//       </div>
//     </div>
//   </div>
//   <div className="col-sm-4">
//     <div className="product-image-wrapper">
//       <div className="single-products">
//         <div className="productinfo text-center">
//           <img src={product4} alt="" />
//           <h2>$56</h2>
//           <p>Easy Polo Black Edition</p>
//           <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//         </div>
//         <div className="product-overlay">
//           <div className="overlay-content">
//             <h2>$56</h2>
//             <p>Easy Polo Black Edition</p>
//             <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//           </div>
//         </div>
//         <img src={require('./Layout/images/home/new.png')} className="new" alt="" />
//       </div>
//       <div className="choose">
//         <ul className="nav nav-pills nav-justified">
//           <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
//           <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
//         </ul>
//       </div>
//     </div>
//   </div>
//   <div className="col-sm-4">
//     <div className="product-image-wrapper">
//       <div className="single-products">
//         <div className="productinfo text-center">
//           <img src={product5} alt="" />
//           <h2>$56</h2>
//           <p>Easy Polo Black Edition</p>
//           <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//         </div>
//         <div className="product-overlay">
//           <div className="overlay-content">
//             <h2>$56</h2>
//             <p>Easy Polo Black Edition</p>
//             <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//           </div>
//         </div>
//         <img src="images/home/sale.png" className="new" alt="" />
//       </div>
//       <div className="choose">
//         <ul className="nav nav-pills nav-justified">
//           <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
//           <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
//         </ul>
//       </div>
//     </div>
//   </div>
//   <div className="col-sm-4">
//     <div className="product-image-wrapper">
//       <div className="single-products">
//         <div className="productinfo text-center">
//           <img src={require('./Layout/images/home/product6.jpg')} alt="" />
//           <h2>$56</h2>
//           <p>Easy Polo Black Edition</p>
//           <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//         </div>
//         <div className="product-overlay">
//           <div className="overlay-content">
//             <h2>$56</h2>
//             <p>Easy Polo Black Edition</p>
//             <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//           </div>
//         </div>
//       </div>
//       <div className="choose">
//         <ul className="nav nav-pills nav-justified">
//           <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
//           <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
//         </ul>
//       </div>
//     </div>
//   </div>
// </div>{/*features_items*/}
// <div className="category-tab">{/*category-tab*/}
//   <div className="col-sm-12">
//     <ul className="nav nav-tabs">
//       <li className="active"><a href="#tshirt" data-toggle="tab">T-Shirt</a></li>
//       <li><a href="#blazers" data-toggle="tab">Blazers</a></li>
//       <li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
//       <li><a href="#kids" data-toggle="tab">Kids</a></li>
//       <li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
//     </ul>
//   </div>
//   <div className="tab-content">
//     <div className="tab-pane fade active in" id="tshirt">
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src={require('./Layout/images/home/gallery1.jpg')} alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src={require('./Layout/images/home/gallery2.jpg')} alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src={require('./Layout/images/home/gallery3.jpg')} alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src={require('./Layout/images/home/gallery4.jpg')} alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="tab-pane fade" id="blazers">
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src={require('./Layout/images/home/gallery4.jpg')} alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src={require('./Layout/images/home/gallery3.jpg')} alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src={require('./Layout/images/home/gallery2.jpg')} alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src={require('./Layout/images/home/gallery1.jpg')} alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="tab-pane fade" id="sunglass">
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src="images/home/gallery3.jpg" alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src="images/home/gallery4.jpg" alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src="images/home/gallery1.jpg" alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src="images/home/gallery2.jpg" alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="tab-pane fade" id="kids">
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src="images/home/gallery1.jpg" alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src="images/home/gallery2.jpg" alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src="images/home/gallery3.jpg" alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src="images/home/gallery4.jpg" alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="tab-pane fade" id="poloshirt">
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src="images/home/gallery2.jpg" alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src="images/home/gallery4.jpg" alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src="images/home/gallery3.jpg" alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-sm-3">
//         <div className="product-image-wrapper">
//           <div className="single-products">
//             <div className="productinfo text-center">
//               <img src="images/home/gallery1.jpg" alt="" />
//               <h2>$56</h2>
//               <p>Easy Polo Black Edition</p>
//               <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>{/*/category-tab*/}
// <div className="recommended_items">{/*recommended_items*/}
//   <h2 className="title text-center">recommended items</h2>
//   <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
//     <div className="carousel-inner">
//       <div className="item active">	
//         <div className="col-sm-4">
//           <div className="product-image-wrapper">
//             <div className="single-products">
//               <div className="productinfo text-center">
//                 <img src={require('./Layout/images/home/recommend1.jpg')} alt="" />
//                 <h2>$56</h2>
//                 <p>Easy Polo Black Edition</p>
//                 <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-sm-4">
//           <div className="product-image-wrapper">
//             <div className="single-products">
//               <div className="productinfo text-center">
//                 <img src={require('./Layout/images/home/recommend2.jpg')} alt="" />
//                 <h2>$56</h2>
//                 <p>Easy Polo Black Edition</p>
//                 <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-sm-4">
//           <div className="product-image-wrapper">
//             <div className="single-products">
//               <div className="productinfo text-center">
//                 <img src={require('./Layout/images/home/recommend3.jpg')} alt="" />
//                 <h2>$56</h2>
//                 <p>Easy Polo Black Edition</p>
//                 <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="item">	
//         <div className="col-sm-4">
//           <div className="product-image-wrapper">
//             <div className="single-products">
//               <div className="productinfo text-center">
//                 <img src="images/home/recommend1.jpg" alt="" />
//                 <h2>$56</h2>
//                 <p>Easy Polo Black Edition</p>
//                 <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-sm-4">
//           <div className="product-image-wrapper">
//             <div className="single-products">
//               <div className="productinfo text-center">
//                 <img src="images/home/recommend2.jpg" alt="" />
//                 <h2>$56</h2>
//                 <p>Easy Polo Black Edition</p>
//                 <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-sm-4">
//           <div className="product-image-wrapper">
//             <div className="single-products">
//               <div className="productinfo text-center">
//                 <img src="images/home/recommend3.jpg" alt="" />
//                 <h2>$56</h2>
//                 <p>Easy Polo Black Edition</p>
//                 <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
//       <i className="fa fa-angle-left" />
//     </a>
//     <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
//       <i className="fa fa-angle-right" />
//     </a>			
//   </div>
// </div>{/*/recommended_items*/}
// </div>