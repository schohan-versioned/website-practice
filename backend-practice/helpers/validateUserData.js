// helpers/validation.js
// Validates incoming user data to ensure required fields and formats are correct.


function validateUserData({ fn, ln, email, age, salary }) {
  if (
    typeof fn !== 'string' || fn.trim() === '' ||
    typeof ln !== 'string' || ln.trim() === '' ||
    typeof email !== 'string' || !email.includes('@') ||
    isNaN(age) || age < 0 || age > 150 ||
    isNaN(salary) || salary < 0
  ) {
    return false;
  }
  return true;
}

module.exports = {
  validateUserData,
};
