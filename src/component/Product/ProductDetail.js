import { useEffect,useState } from "react"
import { Link, useParams } from "react-router-dom"
import Api from "../../Api"
import moment from "moment"
import AddCart from "./AddCart"
import ProductRate from "./ProductRate"
function ProductDetail(){
    let params = useParams()
    const [item, setItem] = useState({})
    // console.log(item)
    const [brand, setBrand] = useState([])
    const [content, setContent] = useState("reviews")
    const [userName , setUserName] = useState('')
    const [selectImg, setSelectImg] = useState('')
    console.log(selectImg)
    useEffect(() => {               
      Api.get('/category-brand')
      .then(response => {
          setBrand(response.data.brand)
      })
      .catch(function(error){
          console.log(error)
      })
    }, [])
    useEffect(() => {
        Api.get('/product/detail/' + params.id )
        .then(response => {
            setItem(response.data.data)
            const imageArray = JSON.parse(response.data.data.image)
            setSelectImg(imageArray[0])
        })
        .catch(function(error){
            console.log(error)
        })
    }, [params.id])
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("appState"))
      setUserName(user.name)
    }, [])
   
    
    function renderDetail(){
        if(Object.keys(item).length > 0){
          const imageArray = JSON.parse(item.image)
          console.log(imageArray)
          const checkBrand = brand.map((value) => value.id).includes(item.id_brand)
          const isBrand = checkBrand ? brand.find(value => value.id === item.id_brand) : ''
          const brandName = isBrand ? isBrand.brand : ''
          const condition =  item.status === 1 ? 'Sale' : 'New'
          return(          
                <div className="product-details">               
                    <div className="col-sm-5">
                        <div className="view-product">
                            <Link>
                               <img src={"http://localhost/laravel8/public/upload/product/" + item.id_user + "/" + selectImg} 
                               style={{
                                  objectFit: "cover",
                               }}
                               alt=""/>
                            </Link>
                            <Link>
                                  <h3>ZOOM</h3>                                     
                            </Link>    
                        </div>
                        <div id="similar-product" className="carousel slide" data-ride="carousel"> 
                              <div className="carousel-inner"> 
                                  <div className="item active" style={{display: "flex"}}>
                                      {imageArray.map((value, key) => (
                                          <Link key={key}> 
                                              <img src={"http://localhost/laravel8/public/upload/product/" + item.id_user + "/" + value} alt=""
                                              style={{maxWidth: '100px', objectFit: "cover"}}
                                              onClick={() => setSelectImg(value)  }        
                                              />
                                          </Link>
                                      ))}
                                  </div>
                              </div>

                              <Link className="left item-control" to="#similar-product" data-slide="prev">
                                <i className="fa fa-angle-left"></i>
                              </Link>
                              <Link className="right item-control" to="#similar-product" data-slide="next">
                                  <i className="fa fa-angle-right"></i>
                              </Link>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="product-information">
                              <img className="newarrival" src={require('../Layout/images/product-details/new.jpg')} alt=""/>
                              <h2>{item.name}</h2>
                              <p>Wed Id :</p>
                                
                              <span>
                                  <span>{item.price}</span>
                                    {/**Component addcart */}
                                  <AddCart id = {item.id}/>

                              </span>
                              <p><b>Availability:</b> In Stock</p>
                              <p><b>Condition:</b> {condition}</p>
								              <p><b>Brand:</b> {brandName}</p>

                                <ProductRate id = {params.id}/>
                              <Link to=""><img src={require('../Layout/images/product-details/share.png')} className="share img-responsive"  alt="" /></Link>
                        </div>
                    </div>
                </div>
          )
        }
       
    }
    function handleClick(tabname){
      setContent(tabname)
    }
    function activeReview(){
        if(content === "reviews"){
            return(
              <li className="active">
                <Link to="" data-toggle="tab" 
                  onClick={() => handleClick("reviews")}>Reviews</Link>
              </li>
            )
        }else{
            return(
              <li>
              <Link to="" data-toggle="tab" 
                onClick={() => handleClick("reviews")}>Reviews</Link>
            </li>
            )
        }
    }
    function activeDetail(){
      if(content === "details"){
          return(
            <li className="active">
                <Link to="" data-toggle="tab" 
                onClick={() => handleClick("details")}>Details</Link>
            </li>
          )
      }else{
          return(
            <li>
            <Link to="" data-toggle="tab" 
            onClick={() => handleClick("details")}>Details</Link>
           </li>
          )
      }
    }
    function activeCompany(){
      if(content === "companyprofile"){
            return(
              <li className="active">
              <Link to="" data-toggle="tab" onClick={() => handleClick("companyprofile")}>Company Profile</Link>
            </li>
            )
      }else{
          return(
            <li>
             <Link to="" data-toggle="tab" onClick={() => handleClick("companyprofile")}>Company Profile</Link>
             </li>
          )
      }
    }
    
    function renderProductDetail(){
        if(content === "details"){
          if(Object.keys(item).length > 0){
            return(
              <div className="tab-pane fade active in " id="details">
                      {item.detail}              
              </div>
            )
          }
        }else{
            if(Object.keys(item).length > 0){
              return(
                <div className="tab-pane fade" id="details"></div>
              )
            }
        }
    }

    function renderCompany(){
      if(content === "companyprofile"){
          if(Object.keys(item).length > 0){
              return(
                  <div className="tab-pane fade active in" id="companyprofile">
                        {item.company_profile}
                  </div>
              )
          }
      }
    }
    function renderReview(){
      if(content === "reviews"){
          if(Object.keys(item).length > 0){
            return(
              <div className="tab-pane fade active in" id="reviews">
                  <div className="col-sm-12">
                  <ul>
                    <li><Link to><i className="fa fa-user" />{userName}</Link></li>
                    <li><Link to><i className="fa fa-clock-o" />{moment(item.created_at).format('h:mm A')}</Link></li>
                    <li><Link to><i className="fa fa-calendar-o" />{moment(item.updated_at).format('MMM D, YYY')}</Link></li>
                  </ul>
                  <p>{item.detail}</p>
                  <p><b>Write Your Review</b></p>
                  <form action="#">
                    <span>
                      <input type="text" placeholder="Your Name" />
                      <input type="email" placeholder="Email Address" />
                    </span>
                    <textarea name defaultValue={""} />
                    <button type="button" className="btn btn-default pull-right">
                      Submit
                    </button>
                  </form>
                </div>
            </div>
            )
          }
      }
      else{
        <div className="tab-pane fade " id="reviews">
        
        </div>
      }
    }
    return(
        <div className="col-sm-9 padding-right">
  
              {renderDetail()}         
            
              <div className="category-tab shop-details-tab">
              <div className="col-sm-12">
                <ul className="nav nav-tabs">
                    {activeDetail()}
                    {activeCompany()}
                    {activeReview()}
                </ul>
              </div>
              <div className="tab-content">
                  {renderProductDetail()}
                  {renderCompany()}
                  {renderReview()}
              </div>

            </div>
        </div>
    )
}
export default ProductDetail







// <div className="item">
    // <Link>
    //     <img src={"http://localhost/laravel8/public/upload/product/" + item.id_user + "/" + firstImage} alt=""/>
    // </Link>
    // <Link>
    //     <img src={"http://localhost/laravel8/public/upload/product/" + item.id_user + "/" + secondImage} alt=""/>
    // </Link>
    // <Link>
    //     <img src={"http://localhost/laravel8/public/upload/product/" + item.id_user + "/" + threeImage} alt=""/>
    // </Link>
    // </div>
    // <div className="item">
    // <Link>
    //     <img src={"http://localhost/laravel8/public/upload/product/" + item.id_user + "/" + firstImage} alt=""/>
    // </Link>
    // <Link>
    //     <img src={"http://localhost/laravel8/public/upload/product/" + item.id_user + "/" + secondImage} alt=""/>
    // </Link>
    // <Link>
    //     <img src={"http://localhost/laravel8/public/upload/product/" + item.id_user + "/" + threeImage} alt=""/>
    // </Link>
// </div>