import { useState, useEffect } from 'react'
import Player, { useScript } from './../lib/Player';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '@/supabase/supaClient';
import { Button } from './ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

const WatchPage = () => {
	useScript("http://localhost:5173/playerjs.js")
	const { movieId } = useParams();
	const [watchData, setWatchData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await supabase.from('movie').select('*').eq('id', movieId).single();
			setWatchData(data);
		}
		fetchData();
	}, [movieId]);

	return (
		<div className="font-sans">
			<Player id='player' className='flex flex-col w-full h-96' title={watchData?.title} poster={watchData?.poster_url} file={watchData?.stream_url} autoPlay />
			<div id='player'></div>
			<Button variant="ghost" className='w-12 h-12 p-0 rounded-full absolute top-16'>
				<Link to='/' >
					<ArrowLeftIcon className="w-5 h-5" />
				</Link>
			</Button>
		</div>
	)
}

export default WatchPage