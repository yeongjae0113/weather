import { User } from "firebase/auth";
import { createContext } from "react";

export interface IUser {
  user: User | null
  accessToken?: string
}

export const AuthContext = createContext<IUser | null>(null)