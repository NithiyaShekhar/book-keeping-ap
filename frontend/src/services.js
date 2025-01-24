// src/api.js or src/services.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("API_BASE_URL is not defined in your environment variables.");
}

// Generic GET request function
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // Rethrow to handle in the calling code
  }
};

// Generic POST request function
export const postData = async (endpoint, body) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error posting data: ", error);
    throw error;
  }
};

// Example function to fetch user data
export const getUsers = async () => {
  return await fetchData("/users");
};

// Example function to create a new user
export const createUser = async (userData) => {
  return await postData("/users", userData);
};

// Example function to fetch a list of books
export const getBooks = async () => {
  return await fetchData("/books");
};

// Example function to create a new book
export const createBook = async (bookData) => {
  return await postData("/books", bookData);
};

// More functions can be added as needed for other endpoints like PUT, DELETE, etc.

