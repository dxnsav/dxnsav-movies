import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/NavBar";
import { DialogProvider } from "./context/DialogContext";

function App() {
  return (
    <DialogProvider>
      <NavBar />
      <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        <HomePage />
      </main>
    </DialogProvider>
  );
}

export default App;
