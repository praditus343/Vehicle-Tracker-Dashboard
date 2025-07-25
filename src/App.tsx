import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VehicleList from '@/components/VehicleList';
import VehicleDetail from '@/components/VehicleDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          <Route path="/" element={<VehicleList />} />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;