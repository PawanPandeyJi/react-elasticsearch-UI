import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AddBookForm from './pages/AddBookForm'
import AllBooks from './pages/AllBooks'
import Navbar from './components/Navbar'
import { useState } from 'react'
import Elasticsearch from './pages/Elasticsearch'

function App() {
  const [bookCount, setBookCount] = useState(0);

  const updateBookCount = (count: number) => {
    setBookCount(count);
  };

  return (
    <>
      <BrowserRouter>
      <Navbar bookCount={bookCount}/>
        <Routes>
          <Route path='/' element={<AddBookForm/>}/>
          <Route path='/books' element={<AllBooks  updateBookCount={updateBookCount} />}/>
          <Route path='/elasticsearch' element={<Elasticsearch/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
