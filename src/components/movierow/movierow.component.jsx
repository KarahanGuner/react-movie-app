import React from 'react';
import styles from './movierow.module.css';

function MovieRow(props) {
    const {year, title, image, rating} = props;
    const changeStarColor = (e) => {
        e.target.innerText === '☆'? e.target.innerText = '★' : e.target.innerText = '☆';
    }

    return (
        <tr className={title == "Jaws Jaws1" ? styles.try : null}>
            <td className={styles.movierow__image}><img alt="movie poster" src={image} width="50"/></td>
            <td>{title} {year}</td>
            <td>{rating}</td>
            <td className={styles["movierow__star"]} onClick={(e) => changeStarColor(e)}>☆</td>
        </tr>
    )
}

export default MovieRow;
