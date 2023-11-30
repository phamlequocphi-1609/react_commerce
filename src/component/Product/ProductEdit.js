import { useEffect, useState } from "react"
import Api from "../../Api"
import { useParams } from "react-router-dom"

function ProductEdit(){
    let params = useParams()
    // console.log(params.id)
    const [input, setInput] = useState({
        name: "",
        price: "",
        companyProfile: "",
        category: "",
        brand: "",
        status: 0,
        sale: "",
        detail: "",
        avatars: ""
    })
    const [error, setError] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    
    const typeFile = ["png", "jpg", "jpeg", "PNG", "JPG"]
    const [file, setFile] = useState([])
    const [fileApi, setFileApi] = useState([])
    const [userID, setUserID] = useState('')
    const [deleteImg, setDeleteImge] = useState([])
    useEffect(() => {       
                Api.get('/category-brand')
                .then(response => {
                    setCategory(response.data.category)
                    setBrand(response.data.brand)
                })
                .catch(function(error){
                    console.log(error)
                })
    }, [])
    useEffect(() => {
        const accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'multipart/form-data',
                         'Accept': 'application/json'
                 }
            }
        Api.get('/user/product/' + params.id, config)
        .then(res => {     
            const data = res.data.data
            console.log(data)
            setInput(
               {
                 name: data.name,
                 price: data.price,
                 category: data.id_category,
                 brand: data.id_brand,
                 status: data.status,
                 companyProfile: data.company_profile,
                 detail: data.detail,
                 sale: data.sale,
               }
            )
            setFileApi(data.image)
            setUserID(data.id_user)
        })
        .catch(function(error){
            console.log(error)
        })
    },[params.id])
    function renderCategory(){
               if(category.length > 0){
                return category.map((value, key)=>{
                    return(
                        <option key={key} value={value.id}>{value.category}</option>
                    )
                })
               }
            }
    function renderBrand(){
                if(brand.length > 0 ){
                    return brand.map((value, key) => {
                        return(
                            <option key={key} value={value.id}>{value.brand}</option>
                        )
                    })
                }
    }
    function handleInput(e){
        const nameInput = e.target.name
        const value = e.target.value
        setInput(prev => ({...prev, [nameInput]:value}))
    }
   
      
    function handleInputFiles(e){
        const files = e.target.files
        const newFiles = [...file, ...files]
        setFile(newFiles)
    }
   
    function handleChecboxImg(imageName){
        if(deleteImg.includes(imageName)){
            setDeleteImge(deleteImg.filter((name) => name !== imageName))
        }
        else{
            setDeleteImge([...deleteImg, imageName])
        }
    }
    function handleSubmit(e){
        e.preventDefault()
        let errorSubmit = {}
        let isCheck = true
        if(input.name === ""){
            errorSubmit.name = "Vui lòng nhập tên"
            isCheck = false
        }
        if(input.price === ""){
            errorSubmit.price = "Vui lòng nhập giá"
            isCheck = false
        }
        if(input.category === ""){
            errorSubmit.category = "Vui lòng lựa chọn danh mục"
            isCheck = false
        }
        if(input.brand === ""){
            errorSubmit.brand = "Vui lòng lựa chọn thương hiệu"
            isCheck = false
        }
        if(input.companyProfile === ""){
            errorSubmit.companyProfile = "Vui lòng lựa chọn công ty sản xuất"
            isCheck = false
        }
        if(input.detail === ""){
            errorSubmit.detail = "Vui lòng nhập chi tiết sản phẩm"
            isCheck = false
        }
        if(!file){
            errorSubmit.avatars = "Vui lòng chọn file để upload"
            isCheck = false
        }else{
            if(file.length >  3) {
                errorSubmit.avatars = "Chỉ có thể tải lên tối đa 3 hình ảnh"
                isCheck = false
            }
            for(let i = 0; i< file.length; i++){
                const currentFile = file[i]
                if(currentFile.size > 1024*1024){
                    errorSubmit.avatars = "Vui lòng chọn file nhỏ hơn 1MB"
                    isCheck = false
                }else if(!typeFile.includes(currentFile.name.split(".").pop())){
                    errorSubmit.avatars = "Vui lòng chọn file ảnh có đuôi png, jpg, jpeg, PNG, JPG"
                    isCheck = false
                }
            }
            const totalImage = file.length + fileApi.length - deleteImg.length
            console.log(totalImage)
            if(totalImage > 3){
                errorSubmit.avatars = "Xin vui lòng gửi tối đa 3 hình ảnh"
                isCheck = false
            }

        }
        if(!isCheck){
            setError(errorSubmit)
        }else{
            setError({})
            let url = "/user/product/update/" + params.id
            const accessToken = JSON.parse(localStorage.getItem("accessToken"))
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }	
            const formData = new FormData()
            formData.append("name", input.name)
            formData.append("price", input.price)
            formData.append("category", input.category)
            formData.append("brand", input.brand)
            formData.append("company", input.companyProfile)
            formData.append("detail", input.detail)
            formData.append("status", input.status)
            formData.append("sale", input.sale)
            Object.keys(file).map((item) => (
                formData.append("file[]", file[item])
            ))
            deleteImg.forEach((imageName) => {
                formData.append("avatarCheckBox[]", imageName)
            })
            Api.post(url,formData, config)
            .then(res => {
                if(res.data.errors){
                    setError(res.data.errors)
                }else{
                    console.log(res)
                    
                }
            })
            .catch(function(error){
                console.log(error)
            })

        }
    }
    function renderSale(){
        if (input.status === 1)  {
            return (            
                <div style={{display: "flex", alignItems: "center"}}>
                    <input
                    type="text"
                    placeholder="Sale Price"
                    name="sale"
                    value={input.sale}
                    onChange={handleInput}
                    style={{width: 200, marginRight: 10}}
                    />  %
                </div>
            );
        }
    }
    function renderError(){
        if(Object.keys(error).length > 0){
            return Object.keys(error).map((value, key) => {
                return (
                    <li  style={{listStyle: "none"}} key={key}>{error[value]}</li>
                )
            })
        }
    }
    return(
        <div className="signup-form col-sm-8 padding-right ">
                <h2>PRODUCT EDITING</h2> 
                  <div >
                          <ul style={{ padding: 0 }}>
                                {renderError()}
                          </ul>  
                   </div>
                <form encType="multipart/form-data" onSubmit={handleSubmit} >
                    <input type="text" name="name" placeholder="Name" value={input.name} onChange={handleInput}/>
                    <input type="text"name="price" placeholder="Price" value={input.price} onChange={handleInput} /> 
                    <select className="id_category" name="category" value={input.category} onChange={handleInput}>
                          <option>Please select category</option>
                            {renderCategory()}
                    </select>
                    <select className="id_brand" name="brand" value={input.brand} onChange={handleInput}> 
                          <option>Please select brand</option>
                        {renderBrand()}
                    </select>
                    <select className="id_sale" name="status" value={input.status} onChange={handleInput}>
                          <option value={0}>New</option>
                          <option value ={1}>Sale</option>
                    </select>
                     {renderSale()}
                    <input type="text" name="companyProfile" placeholder="Company profile" value={input.companyProfile} onChange={handleInput}/>             
                    <input type="file" id="files" accept='image/*' name="avatars"  multiple style={{paddingTop: 10}} onChange={handleInputFiles}/>       
                    <div  style={{display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-center"}}>
                        {file.map((image, index) => (
                            <div key={index} style={{}}>
                                <img           
                                src={URL.createObjectURL(image)}
                                alt=""
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: "cover",
                                    marginBottom: '10px',
                                    marginRight: '10px'
                                }}
                                    />
                                <input type="checkbox" onChange={() => handleChecboxImg(image.name)}/>
                                    </div>
                                ))} 
                    </div> 
                    <div  style={{display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-center"}}>
                      {fileApi.map((image, index) => (
                        <div key={index}>
                                <img src={"http://localhost/laravel8/public/upload/product/" + userID + "/" + image}
                                    alt=""
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: "cover",
                                        marginBottom: '10px',
                                        marginRight: '10px'
                                    }}
                                />
                                <input type="checkbox" onChange={() => handleChecboxImg(image)}/>
                        </div>
                      ))}
                </div>
                    <textarea placeholder="Detail" name = "detail" value={input.detail} onChange={handleInput}/>
                    <button type="submit" className="btn btn-default">Signup</button>         
                </form>
          </div>
    )
}
export default ProductEdit
