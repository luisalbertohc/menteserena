import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: `${process.env.NEXT_PUBLIC_USERPOOL_ID}`,
  ClientId: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
};

const userPool: CognitoUserPool = new CognitoUserPool(poolData);

let currentUser: any = userPool.getCurrentUser();

export const getCurrentUser = () => {
  return currentUser;
};

const getCognitoUser = (username: string) => {
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  return cognitoUser;
};

export const getSession = async (): Promise<CognitoUserSession> => {
  if (!currentUser) {
    currentUser = userPool.getCurrentUser();
  }

  return new Promise((resolve, reject) => {
    currentUser.getSession((err: any, session: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(session);
      }
    });
  }).catch(err => {
    throw err;
  }) as Promise<CognitoUserSession>;
};

export const signUpUserWithEmail = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  is_provider: boolean,
  terms_of_services: boolean
) => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'custom:first_name',
        Value: first_name,
      }),
      new CognitoUserAttribute({
        Name: 'custom:last_name',
        Value: last_name,
      }),
      new CognitoUserAttribute({
        Name: 'custom:is_provider',
        Value: String(is_provider),
      }),
      new CognitoUserAttribute({
        Name: 'custom:terms_of_services',
        Value: String(terms_of_services),
      }),
    ];

    userPool.signUp(email, password, attributeList, [], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  }).catch(err => {
    throw err;
  });
};

export const signInWithEmail = async (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    currentUser = getCognitoUser(username);

    currentUser.authenticateUser(authenticationDetails, {
      onSuccess: (res: any) => {
        resolve(res);
      },
      onFailure: (err: any) => {
        reject(err);
      },
    });
  }).catch(err => {
    throw err;
  });
};

export const signOut = () => {
  if (currentUser) {
    currentUser.signOut();
  }
};

export async function getAttributes() {
  return new Promise(function (resolve, reject) {
    currentUser.getUserAttributes(function (err: any, attributes: any) {
      if (err) {
        reject(err);
      } else {
        resolve(attributes);
      }
    });
  }).catch(err => {
    throw err;
  });
}

export const setAttribute = async (attribute: any) => {
  return new Promise((resolve, reject) => {
    const attributeList = [];
    const res = new CognitoUserAttribute(attribute);
    attributeList.push(res);

    currentUser.updateAttributes(attributeList, (err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  }).catch(err => {
    throw err;
  });
};

export const sendCode = async (username: string) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getCognitoUser(username);

    if (!cognitoUser) {
      reject(`could not find ${username}`);
      return;
    }

    cognitoUser.forgotPassword({
      onSuccess: res => {
        resolve(res);
      },
      onFailure: err => {
        reject(err);
      },
    });
  }).catch(err => {
    throw err;
  });
};

export const forgotPassword = async (username: string, code: string, password: string) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getCognitoUser(username);

    if (!cognitoUser) {
      reject(`could not find ${username}`);
      return;
    }

    cognitoUser.confirmPassword(code, password, {
      onSuccess: () => {
        resolve('password updated');
      },
      onFailure: err => {
        reject(err);
      },
    });
  });
};
