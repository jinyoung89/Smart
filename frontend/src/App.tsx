import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Patterns from './pages/Patterns';
import PatternDetail from './pages/PatternDetail';
import CreatePattern from './pages/CreatePattern';
import Community from './pages/Community';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Calculator from './pages/Calculator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/patterns/:id" element={<PatternDetail />} />
          <Route path="/patterns/create" element={<CreatePattern />} />
          <Route path="/community" element={<Community />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
