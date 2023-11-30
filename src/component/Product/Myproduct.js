import { useEffect, useState } from "react"
import Api from "../../Api"
import { Link } from "react-router-dom"
function Myproduct(){
	const [item, setItem] = useState([])
	// console.log(item)
	const accessToken = JSON.parse(localStorage.getItem("accessToken"))
 	let url = "user/my-product"
	useEffect(()=> {
		let config = {
			headers: {
				'Authorization': 'Bearer ' + accessToken,
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			}
		}
		Api.get(url, config)
		.then(response => {
			setItem(response.data.data)
		})
		.catch(function(error){
			console.log(error)
		})
	}, [url, accessToken])
	const handleDelete = (productId) => {
		let config = {
			headers: {
				'Authorization': 'Bearer ' + accessToken,
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			}
		}	
		Api.get("/user/product/delete/" + productId , config)
		.then(res=> {
			setItem(res.data.data)
		})
		.catch(function(error){
			console.log(error)
		})
	}
	
	function renderProduct(){
		if(Object.keys(item).length > 0){
			return Object.keys(item).map((key, index) => {
                const imageArray = JSON.parse(item[key].image);
				const firstImage = imageArray[0]
				return(
					<tr key={key}>
						<td className="product_id">
							<p>{item[key].id}</p>
						</td>
						<td className="product_name">
							<h4>
								<Link to="">{item[key].name}</Link>
							</h4>
						</td>
						<td className="product_image">
							<Link to="">
							<img  style={{width: '100px'}} src={"http://localhost/laravel8/public/upload/product/" + item[key].id_user + "/" + firstImage} alt=""/>
							</Link>
						</td>
						<td className="product_price">
							<p>$ {item[key].price}</p>
						</td>
						<td>
							<Link to={"/user/product/update/" + item[key].id}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 edit_product">
								<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
								</svg>
							</Link>
						</td>
						<td className="product_delete">
					 		 <Link  className="product_delete-icon " href onClick={() => handleDelete(item[key].id)}><i className="fa fa-times" /></Link>
						</td>
					</tr>
				)
			})
		}
	}
	return(
	<div className=" product_info col-sm-8">
	  <table className="table table-condensed table_product">
		<thead>
		  <tr className=" product_menu">
		  	<td className="ID">Id</td>
			<td className="Name">Name</td>
			<td className="image">Image</td>
			<td className="price">Price</td>
			<td className="Action">Action</td>
			<td></td>
		  </tr>
		</thead>
		<tbody>
			{renderProduct()}
		</tbody>
	  </table>
	  <Link to="/product/add">
	  	<button type="submit" className="product_add btn btn-default">Add New</button>
	  </Link>
	 
	</div>
	)
}
export default Myproduct
