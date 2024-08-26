const API_BASE_URL = 'http://127.0.0.1:8000';

export function handleRegister(name, password, phoneNumber, email) {
  fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: name,
      password: password,
      phoneNumber: phoneNumber,
      email: email,
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
  return fetch(`${API_BASE_URL}/auth/login`, {
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

export async function handleFood_search(ingredient, brand = '') {
  try {
    console.log("Fetching food data for query:", ingredient);

    const url = new URL(`${API_BASE_URL}/food/search`);
    const params = { ingredient };

    if (brand) {
      params.brand = brand;
    }

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

    const data = await response.json();
    
    data.data.all.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, JSON.stringify(item, null, 2));
    });

    return data;
  } catch (error) {
    console.error("Error during API call:", error);
    return null;
  }
}



export async function handleFood_request_nutrients(ingr) {
  try {
    const url = new URL(`${API_BASE_URL}/food/nutrients`); 
    const params = { ingr };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    const response = await fetch(url, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params), 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); 

    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

