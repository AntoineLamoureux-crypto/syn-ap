import './App.css';
import { Route, Routes } from "react-router-dom";
import DelivererHomePage from './components/pages/Deliverer/DelivererHomePage';
import EmployeeHomePage from './components/pages/Employee/EmployeeHomePage';
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import history from './history';

function App() {
  const deliverer = localStorage.getItem('currentDeliverer');
  const employee = localStorage.getItem('currentEmployee')
  return (
      <Routes history={history} >
        {deliverer && <Route path="/" exact element={<DelivererHomePage />} />}
        {employee && <Route path="/" exact element={<EmployeeHomePage />} />}
        <Route path="/signUp" exact element={<SignUp />} />
        <Route path="/" exact element={<Login />} />
      </Routes>
  );
}

export default App;
