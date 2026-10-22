function Dashboard() {

    return (
        <div>

            <div className="page-header">

                <div>
                    <h2>Dashboard</h2>
                    <p>
                        Welcome to the Online Examination System.
                    </p>
                </div>

                <button className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2"></i>
                    Create Exam
                </button>

            </div>

            <div className="row g-4">

                <div className="col-md-6 col-xl-3">

                    <div className="stat-card">

                        <div>
                            <p>Total Exams</p>
                            <h3>24</h3>
                            <small className="text-success">
                                Active examinations
                            </small>
                        </div>

                        <div className="stat-icon">
                            <i className="bi bi-journal-text"></i>
                        </div>

                    </div>

                </div>

                <div className="col-md-6 col-xl-3">

                    <div className="stat-card">

                        <div>
                            <p>Students</p>
                            <h3>356</h3>
                            <small className="text-success">
                                Registered students
                            </small>
                        </div>

                        <div className="stat-icon">
                            <i className="bi bi-people"></i>
                        </div>

                    </div>

                </div>

                <div className="col-md-6 col-xl-3">

                    <div className="stat-card">

                        <div>
                            <p>Questions</p>
                            <h3>1,248</h3>
                            <small className="text-success">
                                Question bank
                            </small>
                        </div>

                        <div className="stat-icon">
                            <i className="bi bi-question-circle"></i>
                        </div>

                    </div>

                </div>

                <div className="col-md-6 col-xl-3">

                    <div className="stat-card">

                        <div>
                            <p>Results</p>
                            <h3>1,087</h3>
                            <small className="text-success">
                                Completed exams
                            </small>
                        </div>

                        <div className="stat-icon">
                            <i className="bi bi-bar-chart"></i>
                        </div>

                    </div>

                </div>

            </div>

            <div className="content-card mt-4">

                <h5>Recent Examinations</h5>

                <div className="table-responsive mt-3">

                    <table className="table table-hover">

                        <thead>
                            <tr>
                                <th>Exam</th>
                                <th>Subject</th>
                                <th>Questions</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <td>Java Programming</td>
                                <td>Programming</td>
                                <td>30</td>
                                <td>
                                    <span className="badge bg-success">
                                        Active
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>Database Management</td>
                                <td>Database</td>
                                <td>25</td>
                                <td>
                                    <span className="badge bg-success">
                                        Active
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>Web Development</td>
                                <td>Web</td>
                                <td>40</td>
                                <td>
                                    <span className="badge bg-warning text-dark">
                                        Draft
                                    </span>
                                </td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;