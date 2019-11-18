import React from 'react';
import '../Styles/PostsList.css';
import OnePost from './OnePost'
import AddPost from './AddPost'
import ViewUser from './ViewUser'
import axios from 'axios';

class PostsList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pagination:1,
      maxPagePosts: 0,
      postsList:[],
      usersLength: 0,
      viewUser: <ViewUser addPost={this.addPost}/>,
      buttonsPrevNext: this.props.postListButton
    }
  }
  
  componentDidMount(){
    this.getPosts(this.state.pagination)
   this.getUsersLength()
  }
  getPosts =(pagination) =>{
    
    axios.get(`https://gorest.co.in/public-api/posts?page=${pagination}`,this.props.token).then(
      (res)=>{
       this.setState({
         postsList: res.data.result,
         maxPagePosts: res.data._meta.pageCount
       })
       
      }).then(()=>{
        if(this.state.buttonsPrevNext === 1){
          this.props.loaderOff()
        }
      }).catch(()=>{    
        alert('problem downloading posts data, try again')
      })  
  }

  
  getUsersLength =() =>{
    axios.get(`https://gorest.co.in/public-api/users`,this.props.token).then(
      (res)=>{
       this.setState({
        usersLength: res.data._meta.totalCount
       })
      }).catch(()=>{  
          alert('problem downloading users data, try again')
      })  
  }


 offCorrectBorder = () =>{
  document.querySelector('.form-post').style = "border-color:black";
 }
  addPost = (e) =>{
    e.preventDefault()
      const user_id = e.currentTarget.add_post_user_id.value,
            title = e.currentTarget.add_post_title_id.value,
            body = e.currentTarget.add_post_body_id.value
       const item = {
        user_id,
        title,
        body
       }

        axios.post("https://gorest.co.in/public-api/posts",item,this.props.token)
        .then(
        (res)=>{
          if(res.data._meta.success){
            document.querySelector('.form-post').style = "border-color:var(--correct-color)";
            document.querySelector('#error-info').innerHTML = `<p class="value-correct">Post was added !</p>`
             setTimeout(this.offCorrectBorder(),2000)
            
            document.querySelector('#add_post_user_id').value = ''
            document.querySelector('#add_post_title_id').value= ''
            document.querySelector('#add_post_body_id').value= ''   
          }else{
            document.querySelector('.form-post').style = "border-color:var(--error-color)";
            document.querySelector('#error-info').innerHTML = res.data.result.map( res =>{
              return(`<p class="value-error">${res.message}</p>`)
            })
          }   
        }).catch((error)=>{    
            console.log(error)
        })  
      
  }
     
  changePagePost = (value) => {
    this.props.loaderOn()

    if(value === '+'){
      this.setState({
        pagination: this.state.pagination+1,
        buttonsPrevNext: 1
      })
        this.getPosts(this.state.pagination+1) 
    }

    if(value === '-'){
      this.setState({
        pagination: this.state.pagination-1,
        buttonsPrevNext: 1
      })
      this.getPosts(this.state.pagination-1)
    }

  }
      
  


  render(){
    
    return (
      <div className="posts">
        <AddPost addPost={this.addPost} usersLength={this.state.usersLength}/>
      <div className="posts-list">
        <h2 className="posts-list-title">POSTS LIST</h2>
      {
        this.state.postsList.map((event,index) =>{
         return(
           <div key={index}>
           <OnePost loaderOff={this.props.loaderOff} postInfo={event} token={this.props.token}  />
           </div>
         )
        })
      }
     {(this.state.pagination > 1)?<button className="prev__button" onClick={() =>{this.changePagePost('-')}}>PREV</button>:null } 
     {(this.state.pagination < this.state.usersLength)?<button className="next__button" onClick={() =>{this.changePagePost('+')}}>NEXT</button>:null}
      </div>
      </div>
    );
  }  
}

export default PostsList;
