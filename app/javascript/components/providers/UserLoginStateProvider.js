import React from 'react';
import UserLoginStateContext  from "../contexts/UserLoginStatecontext";

// Context provider for providing the state of logged in user.
export default function UserLoginStateProvider ({ loggedInUser, setLoggedInUser, children }) {
  return (
    <UserLoginStateContext.Provider value={{loggedInUser, setLoggedInUser}}>
      {children}
    </UserLoginStateContext.Provider>
  );
}
