import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/Frontend-Challenge/" element={<PostList />} />
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;