import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Midterm1Bahandi from './midterm1/pages/midterm1bahandi';
import Midterm2Landing from './midterm2/pages/midterm2Landing';
import Registration from './midterm2/pages/register/Registration';
import Login from './midterm2/pages/login/Login';
import Profile from './midterm2/pages/profile/Profile';
import UpdateUser from './midterm2/pages/updates/user/UpdateUser';
import SearchResults from './midterm2/pages/search/SearchResults';
import SearchResultsExpand from './midterm2/pages/search/SearchResultExpand';
import { useEffect } from "react";
import './App.css'

function App() {
  return (
    <Routes> {/*also remade the default page of 
    the react and instead moved it so i can switch content easily*/}
      <Route path="/" element={<Landing />} />
      <Route path="/midterm1" element={<Midterm1Bahandi />} />
      <Route path="/midterm2" element={<Midterm2Landing />} />
      <Route path="/midterm2/register" element={<Registration />} />
      <Route path="/midterm2/login" element={<Login />} />
      <Route path="/midterm2/profile" element={<Profile />} />
      <Route path="/midterm2/updateuser" element={<UpdateUser />} />
      <Route path="/midterm2/pages/search" element={<SearchResults />} />
      <Route path="/midterm2/pages/search/expand" element={<SearchResultsExpand />} />
    </Routes>
  );

}
export default App;