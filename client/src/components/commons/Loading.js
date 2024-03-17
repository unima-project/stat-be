import CircularProgress from "@mui/material-next/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import React from "react";

export const Loading = (props) => {
    return (
        <Backdrop
            sx={{color: '#fff', zIndex: 1, position: "fixed"}}
            open={props.open}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    )
}