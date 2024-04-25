import React, { useState } from "react";
import { Container, Card, Table, TableBody, Snackbar, Alert } from "@mui/material";
import Title from "./Components/Tittle"; // Make sure to adjust the path as needed
import Header from "./Components/Header";
import TodoItem from "./Components/TodoItem";
import CustomDialog from "./Components/Dialog";

function App() {
  const [openDialog, setOpenDialog] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [todos, setTodos] = useState([]);
  const [targetTitle, setTargetTitle] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("success");

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setIsAdd(true);
  };

  const handleSnackbar = (message, color) => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    setSnackbarOpen(true);
  };

  return (
    <Container>
      <Card>
        <Title setOpenDialog={handleOpenDialog} setIsAdd={setIsAdd} />
        <Table>
          <Header />
          <TableBody>
            {todos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                setOpenDialog={setOpenDialog}
                setTargetTitle={setTargetTitle}
                setTodos={setTodos}
                handleSnackbar={handleSnackbar}
              />
            ))}
          </TableBody>
        </Table>
        <CustomDialog
          todos={todos}
          setTodos={setTodos}
          showDial={openDialog}
          setOpenDialog={setOpenDialog}
          addState={isAdd}
          setAddState={setIsAdd}
          targetTitle={targetTitle}
          handleSnackbar={handleSnackbar}
        />
      </Card>
      <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarColor} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
