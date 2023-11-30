// import { useEffect , useContext, useState} from 'react'
// import Logo from '../Layout/images/home/logo.png'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { CartContext } from '../context/CartContext'
// function Header (){
//     const navigate = useNavigate()
//     const path = useLocation()
//     const dataContext = useContext(CartContext)
//     // console.log(dataContext)
//     const [isViewLogout, setIsViewLogout] = useState(false)
//     function renderLogin(){
//         let getUser = localStorage.getItem("LoggedIn")
//         let userData = JSON.parse(localStorage.getItem("appState"))
//         const imageUser = userData.avatar
//         const userName = userData.name
//         const handleClickLogout = () => {
//           setIsViewLogout(!isViewLogout)
//         }
//         if(getUser){
//           return(
//               <li>
//                   <Link onClick={handleClickLogout}>
//                       <img className="userImage" src={"http://localhost/laravel8/public/upload/user/avatar/" + imageUser} alt=''/>
//                        {userName}
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 icon_down">
//                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
//                       </svg>                
//                   </Link>
//                   {isViewLogout && ViewLogout()}
//               </li>
//           )
//         }else{
//           return(
//               <li><Link to="/login"><i className="fa fa-lock"></i> Login</Link></li>
//           )
//         }
//     }
//     function ViewLogout(){
//       const handleLogoutClick = () => {
//         Logout();
//       };
//       return (
//         <div className='downMenuLogout'>
//               <p><Link onClick={handleLogoutClick}>Logout</Link></p>
//               <p><Link to="/account/update">Profile</Link></p>
//         </div>
//       );
//     }
//     function Logout(){
//       localStorage.removeItem("LoggedIn")
//       navigate("/login")
//       setIsViewLogout(false)
//     }
//     function renderTotal(){
//       if(dataContext.tongQty === 0){
//           return(
//             <li>
//                   <Link to="/product/cart">
//                         <i className="fa fa-shopping-cart" />Cart
//                   </Link>
//             </li>
//           )
//       }else{
//         return(
//           <li>
//                 <Link to="/product/cart">
//                       {dataContext.tongQty} Cart
//                 </Link>
//            </li>
//         ) 
//       }
//     }
//     function renderWishlist(){
//       if(dataContext.tongWishlist === 0){
//           return(
//             <li>
//                 <Link to="/product/wishlist">
//                       <i className="fa fa-star"/> Wishlist
//                 </Link>
//             </li>
//           )
//       }else{
//         return(
//           <li>
//               <Link to="/product/wishlist">
//                      {dataContext.tongWishlist}  Wishlist
//               </Link>
//           </li>
//         )
//       }
//     }
    
