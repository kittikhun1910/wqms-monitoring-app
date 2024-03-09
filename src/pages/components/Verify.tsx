import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the type for the component's props
type Prop = {
  children: JSX.Element; // Children elements that should be rendered
};

// Define the Verify component
export default function Verify({ children }: Prop) {
  const navigation = useNavigate(); // React Router hook for navigation
  const [isVerify, setIsverify] = useState<boolean>(false); // State to track verification status

  // Use useEffect to run the verification logic when the component mounts
  useEffect(() => {
    // Define an async function to fetch and verify the token
    const fetchData = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("token");

        // Check if a token exists
        if (token) {
          // Send a POST request to the verification endpoint
          const response = await fetch("/api/dev/verify", {
            method: "POST",
            redirect: "follow",
            body: JSON.stringify({
              token: token,
            }),
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          });

          // If the response status is not 200, navigate to the login page
          if (response.status !== 200) {
            navigation("/login");
          } else {
            // If the response status is 200, set isVerify to true
            setIsverify(true);
          }
        } else {
          // If no token exists, navigate to the login page
          navigation("/login");
        }
      } catch (err) {
        // Handle any errors that occur during the fetch request
        console.error("Error fetching data:", err);
        navigation("/login");
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  // Render the children if the user is verified, otherwise render "Loading..."
  return <div>{isVerify ? children : "Loading..."}</div>;
}
