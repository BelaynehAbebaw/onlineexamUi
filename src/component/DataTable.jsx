import React, { useEffect, useRef, useState } from 'react';

function DataTable({
    columns = [],
    data = [],
    loading = false,
    emptyMessage = 'No data found.',
    onEdit,
    onDelete,
    onToggleStatus
}) {
    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpenMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
        };
    }, []);

    // Loading
    if (loading) {
        return (
            <div className="text-center py-5">
                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <div className="mt-2 text-muted">
                    Loading users...
                </div>
            </div>
        );
    }

    // Empty data
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-5">
                <i className="bi bi-inbox fs-1 text-muted"></i>

                <p className="text-muted mt-2 mb-0">
                    {emptyMessage}
                </p>
            </div>
        );
    }

    // Edit
    const handleEdit = (row) => {
        console.log('Edit:', row);

        setOpenMenu(null);

        if (onEdit) {
            onEdit(row);
        }
    };

    // Delete
    const handleDelete = (row) => {
        console.log('Delete:', row);

        setOpenMenu(null);

        if (onDelete) {
            onDelete(row);
        }
    };

    // Enable / Disable
    const handleToggleStatus = (row) => {
        console.log('Toggle status:', row);

        setOpenMenu(null);

        if (onToggleStatus) {
            const currentlyActive = isUserActive(row);

            onToggleStatus(
                row,
                !currentlyActive
            );
        }
    };

    // Check current user status
    const isUserActive = (row) => {
        // If backend has status field
        if (row.status !== undefined && row.status !== null) {
            return (
                String(row.status).toUpperCase() === 'ACTIVE'
            );
        }

        // If backend has enabled boolean
        if (row.enabled !== undefined && row.enabled !== null) {
            return Boolean(row.enabled);
        }

        // Default
        return true;
    };

    return (
        <div
            className="table-responsive"
            style={{
                overflowX: 'auto',
                overflowY: 'visible'
            }}
        >
            <table className="table table-hover align-middle mb-0">

                {/* TABLE HEADER */}
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                scope="col"
                            >
                                {column.label}
                            </th>
                        ))}

                        <th
                            scope="col"
                            className="text-center"
                            style={{
                                width: '80px'
                            }}
                        >
                            Actions
                        </th>
                    </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                    {data.map((row, rowIndex) => {

                        const rowId =
                            row.id ?? rowIndex;

                        const active =
                            isUserActive(row);

                        return (
                            <tr key={rowId}>

                                {/* NORMAL COLUMNS */}
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                    >
                                        {column.render
                                            ? column.render(row)
                                            : row[column.key]
                                        }
                                    </td>
                                ))}

                                {/* ACTIONS */}
                                <td
                                    className="text-center"
                                    style={{
                                        position: 'relative'
                                    }}
                                >

                                    <div
                                        ref={
                                            openMenu === rowId
                                                ? menuRef
                                                : null
                                        }
                                        style={{
                                            position: 'relative',
                                            display: 'inline-block'
                                        }}
                                    >

                                        {/* THREE DOTS BUTTON */}
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-light border"
                                            title="Actions"
                                            onClick={() =>
                                                setOpenMenu(
                                                    openMenu === rowId
                                                        ? null
                                                        : rowId
                                                )
                                            }
                                        >
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>

                                        {/* DROPDOWN MENU */}
                                        {openMenu === rowId && (
                                            <div
                                                className="dropdown-menu show"
                                                style={{
                                                    position: 'absolute',
                                                    right: 0,
                                                    top: '100%',
                                                    marginTop: '5px',
                                                    minWidth: '180px',
                                                    zIndex: 9999,
                                                    display: 'block'
                                                }}
                                            >

                                                {/* EDIT */}
                                                {onEdit && (
                                                    <button
                                                        type="button"
                                                        className="dropdown-item"
                                                        onClick={() =>
                                                            handleEdit(row)
                                                        }
                                                    >
                                                        <i className="bi bi-pencil-square text-primary me-2"></i>

                                                        Edit
                                                    </button>
                                                )}

                                                {/* ENABLE / DISABLE */}
                                                {onToggleStatus && (
                                                    <button
                                                        type="button"
                                                        className="dropdown-item"
                                                        onClick={() =>
                                                            handleToggleStatus(
                                                                row
                                                            )
                                                        }
                                                    >
                                                        <i
                                                            className={
                                                                active
                                                                    ? "bi bi-person-x text-warning me-2"
                                                                    : "bi bi-person-check text-success me-2"
                                                            }
                                                        ></i>

                                                        {active
                                                            ? 'Disable'
                                                            : 'Enable'
                                                        }
                                                    </button>
                                                )}

                                                {/* DELETE */}
                                                {onDelete && (
                                                    <button
                                                        type="button"
                                                        className="dropdown-item"
                                                        onClick={() =>
                                                            handleDelete(row)
                                                        }
                                                    >
                                                        <i className="bi bi-trash text-danger me-2"></i>

                                                        Delete
                                                    </button>
                                                )}

                                            </div>
                                        )}

                                    </div>

                                </td>

                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </div>
    );
}

export default DataTable;