import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import ExtratoPage from "./pages/extrato";
import LoginPage from "./pages/login";
import ForgotPasswordPage from "./pages/forgotPassword";
import { createContext, useEffect, useState } from "react";

// Criando um tipo para o contexto
interface AuthContextType {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
}

// Criando o contexto com um valor inicial nulo
export const AuthContext = createContext<AuthContextType | null>(null);

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setIsLogged(true);
      return;
    }

    const getAuth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error();
        }

        setIsLogged(true);
      } catch (error) {
        setIsLogged(false);
      }
    };

    getAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      <BrowserRouter>
        <Routes>
          {/* A navegação condicional agora está dentro do Routes */}
          <Route path="/" element={!isLogged && <Navigate to="/auth/login" />} >
            <Route path="" element={<HomePage />} />
            <Route path="/extrato" element={<ExtratoPage />} />
          </Route>
          <Route path="/auth" >
            <Route path="login" index element={!isLogged ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="edit-password" element={<ForgotPasswordPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
