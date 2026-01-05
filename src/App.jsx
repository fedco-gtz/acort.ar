import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Qr from "./pages/Qr";
import Acerca from "./pages/Acerca";
import Redirect from "./pages/Redirect";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route path="/qr" element={<Qr />} />
          <Route path="/:code" element={<Redirect />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}