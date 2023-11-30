import { useEffect,useState } from "react";
import { useParams , Link} from "react-router-dom";
import Api from "../../Api";
import moment from "moment";
import CommentBlog from "./Comment";
import ListComment from "./ListComment";
import Rate from "./Rate";
function Detail() {
    let params = useParams();
    const [data, setData] = useState('');
    const [listComment, setListComment] = useState([])
    // console.log(listComment)Ư
    const [CommentReply, setCommentReply] = useState()
    const [next, setNext] = useState()
    const [previous, setPrevious] = useState()
    let idBlog = params.id
    useEffect(() => {
      Api.get('/blog/detail/' + params.id)
        .then(res => {
          setData(res.data.data)
          setListComment(res.data.data.comment)
        })
        .catch(error => console.log(error));
    }, [params.id]);
    useEffect(() => {
        Api.get("/blog/detail-pagination/" + params.id)
        .then(res=> {
            console.log(res)
            setNext(res.data.next)
            setPrevious(res.data.previous)
        })
        .catch(error => console.log(error))
    }, [params.id])
    function getCmt(newComment){
        // console.log(newComment)
        setListComment(prev => [...prev, newComment])    
    }     
    function handleReplyClick(newId){
        setCommentReply(newId) 
    }
    return(    
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {data && (
                    <div className="single-blog-post">
                        <h3>{data.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user" />{data.id_auth}</li>
                                <li><i className="fa fa-clock-o" />{moment(data.created_at).format('h:mm A')}</li>
                                <li><i className="fa fa-calendar" />{moment(data.updated_at).format('MMM D, YYYY')}</li>
                            </ul>
                        </div>
                        <Link to="">
                               <img src={"http://localhost/laravel8/public/upload/Blog/image/" + data.image} alt="" />
                        </Link>
                        <p>{data.description}</p>   
                        <p dangerouslySetInnerHTML={{__html: data.content}}></p>
                    </div>
                )}
                    <div className="pager-area">
                        <ul className="pager pull-right">
                            <li><Link to={"/blog/detail-pagination/" + previous}>Pre</Link></li>
                            <li><Link to ={"/blog/detail-pagination/" + next}>Next</Link></li>
                        </ul>
                    </div>
            </div>
             <Rate idBlog = {idBlog}/>
             <ListComment listComment = {listComment} handleReplyClick = {handleReplyClick}  idReply = {CommentReply} />
             <CommentBlog idBlog = {idBlog} getCmt={getCmt} idCommentToReply = {CommentReply}/>
        </div>        
    )
  }
export default Detail;
  

