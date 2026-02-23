const BASE_URL = "http://192.168.0.103:6969";

export async function apiRequest(url, method = "GET", body) {
  const token = localStorage.getItem("sessionToken");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = token;

  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  return await response.json();
}