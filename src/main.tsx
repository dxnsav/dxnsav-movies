import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "./App.tsx";
import MovieDetails from "./components/MovieDetails.tsx";
import { PlayerPage } from "./components/PlayerPage.tsx";
import { SearchContent } from "./components/SearchDrawer/SearchContent.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import "./index.css";
import ErrorPage from "./routes/error-page.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />} path="/">
        <Route element={<ErrorPage />} path="*" />
        <Route element={<SearchContent />} path="search" />
        <Route element={<MovieDetails />} path="details" />
      </Route >

      <Route element={<PlayerPage />} path="watch" />
    </>
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
