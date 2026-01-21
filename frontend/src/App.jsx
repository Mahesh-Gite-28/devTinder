
import {Routes,Route} from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./components/Login"
import Test from "./components/Test"
import Feed from "./components/Feed"

function App() {
  return (
    <div>
  
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route path="/login" element={<Login/>}/>
      <Route path="/test" element={<Test/>}/>
      <Route path="/feed" element={<Feed/>}/>
      </Route>
    </Routes>


    </div>
    
  )
}

export default App
