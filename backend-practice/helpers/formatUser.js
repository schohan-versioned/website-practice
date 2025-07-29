// helpers/formatting.js

function formatUser(raw) {
  return {
    id: raw.id,
    name: `${raw.fn} ${raw.ln}`,
    email: raw.email,
    age: raw.age,
    salary: `$${Number(raw.salary).toFixed(2)}`
  };
}

module.exports = {
  formatUser,
};
