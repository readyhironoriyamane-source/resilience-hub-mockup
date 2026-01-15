import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import ArticleDetail from "@/pages/ArticleDetail";
import Dashboard from "@/pages/Dashboard";
import NeedsPage from "@/pages/NeedsPage";
import SeedsPage from "@/pages/SeedsPage";
import DeskPage from "./pages/DeskPage";
import CommunityPage from "./pages/CommunityPage";
import ArticlesPage from "./pages/ArticlesPage";
import IntelPage from "./pages/IntelPage";
import DirectoryPage from "./pages/DirectoryPage";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path="/article/:id" component={ArticleDetail} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/desk" component={DeskPage} />
          <Route path="/community" component={CommunityPage} />
          <Route path="/articles" component={ArticlesPage} />
          <Route path="/intel" component={IntelPage} />
          <Route path="/directory" component={DirectoryPage} />
      <Route path="/needs/:category" component={NeedsPage} />
      <Route path="/seeds/:category" component={SeedsPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
