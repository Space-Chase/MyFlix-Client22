import { createRoot } from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';


import "./index.scss";
import { MainView } from './components/mainview/MainView';
const MyFlixApplication = () => {
  return (
      <Container>
        <MainView />
      </Container>
    );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);
