import React from 'react';
import '../Styles/UserViewPosts.css';
import OnePost from './OnePost'
import axios from 'axios';



 class UserViewPosts extends React.Component  {
   constructor(props){
     super(props);
     this.state ={
        postsList: []
     }
   }
   componentDidMount(){
      this.getUserPosts()
   }
   getUserPosts = () =>{
    axios.get(`https://gorest.co.in/public-api/posts?user_id=${this.props.user_id}`,this.props.token).then(
      (res)=>{
        this.setState({
          postsList:res.data.result
        })
      }).then(()=>{
        if(this.state.buttonsPrevNext === 1){
          this.props.loaderOff()
        }
      }).catch(()=>{    
        alert('problem downloading posts data, try again')
      })  
   }
  render(){
    return(
      <div className="all-posts-one-user">
        <h2 className="posts-user-title">Post user: {this.props.user_first_name} {this.props.user_last_name}</h2>
        {this.state.postsList.map((event,index) =>{
            return(
              <div key={index}>
                <OnePost loaderOff={this.props.loaderOff} postInfo={event} token={this.props.token}  />
              </div>
              )
        })}
      </div>
    )
  }
 
 }


 export default UserViewPosts;