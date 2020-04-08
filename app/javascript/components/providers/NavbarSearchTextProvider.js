import React from "react";
import NavbarSearchContext from "../contexts/NavbarSearchContext";

export default function NavbarSearchTextProvider( props ) {
  // searchedText is for the text which is searched

  /* doSearch is a boolean value representing action.
   * it is true when there is some text in searchedText
   * which need to be searched. And in false represents the
   * search action is consumed by some other component.
   */
  const { setNavbarActions, navbarActions } = props;
  return (
    <NavbarSearchContext.Provider value ={{ setNavbarActions, navbarActions }}>
      {props.children}
    </NavbarSearchContext.Provider>
  )
}