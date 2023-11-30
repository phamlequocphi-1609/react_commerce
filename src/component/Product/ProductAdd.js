import { useEffect, useState } from "react"
import Api from "../../Api"
import {  useNavigate } from "react-router-dom"
function ProductAdd(){
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [input, setInput] = useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        companyProfile: '',
        status : "0",
        detail: "",
        salePrice: "",
        avatars: []
    })
    const [error, setError] = useState('')
    const [file, setFile] = useState([])
    const typeFile = ["png", "jpg", "jpeg", "PNG", "JPG"]
    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const navigate = useNavigate()
    useEffect(() => {
        Api.get('/category-brand')
        .then(res => {
           setCategory(res.data.category)
           setBrand(res.data.brand)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])
    function renderCategory(){
        if(category.length > 0){
            return(category.map((value, key)=> {
                return(
                    <option key={key}  value={value.id}>{value.category}</option>
                )
            }))
        }
    }
    const renderBrand = () => {
        if(brand.length > 0){
            return(brand.map((value, key) => {
                return(
                    <option key={key} value={value.id}>{value.brand}</option>
                )
            }))
        }
    }
    function handleInput(e){
        const nameInput = e.target.name
        const value = e.target.value
    
        setInput((prevInput) => ({...prevInput, [nameInput]:value}))
    }
   
    function handleInputFiles(e) {
        const files = e.target.files;
        const newFiles = [...file,...files];
        setFile(newFiles);
        
        const tempError = { ...error };
    
        if (newFiles.length > 3) {
            tempError.avatars = 'You can only upload up to 3 images';
            setError(tempError);
            return;
        }  
        for (let i = 0; i < newFiles.length; i++) {
            const currentFile = newFiles[i];
            if (currentFile.size > 1024 * 1024) {
                tempError.avatars = 'Please choose files smaller than 1MB';
                setError(tempError);
                return;
            }
            if (!typeFile.includes(currentFile.name.split('.').pop().toLowerCase())) {
                tempError.avatars = 'Please upload images with the extensions png, jpg, jpeg, PNG, JPG ';
                setError(tempError);
                return;
            }
        }
    
        setError({});
        setInput((prevInput) => ({ ...prevInput, avatars: newFiles }));
    }
    
    function handleSubmit(e){
        e.preventDefault()
        let errorSubmit = {}
        let isCheck = true
        if(input.name === ''){
            errorSubmit.name = 'Please enter name'
            isCheck = false
        }
        if(input.price === ''){
            errorSubmit.price = 'Please enter price'
            isCheck = false
        }
        if(input.category === ""){
            errorSubmit.category = "Please select category"
            isCheck = false
        }
        if(input.brand === ""){
            errorSubmit.brand = "Please select brand"
            isCheck = false
        }
        if(input.detail === ""){
            errorSubmit.detail = "Please enter detail"
            isCheck = false
        }
        if(input.companyProfile === ""){
            errorSubmit.companyProfile = "Please enter company"
            isCheck = false
        }
        if(input.avatars === ""){
            errorSubmit.avatars = "Please select image"
            isCheck = false
        }
        if(!isCheck){
            setError(errorSubmit)
        }else{
            setError({})
            let url = '/user/product/add'
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            }
            let formData = new FormData()
            formData.append('name', input.name)
            formData.append('price', input.price)
            formData.append('category', input.category)
            formData.append('brand',input.brand)
            formData.append('company', input.companyProfile)
            formData.append('detail', input.detail)
            formData.append('sale', input.salePrice)
            formData.append('status', input.status)

            Object.keys(file).map((item,  i) => {
                return formData.append("file[]", file[item])
            })
            Api.post(url, formData, config)
            .then(response => {
                if(response.data.errors){
                    setError(response.data.errors)
                }else{
                    console.log(response)
                    navigate('/myproduct')
                }
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }   
    function renderError(){
        if(Object.keys(error).length > 0){
            return Object.keys(error).map((value, key) => {
                return(
                    <li  style={{listStyle: "none"}} key={key}>{error[value]}</li>
                )
            })
        }
    }
    function renderSale() {
        if (input.status === "1")  {
        return (            
            <div style={{display: "flex", alignItems: "center"}}>
                <input
                type="text"
                placeholder="Sale Price"
                name="salePrice"
                onChange={handleInput}
                style={{width: 200, marginRight: 10}}
                />  %
            </div>
        );
        }
    }

    return(
        <div className="signup-form col-sm-8 padding-right ">
                  <h2>CREATE PRODUCT</h2> 
                    <div >
                            <ul style={{ padding: 0 }}>
                                {renderError()}
                            </ul>  
                     </div>
                  <form encType="multipart/form-data" onSubmit={handleSubmit}>
                      <input type="text" name="name" placeholder="Name" onChange={handleInput}/>
                      <input type="text"name="price" placeholder="Price" onChange={handleInput}/> 
                      <select className="id_category" name="category" onChange={handleInput}>
                            <option>Please select category</option>
                            {renderCategory()}
                      </select>
                      <select className="id_brand" name="brand" onChange={handleInput}> 
                            <option>Please select brand</option>
                            {renderBrand()}
                      </select>
                      <select className="id_sale" value={input.status} onChange={handleInput} name="status" >
                            <option value="0">New</option>
                            <option value = "1">Sale</option>
                      </select>
                        {renderSale()}
                      <input type="text" name="companyProfile" placeholder="Company profile" onChange={handleInput}/>             
                      <input type="file" id="files" accept='image/*' name="avatars"  multiple style={{paddingTop: 10}} onChange={handleInputFiles}/>
                        {file.map((image, index)=>(
                            <img key={index} src={URL.createObjectURL(image)} alt=""
                                style={{maxWidth: '100px', maxHeight: '100px', margin: '10px'}}
                            />
                        ))}
                      <textarea placeholder="Detail" name = "detail" onChange={handleInput}/>
                    
                          <button type="submit" className="btn btn-default">Signup</button>
                
                    
                  </form>
            </div>
    )
}
export default ProductAdd
