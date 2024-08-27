import { getEnvVars } from "expo-env";

const { API_URI } = getEnvVars();

export function handleRegister(userToRegister) {
  const {
    firstName: first_name,
    lastName: last_name,
    username,
    password,
    email,
    conditions,
    bodyMeasurements: body_measurements,
    providerCode: provider_code,
  } = userToRegister;

  fetch(`"${API_URI}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name,
      last_name,
      username,
      password,
      email,
      conditions,
      body_measurements,
      provider_code,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function handleLogin(email, password) {
  return fetch("http://192.168.1.24:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: email,
      password: password,
      phoneNumber: "1234567890",
      email: email,
    }),
  })
    .then((response) => response.text()) // Use text() instead of json()
    .then((data) => {
      console.log(data);
      return data; // Return the string data
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
export async function handleFood_search(ingr, brand) {
  try {
    const url = new URL("http://192.168.1.24:5000/api/food_search");
    const params = { ingr, brand };
    console.log(params);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Use text() to get the response as a string

    return data; // Return the string data
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function handleFood_request_nutrients(ingr) {
  try {
    const url = new URL("http://192.168.1.24:5000/api/food_search");
    const params = { ingr };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text(); // Use text() to get the response as a string
    console.log(data);
    return data; // Return the string data
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
