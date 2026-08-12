import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="242174113397-f955njc4mueso4q3lq8c2t1lsil6lv7v.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);