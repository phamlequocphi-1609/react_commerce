import { useEffect, useState } from "react"
import Api from "../../Api"
import { Link } from "react-router-dom"
function Brand(){
    const [item, setItem] = useState('')
    useEffect(() => {
        Api.get('/category-brand')
        .then(res => {
            setItem(res.data.brand)
        })
        .catch(function(error){
            console.log(error)
        })
    }, [])
    function renderBrand(){
        if(item.length > 0){
            return item.map((value) => {
                return(
                    <li key={value.id}>
                        <Link to="">{value.brand}</Link>
                    </li>
                )
            })
        }
    }
    return(
        <div className="brands_products">
            <h2>Brands</h2>
            <div className="brands-name">
              <ul className="nav nav-pills nav-stacked">
                    {renderBrand()}
              </ul>
            </div>
          </div>
    )
}
export default Brand