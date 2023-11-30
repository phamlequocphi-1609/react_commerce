import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import Api from '../../Api';
function Rate(props){
    const [rating, setRating] = useState(0)
    const [error, setError] = useState('')
    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const userData = JSON.parse(localStorage.getItem("appState"))
    const idBlog = props.idBlog
    let url = '/blog/rate/' + idBlog
    // console.log(idBlog)
    useEffect(() => {
        Api.get(url)
        .then(response => {
            // console.log(response)
            const rateArray = []
            const ratings = response.data.data
                for (const key in ratings) {
                    if (ratings.hasOwnProperty(key)) {
                        const rateValue = ratings[key].rate;
                        rateArray.push(rateValue)
                    }
                }
            // console.log(rateArray)
            const total = rateArray.reduce((sum, rate) => sum+rate)
            // console.log(total)
            const average = total / rateArray.length
            // console.log(average)  
            setRating(average)       
        })
        .catch(function(error){
            console.log(error)
        })
    }, [url])

    function changeRating(newRating, name){
        setRating(newRating)
        if(!localStorage.getItem("LoggedIn")){
            setError("Vui lòng đăng nhập ")
            
        }else{
            setError('')
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };	
            const formData = new FormData()
            formData.append('user_id', userData.id)
            formData.append('blog_id', idBlog)
            formData.append('rate', newRating)
            Api.post(url, formData, config)
            .then(response => {
                if(response.data.errors){
                    setError(response.data.errors)
                }else{
                    console.log(response)
                }
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }
    return(
        <div className="rating-area">
            <ul className="ratings">
               <p>{error}</p>
                <li className="rate-this">Rate this item:</li>
                <li>
                    <StarRatings
                        rating={rating}
                        starRatedColor='blue'
                        changeRating={changeRating}
                        numberOfStars={6}
                        name='rating'
                    />
                </li>
            </ul>
            <ul className="tag">
                <li>TAG:</li>
                <li><a className="color" href>Pink <span>/</span></a></li>
                <li><a className="color" href>T-Shirt <span>/</span></a></li>
                <li><a className="color" href>Girls</a></li>
            </ul>
        </div>
    )
}
export default Rate


