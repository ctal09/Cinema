import { useState, useEffect } from 'react';

const EditMovieModal = ({ movie, isOpen, onClose, section }) => {
    // Initialize form data with empty values
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        url: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Update form data when movie prop changes
    useEffect(() => {
        if (movie) {
            setFormData({
                title: movie.Title || '' || movie.Item,
                description: movie.Description || '',
                url: movie.Image || ''
            });
        }
    }, [movie]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost/project/edit_movie.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldTitle: movie.Title || movie.Item, // Send the original title to identify the movie
                    title: formData.title,
                    description: formData.description,
                    url: formData.url,
                    section: section
                })
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                onClose();
                window.location.reload(); // Refresh the page to show updated data
            }
        } catch (err) {
            setError(err.message || 'Failed to update movie');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Movie</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleUpdate}>
                            <div className="mb-3">
                                <label className="form-label">Movie Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description:</label>
                                <textarea
                                    className="form-control"
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image URL:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.url}
                                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditMovieModal;