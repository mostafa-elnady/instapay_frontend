import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";



const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    handleCloseUserMenu();
  };

  //change Language
  const languages = [
    {
      code: "en",
      name: "English",
      dir: "ltr",
    },
    {
      code: "ar",
      name: "العربية",
      dir: "rtl",
    },
  ];
  const [t, i18n] = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);


  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
  }, [currentLanguage]);


  const settings = [
    {key:1, name: t('Profile'), link: "/profile" },
    {key:3, name: t('Wallet'), link: "/transactions" },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: user ? "space-between" : "center" }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
           
          >
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              sx={{
                mx: 6,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
              }}
            >
              {t("Instapay")}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              variant="h5"
              sx={{
                mr: 1,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
            {t("Instapay")}
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          
          {user && (
            <Box sx={{ flexGrow: 0 , mr:1}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.firstName} src={user.image}  sx={{width: 35,height: 35,}} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.key} onClick={handleCloseUserMenu}>
                    <Link to={setting.link} style={{ textDecoration: "none" }}>
                      <Typography color="#000" textAlign="center">
                        {setting.name}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem onClick={logout}>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Typography color="#000" textAlign="center">
                      {t("Logout")}
                    </Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          )}

          <Box >
            <Tooltip title="Change Language">
              {i18n.language === "en" ? (
                <IconButton
                  onClick={() => i18n.changeLanguage("ar")}
                  sx={{ p: 0 , ml:1}}
                >
                  <Avatar
                    sx={{
                      backgroundColor: "#fff",
                      color: "#1976D2",
                      width: 30,
                      height: 30,
                     
                    }}
                  >
                    Ar
                  </Avatar>
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => i18n.changeLanguage("en")}
                  sx={{ p: 0 ,mx:1}}
                >
                  <Avatar
                    sx={{
                      backgroundColor: "#fff",
                      color: "#1976D2",
                      width: 30,
                      height: 30,
                    }}
                  >
                    En
                  </Avatar>
                </IconButton>
              )}
            </Tooltip>
          </Box>
          </Box>
        </Toolbar>
      </Container>
      
    </AppBar>
  );
};

export default NavBar;
