import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigation = useNavigate();

  // Remove the token from local storage and redirect to the home page
  useEffect(() => {
    const logout = async () => {
      localStorage.removeItem("token");
      navigation("/");
    };

    logout();
  }, [navigation]);// Re-run the effect if the navigation function changes

  return null; // Since this component doesn't render anything, it returns null
};

export default Logout;
