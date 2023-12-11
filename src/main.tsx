import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./routes/error-page.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import WatchPage from "./components/WatchPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="*" element={<ErrorPage />} />
        <Route path="watchlist" element={<App />} />
        <Route path="browse" element={<App />} />
        <Route path="discover" element={<App />} />
      </Route>
      <Route path="watch/:movieId" element={<WatchPage />} />
    </>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
