import React from 'react';
import '../Styles/AddComment.css';

const AddComment = (props) => {

    return (
     <div className={`add-comment-form add-form-comment-${props.post_id}`}>
       
        <h3 className="comment-form-title"> NEW COMMENT FOR POST #{props.post_id}:</h3>
        <div className="add-comment-form-box">
        <form  onSubmit={props.addComment.bind(this)} className='add-form-comment'>
     
           
          <h5 className="form-comment__input-title">User Name:</h5>
          <input  id="add_comment_user_id" className="form-comment_input form-comment__input-name" type='text' placeholder="User name..."/>
          
          <h5 className="form-comment__input-title">Email:</h5>
          <input id="add_comment_email_id" className="form-comment_input form-comment__input-email" type='text' placeholder="E-mail..."/>

          <h5 className="form-comment__input-title">Body Comment:</h5>
          <textarea id="add_comment_body_id" className="form-comment_input form-comment__input-body" type='text' placeholder="Body..."/>

        <input  className='form-comment_input form-comment__submit' type='submit' value='add comment'/>
        <div id={`error-info-comment-${props.post_id}`} className="validation-value"></div>
        <button  className='form-comment_input form-comment__cancel' onClick={props.cancelAddCommentForm}>cancel</button>
        </form>
        </div>
      </div>

    );
  }

export default AddComment;
