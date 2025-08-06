// src/utils/api.js
const API = process.env.REACT_APP_API;

// === USERS ===
export async function fetchUsers() {
  const res = await fetch(`${API}/users`);
  return res.json();
}

export async function fetchUserById(id) {
  const res = await fetch(`${API}/users/${id}`);
  return res.json();
}

export async function createUser(user) {
  return fetch(`${API}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
}

export async function updateUser(id, updates) {
  return fetch(`${API}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
}

export async function deleteUser(id) {
  return fetch(`${API}/users/${id}`, {
    method: 'DELETE',
  });
}

export async function searchUsers(query) {
  const res = await fetch(`${API}/users/search/${query}`);
  return res.json();
}

export async function fetchUsersByDepartment(deptId) {
  const res = await fetch(`${API}/users/filter/department/${deptId}`);
  return res.json();
}

// === DEPARTMENTS ===
export async function fetchDepartments() {
  const res = await fetch(`${API}/departments`);
  return res.json();
}

export async function fetchDepartmentById(id) {
  const res = await fetch(`${API}/departments/${id}`);
  return res.json();
}

export async function createDepartment(name) {
  return fetch(`${API}/departments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
}

export async function updateDepartment(id, name) {
  return fetch(`${API}/departments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
}

export async function deleteDepartment(id) {
  return fetch(`${API}/departments/${id}`, {
    method: 'DELETE',
  });
}

export async function fetchUsersInDepartment(deptId) {
  const res = await fetch(`${API}/departments/${deptId}/users`);
  return res.json();
}

export async function assignUsersToDepartment(deptId, userIds) {
  return fetch(`${API}/departments/${deptId}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userIds }),
  });
}