//     useEffect(() => {
//         let check = localStorage.getItem("LoggedIn")
//         if(!check && path.pathname === '/account')
//         {
//           navigate('/login')
//         }
//     }, [path, navigate])

   
//     return(
//        <header id="header">{/*header*/}
//         <div className="header_top">{/*header_top*/}
//           <div className="container">
//             <div className="row">
//               <div className="col-sm-6">
//                 <div className="contactinfo">
//                   <ul className="nav nav-pills">
//                       <li>
//                           <Link to="">
//                                 <i className="fa fa-phone" /> +2 95 01 88 821
//                           </Link>
//                       </li>
//                       <li>
//                           <Link to="">
//                                 <i className="fa fa-envelope" /> info@domain.com
//                           </Link>
//                       </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="col-sm-6">
//                 <div className="social-icons pull-right">
//                     <ul className="nav navbar-nav">
//                         <li>
//                             <Link to="">
//                                   <i className="fa fa-facebook" />
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="">
//                                   <i className="fa fa-twitter" />
//                             </Link>
//                         </li>
//                         <li><Link to="">
//                                   <i className="fa fa-linkedin" />
//                             </Link>
//                         </li>
//                         <li><Link to="">
//                                   <i className="fa fa-dribbble" />
//                             </Link>
//                         </li>
//                         <li><Link to="">
//                                   <i className="fa fa-google-plus" />
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>{/*/header_top*/}
//         <div className="header-middle">{/*header-middle*/}
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-4 clearfix">
//                       <div className="logo pull-left">
//                         <a href="index.html"><img src={Logo} alt="" /></a>
//                       </div>
//                       <div className="btn-group pull-right clearfix">
//                         <div className="btn-group">
//                           <button 
//                                 type="button" 
//                                 className="btn btn-default dropdown-toggle usa" 
//                                 data-toggle="dropdown">
//                                 USA
//                                <span className="caret" />
//                           </button>
//                           <ul className="dropdown-menu">
//                               <li>
//                                   <Link to>Canada</Link>
//                               </li>
//                               <li>
//                                   <Link to>UK</Link>
//                               </li>
//                           </ul>
//                         </div>
//                         <div className="btn-group">
//                             <button 
//                                   type="button" 
//                                   className="btn btn-default dropdown-toggle usa" 
//                                   data-toggle="dropdown">
//                                   DOLLAR
//                                   <span className="caret" />
//                             </button>
//                           <ul className="dropdown-menu">
//                               <li>
//                                   <Link to>Canadian Dollar</Link>
//                               </li>
//                               <li>
//                                   <Link to>Pound</Link>
//                               </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-8 clearfix">
//                         <div className="shop-menu clearfix pull-right">
//                             <ul className="nav navbar-nav">
//                                 <li>
//                                     <Link to="/account/update">
//                                           <i className="fa fa-user"/> Account
//                                     </Link>
//                                 </li>
//                                 {renderWishlist()}
//                                 <li>
//                                     <Link to="checkout.html">
//                                           <i className="fa fa-crosshairs" /> Checkout
//                                     </Link>
//                                 </li>
//                                 {renderTotal()}
//                                 {renderLogin()}
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>{/*/header-middle*/}
//         <div className="header-bottom">{/*header-bottom*/}
//           <div className="container">
//             <div className="row">
//               <div className="col-sm-9">
//                   <div className="navbar-header">
//                       <button 
//                             type="button" 
//                             className="navbar-toggle" 
//                             data-toggle="collapse" 
//                             data-target=".navbar-collapse">
//                             <span className="sr-only">Toggle navigation</span>
//                             <span className="icon-bar" />
//                             <span className="icon-bar" />
//                             <span className="icon-bar" />
//                       </button>
//                   </div>
//                 <div className="mainmenu pull-left">
//                       <ul className="nav navbar-nav collapse navbar-collapse">
//                           <li>
//                               <Link to="/" 
//                                     className="active">Home
//                               </Link>
//                           </li>
//                           <li className="dropdown">
//                               <Link to="">Shop
//                                     <i className="fa fa-angle-down" />
//                               </Link>
//                             <ul role="menu" className="sub-menu">
//                               <li>
//                                   <Link to="/product/add">Add Product
//                                   </Link>
//                               </li>
//                               <li>
//                                   <Link to="/product/list">Products
//                                   </Link>
//                               </li>
//                               <li>
//                                   <a href="checkout.html">Checkout
//                                   </a>
//                               </li> 
//                               <li>
//                                   <a href="/product/cart">Cart</a>
//                               </li> 
//                         </ul>
//                     </li> 
//                     <li className="dropdown"><Link to="">Blog<i className="fa fa-angle-down" /></Link>
//                         <ul role="menu" className="sub-menu">
//                             <li>
//                                 <Link to="/blog/list">Blog List
//                                 </Link>
//                             </li>
//                             <li>
//                                 <a href="blog-single.html">Blog Single
//                                 </a>
//                             </li>
//                         </ul>
//                     </li> 
//                       <li><a href="404.html">404</a></li>
//                       <li><a href="contact-us.html">Contact</a></li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="col-sm-3">
//                 <div className="search_box pull-right">
//                   <input type="text" placeholder="Search" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>{/*/header-bottom*/}
//       </header>
//     )
// }
// export default Header





