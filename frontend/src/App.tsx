import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Soil Report Pages
import SoilReportList from './pages/soilreports/SoilReportList';
import SoilReportDetail from './pages/soilreports/SoilReportDetail';
import SoilReportCreate from './pages/soilreports/SoilReportCreate';
import SoilReportEdit from './pages/soilreports/SoilReportEdit';

// Error boundary
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-background font-sans antialiased">
          <Toaster position="top-right" />
          
          <Routes>
            {/* Main Layout Routes */}
            <Route element={<MainLayout />}>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Soil Reports */}
              <Route path="/soilreports">
                <Route index element={<SoilReportList />} />
                <Route path="create" element={<SoilReportCreate />} />
                <Route path=":id">
                  <Route index element={<SoilReportDetail />} />
                  <Route path="edit" element={<SoilReportEdit />} />
                </Route>
              </Route>

              {/* 404 Not Found */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;