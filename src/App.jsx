import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import Home from './pages/Home';
import Survey from './pages/Survey';
import PrePurchase from './pages/PrePurchase';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <div className="min-h-screen w-full max-w-screen-2xl mx-auto overflow-x-hidden bg-black text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/pre-purchase" element={<PrePurchase />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App