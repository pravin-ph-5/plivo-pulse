// hah om sai ram om bhaskaraya namaha om namaha sivayaa 

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from "./pages/register"
import Login from "./pages/login"
import LandingPage from "./pages/LandingPage"
import CreatePage from "./pages/createPage_On"
import AddComponents from "./pages/addComponents_On"
import AddComponentForm from "./pages/addComponent_Form_On"
import IncidentsOnboarding from "./pages/incidents_On"
import Dashboard from "./pages/dashboard"
import PlivoPublic from "./pages/plivo_public"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login/>} />
        <Route path="/onboarding/create-page" element={<CreatePage/>} />
        <Route path="/onboarding/add-components" element={<AddComponents/>} />
        <Route path="/onboarding/add-components-form" element={<AddComponentForm/>} />
        <Route path="/onboarding/incidents" element={<IncidentsOnboarding/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/plivo-public" element={<PlivoPublic/>} />

        


      </Routes>
    </Router>
  )
}


