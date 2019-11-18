import React from 'react';
import '../Styles/AddUser.css';

const AddUser = (props) => {
    return (
      <div className="form-user">
        <h3 className="box-title add-user-form-title"> CREATE USER</h3>
        <div className="form-user-box">
        <form onSubmit={props.menageUser.bind(this,'addUser')} className="form-user">

          <h5 className="form-user__input-title">First Name:</h5>
          <input  id="add_user_fname_id" className="form-user_input form-user__input-fname" type='text' placeholder="First name..."/>

          <h5 className="form-user__input-title">Last Name:</h5>
          <input id="add_user_lname_id" className="form-user_input form-user__input-lname" type='text' placeholder="Last name..."/>

          <h5 className="form-user__input-title">Date Of Birthday:</h5>
          <input id="add_user_date_id" className="form-user_input form-user__input-date-born" type='date' />

          <h5 className="form-user__input-title">Gender:</h5>
          <select id="add_user_gender_id" className="form-user__select-gender" >
            <option>gender</option>
            <option>male</option>
            <option>female</option>
          </select>

          <h5 className="form-user__input-title">E-mail:</h5>
          <input id="add_user_email_id" className="form-user_input form-user__input-email" type='text' placeholder="E-mail..."/>

          <h5 className="form-user__input-title">Phone Number:</h5>
          <input id="add_user_phone_id" className="form-user_input form-user__input-phone" type='text' placeholder="Phone..."/>

          <h5 className="form-user__input-title">Website:</h5>
          <input id="add_user_website_id" className="form-user_input form-user__input-phone" type='text' placeholder="Website.."/>
          
          <h5 className="form-user__input-title">Address:</h5>
          <textarea id="add_user_address_id" className="form-user_input form-user__input-address" type='text' placeholder="Post code...  Street...  City... "/>

          <h5 className="form-user__input-title">Status:</h5>
          <select id="add_user_status_id" className="form-user__select-status" >
            <option>status</option>
            <option>active</option>
            <option>inactive</option>
          </select>
          <div id="error-info" className="validation-value"></div>
        <input  className='form-user_input form-user__submit' type='submit' value='dodaj'/>

        </form>
        </div>
      </div>
    );
  }

export default AddUser;
