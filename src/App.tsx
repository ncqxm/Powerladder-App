import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import WelcomePage from "./pages/WelcomePage";
import CanvasPage from "./pages/CanvasPage";
import ContextPage from "./pages/ContextPage";
import MainPage from "./pages/MainPage";
import PipelinePage from "./pages/PipelinePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/canvas" element={<CanvasPage />} />
            <Route path="/context" element={<ContextPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/pipeline" element={<PipelinePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
