import Header from "./components/header/Header";
import './App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { useEffect } from "react";
import {
    customerOrdersListThunk,
    fetchAllExecutors, fetchExecutorInProgressOrdersThunk,
    getExecutorPerfrmancesThunk
} from "./redux/App/appSlice";
import {useDispatch, useSelector} from "react-redux";
function App() {

  const dispathc = useDispatch()
    const userType = useSelector(state => state?.app?.userType)

  useEffect(()=>{
      userType === 'executor' && dispathc(getExecutorPerfrmancesThunk())
      userType === 'executor' && dispathc(fetchExecutorInProgressOrdersThunk())
      dispathc(customerOrdersListThunk())
    dispathc(fetchAllExecutors())
  },[])
  return (
    <BrowserRouter>
        <AppRouter/>
        <Header/>
    </BrowserRouter>
  );
}

export default App;
