import React from 'react';
import '../Styles/App.css';
import Menu from './Menu.js';
import UsersList from './UsersList.js';
import PostsList from './PostsList.js';
import ViewUser from './ViewUser.js';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      postsList: '',
      currentComponent: '',
      currentComponentValue:'UserList',
      token: { headers: {Authorization: 'Bearer vTYbTqjBUQc53xl7LQ0Zm0AxYnD11M5abuAO'}}
    }
  }

  componentDidMount(){
    this.setState({
      currentComponent:(this.state.currentComponentValue==='UserList')
      ?<UsersList loaderOn={this.loaderOn} loaderOff={this.loaderOff}  userView={this.userView} token={this.state.token}/>
      :<PostsList loaderOn={this.loaderOn} loaderOff={this.loaderOff}  userView={this.userView} token={this.state.token}/>
    })
  }
  
  loaderOn = () =>{
    const loader = document.querySelector('.loader');
    loader.style.display="block";

  }
  loaderOff = () =>{
    const loader = document.querySelector('.loader');
    loader.style.display="none";
  }
  usersListComponent = (showComponent,value) =>{
    if(value!== this.state.currentComponentValue){
      this.loaderOn()
    }
      this.setState({
        currentComponent: showComponent,
        currentComponentValue: value
      })
    

  }

  userView =(userInfo) =>{
    this.setState({
      currentComponent: <ViewUser loaderOn={this.loaderOn} loaderOff={this.loaderOff} userInfo={userInfo} token={this.state.token} />,
      currentComponentValue: 'ViewUser'
    })
    setTimeout(()=>{this.loaderOff()},300)
  }

  render(){
    return (
      <div className="app">
        <div className="loader">
          <div className="loader-img">LOADING....</div>
        </div>
        <Menu userView={this.userView}  loaderOn={this.loaderOn} loaderOff={this.loaderOff} token={this.state.token} usersListComponent={this.usersListComponent} />
        {this.state.currentComponent}
      </div>
    );
  }
}

export default App;
