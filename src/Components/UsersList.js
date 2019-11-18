import React from 'react';
import '../Styles/UsersList.css';
import axios from 'axios';
import AddUser from './AddUser.js';
import EditUser from './EditUser.js';


class UsersList extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      pagination: 1,
      maxPageUsers: 0,
      usersList: [],
      sidebar: <AddUser menageUser={this.menageUser}/>,
      currentUserId: ''
    }
  }

  componentDidMount(){
    this.getUsers(this.state.pagination)
  }


  getUsers =(pagination) =>{
    axios.get(`https://gorest.co.in/public-api/users?page=${pagination}`,this.props.token).then(
      (res)=>{
       this.setState({
         usersList: res.data.result,
         maxPageUsers: res.data._meta.pageCount
       })
      }).then(()=>{
        setTimeout(this.props.loaderOff,200)
      }).catch(()=>{    
          alert('Error download users please try again')
      })  
  }

  changePageUsers = (value) => {
    this.props.loaderOn()

    if(value === '+'){
      this.setState({
        pagination: this.state.pagination+1
      })
        this.getUsers(this.state.pagination+1) 
    }

    if(value === '-'){
      this.setState({
        pagination: this.state.pagination-1
      })
      this.getUsers(this.state.pagination-1)
    }

  }
  clearValidationInfo = () =>{
    document.querySelector('#error-info').innerHTML = '' 
    document.querySelector('.form-user-box').style = "border-color:#000";
  }
  menageUser = (typeOfForm,e) =>{
    e.preventDefault()
    let first_name = e.currentTarget.add_user_fname_id.value,
      last_name = e.currentTarget.add_user_lname_id.value,
      dob = e.currentTarget.add_user_date_id.value,
      gender = e.currentTarget.add_user_gender_id.value,  
      email = e.currentTarget.add_user_email_id.value,
      phone = e.currentTarget.add_user_phone_id.value,
      website = e.currentTarget.add_user_website_id.value,
      address = e.currentTarget.add_user_address_id.value,
      status = e.currentTarget.add_user_status_id.value;

      const item = {
        first_name,
        last_name,
        dob,
        gender,
        email,
        phone,
        website,
        address,
        status,
      }

      if(typeOfForm === 'addUser'){
        axios.post("https://gorest.co.in/public-api/users",item,this.props.token)
        .then(
        (res)=>{
          if(res.data._meta.success){
            document.querySelector('.form-user-box').style = "border-color:var(--correct-color)";
            document.querySelector('#error-info').innerHTML = `<p class="value-correct">user has been added !</p>`
            setTimeout(()=>this.clearValidationInfo(),2600)
          }else{
            document.querySelector('.form-user-box').style = "border-color:var(--error-color)";
            document.querySelector('#error-info').innerHTML = res.data.result.map( res =>{
              return(`<p class="value-error">${res.message}</p>`)
            })
          }
            return res
        }).then((res) =>{
          if(res.data._meta.success){
          document.querySelector('#add_user_fname_id').value = ''
          document.querySelector('#add_user_lname_id').value= ''
          document.querySelector('#add_user_date_id').value= ''
          document.querySelector('#add_user_gender_id').value = 'płeć'
          document.querySelector('#add_user_email_id').value= ''
          document.querySelector('#add_user_phone_id').value= ''
          document.querySelector('#add_user_website_id').value= ''
          document.querySelector('#add_user_address_id').value= ''
          document.querySelector('#add_user_status_id').value= 'status'
          }
        }).catch(()=>{    
            alert('Problem adding user')
        })  
      }else if(typeOfForm === 'editUser'){
        let id = this.state.currentUserId;
        axios.patch(`https://gorest.co.in/public-api/users/${id}`,item,this.props.token)
        .then(
        (res)=>{
          if(res.data._meta.success){
             document.querySelector('.form-user-box').style = "border-color:var(--correct-color)";
            document.querySelector('#error-info').innerHTML = `<p class="value-correct">User was updated !</p>`
            setTimeout(()=>{
              this.getUsers(this.state.pagination) 
              this.setState({
                sidebar: <AddUser menageUser={this.menageUser}/>
              })
            },3000)
            
          }else if(!res.data._meta.success){
            document.querySelector('.form-user-box').style = "border-color:var(--error-color)";
            document.querySelector('#error-info').innerHTML = res.data.result.map( res =>{
              return(`<p class="value-error">${res.message}</p>`)
            })
          }
        }).catch(()=>{    
            alert('Problem update user try again')
        })  
      }
     
      
  }

  refreshInputs = (typeOfForm) =>{
    if(typeOfForm === "addUser"){
      document.querySelector('#add_user_fname_id').value = ''
      document.querySelector('#add_user_lname_id').value= ''
      document.querySelector('#add_user_date_id').value= ''
      document.querySelector('#add_user_gender_id').value = 'płeć'
      document.querySelector('#add_user_email_id').value= ''
      document.querySelector('#add_user_phone_id').value= ''
      document.querySelector('#add_user_address_id').value= ''
      document.querySelector('#add_user_status_id').value= 'status'
    }else if (typeOfForm === "editUser"){

    }
   
    
  }


  showListUsers = () =>{
    console.log(this.state.usersList)
  }


  viewUser = (userInfo) =>{
    this.props.loaderOn()
    this.props.userView(userInfo);
    
  }

  editUser = (event) =>{
    this.setState({
      sidebar: <EditUser backToAddForm={this.backToAddForm} event={event} menageUser={this.menageUser}/>,
      currentUserId: event.id
    })
  }
  backToAddForm = () =>{
    this.setState({
      sidebar: <AddUser menageUser={this.menageUser}/>
    })
  }

  deleteUser = (id) =>{
    axios.delete(`https://gorest.co.in/public-api/users/${id}?access-token=vTYbTqjBUQc53xl7LQ0Zm0AxYnD11M5abuAO`).then(
      (res)=>{
        if(res.data.result===null){
                  alert("User successfully deleted")
        } 
      }).then(() =>{
        this.getUsers(this.state.pagination)
        const editUserId = document.querySelector('#id_edit_user').innerHTML
        if(id === editUserId ){
          this.backToAddForm()
        }
      }
      ).catch(()=>{    
          alert('We can"t delete that user pleas try again leter')
      })  
  }

  
  render(){
    return (
      <div className="users">
        <div className="sidebar">
          {this.state.sidebar}
        </div>
        <div className="users-list">
          <h2 className="box-title"> USERS LIST </h2>
          <table className="users-table">
            <tbody>
              <tr>
                <th className="users-table__id">ID</th>
                <th className="users-table__fname">FIRST NAME</th>
                <th className="users-table__lname">LAST NAME</th>
                <th className="users-table__email"> E-MAIL</th>
                <th className="users-table__management users-table__view">VIEW</th>
                <th className="users-table__management users-table__edit">EDIT</th>
                <th className="users-table__management users-table__del"> DELETE</th>
              </tr>
              {this.state.usersList.map((event,index) =>{
                return(
                  <tr key={index} className="table__row">
                    <td>{event.id}</td>
                    <td>{event.first_name}</td>
                    <td>{event.last_name}</td>
                    <td>{event.email}</td>
                    <td><img className="table-icon" onClick={() =>{this.viewUser(event)}} src="view.png" alt="view"/></td>
                    <td><img className="table-icon" onClick={() =>{this.editUser(event)}} src="edit.png" alt="edit"/></td>
                    <td><img className="table-icon" onClick={() =>{this.deleteUser(event.id)}} src="trash.png" alt="delete"/></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="prev-next-buttons">
          {(this.state.pagination > 1) ?<button className="prev__button" onClick={() =>{this.changePageUsers('-')}}>PREV</button>:null}
          <button className="next__button" onClick={() =>{this.changePageUsers('+')}}>NEXT</button>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersList;
