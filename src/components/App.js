import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import axios from "axios";
import React, { useState } from 'react';
import NavbarIndex from './NavbarIndex'
import TestLogin from '../pages/index/TestLogin'
import TestRegister from '../pages/index/TestRegister'
import ResetPassword from '../pages/index/ResetPassword'
import EnterEmailResetPassword from '../pages/index/EnterEmailResetPassword'
import ShopIndex from '../pages/shop/ShopIndex'
import ShopItemInfo from '../pages/shop/ShopItemInfo'
import UserPage from '../pages/user/UserPage'
import OtherUserInfo from '../pages/user/OtherUserInfo'
import ProtectedRoute from "./ProtectedRoutes";
import ForwardRoutes from "./ForwardRoutes";
import ShopSearchResult from '../pages/shop/ShopSearchResult'
import MultipleType from '../pages/shop/MultipleType'
import Error404Illustration from "../pages/shop/Error404Illustration";

function App() {

  const [query, setQuery] = useState('');
  const authToken = localStorage.getItem("authToken") || 'empty';
  const [userInfo, setUserInfo] = useState({});
  let userInfos

  async function loadUserInfo() {
    if (authToken) {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`

        },
      };
      await axios
        .get("http://localhost:5000/users/checkIsLoggedIn", config)
        .then((res) => {
          if (res.status === 200) {
            // userInfos = (res.data.user)
            // if (!userInfo) setUserInfo(userInfos)
          } else if (res.status === '400') {
            localStorage.clear()
            window.location.pathname = "/"
          }
        })
        .catch((err) => console.log(err));
    }
  }

  loadUserInfo()


  function onSearch(query) {
    setQuery(query)
    window.location.pathname = `/search/search=${query}`
  }

  return (
    <Router>
      <NavbarIndex onSearch={onSearch} userInfo={userInfo} />
      <Switch>
        <ForwardRoutes path="/login" component={TestLogin} />
        <ForwardRoutes path="/register" component={TestRegister} />
        <ForwardRoutes exact path="/resetPassword" component={EnterEmailResetPassword} />
        <ForwardRoutes path="/resetPassword/:userId/:token" component={ResetPassword} />
        <Route path="/otherUser/:id" children={<OtherUserInfo />} />
        <ProtectedRoute path="/user" component={UserPage} />
        <Route path="/view/:id" children={<ShopItemInfo />} />
        <Route exact path="/" children={<ShopIndex />} />
        <Route path="/search/:query" children={<ShopSearchResult />} />
        <Route path="/preferredBooks/:query" children={<MultipleType type='preferredBooks' />} />
        <Route path="/preferredBooks" children={<MultipleType type='preferredBooks' />} />
        <Route path="/uploadedRecently/:query" children={<MultipleType type='uploadedRecently' />} />
        <Route path="/uploadedRecently" children={<MultipleType type='uploadedRecently' />} />
        <Route path="*">
          <Error404Illustration />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;