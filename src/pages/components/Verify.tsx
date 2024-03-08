import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
type Prop = {
  children: JSX.Element;
};
export default function Verify({ children }: Prop) {
  const navigation = useNavigate();
  const [isVerify, setIsverify] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch("/api/dev/verify", {
            method: "POST",
            redirect:'follow',
            body: JSON.stringify({
              token: token,
            }),
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status !== 200) {
            navigation("/login");
          } else {
            setIsverify(true);
          }
        } else {
          navigation("/login");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        navigation("/login");
      }
    };

    fetchData();
  }, []);

  return <div>{isVerify ? children : "Loading..."}</div>;
}
