import "./App.css";
import logo from "./assets/illini_logo.svg";
import { FaGithub } from "react-icons/fa";
import Body from "./components/Body/Body";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-logo-container">
          <img src={logo} alt="Illinois" className="header-logo" />
          <a
            href="https://github.com/jshalabi03/uiuc-cs-req-gui"
            target="_blank"
          >
            <FaGithub className="header-logo link" />
          </a>
        </div>
        <h1 className="header-title">UIUC CS Req Explorer</h1>
      </header>
      <hr />
      <Body />
    </div>
  );
}

export default App;
