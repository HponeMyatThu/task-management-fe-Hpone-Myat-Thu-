"use client";

import DataTable from "react-data-table-component";
import { Container, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/tasks");
      setData(res.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "600px",
    },
    {
      name: "Status",
      sortable: true,
      cell: (row) => {
        const statusColor = {
          todo: "secondary",
          in_progress: "warning",
          done: "success",
        };

        return (
          <span
            className={`badge bg-${statusColor[row.status] || "secondary"}`}
          >
            {row.status}
          </span>
        );
      },
      width: "100px",
    },
    {
      name: "Priority",
      sortable: true,
      cell: (row) => {
        const priorityColor = {
          low: "info",
          medium: "primary",
          high: "danger",
        };

        return (
          <span
            className={`badge bg-${priorityColor[row.priority] || "secondary"}`}
          >
            {row.priority}
          </span>
        );
      },
      width: "100px",
    },
    {
      name: "Due Date",
      selector: (row) =>
        row.dueDate ? new Date(row.dueDate).toLocaleDateString() : "-",
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f8f9fa",
        fontWeight: "600",
        fontSize: "14px",
      },
    },
    rows: {
      style: {
        minHeight: "50px",
        "&:hover": {
          backgroundColor: "#f8f9fa",
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRight: "1px solid #e9ecef",
        },
      },
    },
    pagination: {
      style: {
        borderTopWidth: "1px",
        borderTopColor: "#e9ecef",
      },
    },
  };

  return (
    <Container>
      {/* Page Header */}
      <div className="row mt-3">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Task Management</h4>

            <button
              type="button"
              className="btn btn-primary d-flex align-items-center gap-2"
              data-bs-toggle="modal"
              data-bs-target="#createTaskModal"
            >
              <i className="uil uil-plus"></i>
              Create Task
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm mt-3">
        <div className="card-body">
          <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            progressComponent={
              <div className="p-4 text-center">
                <Spinner animation="border" />
                <div className="mt-2">Loading tasks...</div>
              </div>
            }
            pagination
            noDataComponent={
              <div className="p-4 text-center">
                There are no records to display
              </div>
            }
            customStyles={customStyles}
            responsive
          />
        </div>
      </div>
    </Container>
  );
}
