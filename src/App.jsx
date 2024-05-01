import React from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Add_Post from './components/Add_Post';
import All_Users from './components/All_Users'
import Get_Posts from './components/Get_Posts'
import Post_Detail from './components/Post_Detail'
import Profile from './components/Profile';
const App = () => {
  return (
    <>
    <Router>
    <Navbar />
    <Routes>
      <Route path='/' element={<Get_Posts />} />
      <Route path='/post' element={<Add_Post />} />
      <Route path='/post/:id' element={<Post_Detail />} />
      <Route path='/users' element={<All_Users />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
    </Router>
    </>
  )
}

export default App