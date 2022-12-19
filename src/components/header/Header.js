import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Search, SearchIconWrapper, StyledInputBase} from "./styled";
import RenderMobileMenu from "./renders/renderMobileMenu";
import RenderMenu from "./renders/renderMenu";
import {useSelector} from "react-redux";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {ORDERS_ROUTE} from "../../routes/consts";

const Header = () => {

        const [anchorEl, setAnchorEl] = useState(false);
        const auth = useSelector(state => state.app.isAuth)
        const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false);
        const id = useSelector(state => state.app.user.id)

        const isMenuOpen = anchorEl;
        const isMobileMenuOpen = mobileMoreAnchorEl;

        const handleProfileMenuOpen = () => {
            setAnchorEl(true);
        };

        const handleMobileMenuClose = () => {
            setMobileMoreAnchorEl(false);
        };

        const handleMenuClose = () => {
            setAnchorEl(false);
            handleMobileMenuClose();
        };

        const handleMobileMenuOpen = () => {
            setMobileMoreAnchorEl(true);
        };

        const navigate = useNavigate()

        return (
            <Box sx={{ flexGrow: 1 }} >
                <AppBar position="fixed" style={{backgroundColor: '#343434' }}>
                    <Toolbar>
                        <Grid style={{cursor: 'pointer'}} onClick={() => navigate(ORDERS_ROUTE)}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                                SERVICE
                            </Typography>
                        </Grid>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />

                        {!auth ?
                            <>
                                <Button variant={'outlined'} color={'error'} onClick={() => navigate('/login')}>Войти</Button>
                            </>
                            :
                            <>
                                <Box sx={{ display: { xs: 'none', md: 'flex', marginRight: '20px' } }}>
                                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                        <Badge badgeContent={1} color="error">
                                            <MailIcon />
                                        </Badge>
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                    >
                                        <Badge badgeContent={1} color="error">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Box>
                                <Box sx={{ display: { xs: 'flex', md: 'none', marginRight: '20px' } }}>
                                    <IconButton
                                        size="large"
                                        aria-label="show more"
                                        aria-haspopup="true"
                                        onClick={handleMobileMenuOpen}
                                        color="inherit"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Box>
                            </>
                        }
                    </Toolbar>
                </AppBar>
                <RenderMenu props={{anchorEl, isMenuOpen, handleMenuClose, navigate, id}}/>
                {mobileMoreAnchorEl && <RenderMobileMenu mobileMoreAnchorEl={mobileMoreAnchorEl} props={{isMobileMenuOpen, handleMobileMenuClose, handleProfileMenuOpen, navigate}}/>}
            </Box>
        );
};

export default Header;