import response from '@/store/database/db.json';

const jwt = require('jsonwebtoken');

const SECRET_KEY = 'the_secret_key';

const create = (payload) => response.users.push(payload);

const find = (payload) => response.users.find((r) => r.email === payload.email
  && r.password === payload.password);

const remove = (payload) => {
  const findUser = response.users.findIndex((r) => r.id === payload.id);
  if (findUser !== -1) response.users.splice(findUser, 1);
};

const token = (payload) => jwt.sign({ payload }, SECRET_KEY);

const update = (payload) => {
  const findUser = response.users.findIndex((r) => r.id === payload.id);
  response.users[findUser].name = payload.name;
  response.users[findUser].surname = payload.surname;
  response.users[findUser].email = payload.email;
  response.users[findUser].phone = payload.phone;
  response.users[findUser].username = payload.username;
  response.users[findUser].password = payload.password;
  response.users[findUser].active = payload.active;
};

const users = () => response.users;

const authenticateUser = (payload) => ({
  token: token(find(payload)),
  user: find(payload).email,
});

export default {
  authenticateUser,
  create,
  find,
  remove,
  token,
  update,
  users,
};
