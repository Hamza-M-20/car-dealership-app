import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import CarsList from "../CarsList/CarsList";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  
  if (!user) {
    return <div>please log in to view your dashboard</div>;
  }
  
  return (
    <main>
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome, {user.username}!</h1>
      <CarsList />
    </main>
  );
};

export default Dashboard;
