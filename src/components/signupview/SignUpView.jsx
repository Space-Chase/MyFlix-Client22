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

      const response = await fetch(
        "https://nameless-basin-66959-08ab77b73096.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

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
    <Container class="signup-edit">
      <form onSubmit={handleSubmit}>
        <Row className="justify-content-md-center">
          <Col md={5}>
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
