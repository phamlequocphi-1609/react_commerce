// import { useContext } from "react"
// import { Link } from "react-router-dom"
// import { CartContext } from "../context/CartContext"
// function AddWishlist({id}){
//     const WishlistContext = useContext(CartContext)
//     function handleWishlist(){
//         let getWishlist = JSON.parse(localStorage.getItem("WishlistCart")) || []
//         console.log(getWishlist)
//         if(!getWishlist.includes(id)){
//             getWishlist.push(id)
//         }
//         localStorage.setItem("WishlistCart", JSON.stringify(getWishlist))   
//         let totalWishList = getWishlist.length
//         WishlistContext.getWishlist(totalWishList)     
//     }
//     return(
//         <Link to="" onClick={handleWishlist}>
//         <i className="fa fa-plus-square" />Add to wishlist
//         </Link>
//     )
// }
// export default AddWishlist





import { Link } from "react-router-dom"
import {useDispatch} from 'react-redux'
import { IncreaseWishlist } from "../../action/wishlist"

function AddWishlist({id}){
    const dispatch = useDispatch()
    function handleWishlist(){
        let getWishlist = JSON.parse(localStorage.getItem("WishlistCart")) || []
        console.log(getWishlist)
        if(!getWishlist.includes(id)){
            getWishlist.push(id)
        }
        localStorage.setItem("WishlistCart", JSON.stringify(getWishlist))   
        const action = IncreaseWishlist(getWishlist.length)
        dispatch(action)
    }
    return(
        <Link to="" onClick={handleWishlist}>
        <i className="fa fa-plus-square" />Add to wishlist
        </Link>
    )
}
export default AddWishlist