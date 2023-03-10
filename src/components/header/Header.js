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
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {ORDERS_ROUTE, PROFILE_ROUTE} from "../../routes/consts";
import {logout} from "../../redux/App/appSlice";
import NotificationsDrawer from "../NotificationsDrawer/NotificationsDrawer";

const Header = () => {

    const [anchorEl, setAnchorEl] = useState(false);
    const auth = useSelector(state => state.app.isAuth)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false);
    const id = useSelector(state => state.app.user.id)
    const customerNotifications = useSelector(state => state?.app?.customerNotifications)
    const executorNotifications = useSelector(state => state?.app?.executorNotifications)
    const userType = useSelector(state => state?.app?.userType)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [drawerOpen, setDrawerOpen] = useState(false)

    const isMenuOpen = anchorEl;
    const isMobileMenuOpen = mobileMoreAnchorEl;

    const handleProfileMenuOpen = () => {
        navigate(PROFILE_ROUTE + '/' + id)
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
                            placeholder="Search???"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />

                    {!auth ?
                        <>
                            <Button variant={'outlined'} color={'error'} onClick={() => navigate('/login')}>??????????</Button>
                        </>
                        :
                        <>
                            <Box sx={{ display: { xs: 'none', md: 'flex', marginRight: '40px' } }}>
                                {userType === 'customer' && <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                    style={{marginRight: '20px', position: 'relative'}}
                                    onClick={() => setDrawerOpen(prevState => !prevState)}
                                >
                                    <Badge
                                        badgeContent={userType === 'customer' ? customerNotifications?.length : executorNotifications?.length}
                                        color="error">
                                        <NotificationsIcon/>
                                    </Badge>
                                    <NotificationsDrawer navigate={navigate}
                                                         notifications={userType === 'customer' ? customerNotifications : executorNotifications}
                                                         open={drawerOpen} setOpen={setDrawerOpen}/>
                                </IconButton>
                                }
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                    style={{marginRight: '20px'}}
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Button variant={'outlined'} color={'error'} onClick={() => {
                                    dispatch(logout())
                                    navigate('/login')
                                }}>??????????</Button>
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