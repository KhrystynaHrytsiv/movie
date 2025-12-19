
// getAll: createAsyncThunk(
//     'movies/getAll',
//     async (_, {getState}) => {
//         const {filters} = getState() as RootState;
//
//         const params: any = {
//             page: 1,
//             with_genres: filters.genreId,
//             vote_average_gte: filters.rating,
//         };
//
//         if (filters.type === 'movie') {
//             params.primary_release_year = filters.year;
//         } else {
//             params.first_air_date_year = filters.year;
//         }
//
//         return movieService.getAll(filters.type, params);
//     }
// )
//
// const Filters = () => {
//     const dispatch = useAppDispatch();
//     const {movies} = useAppSelector(state => state.movies);
//
//     // 🟢 роки з усіх фільмів
//     const years = useMemo(() => {
//         return Array.from(
//             new Set(
//                 movies
//                     .map(m => m.release_date || m.first_air_date)
//                     .map(d => d?.split('-')[0])
//                     .filter(Boolean)
//             )
//         ).sort((a, b) => Number(b) - Number(a));
//     }, [movies]);
//
//     return (
//         <div className={css.filters}>
//
//             {/* GENRE */}
//             <select onChange={e => dispatch(filtersActions.setGenre(Number(e.target.value) || undefined))}>
//                 <option value="">All genres</option>
//                 {/* genres.map */}
//             </select>
//
//             {/* YEAR */}
//             <select onChange={e => dispatch(filtersActions.setYear(Number(e.target.value) || undefined))}>
//                 <option value="">All years</option>
//                 {years.map(year => (
//                     <option key={year} value={year}>{year}</option>
//                 ))}
//             </select>
//
//             {/* RATING */}
//             <select onChange={e => dispatch(filtersActions.setRating(Number(e.target.value) || undefined))}>
//                 <option value="">All ratings</option>
//                 {[9, 8, 7, 6, 5].map(r => (
//                     <option key={r} value={r}>{r}+</option>
//                 ))}
//             </select>
//
//             {/* APPLY */}
//             <button onClick={() => dispatch(movieActions.getAll())}>
//                 Apply
//             </button>
//
//         </div>
//     );
// };
//
// <button onClick={() => {
//     dispatch(filtersActions.setType('movie'));
//     dispatch(movieActions.getAll());
// }}>
//     Movies
// </button>
//
// <button onClick={() => {
//     dispatch(filtersActions.setType('tv'));
//     dispatch(movieActions.getAll());
// }}>
//     TV Shows
// </button>


