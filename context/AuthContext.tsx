import { deleteToken, getToken, saveToken } from "@/lib/secureStore";
import React, { createContext, useContext, useState, useEffect } from "react";
// import { getToken, deleteToken, saveToken } from "@/lib/storage";

type AuthContextType = {
  user: any | null;
  login: (token: string, user: any) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  session: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(false);

  useEffect(() => {
    // check token on app start
    (async () => {
      const token = await getToken("authToken");
      console.log("authToken: ", token);
      
      if (token) {
        // Optionally call backend `/me` endpoint to fetch user
        const result = await fetchWithAuth("https://app.ed-cred.com/school/employees")
        console.log("result: ", result);
        
        setUser(result.employees.name); 
      }
      setIsLoading(false);
    })();
  }, []);

  async function fetchWithAuth(url: string) {
  const token = await getToken("authToken");

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}


  const login = async (token: string, userData: any) => {
    await saveToken("authToken", token);
    setUser(userData);
  };

  const logout = async () => {
    await deleteToken("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, session }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

export {useAuth, AuthContext, AuthProvider};