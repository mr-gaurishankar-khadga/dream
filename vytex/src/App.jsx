import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import "./App.css";

import Layout from "./Layout";
import PageContent from "./PageContent";
import Login from "./auth/Login";
import Register from "./auth/Register";
import LinktreeLayout from "./components/Linktreea/LinktreeLayout";
import Loading from "./components/Loading";
import Profile from "./components/Profile";
import PublicProfile from "./components/Linktreea/PublicProfile"; 

function RouteContent() {
  const { pageId, subPageId } = useParams();

  if (pageId === "dd") {
    return <LinktreeLayout activeTab={subPageId} />;
  }

  return <PageContent />;
}

function App() {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setAuth({
        isAuthenticated: true,
        user: JSON.parse(user),
        token,
        loading: false,
      });
    } else {
      setAuth({
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      });
    }
  }, []);

  if (auth.loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="app">
        <main className="container">
          <Routes>
            <Route
              path="/login"
              element={
                auth.isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login setAuth={setAuth} />
                )
              }
            />
            <Route
              path="/register"
              element={
                auth.isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Register setAuth={setAuth} />
                )
              }
            />

            <Route
              path="/"
              element={
                auth.isAuthenticated ? (
                  <Layout>
                    <PageContent />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/profile"
              element={
                auth.isAuthenticated ? (
                  <Layout>
                    <Profile user={auth.user} />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/:pageId/:subPageId"
              element={
                auth.isAuthenticated ? (
                  <Layout>
                    <RouteContent />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Public profile route by username */}
            <Route path="/:username" element={<PublicProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;