import { useState, useEffect } from 'react';
import EditMovieModal from './edit';
export default function MovieTable() {
    const [movies, setMovies] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [editForm, setEditForm] = useState({
        Title: '',
        Description: '',
        Image: ''
    });



    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost/project/api.php');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // const handleEdit = async () => {
    //     try {
    //         const response = await fetch(`http://localhost/project/api.php?id=${editingId}`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(editForm)
    //         });
    //         if (!response.ok) throw new Error('Failed to update');
    //         setEditingId(null);
    //         fetchMovies();
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };
    const handleDelete = async (title, section) => {   // Changed from id to title
        setDeleteId(title);  // This will now store the title instead of id
        setShowConfirm(true);
        setSelectedSection(section);
    };

    const confirmDelete = async () => {
        try {
            // Encode the title for the URL to handle special characters
            const encodedTitle = encodeURIComponent(deleteId);
            const response = await fetch(`http://localhost/project/delete.php?title=${encodedTitle}&section=${selectedSection}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Failed to delete');
            fetchMovies(); // Refresh the movie list
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setShowConfirm(false);
            setDeleteId(null);
        }
    };
    const handleEdit = (movie) => {

        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
        setIsModalOpen(false);
    };

    // Rest of the component logic remains same...

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Top Movie List</h2>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this movie?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Table structure remains same */}
            <div className="table-responsive">
                <table className="table table-striped">

                    <tbody>
                        <th>Movie Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                        {movies.map((movie) => (
                            <tr key={movie.id}>
                                <td>{movie.Title}</td>
                                <td>{movie.Description}</td>
                                <td>{movie.Image}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(movie)}
                                        className="btn btn-primary btn-sm me-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(movie.Title, "top")}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <EditMovieModal
                movie={selectedMovie}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                section="top" // or "others" for other table
            />
        </div >


    );
}