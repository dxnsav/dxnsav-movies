import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/NavBar";

function App() {
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
