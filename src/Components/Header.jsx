
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, TableCell, TableHead, TableRow} from "@mui/material";

class Header extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {
        return (
            <TableHead>
                <TableRow>
                    <TableCell align = "center">Title</TableCell>
                    <TableCell align = "center">Description</TableCell>
                    <TableCell align = "center">Deadline</TableCell>
                    <TableCell align = "center">Priority</TableCell>
                    <TableCell align = "center">Is Complete</TableCell>
                    <TableCell align = "center">Action</TableCell>
                </TableRow>
            </TableHead>
        );
    }
}

export default Header;
