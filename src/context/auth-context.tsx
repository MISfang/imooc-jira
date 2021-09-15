import { Users } from "pages/List/Search";
import { useState, createContext, useContext, ReactNode } from "react";
import * as auth from "./auth-provider";
import { http } from "utils/http";
import { useMount } from "utils/customHook";

interface AuthForm {
  username: string;
  password: string;
}

const AuthContext = createContext<
  | {
      user: Users | null;
      onLogin: (form: AuthForm) => Promise<void>;
      Register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Users | null>(null);

  const onLogin = (from: AuthForm) => auth.onLogin(from).then(setUser);

  const Register = (from: AuthForm) => auth.Register(from).then(setUser);

  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    bootstarpUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, onLogin, Register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth只能在AuthProvider中使用");
  }
  return context;
};

const bootstarpUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};
