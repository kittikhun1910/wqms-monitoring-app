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
          const response = await fetch("https://rw8y2lq7ja.execute-api.ap-southeast-1.amazonaws.com/dev/verify", {
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
            navigation("/Login");
          } else {
            setIsverify(true);
          }
        } else {
          navigation("/Login");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        navigation("/Login");
      }
    };

    fetchData();
  }, []);

  return <div>{isVerify ? children : "Loading..."}</div>;
}
