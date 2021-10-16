import router from '@/router/index';

import GettersUtility from '@/store/utilities/getters';
import MutationsUtility from '@/store/utilities/mutations';
import service from '@/store/config/server';

const M_SET_CLEAR = 'Reset';
const M_SET_DATA = 'SetData';
const M_SET_ERROR_MESSAGE = 'SetErrorMessage';
const M_SET_IS_LOADING = 'SetIsLoading';
const M_SET_IS_LOGGED_IN = 'SetIsLoggedIn';
const M_SET_USER_DATA = 'SetUserData';
const M_SET_TOKEN = 'SetToken';
const M_SET_USER = 'SetUser';

const DATA = 'data';
const ERROR_MESSAGE = 'errorMessage';
const SV_IS_LOADING = 'isLoading';
const SV_IS_LOGGED_IN = 'isLoggedIn';
const USER_DATA = 'userData';
const TOKEN = 'token';
const USER = 'user';

const initialState = () => ({
  [DATA]: null,
  [ERROR_MESSAGE]: null,
  [SV_IS_LOADING]: false,
  [SV_IS_LOGGED_IN]: false,
  [USER_DATA]: null,
  [TOKEN]: null,
  [USER]: null,
});

const actions = {
  Create: async (context, payload) => {
    context.commit(M_SET_IS_LOADING, true);

    Promise.resolve(service.create(payload))
      .then((response) => {
        console.log(response);
        context.dispatch('Load');
      })
      .catch(() => {
        throw Error('Could not create data');
      })
      .finally(() => {
        context.commit(M_SET_IS_LOADING, false);
      });
  },
  Delete: async (context, payload) => {
    context.commit(M_SET_IS_LOADING, true);

    Promise.resolve(service.remove(payload))
      .then((response) => {
        console.log(response);
        context.dispatch('Load');
      })
      .catch(() => {
        throw Error('Could not update data');
      })
      .finally(() => {
        context.commit(M_SET_IS_LOADING, false);
      });
  },
  Update: async (context, payload) => {
    context.commit(M_SET_IS_LOADING, true);

    Promise.resolve(service.update(payload))
      .then((response) => {
        console.log(response);
        context.dispatch('Load');
      })
      .catch(() => {
        throw Error('Could not update data');
      })
      .finally(() => {
        context.commit(M_SET_IS_LOADING, false);
      });
  },
  Load: async (context) => {
    context.commit(M_SET_IS_LOADING, true);
    context.commit(M_SET_DATA, null);

    Promise.resolve(service.users())
      .then((response) => {
        context.commit(M_SET_DATA, response);
      })
      .catch(() => {
        throw Error('Could not update data');
      })
      .finally(() => {
        context.commit(M_SET_IS_LOADING, false);
      });
  },
  Login: async (context, payload) => {
    context.commit(M_SET_IS_LOADING, true);
    context.commit(M_SET_ERROR_MESSAGE, null);
    context.commit(M_SET_IS_LOGGED_IN, false);
    context.commit(M_SET_USER, null);
    context.commit(M_SET_TOKEN, null);

    Promise.resolve(service.authenticateUser(payload))
      .then((response) => {
        context.commit(M_SET_USER, response.user);
        context.commit(M_SET_TOKEN, response.token);
        context.commit(M_SET_IS_LOGGED_IN, true);
        router.push({ name: 'Admin' });
        localStorage.setItem('token', JSON.stringify(response.token));
      })
      .catch(() => {
        context.commit(M_SET_ERROR_MESSAGE, 'Invalid Email/Password!');
      })
      .finally(() => {
        context.commit(M_SET_IS_LOADING, false);
      });
  },
  SignOut: async (context) => {
    context.commit(M_SET_USER_DATA, null);
    context.commit(M_SET_USER, null);
    context.commit(M_SET_TOKEN, null);
    context.commit(M_SET_IS_LOGGED_IN, false);
    router.push({ name: 'Landing' });
  },
};

const getters = {
  Data: GettersUtility.get(DATA),
  ErrorMessage: GettersUtility.get(ERROR_MESSAGE),
  IsLoading: GettersUtility.get(SV_IS_LOADING),
  IsLoggedIn: GettersUtility.get(SV_IS_LOGGED_IN),
  Token: GettersUtility.get(TOKEN),
  UserData: GettersUtility.get(USER_DATA),
  User: GettersUtility.get(USER),
};

const mutations = {
  [M_SET_CLEAR]: (stateP) => {
    const localState = stateP;
    Object.assign(localState, initialState());
  },
  [M_SET_DATA]: MutationsUtility.set(DATA),
  [M_SET_ERROR_MESSAGE]: MutationsUtility.set(ERROR_MESSAGE),
  [M_SET_USER_DATA]: MutationsUtility.set(USER_DATA),
  [M_SET_IS_LOADING]: MutationsUtility.set(SV_IS_LOADING),
  [M_SET_IS_LOGGED_IN]: MutationsUtility.set(SV_IS_LOGGED_IN),
  [M_SET_TOKEN]: MutationsUtility.set(TOKEN),
  [M_SET_USER]: MutationsUtility.set(USER),
};

const state = initialState();

export default {
  actions,
  getters,
  mutations,
  state,
};
