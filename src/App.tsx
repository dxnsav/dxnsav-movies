import { FC, useEffect } from "react";

import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/NavBar";
import { useAuth } from "./hooks/useAuth";
import { useWatchListStore } from "./hooks/useWatchListStore";

const App = (): FC => {
  const getWatchList = useWatchListStore((state) => state.getWatchList);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getWatchList(user.id);
    }
  }, [getWatchList, user]);

  return (
    <>
      <NavBar />
      <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        <HomePage />
      </main>
    </>
  );
}

export default App;
