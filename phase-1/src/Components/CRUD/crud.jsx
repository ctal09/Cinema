import { useState } from 'react';
import MovieTable from './topmovietable';
import MovieTable1 from './other_movietable';


const MovieForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        url: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (section) => {
        setLoading(true);
        setError('');

        // Check if all fields are filled
        if (!formData.title || !formData.description || !formData.url) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost/project/api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    url: formData.url,
                    section: section
                })
            });

            // First check if response exists
            if (!response) {
                throw new Error('No response from server');
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response format');
            }

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                // Clear form on success
                setFormData({ title: '', description: '', url: '' });
                alert('Movie added successfully!');
                window.location.reload();
            }
        } catch (err) {
            setError(err.message || 'Failed to connect to server');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Add Movie Details</h2>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className="mb-3">
                <label className="form-label">Movie Name:</label>
                <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter movie name"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Description:</label>
                <textarea
                    className="form-control"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter movie description"
                    rows="3"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Image URL:</label>
                <input
                    type="text"
                    className="form-control"
                    value={formData.url}
                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="Enter image URL"
                />
            </div>

            <div className="d-flex justify-content-center gap-3">
                <button
                    className="btn btn-primary"
                    onClick={() => handleSubmit('top')}
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Movie in Top Section'}
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => handleSubmit('others')}
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Movie in Others Section'}
                </button>
            </div>






            {/* // Table Now */}
            <div className="container mt-5">

                <MovieTable />
            </div>



            <div className="container mt-5">

                <MovieTable1 />
            </div>
        </div>
    );
};

export default MovieForm;