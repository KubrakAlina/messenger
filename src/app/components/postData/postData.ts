export async function PostData(url: string, data: { username: string; password: string; }) {
  try {
    const urlForFetch = `http://localhost:3004/${url}`;
    const response = await fetch(urlForFetch, {
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

export async function postMessage(data: { from: string; to: string; text: string }) {
  try {
    const urlForFetch = `http://localhost:3004/messages`;
    const response = await fetch(urlForFetch, {
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
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
