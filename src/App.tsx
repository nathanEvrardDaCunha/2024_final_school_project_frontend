import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard.tsx";
import EstimateLocation from "./pages/EstimateLocation.tsx";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/estimate" element={<EstimateLocation />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;