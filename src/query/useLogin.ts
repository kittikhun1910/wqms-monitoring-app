const loginEndpoint =
  "https://rw8y2lq7ja.execute-api.ap-southeast-1.amazonaws.com/login";

interface LoginResponse {
  token: string;
}

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response = await fetch(loginEndpoint, {
      method: "POST",
      mode:'cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data: LoginResponse = await response.json();
    return data.token;
  } catch (error: any) {
    console.error("Login failed:", error.message);
    throw error;
  }
};
