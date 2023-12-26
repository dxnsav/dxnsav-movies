import { supabase } from "@/supabase/supaClient";
import { Session, User } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";

export interface AuthContextType {
	session: Session | null | undefined;
	signOut: () => void;
	user: User | null | undefined;
}

export const AuthContext = createContext<AuthContextType>({
	session: null,
	signOut: () => { },
	user: null
});

export const AuthProvider = ({ children }: unknown) => {
	const [user, setUser] = useState<User>();
	const [session, setSession] = useState<Session | null>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const setData = async () => {
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession();
			if (error) throw error;
			setSession(session);
			setUser(session?.user);
			setLoading(false);
		};

		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session);
				setUser(session?.user);
				setLoading(false);
			},
		);

		setData();

		return () => {
			listener?.subscription.unsubscribe();
		};
	}, []);

	const value = {
		session,
		signOut: () => supabase.auth.signOut(),
		user,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
