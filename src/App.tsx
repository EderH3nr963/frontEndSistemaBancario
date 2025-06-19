import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";

import CadastroPage from "./pages/CadastroPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TransferPage from "./pages/TransferPage";
import PagarPage from "./pages/PagarPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/cadastro" element={<CadastroPage />} />

          {/* Rotas protegidas */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/transfer"
            element={
              <PrivateRoute>
                <TransferPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment/pay"
            element={
              <PrivateRoute>
                <PagarPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
