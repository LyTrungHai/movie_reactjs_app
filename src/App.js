import { useEffect, useState } from 'react';
// 2d63a972

import './App.css';
import SearchIcon from './search.svg';
import { useForm } from 'react-hook-form';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=2d63a972';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [keyword, setKeyword] = useState('Batman');

	const { handleSubmit, register } = useForm();

	const onSubmit = (data) => setKeyword(data.search);

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`);
		const data = await response.json();
		setMovies(data.Search);
	};

	useEffect(() => {
		searchMovies(keyword);
	}, [keyword]);

	return (
		<div className='app'>
			<h1>MovieFast</h1>
			<div className='search'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input autoComplete='off' placeholder='Search for movies' {...register('search')} />
					<img src={SearchIcon} alt='search-icon' />
				</form>
			</div>

			{movies?.length ? (
				<div className='container'>
					{movies.map((movie) => (
						<MovieCard movie={movie} key={movie.imdbID} />
					))}
				</div>
			) : (
				<div>
					<h2>No movies found</h2>
				</div>
			)}
		</div>
	);
};
export default App;
