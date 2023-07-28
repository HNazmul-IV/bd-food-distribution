import React, { createContext, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase/firebase_auth";

interface IUserContext {
  user: User | null;
}
export const UserContextData = createContext<IUserContext | Record<string, never>>({});

export default function UserContext({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
  return <UserContextData.Provider value={{ user }}>{children}</UserContextData.Provider>;
}
