import React from "react";
import { Link } from "react-router-dom";

// UI Element Import
import {
   Menu,
   MenuItem,
   Badge,
   IconButton,
   makeStyles,
   Button
  } from "@material-ui/core";

// Icon Import
import MoreIcon from "@material-ui/icons/MoreVert";
import MailIcon from "@material-ui/icons/Mail";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon  from "@material-ui/icons/AccountCircle";
import NotificationsIcon  from "@material-ui/icons/Notifications";

const useStyle = makeStyles((theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


export default function NavbarClickables( props ) {
  const classes = useStyle();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isLoggedIn = Boolean(props.loggedInUser)
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Set the target element at which profile
  // Menu will be drawn.
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Unset the target element to hide
  // profile menu that was drawn early.
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  }

  // Set the target element at which
  // the overflow context menu will draw. (MobileView)
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // Function to unset profileMenu and
  // colsing the whole mobile menu.
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
};

  // Set the target element where mobile menu
  // will be drawn.
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>


      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      {/* Menu items on navbar on desktiop view */}
      <div className={classes.sectionDesktop}>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={props.notificationCounts} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        { !isLoggedIn &&
          <Button
            component={Link}
            startIcon={<ExitToAppIcon />}
            to={'/signin'}
            >
            Sign In
          </Button> }

        { isLoggedIn &&
          <IconButton
            color="inherit"
            aria-label="profile"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircleIcon />
          </IconButton>
        }
      </div>


      {/* Menu items on navbar in mobile view*/}
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>
    {renderMobileMenu}
    {renderMenu}
    </>
  );
}