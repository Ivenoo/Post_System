import React from 'react';
import '../Styles/ViewUser.css';
import AddPost from './AddPost.js'
import axios from 'axios'
import UserViewPosts from './UserViewPosts.js';

const  ViewUser = (props) =>{

  const addPostVewUser = (e) =>{
    e.preventDefault()
      const title = e.currentTarget.add_post_title_id.value,
            body = e.currentTarget.add_post_body_id.value
       const item = {
        user_id: props.userInfo.id,
        title,
        body,
       }
  
        axios.post("https://gorest.co.in/public-api/posts",item,props.token)
        .then(
        (res)=>{
          if(res.data._meta.success){
            document.querySelector('.form-post').style = "border-color:var(--correct-color)";
            document.querySelector('#error-info').innerHTML = `<p class="value-correct">Post was added !</p>`
             setTimeout(this.offCorrectBorder(),2000)
            
            document.querySelector('#add_post_title_id').value= ''
            document.querySelector('#add_post_body_id').value= ''   
          }else{
            document.querySelector('.form-post').style = "border-color:var(--error-color)";
            document.querySelector('#error-info').innerHTML = res.data.result.map( res =>{
              return(`<p class="value-error">${res.message}</p>`)
            })
          }   
          return(res);     
        }).catch(()=>{    
            console.log('problem z dodaniem użytkownika sprobuj ponownie  pózniej')
        })  
      
  }

return(
<div className="user-view">
<div className="view-user__user-id">User id: {props.userInfo.id}</div>
<h2 className="user-view-table-title">INFO USER </h2>
<table className="user-view-table">
  <tbody>
    <tr>
      <th className="view-user-table-th-title">TITLE</th>
      <th className="view-user-table-th">VALUE</th>
    </tr>
    <tr>
      <td>first name</td>
      <td>{props.userInfo.first_name}</td>
    </tr>

    <tr>
    <td>last name</td>
      <td>{props.userInfo.last_name}</td>
    </tr>

    <tr>
    <td>dob</td>
      <td>{props.userInfo.dob}</td>
    </tr>

    <tr>
    <td>gender</td>
      <td>{props.userInfo.gender}</td>
    </tr>

    <tr>
    <td>email</td>
      <td>{props.userInfo.email}</td>
    </tr>

    <tr>
    <td>phone</td>
      <td>{props.userInfo.phone}</td>
    </tr>
    
    <tr>
    <td>website</td>
      <td>{props.userInfo.website}</td>
    </tr>

    <tr>
    <td>adress</td>
      <td>{props.userInfo.address}</td>
    </tr>

    <tr className="last-value-table">
    <td>status</td>
      <td>{props.userInfo.status}</td>
    </tr>
    
  </tbody>
</table>
<div className="view-user-sidebar">
    <AddPost addPost={addPostVewUser} user_id={props.userInfo.id}/>
</div>
<div>
<UserViewPosts loaderOff={props.loaderOff} user_id={props.userInfo.id} user_first_name={props.userInfo.first_name} user_last_name={props.userInfo.last_name} token={props.token} />
</div>
</div>
)

}

export default ViewUser;
