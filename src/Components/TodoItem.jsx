import React from "react";
import { TableRow, TableCell, IconButton, FormControl } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleted: false,
    };
  }

  handleIsComplete = () => {
    this.setState({ isCompleted: !this.state.isCompleted });
  };

  handleDelete = () => {
    const { todo, setTodos, handleSnackbar } = this.props;
    setTodos((prev) => prev.filter((t) => t.title !== todo.title));
    handleSnackbar("Deleted successfully", "error");
  };

  handleUpdate = () => {
    const { setOpenDialog, setTargetTitle, todo } = this.props;
    setTargetTitle(todo.title);
    setOpenDialog(true);
  };

  render() {
    const { todo } = this.props;
    return (
      <TableRow>
        <TableCell align="center">{todo.title}</TableCell>
        <TableCell align="center">{todo.description}</TableCell>
        <TableCell align="center">{todo.deadline}</TableCell>
        <TableCell align="center">{todo.priority}</TableCell>
        <TableCell align="center">
          <input
            type="checkbox"
            checked={this.state.isCompleted}
            onChange={this.handleIsComplete}
          />
        </TableCell>
        <TableCell align="center">
          <FormControl>
            {!this.state.isCompleted && (
              <button
                className="btn btn-primary me-2"
                onClick={this.handleUpdate}
              >
                <SaveAsIcon /> Update
              </button>
            )}
            <button className="btn btn-danger" onClick={this.handleDelete}>
              <HighlightOffRoundedIcon /> Delete
            </button>
          </FormControl>
        </TableCell>
      </TableRow>
    );
  }
}

export default TodoItem;
