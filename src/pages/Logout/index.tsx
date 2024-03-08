import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigation = useNavigate();

  useEffect(() => {
    const logout = async () => {
      localStorage.removeItem("token");
      navigation("/Home");
    };

    logout();
  }, [navigation]);

  return null;
};

export default Logout;
