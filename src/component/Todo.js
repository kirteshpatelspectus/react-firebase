import "../App.css";
import React, { useState, useEffect } from "react";
import {
  Card,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import todoDataService from "../services/todos.services";

let newArr = JSON.parse(localStorage.getItem("data"));

const Todo = (props) => {
  const [todo, setTodo] = useState("");
  const [obj, setObj] = useState({
    activity: todo,
   
  });
  const [update, setUpdate] = useState(false);
  const [activityArr, setActivityArr] = useState([]);
  const [bookId, setBookId] = useState("");
  useEffect(() => {
    getTodo();
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].lineThrough === true) {
        document.getElementById(newArr[i].id).style.textDecoration =
          "line-through";
      }
    }
  }, []);
  const getTodo = async () => {
    const data = await todoDataService.getAllTodos(props.uid);
    setActivityArr(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const handleAdd = async () => {
    if (update === false && todo !== "") {
      try {
        await todoDataService.addBook(obj,props.uid);
        setTodo("");
      } catch (err) {
        console.log("");
      }
      getTodo();
    } else if (todo !== "") {
      let updatedTodo = { activity: todo };
      document.getElementById(bookId).innerText = todo;
      await todoDataService.updateTodo(bookId, updatedTodo,props.uid);
      getTodo()
      setTodo("");
      setUpdate(false);
    }
  };
  const handleEdit = async (doc) => {
    setTodo(doc.activity);
    setBookId(doc.id);
    setUpdate(true);
  };
  const handleDelete = async (id) => {
    await todoDataService.deleteTodo(id,props.uid);
    getTodo();
  };
  return (
    <Box ml={20} mr={20} mt={5}>
      <Card>
        <Typography sx={{ backgroundColor: "black", color: "white" }} p={5}>
          Todo App
        </Typography>
        <Box mx={5} my={3}>
          <Card sx={{ display: "flex", padding: "24px" }}>
            <Box id="todo_textfield" mr={2}>
              <TextField
                id="activities"
                label="Todo"
                variant="outlined"
                size="small"
                value={todo}
                onChange={(e) => {
                  setTodo(e.target.value);
                  setObj({ ...obj, activity: e.target.value });
                }}
                fullWidth
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleAdd}
              style={{ marginRight: "16px" }}
            >
              {update === false ? "+" : "Update"}
            </Button>
          </Card>
        </Box>
        {activityArr.length !== 0 ? (
          <Box mx={5} my={3}>
            <Card>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell id="table_header" width="60%">
                      Acivities
                    </TableCell>
                    <TableCell id="table_header">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activityArr.map((doc, index) => {
                    return (
                      <TableRow key={doc.id}>
                        <TableCell
                          id={doc.id}
                          width="50%"
                          // onClick={() => handleAcitivity(act)}
                        >
                          {doc.activity}
                        </TableCell>
                        <TableCell sx={{ display: "flex" }}>
                          <Box>
                            <Button
                              variant="contained"
                              color="info"
                              startIcon={<EditIcon />}
                              onClick={(e) => handleEdit(doc)}
                              sx={{ marginRight: "10px" }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="warning"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleDelete(doc.id)}
                            >
                              Delete
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </Box>
        ) : (
          <Box mb={2} sx={{ opacity: 0.5, color: "red", fontWeight: 600 }}>
            No Data Found!
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Todo;
