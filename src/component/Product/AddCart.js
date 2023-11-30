// import { useContext } from "react"
// import { Link } from "react-router-dom"
// import { CartContext } from "../context/CartContext"
// function AddCart({id}){ 
//         const qtyContext = useContext(CartContext)
//         const handleClick = () => {
//         const cart = JSON.parse(localStorage.getItem("cart") || "{}")
//         if(!cart[id]){
//                 cart[id] = 1
//         }else{
//                 cart[id] += 1       
//         }   
//         localStorage.setItem("cart", JSON.stringify(cart))
//         let tongQty = 0
//         if(Object.keys(cart).length > 0){
//             Object.keys(cart).forEach((key) => 
//                 tongQty += cart[key]
//             )
//             qtyContext.getQty(tongQty)
//         }
//         console.log(tongQty)
//     }  

//     return(
//         <>
//             <Link to="" 
//                     className="btn btn-default  add-to-cart"  
//                     onClick={handleClick}          
//             >
//                 <i className="fa fa-shopping-cart" />Add to cart
//             </Link>
//         </>
//     )
// }
// export default AddCart




import { Link } from "react-router-dom"
import {useDispatch} from "react-redux"
import { IncreaseNewQty } from "../../action/qty"
function AddCart({id}){       
        const dispatch = useDispatch()
        const handleClick = () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || {}
            if(!cart[id]){
                    cart[id] = 1
            }else{
                    cart[id] += 1       
            }   
            localStorage.setItem("cart", JSON.stringify(cart))
            // console.log(cart)
            // console.log(id)
            // console.log(cart[id])
            let tongQty = 0
            if(Object.keys(cart).length > 0){
                Object.keys(cart).map((key) =>
                    tongQty += cart[key]
                )
                const action = IncreaseNewQty(tongQty)
                dispatch(action)
        }
    }  
    return(
        <>
            <Link to="" 
                    className="btn btn-default  add-to-cart"  
                    onClick={handleClick}          
            >
                <i className="fa fa-shopping-cart" />Add to cart
            </Link>
        </>
    )
}
export default AddCart