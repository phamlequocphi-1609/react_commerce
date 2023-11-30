import { useEffect, useRef, useState} from "react"
import Api from "../../Api"
function Comment(props){
  const [comment, setComment] = useState('')
  const [errorComment, setErrorCommnent] = useState('')
  const accessToken = JSON.parse(localStorage.getItem("accessToken"))
  const userData = JSON.parse(localStorage.getItem("appState"))
  let {idBlog, getCmt, idCommentToReply} = props
  console.log(idCommentToReply)
  const ref = useRef(null)
  // console.log(ref)
  function handleComment(e){
    setComment(e.target.value)   
  }
  useEffect(() => {
      if(idCommentToReply){
        ref.current.focus()
        const Totop = ref.current.getBoundingClientRect()
        ref.current.scrollTo({
              top: Totop,
              behavior: "smooth"
        })
      }    
  })
  function handleSubmit(e){
    e.preventDefault()
    let isCheck = true
    if(comment === ''){
      setErrorCommnent('Vui lòng viết bình luận để đăng')
      isCheck = false
    } 
    if(!localStorage.getItem("LoggedIn")){
      setErrorCommnent('Vui lòng đăng nhập trước khi bình luận')
      isCheck = false
    }
    if(isCheck){
      setErrorCommnent('')
      let url = '/blog/comment/' + idBlog
      // console.log(userData)
      let config = { 
              headers: { 
              'Authorization': 'Bearer '+ accessToken,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
         } 
      }
      const formData = new FormData()
      formData.append('id_blog', idBlog)
      formData.append('id_user', userData.id)
      formData.append('id_comment', idCommentToReply ? idCommentToReply : 0)
      formData.append('comment', comment)
      formData.append('image_user', userData.avatar)
      formData.append('name_user', userData.name)
      Api.post(url, formData, config)
      .then(response => {
        if(response.data.errors){
          console.log(response.data.errors)
        }else{
            getCmt(response.data.data)
            console.log(response)        
        }
      })
      .catch(function(error){
        console.log(error)
      })
    }
  }
  return(
    <div className="replay-box">
            <div className="row">
              <div className="col-sm-12">
                <h2>Leave a replay</h2>
                <div className="text-area">
                  <div className="blank-arrow">
                    <label>Your Name</label>
                  </div>
                  <span>*</span>
                  <textarea name="message" 
                        ref={ref}
                        rows={11} 
                        defaultValue={""} 
                        onChange={handleComment} />
                  <p style={{fontSize: 16, color: 'red', padding: 10}}>{errorComment}</p>
                  <button type="submit" 
                        className="btn btn-primary" 
                        onClick={handleSubmit} >post comment
                  </button>
                </div>
              </div>
            </div>
    </div>    
  )
}
export default Comment