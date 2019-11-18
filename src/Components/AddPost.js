import React from 'react';
import '../Styles/AddPost.css';

const addPost = (props) => {


    return (
      <div className="form-add-post">
        <h3 className="box-title add-post-form-title "> NEW POST</h3>
        <div className="form-post-box">
        <form  onSubmit={props.addPost.bind(this)} className="form-post">

          
          {(props.user_id)
          ?<>
            <h5 className="form-post__input-title">User id </h5>
            <div id="add_post_user_id" className="form-post_input" >{props.user_id}</div>
          </>
          :<> 
              <h5 className="form-post__input-title">User id</h5>
              <input  id="add_post_user_id" className="form-post_input form-post__input-fname" type='text' placeholder="User id..."/>
            </>
          }
          
         

          <h5 className="form-post__input-title">Title Post:</h5>
          <input id="add_post_title_id" className="form-post_input form-post__input-lname" type='text' placeholder="Title..."/>

          <h5 className="form-post__input-title">Body Post:</h5>
          <textarea id="add_post_body_id" className="form-post_input form-post__input-address" type='text' placeholder="Body..."/>

          <div id="error-info" className="validation-value"></div>
          
          <input  className='form-post_input form-post__submit' type='submit' value='dodaj'/>
        </form>
        </div>
      </div>
    );
  }

export default addPost;
