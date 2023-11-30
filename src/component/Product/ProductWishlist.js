// import {useContext, useEffect, useState} from "react"
// import Api from "../../Api"
// import AddCart from "./AddCart"
// import { Link } from "react-router-dom"
// import { CartContext } from "../context/CartContext"
// function ProductWishlist(){
//     const [item, setItem] = useState([])
//     const WishlistContext = useContext(CartContext)
//     useEffect(() => {
//         let getCartWishList = JSON.parse(localStorage.getItem("WishlistCart") || "[]")
//         console.log(getCartWishList)
//         Api.get("/product/wishlist") 
//         .then(res => {
//             const FilterCart = res.data.data.filter(value => getCartWishList.includes(value.id))
//             setItem(FilterCart)
//         })
//         .catch(error => console.log(error))
//     }, [])
//     // console.log(item)
//     function handleDelete(idProduct){
//         let getCartWishLists = JSON.parse(localStorage.getItem("WishlistCart") || "[]")
//         if(getCartWishLists.includes(idProduct)){
//             getCartWishLists = getCartWishLists.filter(value => value !== idProduct)
//             localStorage.setItem("WishlistCart", JSON.stringify(getCartWishLists))
//             setItem(prevState => prevState.filter(value => value.id !== idProduct))
//             WishlistContext.getWishlist(getCartWishLists.length)
//         }
//     }
//     function renderCartsLove(){
//         if(item.length > 0){
//             return item.map((value, key) => {
//                 const imageArray = JSON.parse(value.image)
//                 const firstImage = imageArray[0]
//                 return(
//                     <div className="col-sm-4" key={key} >
//                         <div className="product-image-wrapper">
//                             <div className="single-products">
//                                 <div className="productinfo text-center">
//                                     <img 
//                                         src = {"http://localhost/laravel8/public/upload/product/" + value.id_user + "/" + firstImage} 
//                                         alt="" 
//                                     />
//                                     <h2>$ {value.price}</h2>
//                                     <p>{value.name}</p>
//                                     <AddCart id={value.id}/>
//                                 </div>
//                                 <div className="product-overlay">
//                                     <div className="overlay-content">
//                                         <h2>$ {value.price}</h2>
//                                         <p>{value.name}</p>
//                                         {/* Add product to cart */}      
//                                         <AddCart id={value.id} />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="choose">
//                                 <ul className="nav nav-pills nav-justified">
//                                 <li>
//                                     <Link to={"/product/detail/" + value.id}>
//                                             <i className="fa fa-plus-square" />Product Detail
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link to="" onClick={() => handleDelete(value.id)}>
//                                             <i className="fa fa-plus-square" />Delete Product
//                                     </Link>
//                                 </li> 
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 )
//             })
//         }
//     }
//     return(
//         <div className="col-sm-9 padding-right">
//             <div className="features_items">
//                 <h2 className="title text-center">Wishlist Items</h2>
//                     {renderCartsLove()}
//             </div>
//         </div>
//     )
// }
// export default ProductWishlist



import {useEffect, useState} from "react"
import Api from "../../Api"
import AddCart from "./AddCart"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { DeleteWishlist } from "../../action/wishlist"

function ProductWishlist(){
    const [item, setItem] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        let getCartWishList = JSON.parse(localStorage.getItem("WishlistCart") || "[]")
        console.log(getCartWishList)
        Api.get("/product/wishlist") 
        .then(res => {
            const FilterCart = res.data.data.filter(value => getCartWishList.includes(value.id))
            setItem(FilterCart)
        })
        .catch(error => console.log(error))
    }, [])
    // console.log(item)
    function handleDelete(idProduct){
        let getCartWishLists = JSON.parse(localStorage.getItem("WishlistCart") || "[]")
        if(getCartWishLists.includes(idProduct)){
            getCartWishLists = getCartWishLists.filter(value => value !== idProduct)
            localStorage.setItem("WishlistCart", JSON.stringify(getCartWishLists))
            setItem(prevState => prevState.filter(value => value.id !== idProduct))
            const action = DeleteWishlist(getCartWishLists.length)
            dispatch(action)
        }
    }
    function renderCartsLove(){
        if(item.length > 0){
            return item.map((value, key) => {
                const imageArray = JSON.parse(value.image)
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
                                    <AddCart id={value.id}/>
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
                                    <Link to="" onClick={() => handleDelete(value.id)}>
                                            <i className="fa fa-plus-square" />Delete Product
                                    </Link>
                                </li> 
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
                <h2 className="title text-center">Wishlist Items</h2>
                    {renderCartsLove()}
            </div>
        </div>
    )
}
export default ProductWishlist