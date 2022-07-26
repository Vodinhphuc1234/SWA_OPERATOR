import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Users as UsersIcon } from "../icons/users";
import LogoutIcon from "@mui/icons-material/Logout";
import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import AccountMenu from "./account/accountMenu";
import NotificationMenu from "./NotificationMenu";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  const router = useRouter();
  const handleLogout = () => {
    removeCookies("token");
    router.push("/login");
  };
  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 150,
          },
          width: {
            lg: "calc(100% - 150px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <AccountMenu src={"/static/images/avatars/avatar_1.png"} />
          <NotificationMenu />

          <Tooltip title="Logout">
            <IconButton sx={{ ml: 1 }} onClick={handleLogout}>
              <LogoutIcon fontSize="50" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
