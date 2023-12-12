import { supabase } from '@/supabase/supaClient';

export const fetchSearchData = async (table, conditions) => {
	let query = supabase.from(table).select("*");

	if (conditions.length > 1) {
		const orCondition = conditions
			.map((cond) => `${cond.field}.ilike.%${cond.term}%`)
			.join(",");
		query = query.or(orCondition);
	} else {
		const condition = conditions[0];
		query = query.ilike(condition.field, `%${condition.term}%`);
	}

	query = query.order("release_date", { ascending: false });

	const { data, error } = await query;

	if (error) {
		throw error;
	}
	return data;
};