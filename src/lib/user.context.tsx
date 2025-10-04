"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LogInType, UserContextType } from "./types";
import SecureLocalStorage from "react-secure-storage";
import NotificationBar from "./notificationBar";
import { useRouter } from "next/navigation";

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [notification, setNotification] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    email: "",
    firstname: "",
  });
  const [token, setToken] = useState("");

  // Detect persisted user data
  useEffect(() => {
    const loadPersistedUserData = () => {
      try {
        const loadUserData = SecureLocalStorage.getItem("user");
        if (loadUserData && typeof loadUserData === "object") {
          setUser({
            email: (loadUserData as any).email || "",
            firstname: (loadUserData as any).firstname || "",
          });
        }

        const loadUserToken = SecureLocalStorage.getItem("token");
        if (loadUserToken && typeof loadUserToken === "string") {
          setToken(loadUserToken);
        }
      } catch (error) {
        console.error("Error reading user data from browser store", error);
        // Remove probable corrupted data
        SecureLocalStorage.removeItem("user");
        SecureLocalStorage.removeItem("token");
        setNotification("Error reading user data from browser store");
      } finally {
        setIsLoading(false);
      }
    };

    loadPersistedUserData();
  }, []);

  const LogIn = useCallback<LogInType>((email, firstname, token) => {
    setUser({ email, firstname });
    setToken(token);

    try {
      SecureLocalStorage.setItem("user", {
        email,
        firstname,
      });
      SecureLocalStorage.setItem("token", token);
      console.log("User logged in", user.email);
    } catch (error) {
      console.error("Error saving user data in browser storage", error);
      setNotification("Error saving user data in browser storage");
    }
    setIsLoading(false);
  }, []);

  const LogOut = useCallback(() => {
    setUser({
      email: "",
      firstname: "",
    });
    setToken("");

    try {
      SecureLocalStorage.removeItem("user");
      SecureLocalStorage.removeItem("token");
      console.log("User logged out", user.email);
    } catch (error) {
      console.error("Error removing user data from browser storage", error);
      setNotification("Error removing user data from browser storage");
    } finally {
      setIsLoading(false);
      router.push("/welcome");
    }
  }, []);

  const value: UserContextType = useMemo(() => {
    return {
      user,
      token,
      LogIn,
      LogOut,
      isLoading,
    };
  }, [user, token, LogIn, LogOut, isLoading]);

  return (
    <UserContext.Provider value={value}>
      {notification && (
        <NotificationBar message={notification} messageType="error" />
      )}
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};

export { useUserContext };

export default UserContextProvider;
