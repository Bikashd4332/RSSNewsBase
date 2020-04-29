import React from "react";
import { Link, useHistory } from "react-router-dom";
import Gravatar from "react-awesome-gravatar";
import PropTypes from "prop-types";

// UI Element Import
import {
  Menu,
  MenuItem,
  Badge,
  IconButton,
  makeStyles,
  Button,
  Avatar
} from "@material-ui/core";

// Icon Import
import MoreIcon from "@material-ui/icons/MoreVert";
import BrightnessIcon from "@material-ui/icons/Brightness4";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AuthService from "../../../services/AuthService";

const useStyle = makeStyles(theme => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
}));

export default function NavbarClickables({
  loggedInUser,
  setLoggedInUser,
  notificationCounts,
  themePreference,
  setThemePreference
}) {
  const classes = useStyle();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isLoggedIn = Boolean(loggedInUser);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // handle logout
  const handleLogOut = () => {
    AuthService.logout();
    setLoggedInUser(null);
    history.push("/app/signin");
    handleMenuClose();
  };
  // Set the target element at which profile
  // Menu will be drawn.
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

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
  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // handler will be called to set the theme preference
  // onClick of brightness icon.
  const handleThemeChange = () => {
    setThemePreference(themePreference === "dark" ? "light" : "dark");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        component={Link}
        to={"/app/customization"}
        onClick={handleMenuClose}
      >
        Customization
      </MenuItem>
      <MenuItem onClick={handleLogOut}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleThemeChange}>
        <IconButton aria-label="change theme" color="inherit">
          <BrightnessIcon />
        </IconButton>
        <p>Theme</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      {isLoggedIn && (
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
      )}

      {!isLoggedIn && (
        <MenuItem onClick={handleMenuClose} component={Link} to={"/app/signin"}>
          <IconButton aria-label="login button" color="inherit">
            <ExitToAppIcon />
          </IconButton>
          <p>Sign In</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <>
      {/* Menu items on navbar on desktiop view */}
      <div className={classes.sectionDesktop}>
        <IconButton
          aria-label="change theme"
          color="inherit"
          onClick={handleThemeChange}
        >
          <BrightnessIcon />
        </IconButton>

        <IconButton aria-label="show notifications" color="inherit">
          <Badge badgeContent={notificationCounts} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {!isLoggedIn && (
          <Button
            component={Link}
            startIcon={<ExitToAppIcon />}
            to={"/app/signin"}
          >
            Sign In
          </Button>
        )}

        {isLoggedIn && (
          <IconButton
            color="inherit"
            size="small"
            aria-label="profile"
            onClick={handleProfileMenuOpen}
          >
            <Gravatar email={loggedInUser.email}>
              {url => <Avatar src={url} />}
            </Gravatar>
          </IconButton>
        )}
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
NavbarClickables.propTypes = {
  loggedInUser: PropTypes.shape({
    email: PropTypes.string.isRequired
  }),
  setLoggedInUser: PropTypes.func.isRequired,
  notificationCounts: PropTypes.number,
  themePreference: PropTypes.string.isRequired,
  setThemePreference: PropTypes.func.isRequired
};
