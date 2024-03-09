const loginEndpoint =
  "https://rw8y2lq7ja.execute-api.ap-southeast-1.amazonaws.com/login";

// Define the structure of the login response
interface LoginResponse {
  token: string;
}

// Function to authenticate a user
export const login = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    // Send a POST request to the login endpoint with username and password
    const response = await fetch(loginEndpoint, {
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Login failed");
    }
    // Parse the JSON respons
    const data: LoginResponse = await response.json();
    // Return the token
    return data.token;
  } catch (error: any) {
    // Log and re-throw any errors that occur during the login process
    console.error("Login failed:", error.message);
    throw error;
  }
};
