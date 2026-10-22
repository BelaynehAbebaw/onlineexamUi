import { useEffect, useState } from 'react';

import DataTable from '../component/DataTable.jsx';

import { registerUser, fetchUsers, updateUser, deleteUser } from '../services/user.js';
function Users() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
    const loadUsers = async () => {
        try {
            setLoading(true);
            setError('');

            const data = await fetchUsers();
            console.log('Fetched users:', data);
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                setUsers([]);
                console.warn('Users API did not return an array:', data);
            }
        } catch (err) {

            console.error('Load users error:', err);
            setError(
                err.message || 'Failed to load users.'
            );
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        loadUsers();

    }, []);
    useEffect(() => {

        if (!message) {
            return;
        }

        const timer = setTimeout(() => {
            setMessage('');
        }, 3000);

        return () => clearTimeout(timer);

    }, [message]);
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };
    const openAddModal = () => {
        setSelectedUser(null);
        setFormData({
            name: '',
            email: '',
            password: '',
            username: '',
            confirmPassword: '',
            role: ''
        });
        setMessage('');
        setError('');
        setShowModal(true);
    };
    const openEditModal = (user) => {

        console.log('Editing user:', user);
        setSelectedUser(user);
        setFormData({
            name: user.name || '',
            email: user.email || '',
            password: '',
            role: user.role || 'STUDENT'
        });

        setMessage('');
        setError('');

        setShowModal(true);

    };
    const closeModal = () => {

        if (saving) {
            return;
        }

        setShowModal(false);
        setSelectedUser(null);

        setFormData({
            name: '',
            email: '',
            password: '',
            username: '',
            confirmPassword: '',
            role: 'STUDENT',
            status: 'ACTIVE'

        });

        setError('');

    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (saving) {
            return;
        }

        setSaving(true);
        setMessage('');
        setError('');

        try {

            if (selectedUser) {

                const updateData = {
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    username: formData.username.trim(),
                    confirmPassword: formData.confirmPassword.trim(),
                    role: formData.role,
                    status: formData.status || 'ACTIVE'
                };
                if (formData.password.trim() !== '') {

                    updateData.password =
                        formData.password.trim();

                }
                console.log(
                    'Updating user:',
                    selectedUser.id,
                    updateData
                );
                await updateUser(
                    selectedUser.id,
                    updateData
                );
                await loadUsers();


                setMessage(
                    'User updated successfully.'
                );

            }
            else {

                const createData = {
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    username: formData.username.trim(),
                    password: formData.password.trim(),
                    confirmPassword: formData.confirmPassword.trim(),
                    role: formData.role,
                    status: formData.status || 'ACTIVE'
                };
                console.log(
                    'Creating user:',
                    createData
                );
                await registerUser(createData);
                await loadUsers();
                setMessage(
                    'User created successfully.'
                );
            }
            setShowModal(false);
            setSelectedUser(null);
            setFormData({
                name: '', email: '', password: '', role: '', confirmPassword: '', username: '', status: 'ACTIVE'
            });
        } catch (err) {
            console.error(
                'Save user error:',
                err
            );
            setError(
                err.message ||
                (
                    selectedUser ? 'Failed to update user.' : 'Failed to create user.'
                )
            );
        } finally {
            setSaving(false);
        }
    };
    const openDeleteConfirmation = (user) => {

        console.log(
            'Delete confirmation for:',
            user
        );
        setSelectedUser(user);
        setError('');
        setMessage('');
        setShowDeleteModal(true);
    };

    const closeDeleteConfirmation = () => {

        if (deleting) {
            return;
        }

        setShowDeleteModal(false);
        setSelectedUser(null);

        setError('');

    };


    // =========================================================
    // DELETE USER
    // =========================================================

    const handleDelete = async () => {

        if (!selectedUser || deleting) {
            return;
        }

        setDeleting(true);
        setError('');
        setMessage('');

        try {

            console.log(
                'Deleting user ID:',
                selectedUser.id
            );


            await deleteUser(
                selectedUser.id
            );


            // Reload database data

            await loadUsers();


            setMessage(
                `User "${selectedUser.name}" deleted successfully.`
            );


            setShowDeleteModal(false);
            setSelectedUser(null);

        } catch (err) {

            console.error(
                'Delete user error:',
                err
            );

            setError(
                err.message ||
                'Failed to delete user.'
            );

        } finally {

            setDeleting(false);

        }

    };


    // =========================================================
    // SEARCH USERS
    // =========================================================
