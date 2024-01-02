import { SupabaseClient, createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export async function signInWithDiscord(): Promise<unknown | void> {
	try {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "discord",
		});
		if (error) throw error;
		return data;
	} catch (err) {
		console.error("Failed to sign in with Discord: ", err);
	}
}

export async function signOut(): Promise<void> {
	try {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
	} catch (err) {
		console.error("Failed to sign out: ", err);
	}
}

export async function signOutLocally(): Promise<void> {
	try {
		const { error } = await supabase.auth.signOut({ scope: "local" });
		if (error) throw error;
	} catch (err) {
		console.error("Failed to sign out locally: ", err);
	}
}
