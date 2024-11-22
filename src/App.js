import RegisterForm from "./Components/learning/RegisterForm";
import Game from "./Components/Tic-Tac-Toe/Board";
import Counter from "./Components/Week_3_Study/PracticeRedux/Counter";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import { ThemedComponent, ThemeProvider } from "./Components/Week_3_Study/ThemedComponent";
import { NavBar } from "./Components/Router/NavBar";
import './App.css'
import { useEffect } from "react";
import Header from "./E-Commerce-App/Components/Navigation/Header";
import RouteBars from "./E-Commerce-App/Components/Navigation/RouteBars";
export default function App() {

  return (

    <div className="App">
      <RouteBars />
    </div>

    // Routing Example
    // <div className="App">
    //   <NavBar />
    // </div>

    // //ContextAPI Example
    // <ThemeProvider>
    //   <ThemedComponent />
    // </ThemeProvider>

    // <div>
    //   <h1>Welcome to the Redux Counter App</h1>
    //   <Counter />
    // </div>

  );
}