import { useState } from "react"
import Api from "../../Api"
function Register(){
    const [input, setInput] = useState({
        name: '',
        email: '',
        pass : '',
        phone: '',
        address: '',
        avatar: '',
    })
    const [error, setError] = useState({})
    const [file, setFile] = useState('')
    const [avatar, setAvatar] = useState('')
    const typeFile = ["png", "jpg", "jpeg", "PNG", "JPG"]
    function handleInput(e){
        const nameInput = e.target.name
        const value = e.target.value
        setInput(prev => ({...prev, [nameInput]:value}))
    }
    function validateEmail(email){
        let regex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email)
    }
    function handleUsersInputFiles(e){
        const files = e.target.files
        setFile(files)


        if(files && files.length > 0){
            let reader = new FileReader()
            reader.onload = (e) => {
                setAvatar(e.target.result)
                
            }
            reader.readAsDataURL(files[0])
            
        
        }
    }
    
    function handleSubmit(e){
        e.preventDefault()
        let errorSubmit = {}
        let isCheck = true
        if(input.name === ''){
            errorSubmit.name = 'Vui lòng nhập tên'
            isCheck = false
        }
        if(input.email === ''){
            errorSubmit.email = 'Vui lòng nhập email'
            isCheck = false
        }else if(!validateEmail(input.email)){
            errorSubmit.email = 'Vui lòng nhập đúng định dạng của email'
            isCheck = false
        }
        if(input.pass === ''){
            errorSubmit.pass = 'Vui lòng nhập mật khẩu'
            isCheck = false
        }
        if(input.phone === ''){
            errorSubmit.phone = 'Vui lòng nhập số điện thoại'
            isCheck = false
        }
        if(input.address === ''){
            errorSubmit.address = 'Vui lòng nhập địa chỉ'
            isCheck = false
        }
        if(file === ''){
            errorSubmit.avatar = 'Vui lòng chọn file để upload'
            isCheck = false
        }else{
            if(file[0].size > 1024*1024  ){
                setError(prev => ({...prev, avatar: "Vui lòng chọn file nhỏ hơn 1 MB"}))
            }else if(!typeFile.includes(file[0].name.split('.').pop())){
                setError(prev => ({...prev , avatar: "Chỉ chưa những file ảnh có đuôi: png, jpg, jpeg, PNG, JPG"}))
            }else{
                setError(prev => ({...prev, avatar: ""}) )
            }
        }
            


        if(!isCheck){
            setError(errorSubmit)
        }
        else{
            setError({})
            const data = {
                name: input.name,
                email: input.email,
                password : input.pass,
                phone: input.phone,
                address: input.address,
                avatar: avatar,
                level: 0
            }
            Api.post('register', data)
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
    function renderError(){
        if(Object.keys(error).length > 0){
            return Object.keys(error).map((value, key) => {
                return(
                    <div className="ProductError">
                      <li style={{listStyle: "none"}} key={key}>{error[value]}</li>
                    </div>
                )
            })
        }
    }
    return(
        <div className="signup-form">
              <h2>New User Signup!</h2>
             
                    {renderError()}
            
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" name="name" onChange={handleInput}/>
                    <input type="email" placeholder="Email Address" name="email" onChange={handleInput} />  
                    <input type="password" placeholder="Password" name="pass" onChange={handleInput}/>
                    <input type="text" placeholder="Phone" name="phone" onChange={handleInput}/>
                
                    <input type="text" placeholder="Address" name="address" onChange={handleInput} />
                    <input type='file' accept='image/*' style={{paddingTop: 10}} name='avatar' onChange={handleUsersInputFiles}/>
                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
          </div>
    )
}
export default Register

