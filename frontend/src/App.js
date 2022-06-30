import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import MyLog from "./MyLog";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <PrivateRoute component={HomePage} path="/" exact />
          <Route component={LoginPage} path="/login" />
          <Route component={MyLog} path="/log" />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
