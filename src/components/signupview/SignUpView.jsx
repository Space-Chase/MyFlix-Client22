import { useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        username,
        password,
        email,
        birthday,
      };

      const response = await fetch("https://nameless-basin-66959-08ab77b73096.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Signup successful. Please log in.");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup. Please try again later.");
    }
  };

  return (
    <Container>
          <form onSubmit={handleSubmit}>

      <Row className="justify-content-md-center">
        <Col md={6}>
        <Card>
            <Card.Body>
              <Card.Title>Sign-Up</Card.Title>
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
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="form-control"
        />
      </label>
      <Button type="submit" variant="primary">
        Submit 
        </Button>
      </Card.Body>
      </Card>  
    </Col>
    </Row>
    </form>

    </Container>
  );
};

/*return (
  <Container>
  <Form onSubmit={handleSubmit}>
    <Form.Row>
      <Form.Group as={Col} controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Col} controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Col} controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
    </Form.Row>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  </Container>
);
};*/

