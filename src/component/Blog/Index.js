import { useEffect, useState } from 'react'
import Api from '../../Api'
import {Link} from 'react-router-dom'
import moment from 'moment'

function Index(){
  const [getItem, setItem] = useState('')
  useEffect(() => {
      Api.get('/blog')
      .then(response => {
         setItem(response.data.blog)
        //  console.log(response.data.blog)
      })
      .catch(error => console.log(error))
  },[])
  function fetchData(){
      if(Object.keys(getItem).length > 0) {
        return getItem.data.map((value, key) => {
          return(
                <div className='single-blog-post' key={key}>
                <h3>{value.title}</h3>
                <div className='post-meta'>
                  <ul>
                      <li><i className="fa fa-user" />{value.id_auth}</li>
                      <li><i className="fa fa-clock-o" />{moment(value.created_at).format('h:mm A')}</li>
                      <li><i className="fa fa-calendar" />{moment(value.updated_at).format('MMM D, YYYY')}</li>
                  </ul>
                  <span>
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star-half-o"/>
                 </span>
               </div>
             <Link to="">
                <img src ={"http://localhost/laravel8/public/upload/Blog/image/" + value.image} alt=''/>
            </Link>
             <p>{value.description}</p>
              <Link className="btn btn-primary" to={"/blog/detail/" + value.id}>Read More</Link>
            </div>
          )
        })
      }
  }
  return(
        <div className='col-sm-9'>
            <div className='blog-post-area'>
                <h2 className="title text-center">Latest From our Blog</h2>
                {fetchData()}
            </div>     
       
        </div>
  )
}
export default Index