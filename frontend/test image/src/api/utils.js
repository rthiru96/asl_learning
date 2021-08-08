export async function handleResponse(response) {
  if (
    response.status === 200 ||
    response.status === 201 ||
    response.status === 202 ||
    response.status === 204
  )
    return response.data;
  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

export function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}
