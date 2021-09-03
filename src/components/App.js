import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from "axios";
import React, { useState, Component } from 'react';
import NavbarIndex from './NavbarIndex'
import Register from '../pages/index/Register'
import Login from '../pages/index/Login'
import TestLogin from '../pages/index/TestLogin'
import TestRegister from '../pages/index/TestRegister'
import ShopIndex from '../pages/shop/ShopIndex'
import ShopItemInfo from '../pages/shop/ShopItemInfo'
import UserPage from '../pages/user/UserPage'
import { Button } from "react-bootstrap";
import CheckAuth from "./CheckAuth";
import ProtectedRoute from "./ProtectedRoutes";
import './../css/styles.css'
import ShopSearchResult from '../pages/shop/ShopSearchResult'

function App() {

  const [query, setQuery] = useState('');

  function onSearch(query){
    console.log(query)
    setQuery(query)
    window.location.pathname = `/search/${query}`
  }

  function handleOnChange(e){
    console.log('changed', e.target.value)
  }
  function handleOnClick(){
    console.log('clicked')
  }
  function checkIsAuth() {
    console.log(CheckAuth.isAuthenticated())
    console.log('now checking req.body on server...')

    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .get("http://localhost:5000/users/checkIsLoggedIn", config)
      .then((res) => {
        if (res.status === 200) {
          console.log('logged in', res.data)
        } else {
          console.log('not ok', res.data)
        }
      })
      .catch((err) => console.log(err));
  }

  function handleLogOut() {

    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .get("http://localhost:5000/users/logout", config)
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear()
          window.location.pathname = "/"
          console.log('logged out', res.data)
          CheckAuth.logout()
          console.log(CheckAuth.isAuthenticated())
        } else {
          console.log('not ok', res.data)
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <Router>
      <div style={{
        height: "100%",
        width: " 100%",
        overflowY: "hidden"
      }}>
        <div style={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          // paddingRight: "20px"
        }}>

          <NavbarIndex onSearch={onSearch}/>
          
          <button onClick={checkIsAuth}>Click me</button>
          <button onClick={handleLogOut}>Log Out</button>
          <Switch>
            <Route path="/login">
              <TestLogin />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <ProtectedRoute path="/user" component={UserPage} />

            <Route path="/view/:id" children={<ShopItemInfo />} />
            <Route exact path="/">
              <ShopIndex />
            </Route>
            <Route path="/search/:query" children={<ShopSearchResult />} />
            <Route path="*">
              <TestRegister />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function handleOnClick() {
  axios.get('http://localhost:5000', { withCredentials: true })
}

// function Home() {
//   return (
//     <div>
//       <NavbarIndex />
//       <button onClick={handleOnClick}>Click Me</button>
//       <h2>Home</h2>
//     </div>);
// }

function About() {
  return <h2>About</h2>;
}

// function Login() {
//   return <h2>Login</h2>;
// }

// function Register() {
//   return <h2>Register</h2>;
// }

function Users() {
  return <h2>Users</h2>;
}

export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useRouteMatch,
//   useParams
// } from "react-router-dom";

// export default function App() {
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/topics">Topics</Link>
//           </li>
//         </ul>

//         <Switch>
//           <Route path="/about">
//             <About />
//           </Route>
//           <Route path="/topics">
//             <Topics />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Topics() {
//   let match = useRouteMatch();

//   return (
//     <div>
//       <h2>Topics</h2>

//       <ul>
//         <li>
//           <Link to={`${match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`/topics/props-v-state`}>
//             Props v. State
//           </Link>
//         </li>
//       </ul>

//       {/* The Topics page has its own <Switch> with more routes
//           that build on the /topics URL path. You can think of the
//           2nd <Route> here as an "index" page for all topics, or
//           the page that is shown when no topic is selected */}
//       <Switch>
//         <Route path={`${match.path}/:topicId`}>
//           <Topic />
//         </Route>
//         <Route path={match.path}>
//           <h3>Please select a topic.</h3>
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// function Topic() {
//   let { topicId } = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }
