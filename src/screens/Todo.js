import { Container, Button, Form, FormCheck } from "@govtechsg/sgds-react";
import Table from "../components/Table";
import { useState, useEffect } from 'react';
import axios from "axios";
import CONFIG from "../config";

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

  useEffect(() => {
    populateTodos();
}, [todoItems]);

  const populateTodos = () => {

  axios.get(`${CONFIG.API_ENDPOINT}`)
      .then((result) => {
      setTodoItems(result.data);
      })
  }
  const today = new Date();
  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
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
          {/* Iterate through todoItems list to create new rows */}
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
        </Table>
      </Form>
      <Button size="sm" variant="primary">
        Add
      </Button>
    </Container>
  );
}

export default Todo;