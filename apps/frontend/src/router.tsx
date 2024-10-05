import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ConfirmUserPage from "./components/ConfirmUserPage";
import { Header } from "./components/Header";

const isAuthenticated = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  return !!accessToken;
};

const router = (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated() ? (
            <Header>
              <HomePage />
            </Header>
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/confirm" element={<ConfirmUserPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default router;
