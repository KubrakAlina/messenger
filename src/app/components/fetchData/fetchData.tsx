async function FetchData(url:string) {
  try {
    const urlForFetch = `http://localhost:3004/${url}`;
    const response = await fetch(urlForFetch);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Loading error:", error);
    return null;
  }
}

export default FetchData;
