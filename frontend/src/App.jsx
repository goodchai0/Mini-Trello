
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/Home/HomePage';
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { AnalyticsPage } from "./pages/AnalyticsPage/AnalyticsPage";
import { Settings } from "./pages/Settings/Settings";
import { SharePage } from './pages/SharePage/SharePage';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <>
    <ToastContainer />
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/:id" element={<SharePage/>} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
