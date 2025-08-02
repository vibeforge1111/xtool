import { useEffect, useState } from 'react';
import Landing from './components/Landing';
import LoadingAnalysis from './components/LoadingAnalysis';
import { authService } from './services/auth';
import type { User } from './types/user';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Listen for auth state changes
    authService.addListener(setUser);
    
    // Check if user is already authenticated
    const checkAuth = async () => {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        const isValid = await authService.verifyToken();
        if (!isValid) {
          authService.logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();

    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state) {
      handleOAuthCallback(code, state);
    }

    return () => {
      authService.removeListener(setUser);
    };
  }, []);

  const handleOAuthCallback = async (code: string, state: string) => {
    try {
      setIsAnalyzing(true);
      await authService.completeTwitterAuth(code, state);
      
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // TODO: Start analysis process here
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 3000); // Temporary - will be replaced with actual analysis
      
    } catch (error) {
      console.error('OAuth callback failed:', error);
      setIsAnalyzing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading X Insights...</p>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return <LoadingAnalysis />;
  }

  if (!user) {
    return <Landing />;
  }

  // User is authenticated - show main app
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">X Insights</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {user.profileImage && (
                  <img 
                    src={user.profileImage} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-gray-700 font-medium">@{user.username}</span>
              </div>
              <button
                onClick={() => authService.logout()}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome, {user.name}!
          </h2>
          <p className="text-gray-600 mb-8">
            Your personality analysis will appear here. Coming soon in Module 2!
          </p>
          
          {/* Placeholder for results */}
          <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
            <div className="text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p>Analysis engine coming in Module 2...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;