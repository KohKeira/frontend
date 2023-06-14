import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Button, Form, FormCheck } from "@govtechsg/sgds-react";
import CONFIG from "../config";
import Table from "../components/Table";

// TodoItem element that manages updates and deletion of todo items
// Props will hold todoItems passed from Todo Element
function TodoItem(props) {
  const [done, setDone] = useState(props.done);

  return (
    <>
      <tr>
        <td>
          <FormCheck
            checked={done}
          />
        </td>
        <td width={"100%"}>{props.description}</td>
      </tr>
    </>
  );
}

function Todo() {
  const [todoItems, setTodoItems] = useState({});

  const today = new Date();
  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  }
  const submitNewTodo = () => {
    // Validation to ensure entry is not empty
    if (newTodoDescription.trim() !== "") {
      const newTodo = {
        description: newTodoDescription,
      };
      axios.post(`${CONFIG.API_ENDPOINT}`, newTodo).then(() => {
        // Does below action after request has been made 
        populateTodos();
      })
    } else {
      alert("Invalid Todo input!");
    }
  }
  // Manages side effects like API calls
  useEffect(() => {
    // Fetches data on initial render
    populateTodos();
  }, [todoItems]); // Add variables to dependency array to allow re-render of information on state changes

  // GET request to fetch ToDo information 
  const populateTodos = () => {
    axios.get(`${CONFIG.API_ENDPOINT}`)
      .then((result) => {
        setTodoItems(result.data);
      })
  }

  return (
    <Container>
      <div className="has-background-gradient">
        <h2>Today</h2>
        {today.toLocaleDateString("en-UK", dateOptions)}
      </div>
      <Form>
        <Table isFullwidth isHoverable isHorizontal isBordered>
          <thead>
            <tr>
              <th>Done</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {/* Iterate todoItems list to create new rows */}
            {Object.keys(todoItems).map((item) => (
              // Forwards items to TodoItem element as props
              <TodoItem
                key={todoItems[item].id}
                id={todoItems[item].id}
                done={todoItems[item].done}
                description={todoItems[item].description}
                refreshToDos={populateTodos}
              />
            ))}
            <tr>
              <td>
                <FormCheck disabled />
              </td>
              <td width={"100%"}>
                <input
                  className="text table-input"
                  placeholder="Enter new to-do here"
                  id="newTodoDescription"
                  type="text"
                ></input>
              </td>
            </tr>
          </tbody>
        </Table>
      </Form>
      <Button size="sm" variant="primary" onClick={submitNewTodo}>
    Add
  </Button>
    </Container>
  );
}

export default Todo;