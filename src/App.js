import Header from "./components/header/Header";
import './App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes/AppRouter";

function App() {

  return (
    <BrowserRouter>
        <AppRouter/>
        <Header/>
    </BrowserRouter>
  );
}

export default App;
