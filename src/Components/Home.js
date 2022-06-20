import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar.js';
import '../Styles/Home.scss';

const Home = () => {
  let token = localStorage.getItem('tokens')

  return (
    <>
        <NavBar />
        <section>
            <div>Home</div>
            <h3>Welcome</h3>
        </section>
        <section>
          <div>
            <div>
              Hello there
            </div>
          </div>
        </section>
        <footer className="footerBar">
          {token === 'null'  
          
          ?

          <div>
            <Link to='/Login'><button variant="text"><strong>Login</strong></button></Link>
            <Link to='/Register'><button variant="text"><strong>Register</strong></button></Link>
          </div>

          :

          <div>
            <Link to='/Admin'><button variant="text"><strong>Dashboard</strong></button></Link>
            <Link to='/Logout'><button variant="text"><strong>Logout</strong></button></Link>
          </div>
          }

        </footer>
    </>
  )
}

export default Home