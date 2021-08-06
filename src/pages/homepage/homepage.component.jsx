import React, {useState, useEffect} from 'react';
import styles from './homepage.module.css';
import MovieRow from '../../components/movierow/movierow.component';
import Spinner from '../../components/spinner/spinner.component';

const numberOfPages = 25; //change the numberOfPages to get more or less movies.
const moviesPerPage = 20; //amount of movies api sends per page
const pages = []
for(let i = 1; i < numberOfPages+1; i++){
    pages.push(i);
}

if(!localStorage.getItem('favourites')) {
    localStorage.setItem('favourites', JSON.stringify([]));
}


function Homepage() {
    const [descending, toggleDescending] = useState(true);
    const [loading, setLoading] = useState(true); 
    const [movies, setMovies] = useState([]);
    const [reverseMovies, setReverseMovies] = useState([]);

    useEffect(() => {
        Promise.all(pages.map(pageNumber => ( 
           fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=<<api-key>>&language=en-US&page=${pageNumber}`).then(
               response => response.json()).catch(e => console.log(e))
        ))).then(data => {
           const moviesSpread = [];
           //taking data of each movie and putting them into one big array
           for(let i = 0; i < numberOfPages ; i++){
               for(let j = 0; j < moviesPerPage; j++){ 
                    moviesSpread.push(data[i].results[j]);
               }
           } 
           setMovies(moviesSpread);
           setReverseMovies(moviesSpread.slice().reverse());
           setLoading(false);
        }).catch(e => console.log(e))
    }, []);

    const handleSort = (e) => {
        e.target.innerText === 'Rating▼'? e.target.innerText = 'Rating▲' : e.target.innerText = 'Rating▼';
        toggleDescending(!descending)
    }

    return (
        <div className={styles.homepage}>
            {loading ? <Spinner/> :
                <table >
                    <thead>
                        <tr>
                            <th className={styles.table__imageheader}></th>
                            <th>Rank & Title</th>
                            <th className={styles["table__rating"]} onClick={(e) => {handleSort(e)}}>Rating▼</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {descending ? 
                        movies.map((movie, index) => (
                            <MovieRow 
                                key={index} 
                                rank={index+1} 
                                id={movie.id} 
                                title={movie.title} 
                                image={movie.poster_path} 
                                year={movie.release_date} 
                                rating={movie.vote_average} />))
                        : reverseMovies.map((movie, index) => (
                            <MovieRow 
                                key={500+index} 
                                rank={500-index} 
                                id={movie.id}  
                                title={movie.title} 
                                image={movie.poster_path} 
                                year={movie.release_date} 
                                rating={movie.vote_average} />))
                        }
                    </tbody>
                </table>
            }  
        </div>
    )
}

export default Homepage;