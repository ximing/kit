import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Agents } from './pages/Agents';
import { ApiCategory } from './pages/ApiCategory';
import { ApiFunction } from './pages/ApiFunction';
import { ApiIndex } from './pages/ApiIndex';
import { Guide } from './pages/Guide';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Skills } from './pages/Skills';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/guide/agents" element={<Agents />} />
        <Route path="/api" element={<ApiIndex />} />
        <Route path="/api/:category" element={<ApiCategory />} />
        <Route path="/api/:category/:name" element={<ApiFunction />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/zh" element={<Home />} />
        <Route path="/zh/guide" element={<Guide />} />
        <Route path="/zh/guide/agents" element={<Agents />} />
        <Route path="/zh/api" element={<ApiIndex />} />
        <Route path="/zh/api/:category" element={<ApiCategory />} />
        <Route path="/zh/api/:category/:name" element={<ApiFunction />} />
        <Route path="/zh/skills" element={<Skills />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
