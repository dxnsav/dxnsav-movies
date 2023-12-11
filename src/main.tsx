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
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import WatchPage from "./components/WatchPage.tsx";
import { SearchContent } from "./components/SearchDrawer/SearchContent.tsx";
import MovieDetails from "./components/SearchDrawer/MovieDetails.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="*" element={<ErrorPage />} />
        <Route path="search" element={<SearchContent />} />
        <Route path="details" element={<MovieDetails />} />
      </Route >

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
