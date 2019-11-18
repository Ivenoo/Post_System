import React from 'react';
import '../Styles/OnePost.css';
import AddComment from './AddComment';
import axios from 'axios'


class  OnePost extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        user_id: this.props.postInfo.user_id,
        postComments: [],
        user: [],
        commentForm: ''
      }
    }

    componentDidMount(){
      this.getUser(this.state.user_id)
    }

    componentWillUpdate(){
      if(this.state.postComments.length > 0){
        this.setState({
          postComments:[]
        })
      }
    }

    

    getComments =(event) =>{ 
      axios.get(`https://gorest.co.in/public-api/comments?post_id=${event}`,this.props.token).then(
        (res)=>{
          const newTable = res.data.result.splice(0,3)
          this.setState({
            postComments: newTable
          })

        }).catch((error)=>{    
            console.log('ERROR COMMENTS')
        }) 
    }
    
    getUser =(event) =>{ 
      axios.get(`https://gorest.co.in/public-api/users/${event}`,this.props.token).then(
        (res)=>{
            const newUser ={
              id:res.data.result.id,
              first_name:res.data.result.first_name,
              last_name:res.data.result.last_name,
              email:res.data.result.email
            }
            this.setState({
              user: newUser
            })     
        }).then(()=>{
          this.props.loaderOff()
        }).catch(()=>{    
            console.log('ERROR USER')
        }) 
    }
    offCorrectBorderComment = () =>{
      document.querySelector(`.add-form-comment-${this.props.postInfo.id}`).style = "border-color:black";
      document.querySelector(`#error-info-comment-${this.props.postInfo.id}`).innerHTML = ``;

     }
     
    addComment = (e) =>{
      e.preventDefault()
     const post_id = this.props.postInfo.id,
           name =  e.currentTarget.add_comment_user_id.value,
           email = e.currentTarget.add_comment_email_id.value,
           body = e.currentTarget.add_comment_body_id.value
      const newComment ={
          post_id,
          name,
          email,
          body
      }

      axios.post("https://gorest.co.in/public-api/comments",newComment,this.props.token)
        .then(
        (res)=>{ 
          if(res.data._meta.success){
            document.querySelector(`.add-form-comment-${this.props.postInfo.id}`).style = "border-color:var(--correct-color)";
            document.querySelector(`#error-info-comment-${this.props.postInfo.id}`).innerHTML = `<p class="value-correct">Comment has been added !</p>`
            document.querySelector('#add_comment_user_id').value = '';
            document.querySelector('#add_comment_email_id').value = '';
            document.querySelector('#add_comment_body_id').value = '';
            setTimeout(() => this.offCorrectBorderComment(),3000)
          }else{
            document.querySelector(`.add-form-comment-${this.props.postInfo.id}`).style = "border-color:var(--error-color)";
            document.querySelector(`#error-info-comment-${this.props.postInfo.id}`).innerHTML = res.data.result.map( res =>{
              return(`<p class="value-error">${res.message}</p>`)
            })
          }
        }).catch((error)=>{    
              console.log(error)
            alert('problem  with axios, try again letter')
        })  
    }
    
    addCommentForm =() =>{
      this.setState({
        commentForm: <AddComment addComment={this.addComment} cancelAddCommentForm={this.cancelAddCommentForm} post_id={this.props.postInfo.id}/>
      })
    }

    cancelAddCommentForm = () =>{
        this.setState({
          commentForm: ''
        })
    }

    render(){
      return (
        <div className="one-post">
          <div className="post-id-value"> POST: {this.props.postInfo.id}</div>
          <div className="post-author"> Author: {this.state.user.first_name}  {this.state.user.last_name}</div>
          <div className="contact-author">contact email: {this.state.user.email}</div>
          <div className="title-post">{this.props.postInfo.title}</div>
          <div className="body-post">{this.props.postInfo.body}</div>
          
           { (this.state.postComments.length <= 0 )
           ?<button className="button-show-comment" onClick={() =>this.getComments(this.props.postInfo.id)}> SHOW COMMENTS</button>
           :null}
            <div id='comment-box-id' className="comment-box">
            {(this.state.postComments.length > 0) 
            ?this.state.postComments.map((event,index)=>{
              return(
                <div key={index} >
                  <div className="author-comment">
                    <h3 className='author-name'>{event.name}</h3>
                    <h5 className='author-email'>{event.email}</h5>
                  </div>
                  <div className="comment-body">{event.body}</div>
                </div>
              )

            })
            :null
            }
          </div>
          <div className="add-comment-button-box">
            <button onClick={this.addCommentForm} className="add-comment-button">ADD COMMENT</button>
          </div>
          {this.state.commentForm}
        </div>
      );
    } 
  }  

export default OnePost;
