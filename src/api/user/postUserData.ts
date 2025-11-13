export async function postUserData(url: string, data: { username: string; password: string; }) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Created ", result)
    return result;
  } catch (error) {
    console.error("Post error:", error);
    return null;
  }
}


