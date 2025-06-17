import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import PocketBase from "pocketbase";

const PocketContext = createContext({});

export const PocketProvider = ({ children }) => {
  const URL_BASE = useMemo(()=> import.meta.env.VITE_POCKETBASE || "http://127.0.0.1:8090")
  const pb = useMemo(() => new PocketBase(URL_BASE), []);

  const [token, setToken] = useState(pb.authStore.token);
  const [user, setUser] = useState(pb.authStore.record);

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token);
      setUser(model);
    });
  }, []);

  const logout = useCallback(() => {
    pb.authStore.clear()
  }, []);

  return (
    <PocketContext.Provider
      value={{user, token, pb, logout, URL_BASE}}
    >
      {children}
    </PocketContext.Provider>
  );
};

export const usePocket = () => useContext(PocketContext);