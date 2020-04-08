import React from 'react';

// This context provides { searchText, doSearch, setDoSearch } props value.
// This is for listening to the action of navbar search field.
const NavbarSearchContext = React.createContext('');

export default NavbarSearchContext;


