import { Routes, Route } from "react-router-dom"
import Questionnaire from "./components/Questionnaire"
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import SubmissionDetail from "./pages/SubmissionDetail"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Questionnaire />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/submission/:id" element={<SubmissionDetail />} />
    </Routes>
  )
}

export default App
