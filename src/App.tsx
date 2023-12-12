import MovieVideo from "./components/MovieBg";
import NavBar from "./components/NavBar";
import { DialogProvider } from "./context/DialogContext";

function App() {
  return (
    <DialogProvider>
      <NavBar />
      <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="p-5 lg:p-0">
          <MovieVideo />
          <h1 className="text-3xl font-bold ">Нещодавно добавлені</h1>
        </div>
      </main>
    </DialogProvider>
  );
}

export default App;
