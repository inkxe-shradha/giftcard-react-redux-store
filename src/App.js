import { CssBaseline, CircularProgress } from "@mui/material";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Layout from "./shared/Components/Layouts/Layout";
import "@sweetalert2/theme-dark/dark.scss";
function App() {
  // Lazy load the app
  const Home = React.lazy(() => import("./pages/Home/Home"));
  const NotFound = React.lazy(() => import("./pages/Notfound/NotFound"));
  const Login = React.lazy(() => import("./pages/auth/Login"));
  const Profile = React.lazy(() => import("./pages/profile/Profile"));
  const AuthGuard = React.lazy(() =>
    import("./components/Authentication/AuthenticationRoute")
  );
  const GiftCardDetails = React.lazy(() =>
    import("./pages/giftcard-details/GiftCardDetails")
  );
  const GiftCardReceived = React.lazy(() =>
    import("./pages/giftcard-recevied/GiftCardReceived")
  );
  const GiftCardRequest = React.lazy(() =>
    import("./pages/giftcard-request/GiftCardRequest")
  );
  const GiftCardPage = React.lazy(() => import("./pages/giftcards/GiftCard"));
  return (
    <>
      <CssBaseline />
      <Suspense fallback={<CircularProgress className="circular-center" />}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/gift-cards" element={<GiftCardPage />} />
            <Route path="/gift-cards/:id" element={<GiftCardDetails />} />
            {/* Authenticated Routes */}
            <Route
              path="/profile"
              element={<AuthGuard element={<Profile />} />}
            />
            <Route
              path="/gift-sent"
              element={<AuthGuard element={<GiftCardRequest />} />}
            />
            <Route
              path="/gift-received"
              element={<AuthGuard element={<GiftCardReceived />} />}
            />
            {/* 404 Page Redirection */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Suspense>
    </>
  );
}

export default App;
