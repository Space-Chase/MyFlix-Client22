/*<Row>
      
{!user ? (
  <Row>
    <LoginView
      onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
      }}
    />
    
    <SignupView />
  </Row>
) : selectedMovie ? (
  <Row>
    <MovieView
      movie={selectedMovie}
      onBackClick={() => setSelectedMovie(null)}
    />
  </Row>
) : movies.length === 0 ? (
  <Row>
    <div>The list is empty!</div>
  </Row>
) : (
  <Row>
    {movies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />
    ))}
  </Row>
)}
{user && (
  <Row>
    <Col xl={12} md={11} className="d-flex justify-content-center">
      <Button
        class="logout-btn"
        type="submit"
        variant="secondary"
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }}
      >
        Logout
      </Button>
    </Col>
  </Row>
)}
</Row>


import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
    console.log(user);
    return (
        <Navbar bg="light" expand="lg" class="barnav">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Film Flock
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user ? (<Link to={`/`}>
                            <button className="back-button">new button1</button>
                        </Link>) : (
                            <Link to={`/`}>
                                <button className="back-button">new button2</button>
                            </Link>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
*/



 //console.log(userData.userData);

  /*useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve token from localStorage
        const storedToken = localStorage.getItem('token');
        
        if (!storedToken) {
          throw new Error('No token found');
        }

        // Fetch user data with token
        const response = await fetch("https://nameless-basin-66959-08ab77b73096.herokuapp.com/users", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
*/