import { useEffect, useState} from 'react'
import Logo from '../Layout/images/home/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
function Header (){
    const navigate = useNavigate()
    const path = useLocation()
    const [isViewLogout, setIsViewLogout] = useState(false)
    const tongQty = useSelector(state => state.tongqty.tongQty)
    // console.log(tongQty)
    const tongWishlist = useSelector(state => state.tongwishlist.tongWishlist)
    // console.log(tongWishlist)
    function renderLogin(){
        let getUser = localStorage.getItem("LoggedIn")
        let userData = JSON.parse(localStorage.getItem("appState"))
        const handleClickLogout = () => {
          setIsViewLogout(!isViewLogout)
        }
        if(getUser && userData){
          const userName = userData.name
          const imageUser = userData.avatar
          return(
              <li>
                  <Link onClick={handleClickLogout}>
                      <img className="userImage" src={"http://localhost/laravel8/public/upload/user/avatar/" + imageUser} alt=''/>
                       {userName}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 icon_down">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>                
                  </Link>
                  {isViewLogout && ViewLogout()}
              </li>
          )
        }else{
          return(
              <li><Link to="/login"><i className="fa fa-lock"></i> Login</Link></li>
          )
        }
    }
    function ViewLogout(){
      const handleLogoutClick = () => {
        Logout();
      };
      return (
        <div className='downMenuLogout'>
              <p><Link onClick={handleLogoutClick}>Logout</Link></p>
              <p><Link to="/account/update">Profile</Link></p>
        </div>
      );
    }
    function renderTotal(){
            if(tongQty ===  0){
                return(
                  <li>
                        <Link to="/product/cart">
                              <i className="fa fa-shopping-cart" />Cart
                        </Link>
                  </li>
                )
            }else{
              return(
                <li>
                      <Link to="/product/cart">
                            {tongQty} Cart
                      </Link>
                 </li>
              ) 
       }
    }
    function renderWishlist(){
        if(tongWishlist=== 0){
                return(
                  <li>
                      <Link to="/product/wishlist">
                            <i className="fa fa-star"/> Wishlist
                      </Link>
                  </li>
                )
            }else{
              return(
                <li>
                    <Link to="/product/wishlist">
                           {tongWishlist}  Wishlist
                    </Link>
                </li>
              )
            }
    }
    function Logout(){
      localStorage.removeItem("LoggedIn")
      navigate("/login")
      setIsViewLogout(false)
    }  
    useEffect(() => {
        let check = localStorage.getItem("LoggedIn")
        if(!check && path.pathname === '/account')
        {
          navigate('/login')
        }
    }, [path, navigate])

   
    return(
       <header id="header">{/*header*/}
        <div className="header_top">{/*header_top*/}
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                      <li>
                          <Link to="">
                                <i className="fa fa-phone" /> +2 95 01 88 821
                          </Link>
                      </li>
                      <li>
                          <Link to="">
                                <i className="fa fa-envelope" /> info@domain.com
                          </Link>
                      </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="">
                                  <i className="fa fa-facebook" />
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                  <i className="fa fa-twitter" />
                            </Link>
                        </li>
                        <li><Link to="">
                                  <i className="fa fa-linkedin" />
                            </Link>
                        </li>
                        <li><Link to="">
                                  <i className="fa fa-dribbble" />
                            </Link>
                        </li>
                        <li><Link to="">
                                  <i className="fa fa-google-plus" />
                            </Link>
                        </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
        </div>{/*/header_top*/}
        <div className="header-middle">{/*header-middle*/}
            <div className="container">
                <div className="row">
                    <div className="col-md-4 clearfix">
                      <div className="logo pull-left">
                        <a href="index.html"><img src={Logo} alt="" /></a>
                      </div>
                      <div className="btn-group pull-right clearfix">
                        <div className="btn-group">
                          <button 
                                type="button" 
                                className="btn btn-default dropdown-toggle usa" 
                                data-toggle="dropdown">
                                USA
                               <span className="caret" />
                          </button>
                          <ul className="dropdown-menu">
                              <li>
                                  <Link to>Canada</Link>
                              </li>
                              <li>
                                  <Link to>UK</Link>
                              </li>
                          </ul>
                        </div>
                        <div className="btn-group">
                            <button 
                                  type="button" 
                                  className="btn btn-default dropdown-toggle usa" 
                                  data-toggle="dropdown">
                                  DOLLAR
                                  <span className="caret" />
                            </button>
                          <ul className="dropdown-menu">
                              <li>
                                  <Link to>Canadian Dollar</Link>
                              </li>
                              <li>
                                  <Link to>Pound</Link>
                              </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8 clearfix">
                        <div className="shop-menu clearfix pull-right">
                            <ul className="nav navbar-nav">
                                <li>
                                    <Link to="/account/update">
                                          <i className="fa fa-user"/> Account
                                    </Link>
                                </li>
                                {renderWishlist()}
                                <li>
                                    <Link to="checkout.html">
                                          <i className="fa fa-crosshairs" /> Checkout
                                    </Link>
                                </li>
                                {renderTotal()}
                                {renderLogin()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>{/*/header-middle*/}
        <div className="header-bottom">{/*header-bottom*/}
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                  <div className="navbar-header">
                      <button 
                            type="button" 
                            className="navbar-toggle" 
                            data-toggle="collapse" 
                            data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                      </button>
                  </div>
                <div className="mainmenu pull-left">
                      <ul className="nav navbar-nav collapse navbar-collapse">
                          <li>
                              <Link to="/" 
                                    className="active">Home
                              </Link>
                          </li>
                          <li className="dropdown">
                              <Link to="">Shop
                                    <i className="fa fa-angle-down" />
                              </Link>
                            <ul role="menu" className="sub-menu">
                              <li>
                                  <Link to="/product/add">Add Product
                                  </Link>
                              </li>
                              <li>
                                  <Link to="/product/list">Products
                                  </Link>
                              </li>
                              <li>
                                  <a href="checkout.html">Checkout
                                  </a>
                              </li> 
                              <li>
                                  <a href="/product/cart">Cart</a>
                              </li> 
                        </ul>
                    </li> 
                    <li className="dropdown"><Link to="">Blog<i className="fa fa-angle-down" /></Link>
                        <ul role="menu" className="sub-menu">
                            <li>
                                <Link to="/blog/list">Blog List
                                </Link>
                            </li>
                            <li>
                                <a href="blog-single.html">Blog Single
                                </a>
                            </li>
                        </ul>
                    </li> 
                      <li><a href="404.html">404</a></li>
                      <li><a href="contact-us.html">Contact</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="search_box pull-right">
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
          </div>
        </div>{/*/header-bottom*/}
      </header>
    )
}
export default Header