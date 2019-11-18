import React from 'react';
import '../Styles/EditUser.css';

const EditUser = (props) => {
     const formEdit = document.querySelector('#form-edit');
     if(formEdit){
      formEdit.add_user_fname_id.value =props.event.first_name
      formEdit.add_user_lname_id.value =props.event.last_name
      formEdit.add_user_date_id.value =props.event.dob
      formEdit.add_user_gender_id.value =props.event.gender
      formEdit.add_user_lname_id.value =props.event.last_name
      formEdit.add_user_email_id.value =props.event.email
      formEdit.add_user_phone_id.value =props.event.phone
      formEdit.add_user_website_id.value =props.event.website
      formEdit.add_user_address_id.value =props.event.address
      formEdit.add_user_status_id.value =props.event.status
      
     }
    return (
      <div className="form-user">
        <h3 className="box-title"> Edit User (Id:<span id="id_edit_user">{props.event.id}</span>)</h3>
        <div className="form-user-box">
        <form id="form-edit" onSubmit={props.menageUser.bind(this,'editUser')}  className="form-user">

          <h5 className="form-user__input-title">First Name:</h5>
          <input  defaultValue={props.event.first_name} id="add_user_fname_id" className="form-user_input form-user__input-fname" type='text' placeholder="First name..."/>

          <h5 className="form-user__input-title">Last Name:</h5>
          <input defaultValue={props.event.last_name} id="add_user_lname_id" className="form-user_input form-user__input-lname" type='text' placeholder="Last name..."/>

          <h5 className="form-user__input-title">Date Of Birthday:</h5>
          <input defaultValue={props.event.dob} id="add_user_date_id" className="form-user_input form-user__input-date-born" type='date' />

          <h5 className="form-user__input-title">Gender:</h5>
          <select defaultValue={props.event.gender} id="add_user_gender_id" className="form-user__select-gender" >
            <option>płeć</option>
            <option>male</option>
            <option>female</option>
          </select>

          <h5 className="form-user__input-title">E-mail:</h5>
          <input defaultValue={props.event.email} id="add_user_email_id" className="form-user_input form-user__input-email" type='text' placeholder="E-mail..."/>

          <h5 className="form-user__input-title">Phone Number:</h5>
          <input defaultValue={props.event.phone} id="add_user_phone_id" className="form-user_input form-user__input-phone" type='text' placeholder="Phone..."/>

          <h5 className="form-user__input-title">Website:</h5>
          <input defaultValue={props.event.website} id="add_user_website_id" className="form-user_input form-user__input-phone" type='text' placeholder="Website..."/>
          
          <h5 className="form-user__input-title">Address:</h5>
          <textarea defaultValue={props.event.address} id="add_user_address_id" className="form-user_input form-user__input-address" type='text' placeholder="Post code...  Street...  City... "/>

          <h5 className="form-user__input-title">Status:</h5>
          <select defaultValue={props.event.status} id="add_user_status_id" className="form-user__select-status" >
            <option>status</option>
            <option>active</option>
            <option>inactive</option>
          </select>
          <div id="error-info" className="validation-value"></div>
        <input  className='form-user_input form-user__submit form-user__edit-submit' type='submit' value='zmień'/>
        </form>
        <input onClick={props.backToAddForm}  className='form-user_input form-user__cancel-submit' type='submit' value='anuluj'/>

        </div>
        
      </div>
    );
  }

export default EditUser;
