const axios = require('axios');

//call login api to get all users
async function getFirstUserName() {
  const response = await axios.get('http://localhost:4201/user/login');
  return response.data[0].name;
}

module.exports = getFirstUserName;