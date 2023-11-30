import { useEffect, useState } from "react"
import Api from "../../Api"
import { Link } from "react-router-dom"
function Category(){
    const [item, setItem] = useState('')
    useEffect(() => {
        Api.get('/category-brand')
        .then(res => {
            setItem(res.data.category)
        })
        .catch(function(error){
            console.log(error)
        })
    }, [])
    function renderCategory(){
        if(item.length > 0){
            return item.map((value) => {
                return(
                    <div className="panel panel-default" key={value.id}>
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <Link data-toggle="collapse" data-parent="#accordian" to = '#'>
                          {value.category}
                        </Link>
                      </h4>
                    </div>
                  </div>
                )
            })
        }
    }
    return(
        <div className="panel-group category-products" id="accordian">
                {renderCategory()}
          </div>
    )
}
export default Category