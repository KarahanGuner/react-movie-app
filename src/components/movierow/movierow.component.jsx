import React, {useState} from 'react';
import styles from './movierow.module.css';

function removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

function MovieRow(props) {
    const {year, title, image, rating, rank, id} = props;
    const [favourite, setFavourite] = useState(JSON.parse(localStorage.getItem('favourites')).includes(id));

    const toggleFavourite = () => {
        if(favourite) {
            const favourites = JSON.parse(localStorage.getItem('favourites'));
            removeItem(favourites, id);
            localStorage.setItem('favourites', JSON.stringify(favourites))
            setFavourite(!favourite);
        } else {
            const favourites = JSON.parse(localStorage.getItem('favourites'));
            favourites.push(id);
            localStorage.setItem('favourites', JSON.stringify(favourites))
            setFavourite(!favourite);
        }
    }

    return (
        <tr className={favourite ? styles.movierow : null}>
            <td className={styles.movierow__image}><img alt={title} src={`https://image.tmdb.org/t/p/w92/${image}`} width="60"/></td>
            <td><a href={`https://www.themoviedb.org/movie/${id}`} target="_blank" rel="noreferrer">{rank}. {title} ({year.slice(0,4)})</a></td>
            <td className={styles.movierow__rating}>{rating}</td>
            <td className={styles["movierow__star"]} onClick={() => toggleFavourite()}>{favourite ? '★' : '☆'}</td>
        </tr>
    )
}

export default MovieRow;
