import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import ExtratoPage from "./pages/extrato";
import LoginPage from "./pages/login";
import ForgotPasswordPage from "./pages/forgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/extrato" element={<ExtratoPage />} />
        <Route path="/auth" >
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;