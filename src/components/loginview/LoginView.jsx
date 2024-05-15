import { useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    
      const data = {
        Username: username,
        Password: password
      };

      const response = await fetch("https://nameless-basin-66959-08ab77b73096.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      

      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        localStorage.setItem("user", JSON.stringify(userData.user));
        localStorage.setItem("token", userData.token);
        onLoggedIn(userData.user, userData.token); 
        setUsername("username");
        setPassword("password");
      } else {
        alert("Login failed. Please check your credentials.");
      }
  };

  return (
    <Container>
    <Row className="justify-content-md-center">
      <Col md={5}>
        <Card>
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <form onSubmit={handleSubmit}>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </label>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>)};