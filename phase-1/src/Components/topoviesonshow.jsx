import './img.css';
import { useState } from 'react';
import { useEffect } from 'react';
export default function Slider() {
    const [images, setImages] = useState([
        {
            item: "Iron Man",
            source: "/Images/topmovies/ironman.webp",
            alt: "Image1",
            description: "Next Generation of Ironman."
        },
        {
            item: "Bat Man",
            source: "/Images/topmovies/batman.webp",
            alt: "Image2",
            description: "Do you wanna build a snow man?"
        },
        {
            item: "SuperMan",
            source: "/Images/topmovies/superman.webp",
            alt: "Image3",
            description: "Some representative placeholder content for the third slide."
        }
    ]);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost/project/api.php');
                if (!response.ok) throw new Error('Failed to fetch movie data');
                const data = await response.json();

                const formattedData = data.map(movie => ({
                    item: movie.Title,
                    source: movie.Image,
                    alt: `Image of ${movie.Title}`,
                    description: movie.Description
                }));

                setImages(prevImages => [...prevImages, ...formattedData]);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);


    return (
        <>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleAutoplaying"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner  ">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                        >
                            <img src={image.source} className="d-block w-100 img" alt={image.alt} />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{image.item}</h5>
                                <p>{image.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    );
}
