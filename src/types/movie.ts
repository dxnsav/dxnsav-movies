export interface IEpisode {
	file: string;
	id: string;
	poster: string;
	subtitle?: string;
	title?: string;
}

export interface ISeason {
	golder: IEpisode[];
	title?: string;
}

export interface ISeries {
	folder: ISeason[];
	title?: string;
}

export interface Movie {
	file: string;
	poster: string;
	subtitle?: string;
}

export type ISerialData = ISeries[] | Movie;

export interface ISound {
	soundProd: string;
	soundType: string;
}

export type ISoundData = ISound[];

export interface IMovie {
	age_restriction?: string;
	age_restriction_details?: string;
	backdrop?: string;
	description?: string;
	duration?: number;
	embeddings?: number[][];
	genres?: string[];
	id: number;
	images?: string[];
	imdbId?: string;
	movie_backdrop?: string;
	movie_subtitle?: string;
	movie_type?: string;
	movie_url?: string;
	popularity?: number;
	poster?: string;
	release_year?: string;
	roles?: string[];
	serial_data?: ISerialData;
	sound?: ISoundData;
	subtitles?: string;
	title: string;
	title_en?: string;
	tmdb_id?: number;
	tortuga?: string;
	tortuga_trailer?: string;
	trailer_backdrop?: string;
	trailer_subtitle?: string;
	trailer_url?: string;
	updated_at?: Date;
}