console.log('Users:', users);
    const filteredUsers = users.filter((user) => {

        const searchText =
            search.trim().toLowerCase();

        if (!searchText) {
            return true;
        }

        return (

            user.name
                ?.toLowerCase()
                .includes(searchText)

            ||

            user.email
                ?.toLowerCase()
                .includes(searchText)

            ||

            user.role
                ?.toLowerCase()
                .includes(searchText)
     || user.username
                ?.toLowerCase()
                .includes(searchText)
                || user.status
                ?.toLowerCase()
                .includes(searchText
                ))
       

    });
    const columns = [



        {
            key: 'name',
            label: 'User',

            render: (user) => (

                <div className="d-flex align-items-center">

                    <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                        style={{
                            width: '40px',
                            height: '40px',
                            minWidth: '40px'
                        }}
                    >

                        {user.name
                            ?.charAt(0)
                            ?.toUpperCase() || '?'}

                    </div>


                    <strong>
                        {user.name || 'N/A'}
                    </strong>

                </div>

            )
        },


      
          {
            key: 'username',
            label: 'Username',

            render: (user) => (
                <span>
                    {user.username || 'N/A'}
                </span>
            )
        },
          {
            key: 'status',
            label: 'Status',

            render: (user) => (
                <span>
                    {user.status || 'N/A'}
                </span>
            )
        },


        {
            key: 'role',
            label: 'Role',

            render: (user) => {

                let badgeClass = 'bg-secondary';

                if (user.role === 'ADMIN') {
                    badgeClass = 'bg-danger';
                }

                if (user.role === 'TEACHER') {
                    badgeClass = 'bg-primary';
                }

                if (user.role === 'STUDENT') {
                    badgeClass = 'bg-success';
                }

                return (

                    <span
                        className={`badge ${badgeClass}`}
                    >
                        {user.role || 'STUDENT'}
                    </span>

                );

            }
        }

    ];

    return (

        <div>

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="page-header">

                <div>

                    <h2>
                        User Management
                    </h2>

                    <p>
                        Manage students, teachers and administrators.
                    </p>

                </div>


                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={openAddModal}
                    disabled={saving}
                >

                    <i className="bi bi-person-plus me-2"></i>

                    Add User

                </button>

            </div>


            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {message && (

                <div
                    className="alert alert-success alert-dismissible"
                    role="alert"
                >

                    <i className="bi bi-check-circle me-2"></i>

                    {message}

                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setMessage('')}
                    ></button>

                </div>

            )}


            {/* =================================================
            {error && !showModal && !showDeleteModal && (

                <div
                    className="alert alert-danger alert-dismissible"
                    role="alert"
                >

                    <i className="bi bi-exclamation-triangle me-2"></i>

                    {error}

                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setError('')}
                    ></button>

                </div>

            )}


            {/* =================================================
            <div className="card mb-3">

                <div className="card-body">

                    <div className="input-group">

                        <span className="input-group-text">

                            <i className="bi bi-search"></i>

                        </span>


                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name, email or role..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />


                        {search && (

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setSearch('')}
                            >

                                <i className="bi bi-x-lg"></i>

                            </button>

                        )}

                    </div>

                </div>

            </div>


            {/* =================================================
                USERS TABLE
            ================================================= */}

            <div className="card">

                <div className="card-body">

                    <DataTable

                        columns={columns}

                        data={filteredUsers}

                        loading={loading}

                        emptyMessage={
                            search
                                ? 'No users match your search.'
                                : 'No users found.'
                        }

                        onEdit={openEditModal}

                        onDelete={openDeleteConfirmation}

                    />

                </div>

            </div>


            {/* =================================================
                ADD / EDIT USER MODAL
            ================================================= */}

            {showModal && (

                <div
                    className="modal d-block"
                    style={{
                        backgroundColor:
                            'rgba(0,0,0,0.5)',
                        zIndex: 2000
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content">


                            {/* MODAL HEADER */}

                            <div className="modal-header">

                                <h5 className="modal-title">

                                    <i
                                        className={
                                            selectedUser
                                                ? 'bi bi-pencil-square me-2'
                                                : 'bi bi-person-plus me-2'
                                        }
                                    ></i>

                                    {selectedUser
                                        ? 'Edit User'
                                        : 'Add User'}

                                </h5>


                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                    disabled={saving}
                                ></button>

                            </div>


                            {/* FORM */}

                            <form onSubmit={handleSubmit}>

                                <div className="modal-body">


                                    {/* MODAL ERROR */}

                                    {error && (

                                        <div
                                            className="alert alert-danger"
                                            role="alert"
                                        >

                                            <i className="bi bi-exclamation-triangle me-2"></i>

                                            {error}

                                        </div>

                                    )}


                                    {/* NAME */}

                                    <div className="mb-3">

                                        <label
                                            className="form-label"
                                            htmlFor="user-name"
                                        >
                                            Name
                                        </label>


                                        <input
                                            id="user-name"
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter full name"
                                            required
                                            disabled={saving}
                                        />

                                    </div>
                                  

                                    {/* EMAIL */}

                                    <div className="mb-3">

                                        <label
                                            className="form-label"
                                            htmlFor="user-email"
                                        >
                                            Email
                                        </label>

                                        <input
                                            id="user-email"
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter email address"
                                            required
                                            disabled={saving}
                                        />

                                    </div>
  <div className="mb-3">

                                        <label
                                            className="form-label"
                                            htmlFor="user-email"
                                        >
                                            username
                                        </label>

                                        <input
                                            id="user-email"
                                            type="username"
                                            name="username"
                                            className="form-control"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Enter username"
                                            required
                                            disabled={saving}
                                        />

                                    </div>
                                                                        
                          

                                    {/* PASSWORD */}

                                    <div className="mb-3">

                                        <label
                                            className="form-label"
                                            htmlFor="user-password"
                                        >

                                            Password


                                            {selectedUser && (

                                                <small className="text-muted ms-2">

                                                    Leave blank to keep current password

                                                </small>

                                            )}

                                        </label>


                                        <input
                                            id="user-password"
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder={
                                                selectedUser
                                                    ? 'Enter new password'
                                                    : 'Enter password'
                                            }
                                            required={!selectedUser}
                                            disabled={saving}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label
                                            className="form-label"
                                            htmlFor="user-email"
                                        >
                                            confirm password
                                        </label>

                                        <input
                                            id="user-email"
                                            type="password"
                                            name="confirmPassword"
                                            className="form-control"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Enter confirm password"
                                            required
                                            disabled={saving}
                                        />

                                    </div>


                                    {/* ROLE */}

                                    <div className="mb-3">

                                        <label
                                            className="form-label"
                                            htmlFor="user-role"
                                        >
                                            Role
                                        </label>


                                        <select
                                            id="user-role"
                                            name="role"
                                            className="form-select"
                                            value={formData.role}
                                            onChange={handleChange}
                                            disabled={saving}
                                        >

                                            <option value="STUDENT">
                                                STUDENT
                                            </option>

                                            <option value="TEACHER">
                                                TEACHER
                                            </option>

                                            <option value="ADMIN">
                                                ADMIN
                                            </option>

                                        </select>

                                    </div>

                                </div>


                                {/* MODAL FOOTER */}

                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeModal}
                                        disabled={saving}
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={saving}
                                    >

                                        {saving ? (

                                            <>

                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                ></span>

                                                Saving...

                                            </>

                                        ) : (

                                            <>

                                                <i
                                                    className={
                                                        selectedUser
                                                            ? 'bi bi-check-lg me-2'
                                                            : 'bi bi-person-plus me-2'
                                                    }
                                                ></i>

                                                {selectedUser
                                                    ? 'Update User'
                                                    : 'Save User'}

                                            </>

                                        )}

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            )}


            {/* =================================================
                DELETE CONFIRMATION MODAL
            ================================================= */}

            {showDeleteModal && selectedUser && (

                <div
                    className="modal d-block"
                    style={{
                        backgroundColor:
                            'rgba(0,0,0,0.55)',
                        zIndex: 2100
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            {/* DELETE HEADER */}
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    Confirm Delete
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeDeleteConfirmation}
                                    disabled={deleting}
                                ></button>

                            </div>
                            {/* DELETE BODY */}

                            <div className="modal-body">

                                {error && (

                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >

                                        <i className="bi bi-exclamation-triangle me-2"></i>

                                        {error}

                                    </div>

                                )}


                                <p className="mb-3">

                                    Are you sure you want to delete this user?

                                </p>


                                <div className="alert alert-warning">

                                    <div className="d-flex align-items-center">

                                        <div
                                            className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center me-3"
                                            style={{
                                                width: '45px',
                                                height: '45px',
                                                minWidth: '45px'
                                            }}
                                        >

                                            {selectedUser.name
                                                ?.charAt(0)
                                                ?.toUpperCase() || '?'}

                                        </div>


                                        <div>

                                            <strong>
                                                {selectedUser.name}
                                            </strong>

                                            <br />

                                            <small>
                                                {selectedUser.email}
                                            </small>

                                            <br />

                                            <span className="badge bg-secondary mt-1">
                                                {selectedUser.role}
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                <p className="text-danger mb-0">

                                    <i className="bi bi-info-circle me-1"></i>

                                    This action cannot be undone.

                                </p>

                            </div>


                            {/* DELETE FOOTER */}

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={closeDeleteConfirmation}
                                    disabled={deleting}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                >

                                    {deleting ? (

                                        <>

                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                            ></span>

                                            Deleting...

                                        </>

                                    ) : (

                                        <>

                                            <i className="bi bi-trash me-2"></i>

                                            Delete

                                        </>

                                    )}

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}


export default Users;