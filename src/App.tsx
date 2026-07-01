import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
            <p className="text-gray-400">OAuth App loading…</p>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
