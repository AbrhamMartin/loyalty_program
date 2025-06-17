import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
