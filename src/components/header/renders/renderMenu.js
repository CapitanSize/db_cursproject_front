import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import {PROFILE_ROUTE} from "../../../routes/consts";

const RenderMenu = ({props}) => {


    const goToProfile = () => {
        props.handleMenuClose()
        props.navigate(PROFILE_ROUTE + '/' + props.id)
    }

    return(
        <Menu
            anchorEl={props.anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={props.isMenuOpen}
            onClose={props.handleMenuClose}
        >
            <MenuItem onClick={goToProfile}>Profile</MenuItem>
        </Menu>
    );
}
export default RenderMenu;