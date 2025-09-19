import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider/AuthContext";

export const useAuth = () => useContext(AuthContext);
