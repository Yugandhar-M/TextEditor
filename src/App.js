import logo from "./logo.svg";
import "./App.css";
import Editor from "./Components/Editor";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["(", ")"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};
function App() {
  return (
    <MathJaxContext version={3} config={config}>
      <div className="App">
        <Editor />
      </div>
    </MathJaxContext>
  );
}

export default App;
