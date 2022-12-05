import { Routes, Route, Navigate } from "react-router-dom";
import Layout from './layout/Layout'
import UserDetail from './pages/User/UserDetails';
import UserList from './pages/User/UserList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate replace to={'/users'} />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/user/:id' element={<UserDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
