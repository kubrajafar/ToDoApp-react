import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import { uid } from "uid";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [errorStatus, setErrorStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editBtnId, setEditBtnId] = useState("");

  const handleClick = () => {
    if (inputValue) {
      setTodos([...todos, { todoId: uid(8), todoText: inputValue }]);
      setInputValue("");
    } else {
      setErrorStatus(true);
    }
  };

  const handleDelete = (e) => {
    setTodos(todos.filter((todo) => todo.todoId !== e.target.id));
  };

  const handleEdit = (e) => {
    setInputValue(e.target.parentElement.parentElement.children[0].innerText);
    setEditStatus(true);
    setEditBtnId(e.target.id);
  };

  const handleEditNew = () => {
    setEditStatus(false);

    if (inputValue) {
      todos.find((elem) => elem.todoId === editBtnId).todoText = inputValue;
      setTodos([...todos]);
      setInputValue("");
    }
  };

  return (
    <div>
      <Container>
        <h1 className="text-center m-3">ToDo App</h1>
        <Row>
          <Col xs={2}></Col>
          <Col xs={6}>
            <InputGroup className="mb-5">
              <Form.Control
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setErrorStatus(false);
                }}
                value={inputValue}
                placeholder={
                  errorStatus ? "input can not empty!" : "Add To Text ..."
                }
                aria-label="Username"
                aria-describedby="basic-addon1"
                className={errorStatus && "border border-danger"}
              />
            </InputGroup>
          </Col>
          <Col xs={2}>
            {editStatus ? (
              <Button
                onClick={() => handleEditNew()}
                variant="warning"
                className="mx-3"
              >
                Edit
              </Button>
            ) : (
              <Button
                onClick={() => handleClick()}
                variant="info"
                className="mx-3"
              >
                Add
              </Button>
            )}
          </Col>
        </Row>

        <Row>
          <Col xs={2}></Col>
          <Col xs={7}>
            {todos.map((elem) => {
              return (
                <ListGroup className="mb-3" key={elem.todoId}>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">{elem.todoText}</p>
                    <div>
                      <Button
                        onClick={(e) => {
                          handleDelete(e);
                        }}
                        variant="danger"
                        id={elem.todoId}
                        className="mx-3"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={(e) => {
                          handleEdit(e);
                        }}
                        variant="warning"
                        id={elem.todoId}
                      >
                        Edit
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Todo;
