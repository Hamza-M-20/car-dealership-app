import { useContext } from "react";
import { Routes, Route } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import CarsList from "./components/CarsList/CarsList";
import CarDetail from "./components/CarDetail/CarDetail";
import { UserContext } from "./contexts/UserContext";
import CreateCars from "./components/CreateCars/CreateCars";
import ReviewsList from "./components/ReviewsList/ReviewsList";

const App = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <>
        <NavBar />
        <main>
          <p>Loading...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cars" element={<CarsList />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/cars/:id/reviews" element={<ReviewsList />} />
        <Route path="/create-cars" element={<CreateCars />} />
        <Route
          path="*"
          element={
            <main>
              <h1>404 - Page Not Found</h1>
              <p>The page you are looking for does not exist.</p>
            </main>
          }
        />
      </Routes>
    </>
  );
};

export default App;
