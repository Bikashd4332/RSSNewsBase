import React, { useState } from 'react';
import UserLoginStateContext  from "../contexts/UserLoginStatecontext";

export default function UserLoginStateProvider (props) {

  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <UserLoginStateContext.Provider value={{loggedInUser, setLoggedInUser}}>
      {props.children}
    </UserLoginStateContext.Provider>
  );
}
