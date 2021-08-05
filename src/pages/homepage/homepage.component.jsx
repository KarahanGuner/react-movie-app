import React, {useState} from 'react';
import styles from './homepage.module.css';
import MovieRow from '../../components/movierow/movierow.component';
import arr1 from './dummydata';

function Homepage() {
    const [descending, toggleDescending] = useState(true);
    const reverseArr1 = arr1.slice().reverse();

    const handleSort = (e) => {
        e.target.innerText === 'Rating⯆'? e.target.innerText = 'Rating⯅' : e.target.innerText = 'Rating⯆';
        toggleDescending(!descending)
    }

    return (
        <div className={styles.homepage}>  
            <table >
                <thead>
                    <tr>
                        <th className={styles.table__imageheader}></th>
                        <th>Rank & Title</th>
                        <th className={styles["table__rating"]} onClick={(e) => {handleSort(e)}}>Rating⯆</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {descending ? 
                    arr1.map((movie, index) => <MovieRow key={index} title={movie.title} image={movie.image} year={movie.year} rating={movie.rating}/>)
                    : reverseArr1.map((movie, index) => <MovieRow key={index} title={movie.title} image={movie.image} year={movie.year} rating={movie.rating}/>)
                    }
                </tbody>
            </table>
            
        </div>
    )
}

export default Homepage;