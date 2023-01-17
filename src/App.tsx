import Board from "components/board/board";
import { Toaster } from "react-hot-toast";
import Nav from "components/nav/nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Board />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
