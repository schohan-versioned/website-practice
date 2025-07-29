const API = process.env.REACT_APP_API;

export async function fetchUsers() {
  const res = await fetch(`${API}/users`);
  return res.json();
}

export async function fetchUserById(id) {
  const res = await fetch(`${API}/user/${id}`);
  return res.json();
}

export async function createUser(user) {
  return fetch(`${API}/createuser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
}

export async function updateUserSalary(id, salary) {
  return fetch(`${API}/updateuser/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ salary })
  });
}
