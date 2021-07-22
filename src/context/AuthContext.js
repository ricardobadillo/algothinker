import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

let userObj = {
  loggedIn: false,
  fullname: "",
  email: "",
  profilePicture: "",
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN":
      const { email, fullname, profilePicture } = action.user;
      const token = action.token;

      action.user.loggedIn = true;

      localStorage.setItem("algothinker_user", JSON.stringify(action.user));
      localStorage.setItem("algothinker_token", JSON.stringify(token));

      return { loggedIn: true, fullname, email, profilePicture };
    case "LOG_OUT":
      localStorage.removeItem("algothinker_user");
      localStorage.removeItem("algothinker_token");

      return { loggedIn: false, username: "", email: "", profilePicture: "" };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(userReducer, userObj, () => {
    let storedUser = localStorage.getItem("algothinker_user");

    return !storedUser ? userObj : JSON.parse(storedUser);
  });

  return (
    <AuthContext.Provider value={{ user, dispatchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
