import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AddBookForm from './pages/AddBookForm'
import AllBooks from './pages/AllBooks'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<AddBookForm/>}/>
          <Route path='/books' element={<AllBooks/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
