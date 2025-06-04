import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home";
import Completed from "./components/Completed";
import Important from "./components/Important";
import Proceeding from "./components/Proceeding";
import './App.css'
import { ToastContainer } from "react-toastify";
import GoogleMaps from "./components/Common/GoogleMaps";

const App = () => {
  return (
      <BrowserRouter> {/* BrowserRouter : 브라우저 라우터 설정 */}
        <div>
          <Routes>
            {/* link 이동 시 route (해당 경로의 Rendering) 될 컴포넌트 지정 */}
            <Route path="/" element={<Home/>}/>
            <Route path="/completed" element={<Completed/>}/>
            <Route path="/important" element={<Important/>}/>
            <Route path="/proceeding" element={<Proceeding/>}/>
            <Route path="/googleMaps" element={<GoogleMaps/>}/>
          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={1000}
            theme="light"/>
        </div>
      </BrowserRouter>
  )
}

export default App
