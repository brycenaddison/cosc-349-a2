import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ConfirmUserPage from "./components/ConfirmUserPage";
import { Layout } from "./components/Layout";

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
            <Layout>
              <HomePage />
            </Layout>
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
