import React, { Component } from 'react';
import {
    Dialog,
    DialogContent,
    CardHeader,
    TextField,
    Stack,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    Button,
    DialogActions
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { DoNotDisturbAltRounded as DoNotDisturbAltRoundedIcon } from '@mui/icons-material';

class CustomDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            priority: "low", // Set "low" as the default value for priority
            deadline: "",
            validDescription: true,
            validTitle: true,
        }
    }

    handleAdd = () => {
        const { title, description, priority, deadline } = this.state;
        const { setTodos, setOpenDialog, setAddState } = this.props;

        const validTitle = Boolean(title) && this.uniqueTitle(title);
        const validDescription = Boolean(description);

        if (validTitle && validDescription && Boolean(deadline)) {
            const todo = {
                title: title,
                description: description,
                priority: priority,
                deadline: deadline,
            };
            this.appendTodo(todo);
            this.reset();
            this.props.handleSnackbar("Added successfully", "success");
            
        } else {
            this.setState({
                validTitle: validTitle,
                validDescription: validDescription
            });
        }
    };

    appendTodo = (todo) => {
        this.props.setTodos([...this.props.todos, todo]);
    };

    reset = () => {
        this.setState({
            title: "",
            description: "",
            priority: "low", // Reset priority to "low" when resetting
            deadline: "",
            validTitle: true,
            validDescription: true
        });
        this.props.setOpenDialog(false);
        this.props.setAddState(false);
    }

    uniqueTitle = (title) => {
        return this.props.todos.filter(todo => todo.title === title).length === 0;
    }

    handleCancel = () => {
        this.reset()
    };

    handleEdit = () => {
        const { description, priority, deadline } = this.state;
        const { targetTitle, todos } = this.props;
        this.setState({ validDescription: Boolean(description) });
        if (Boolean(description) && Boolean(deadline)) {
            const updatedTodos = todos.map((todo) => {
                if (todo.title === targetTitle) {
                    return {
                        ...todo,
                        description: description,
                        priority: priority,
                        deadline: deadline,
                    };
                }
                return todo;
               
            });
            this.props.handleSnackbar("Updated successfully", "info");
            this.props.setTodos([...updatedTodos]);
            this.reset();
        }
    };

    handleDateChange = (event) => {
        this.setState({ deadline: event.target.value });
    };

    render() {
        const { showDial, addState } = this.props;

        return (
            <Dialog open={showDial} onClose={this.handleCancel}>
                <CardHeader
                    sx={{ bgcolor: 'primary.dark', color: 'white' }}
                    title={addState ? (
                        <>
                            <AddCircleIcon />
                            &nbsp; Add Task
                        </>
                    ) : (
                        <>
                            <EditIcon /> Edit Task
                        </>
                    )}
                />
                <DialogContent>
                    <Stack spacing={3}>
                        {addState && <TextField
                            className="form-control"
                            id="title"
                            error={!this.state.validTitle}
                            label="Title"
                            placeholder="Title"
                            helperText={this.state.validTitle? '':"Enter a valid Title" }
                            value={this.state.title}
                            onChange={(e) => this.setState({ title: e.target.value })}
                        />}
                        <TextField
                            className="form-control"
                            id="Description"
                            label="Description"
                            placeholder="Description"
                            helperText={this.state.validDescription? '':"Enter a valid Description" }
                            error={!this.state.validDescription}
                            value={this.state.description}
                            onChange={(e) => this.setState({ description: e.target.value })}
                        />

                        {/* Using native HTML date input */}
                        <TextField
                            className="form-control"
                            id="deadline"
                            label="Deadline"
                            type="date"
                            value={this.state.deadline}
                            onChange={this.handleDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </Stack>
                    <FormControl sx={{ marginY: 3 }}>
                        <FormLabel id="priority-radio-group">Priority</FormLabel>
                        <RadioGroup row aria-label="priority" defaultValue="low" name="priority" value={this.state.priority} onChange={(e) => this.setState({ priority: e.target.value })}>

                            <FormControlLabel value="low" control={<Radio />} label="Low" />
                            <FormControlLabel value="med" control={<Radio />} label="Medium" />
                            <FormControlLabel value="high" control={<Radio />} label="High" />

                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    {addState ? (
                        <Button
                            onClick={this.handleAdd}
                            variant="contained"
                            sx={{ bgcolor: 'primary.dark', width: '35%' }}
                        >
                            <AddCircleIcon />
                            &nbsp;Add
                        </Button>
                    ) : (
                        <Button
                            onClick={this.handleEdit} // You need to define handleEdit function for editing
                            variant="contained"
                            sx={{ bgcolor: 'primary.dark', width: '35%' }}
                        >
                            <EditIcon fontSize="small" />
                            Edit
                        </Button>
                    )}
                    <Button
                        onClick={this.handleCancel}
                        variant="contained"
                        sx={{ bgcolor: 'red', width: '35%' }}
                    >
                        <DoNotDisturbAltRoundedIcon />
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default CustomDialog;
