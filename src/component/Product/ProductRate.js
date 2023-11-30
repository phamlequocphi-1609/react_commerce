import StarRatings from "react-star-ratings"
import { useState } from "react"
// import Api from "../../Api"

function ProductRate(props){
    const [rating, setRating] = useState(0)
    let {id} = props
   
    function changeRating(newRating, name){
        setRating(newRating)

    }
    return(
        <p style={{float: "left", fontWeight: "bold"}}>
            Ratings: 
                <StarRatings 
                rating={rating}
                starRatedColor='blue'
                changeRating={changeRating}
                numberOfStars={6}
                name='rating'  
            />
         </p>
    )
}
export default ProductRate