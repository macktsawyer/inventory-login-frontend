import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import NavBar from './NavBar.js';
import '../Styles/About.scss';

const About = () => {
  let token = localStorage.getItem('tokens');
  //Work on this page more

  return (
    <>
        <NavBar />
        <div>
          <div className="aboutUsMain">
            <h2>About Us</h2>
            <Paper className="aboutMainPaper">
              <Card className="aboutTitle">
                <h5>About The Business</h5>
                <br />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu iaculis urna, eget faucibus augue. Donec sit amet nisi volutpat magna condimentum tincidunt. Etiam ante libero, dapibus elementum risus eget, posuere mattis est. Ut elementum auctor pulvinar. Vestibulum sollicitudin metus a ullamcorper tincidunt. Donec scelerisque, mi ac rhoncus gravida, nisl ante porttitor dolor, placerat porta arcu ex a felis. Sed eu mattis enim. Duis elit orci, porttitor nec nisl nec, cursus iaculis ex. Ut pellentesque, lectus vitae vulputate congue, ligula purus accumsan metus, molestie dictum felis metus vitae orci. Nullam sed interdum mi. Nunc aliquam, ante ut ultrices tristique, urna mi faucibus tellus, at vulputate dui arcu ac ante. Donec venenatis sapien eu nisi tempus, non gravida arcu ultrices. Integer commodo in neque quis aliquam. In maximus, ante sit amet molestie facilisis, enim nisl consequat felis, ac venenatis dui metus at dolor. Nulla sed pretium purus. Pellentesque porttitor lectus quis erat gravida maximus.
                <br />
                <br />
                Cras ac orci eget quam porttitor consectetur eu eget lectus. Etiam tempus felis vel elit malesuada semper. Fusce hendrerit turpis nec vehicula mattis. Nunc convallis pulvinar odio a luctus. Aenean tristique, velit egestas laoreet vehicula, magna ligula rhoncus ipsum, cursus cursus est elit at nulla. Integer viverra ligula at dictum feugiat. Donec ut lectus feugiat, suscipit lorem eu, porta lorem. Mauris eget massa non eros scelerisque mattis id non ligula. Curabitur vitae dignissim velit. Cras eu condimentum tellus. Curabitur non scelerisque ipsum. Mauris ligula mi, tincidunt at felis eget, venenatis mattis nibh. Aliquam lobortis sem vitae elit euismod dictum. Nam id sapien sed dui pretium maximus. Suspendisse malesuada, tortor a tincidunt congue, purus dui suscipit enim, a mattis risus nisl non elit. Integer nec diam nec lectus sollicitudin molestie.</p>
              </Card>
              <Card className="aboutMotto">
                <p>Company Motto</p>
                <br />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu iaculis urna, eget faucibus augue. Donec sit amet nisi volutpat magna condimentum tincidunt. Etiam ante libero, dapibus elementum risus eget, posuere mattis est. Ut elementum auctor pulvinar. Vestibulum sollicitudin metus a ullamcorper tincidunt. Donec scelerisque, mi ac rhoncus gravida, nisl ante porttitor dolor, placerat porta arcu ex a felis. Sed eu mattis enim. Duis elit orci, porttitor nec nisl nec, cursus iaculis ex. Ut pellentesque, lectus vitae vulputate congue, ligula purus accumsan metus, molestie dictum felis metus vitae orci. Nullam sed interdum mi. Nunc aliquam, ante ut ultrices tristique, urna mi faucibus tellus, at vulputate dui arcu ac ante. Donec venenatis sapien eu nisi tempus, non gravida arcu ultrices. Integer commodo in neque quis aliquam. In maximus, ante sit amet molestie facilisis, enim nisl consequat felis, ac venenatis dui metus at dolor. Nulla sed pretium purus. Pellentesque porttitor lectus quis erat gravida maximus.
                <br />
                <br />
                Cras ac orci eget quam porttitor consectetur eu eget lectus. Etiam tempus felis vel elit malesuada semper. Fusce hendrerit turpis nec vehicula mattis. Nunc convallis pulvinar odio a luctus. Aenean tristique, velit egestas laoreet vehicula, magna ligula rhoncus ipsum, cursus cursus est elit at nulla. Integer viverra ligula at dictum feugiat. Donec ut lectus feugiat, suscipit lorem eu, porta lorem. Mauris eget massa non eros scelerisque mattis id non ligula. Curabitur vitae dignissim velit. Cras eu condimentum tellus. Curabitur non scelerisque ipsum. Mauris ligula mi, tincidunt at felis eget, venenatis mattis nibh. Aliquam lobortis sem vitae elit euismod dictum. Nam id sapien sed dui pretium maximus. Suspendisse malesuada, tortor a tincidunt congue, purus dui suscipit enim, a mattis risus nisl non elit. Integer nec diam nec lectus sollicitudin molestie.</p>
              </Card>
            </Paper>
          </div>
        </div>
        <footer className="footerBar">
          {token === 'null'  
          
          ?

          <div>
            <Link to='/Login'><Button variant="text"><strong>Login</strong></Button></Link>
            <Link to='/Register'><Button variant="text"><strong>Register</strong></Button></Link>
          </div>

          :

          <div>
            <Link to='/Admin'><Button variant="text"><strong>Dashboard</strong></Button></Link>
            <Link to='/Logout'><Button variant="text"><strong>Logout</strong></Button></Link>
          </div>
          }

        </footer>
    </>
  )
}

export default About