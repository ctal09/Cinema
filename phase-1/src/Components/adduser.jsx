import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "./modal";

export default function SignupModal({ isOpen, onClose }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch('http://localhost/project/adduser.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Failed to connect to server');
            }

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                alert('User added successfully!');
                onClose();
                window.location.reload();
            }
        } catch (err) {
            setError(err.message || 'Failed to connect to server');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
                <div className="bg-white p-4 rounded shadow w-25">
                    <h2 className="mb-3">Sign Up</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-control"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}