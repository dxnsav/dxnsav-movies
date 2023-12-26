import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { useContext } from "react";

export const useAuth = (): AuthContextType => {
	return useContext<AuthContextType>(AuthContext);
};
