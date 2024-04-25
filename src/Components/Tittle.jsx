// Title.js
import React from "react";
import {AppBar, CardHeader, Toolbar, Typography} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

class Title extends React.Component {
    constructor(props) {
        super(props)
    }

    handleAdd = () => {
        this.props.setOpenDialog(true);
        this.props.setIsAdd(true);
    }

    render() {
        return (
            <CardHeader
                title= {<div><MenuIcon/> Frameworks</div>}
                action={
                    <button className={"btn btn-primary"} onClick={this.handleAdd}> <AddCircleRoundedIcon/> Add</button>
                }
                sx={{
                    bgcolor: "primary.dark",
                    textAlign: "center",
                    color: "white",
                }}
            />
        );
    }
}

export default Title;
