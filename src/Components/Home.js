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
              Hello there and welcome to the store. Take a look around! Visit our inventory!
            </div>
            <div>
              <img alt="example photo of an antique car for sale" src="https://cdn.pixabay.com/photo/2018/05/02/09/29/auto-3368094_960_720.jpg" />
            </div>
          </div>
        </section>
        <footer className="footerBar">
          {token === 'null'  
          
          ?

          <div>
            <Link to='/Login'><button variant="text"><strong>Login</strong></button></Link>
            <strong style={{color: "blue"}}>•</strong>
            <Link to='/Register'><button variant="text"><strong>Register</strong></button></Link>
          </div>

          :

          <div>
            <Link to='/Admin'><button variant="text"><strong>Dashboard</strong></button></Link>
            <strong style={{color: "blue"}}>•</strong>
            <Link to='/Logout'><button variant="text"><strong>Logout</strong></button></Link>
          </div>
          }

        </footer>
    </>
  )
}

export default Home