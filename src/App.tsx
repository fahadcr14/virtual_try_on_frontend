import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/layout/footer';
import { Header } from './components/layout/header';
import { About } from './pages/about';
import { Contact } from './pages/contact';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Pricing } from './pages/pricing';
import { Signup } from './pages/signup';
import { TryRoom } from './pages/try-room';
import { Helmet } from 'react-helmet'; // Importing Helmet for managing the document head

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        {/* Set the title for the entire app */}
        <Helmet>
          <title>VTON</title>
        </Helmet>

        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/try-room" element={<TryRoom />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
