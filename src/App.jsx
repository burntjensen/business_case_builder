import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BusinessCaseGuide, PlaceholderGuide, TestPage, MentorshipTemplateGuide } from './guides';
import { Navbar } from './components';

/**
 * App - Main router component for the interactive guides application
 * 
 * Route structure:
 * - / → Business Case Guide (original article)
 * - /placeholder → Placeholder Guide (example for new articles)
 * 
 * To add a new guide:
 * 1. Create a new folder in /src/guides/
 * 2. Build your guide component using shared components from /src/components/
 * 3. Export it from /src/guides/index.js
 * 4. Add a new Route below
 */
function App() {
  return (
    <Router>
      {/* Global Navigation */}
      <Navbar />
      
      <Routes>
        {/* Main guide - Business Case Builder */}
        <Route path="/" element={<BusinessCaseGuide />} />
        
        {/* Placeholder guide - Example for creating new articles */}
        <Route path="/placeholder" element={<PlaceholderGuide />} />
        
        {/* Test page - Dummy content for testing */}
        <Route path="/test" element={<TestPage />} />
        
        {/* Mentorship Program Template Guide */}
        <Route path="/mentorship-program-template" element={<MentorshipTemplateGuide />} />
        
        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

/**
 * NotFound - Simple 404 page
 */
function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
        <p className="text-xl text-slate-600 mb-8">Page not found</p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
        >
          Go to Business Case Guide
        </Link>
        <div className="mt-4">
          <Link 
            to="/placeholder" 
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Or view the placeholder guide →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
