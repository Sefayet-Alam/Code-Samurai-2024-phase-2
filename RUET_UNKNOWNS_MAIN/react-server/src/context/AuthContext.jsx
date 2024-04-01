import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const authToken = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  const [isSystemAdmin, setIsSystemAdmin] = useState(false);
  const [isLandfillManager, setIsLandfillManager] = useState(false);
  const [isSTSManager, setIsSTSManager] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setIsLoading(true);
    if (localStorage.getItem("token")) {
      fetch(`${backendUrl}/profile/?format=json`, {
        method: "GET",
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          fetch(`${backendUrl}/rbac/roles/${data.role}/`, {
            method: "GET",
            headers: {
              Authorization: "Token " + localStorage.getItem("token"),
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.name === "System Admin") {
                setIsSystemAdmin(true);
                setIsLoading(false);
              } else if (data.name === "Landfill Manager") {
                setIsLandfillManager(true);
                setIsLoading(false);
              } else if (data.name === "STS Manager") {
                setIsSTSManager(true);
                setIsLoading(false);
              } else {
                setIsLoading(false);
              }
            });
        });
    } else {
      setIsLoading(false);
    }
  }, [backendUrl]);

  const authData = {
    user,
    authToken,
    isSystemAdmin,
    isLandfillManager,
    isSTSManager,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
