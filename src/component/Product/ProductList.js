import { useEffect, useState } from "react"
import Api from "../../Api"
import { Link } from "react-router-dom"
import AddCart from "./AddCart"
function ProductList(){
    const [item, setItem] = useState([])
    console.log(item)
    useEffect(() => {
        Api.get("/product/list")
        .then(res => {
            setItem(res.data.data.data)
        })
        .catch(function(error){
            console.log(error)
        })
    },[])
    function renderProductList(){
        if(item.length > 0){
            return item.map((value, key) => {
                const imageArray = JSON.parse(value.image)
                const firstImage = imageArray[0]
                console.log(firstImage)
                return(
                    <div className="col-sm-4">
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img 
                                        src={"http://localhost/laravel8/public/upload/product/" + value.id_user + "/" + firstImage} 
                                        alt="" 
                                    />
                                    <h2>{value.price}</h2>
                                    <p>{value.name}</p>
                                    <AddCart id = {value.id}/>
                                </div>
                                <div className="product-overlay">
                                    <div className="overlay-content">
                                        <h2>{value.price}</h2>
                                        <p>{value.name}</p>
                                        <AddCart id = {value.id}/>
                                    </div>
                                </div>
                            </div>
                        <div className="choose">
                            <ul className="nav nav-pills nav-justified">
                                <li><Link to><i className="fa fa-plus-square" />Add to wishlist</Link></li>
                                <li><Link to><i className="fa fa-plus-square" />Add to compare</Link></li>
                            </ul>
                        </div>
                        </div>
                </div>
                )
            })
        }
    }
    return(
        <>
        <div className="col-sm-9 padding-right">
            <div className="features_items">
                <h2 className="title text-center">Features Items</h2>
                {renderProductList()}
                    <ul className="pagination">
                        <li className="active"><a href>1</a></li>
                        <li><a href>2</a></li>
                        <li><a href>3</a></li>
                        <li><a href>»</a></li>
                    </ul>
            </div>
      </div>
        </>
    )
}
export default ProductList










