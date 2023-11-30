import { useEffect, useState } from "react"
import Api from "../../Api"
import { Link, useParams } from "react-router-dom"
import moment from "moment"
import Rate from './Rate'
import ListComment from "./ListComment"
import CommentBlog from'./Comment'
function PaginationNext(){
    let params = useParams()
    console.log(params)
    let id_blog = params.id
    const [item, setItem] = useState({})
    const [next, setNext] = useState()
    const [previous, setPrevious] = useState()
    console.log(item)
    const [listComment, setListComment] = useState([])
    const [CommentReply, setCommentReply] = useState([])
    useEffect(() => {
        Api.get("/blog/detail-pagination/" + params.id)
        .then(response => {
            console.log(response)
            setItem(response.data.data)
            setNext(response.data.next)
            setPrevious(response.data.previous)
        })
        .catch(function(error){
            console.log(error)
        })
    }, [params.id])
    useEffect(() => {
        Api.get("/blog/detail/" + params.id)
        .then(res => {
            console.log(res)
            setListComment(res.data.data.comment)
        }) 
        .catch(function(error){
            console.log(error)
        })
    }, [params.id])
    function getCmt(newComment){
        setListComment(prev => [...prev, newComment])
    }
    function handleReplyClick(newId){
        setCommentReply(newId)
    }
    return(
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {item && (
                    <div className="single-blog-post">
                        <h3>{item.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user" />{item.id_auth}</li>
                                <li><i className="fa fa-clock-o" />{moment(item.created_at).format('h:mm A')}</li>
                                <li><i className="fa fa-calendar"/>{moment(item.updated_at).format('MMM D, YYYY')}</li>
                            </ul>
                        </div>
                        <Link to="">
                                <img src={"http://localhost/laravel8/public/upload/Blog/image/" + item.image} alt=""/>
                        </Link>
                        <p>{item.description}</p>
                        <p dangerouslySetInnerHTML={{__html: item.content}}></p>
                    </div>
                )}
                <div className="pager-area">
                    <ul className="pager pull-right">
                        <li><Link to={"/blog/detail-pagination/" + previous}>Pre</Link></li>
                        <li><Link to ={"/blog/detail-pagination/" + next}>Next</Link></li>
                    </ul>
              </div>
            </div>
            <Rate idBlog = {params.id}/>
            <ListComment  listComment = {listComment} handleReplyClick={handleReplyClick}  idReply = {CommentReply}/>
            <CommentBlog idBlog = {id_blog} getCmt = {getCmt} idCommentToReply = {CommentReply}/>
        </div>
    )
}
export default PaginationNext