import Navbar from "./components/navbar"
import {Routes,Route} from "react-router-dom"
import Layout from "./components/layout"
import Login from "./components/Login"
import Test from "./components/Test"

function App() {
  return (
    <div>
  
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route path="/login" element={<Login/>}/>
      <Route path="/test" element={<Test/>}/>
      </Route>
    </Routes>


    </div>
    
  )
}

export default App
