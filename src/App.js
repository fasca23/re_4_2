import "./App.css";
import Container from "./components/Container";

function App() {
  return (
    <>
      <div className="task-title training-title">Учёт времени кодинга</div>
      <Container workouts={[]} />
    </>
  );
}

export default App;