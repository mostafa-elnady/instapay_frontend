import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRouteHook from "./hook/auth/ProtectedRouteHook";
import ProtectedRoute from "./utilities/ProtectedRoute";
import Home from './pages/home/HomePage'
import NavBar from "./components/shared/NavBar"
import Login from './components/auth/Login';
import ProfilePage from './pages/user/ProfilePage';
import WalletPage from './pages/user/WalletPage';
import AddTransactionPage from './pages/user/AddTransactionPage';


function App() {

  const [userLogged] = ProtectedRouteHook()


  return (
    <div className="App">
      <NavBar />
      
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute isLoogedIn={userLogged} />}>
      <Route index element={<Home />} />
      <Route path='/profile' element={<ProfilePage/>} />
      <Route path='/transactions' element={<WalletPage/>} />
      <Route path='/addTransaction' element={<AddTransactionPage/>} />
     
     </Route>

     <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
