import { createContext, useState } from "react";

const UserContext = createContext({
  currentUser: {},
  token: null,
  setUser: () => {},
  setAccessToken: (_token) => {},
  getAccessToken: () => {},
  deleteAccessToken: () => {},
});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(getAccessToken);
  // const [token, setToken] = useState(123);

  const setAccessToken = (token) => {
    setToken(token);
    const SECURE_DEFAULTS = "Secure; HttpOnly; SameSite=Strict";

    if (token) {
      document.cookie = `ACCESS_TOKEN=${token}; ${SECURE_DEFAULTS}`;
      console.log("[setAccessToken]", document.cookie);
      return;
    }
    deleteAccessToken();
    console.log("[setAccessToken]", document.cookie);
  };

  function deleteAccessToken() {
    document.cookie = `ACCESS_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly; SameSite=Strict`;
  }

  function getAccessToken() {
    const cookieString = document.cookie;
    const startIdx = cookieString.indexOf("ACCESS_TOKEN=");

    if (startIdx === -1) {
      return undefined;
    }

    let endIdx = cookieString.indexOf(";", startIdx);

    if (endIdx === -1) {
      endIdx = cookieString.length;
    }

    return cookieString.substring(startIdx + "ACCESS_TOKEN=".length, endIdx);
  }

  const context = {
    user,
    token,
    setUser,
    setAccessToken,
    getAccessToken,
    deleteAccessToken,
  };

  return (
    <UserContext.Provider value={context}>
      <>{children}</>
    </UserContext.Provider>
  );
}

export default UserContext;
