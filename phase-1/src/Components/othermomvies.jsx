import "./img1.css";
import { useState, useEffect } from "react";
export default function Othermovies() {

    const [movies, setMovies] = useState([
        {
            item: "The Shawshank Redemption",
            source: "https://wallpapercat.com/w/full/c/6/1/172222-1240x2618-phone-hd-the-shawshank-redemption-background-image.jpg  ",
            alt: "Image2",
            description: "Very Nice Movie"

        },
        {
            item: "The Godfather",
            source: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSel__j-uYHI7K0j9kFFq4rMpZ3kfdW1RAGag&s",
            alt: "Image1",
            description: 'THis is also very Good.'
        },
    ]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost/project/getothermovies.php');
                if (!response.ok) throw new Error('Failed to fetch movie data');
                const data = await response.json();

                const formattedData = data.map(movie => ({
                    item: movie.Item,
                    source: movie.Image,
                    alt: `Image of ${movie.Item}`,
                    description: movie.Description
                }));

                setMovies(prevImages => [...prevImages, ...formattedData]);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);



    return <>
        <div className="row d-flex mt-3 ms-3 me-3">
            {movies.map((movie, index) => (
                <div className="col-4 col-md-2 mb-4" key={index}>
                    <div className="card">
                        <img
                            src={movie.source}
                            className="card-img-top img1"
                            alt={movie.name}
                        />
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="https://www.youtube.com/">{movie.item}</a>
                            </h5>
                            <p className="card-description">{movie.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>


    </>
}