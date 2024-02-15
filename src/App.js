import './App.css';
import ClassComponent from './ClassComponent';
import ToDoComponent from './ToDoComponent';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      {/* <p>Add a goal for today: <ToDoComponent/></p> */}
        <ClassComponent/>
      </header>
    </div>
  );
}

export default App;
