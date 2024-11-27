import { AdminDash } from "@/components/AdminDash";
import { WaiterCook } from "@/components/WaiterCook";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

function Dash() {
  const { user } = useContext(AuthContext);

  const renderDashboard = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDash />;
      case "waiter":
      case "cook":
        return <WaiterCook />;
      default:
        return <div>Role not recognized</div>;
    }
  };

  return (
    <div>
      {renderDashboard()}
    </div>
  );
}

export default Dash;
