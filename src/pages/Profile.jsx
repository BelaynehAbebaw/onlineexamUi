
import { useEffect, useState } from 'react';
import { updateUser } from '../services/user.js';

function Profile() {

    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    // =========================
    // LOAD LOGGED-IN USER
    // =========================

    useEffect(() => {

        const storedUser =
            JSON.parse(localStorage.getItem('user'));

        if (storedUser) {

            setUser(storedUser);

            setFormData({
                name: storedUser.name || '',
                email: storedUser.email || '',
                password: ''
            });

        }

        setLoading(false);

    }, []);


    // =========================
    // AUTO HIDE MESSAGE
    // =========================

    useEffect(() => {

        if (!message) return;

        const timer = setTimeout(() => {
            setMessage('');
        }, 3000);

        return () => clearTimeout(timer);

    }, [message]);


    // =========================
    // HANDLE CHANGE
    // =========================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // =========================
    // UPDATE PROFILE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!user?.id) {

            setError('User information not found.');

            return;

        }

        setSaving(true);
        setMessage('');
        setError('');

        try {

            const updateData = {
                name: formData.name,
                email: formData.email
            };


            // Only update password if entered

            if (formData.password.trim() !== '') {

                updateData.password =
                    formData.password;

            }


            await updateUser(
                user.id,
                updateData
            );


            // Update local user information

            const updatedUser = {
                ...user,
                name: formData.name,
                email: formData.email
            };

            localStorage.setItem(
                'user',
                JSON.stringify(updatedUser)
            );

            setUser(updatedUser);

            setFormData({
                ...formData,
                password: ''
            });

            setMessage(
                'Profile updated successfully.'
            );

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                'Failed to update profile.'
            );

        } finally {

            setSaving(false);

        }

    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <div className="text-center py-5">

                <div
                    className="spinner-border text-primary"
                    role="status"
                ></div>

                <div className="mt-2">
                    Loading profile...
                </div>

            </div>

        );

    }


    // =========================
    // NO USER
    // =========================

    if (!user) {

        return (

            <div className="alert alert-danger">

                User information not found.
                Please login again.

            </div>

        );

    }


    return (

        <div>

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="page-header">

                <div>

                    <h2>Profile</h2>

                    <p>
                        Manage your account information.
                    </p>

                </div>

            </div>


            {/* =========================
                SUCCESS MESSAGE
            ========================= */}

            {message && (

                <div className="alert alert-success">

                    <i className="bi bi-check-circle me-2"></i>

                    {message}

                </div>

            )}


            {/* =========================
                ERROR MESSAGE
            ========================= */}

            {error && (

                <div className="alert alert-danger">

                    <i className="bi bi-exclamation-triangle me-2"></i>

                    {error}

                </div>

            )}


            <div className="row">


                {/* =========================
                    PROFILE CARD
                ========================= */}

                <div className="col-lg-8">

                    <div className="card">

                        <div className="card-header">

                            <h5 className="mb-0">

                                <i className="bi bi-person-circle me-2"></i>

                                Account Information

                            </h5>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="card-body">


                                {/* NAME */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Full Name

                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* EMAIL */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Email

                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* PASSWORD */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        New Password

                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Leave blank to keep current password"
                                    />

                                    <small className="text-muted">

                                        Leave this field empty if you do not
                                        want to change your password.

                                    </small>

                                </div>


                                {/* ROLE */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Role

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.role || ''}
                                        disabled
                                    />

                                </div>


                            </div>


                            {/* =========================
                                FOOTER
                            ========================= */}

                            <div className="card-footer text-end">

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={saving}
                                >

                                    {saving ? (

                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>

                                            Updating...
                                        </>

                                    ) : (

                                        <>
                                            <i className="bi bi-check-lg me-2"></i>

                                            Update Profile
                                        </>

                                    )}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>


                {/* =========================
                    PROFILE SUMMARY
                ========================= */}

                <div className="col-lg-4">

                    <div className="card">

                        <div className="card-body text-center">

                            <div
                                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                                style={{
                                    width: '90px',
                                    height: '90px',
                                    fontSize: '36px'
                                }}
                            >

                                {formData.name
                                    ?.charAt(0)
                                    ?.toUpperCase()}

                            </div>


                            <h5>
                                {formData.name}
                            </h5>


                            <p className="text-muted mb-2">

                                {formData.email}

                            </p>


                            <span className="badge bg-secondary">

                                {user.role}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;
