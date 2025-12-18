"use client";

import DataTable from "react-data-table-component";
import { Container, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { getTodayDate, textMutated } from "@/utils";
import toast from "react-hot-toast";

export default function Home() {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: getTodayDate(),
  });

  const page = 1;
  const perPage = 10;

  const filteredData = data?.data?.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.priority.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [errors, setErrors] = useState({});
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    setErrors({});
    setIsEdit(false);
    setSelectedTaskId(null);
    setFormValues({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: getTodayDate(),
    });
  };

  const handleEdit = (row) => {
    setErrors({});
    setIsEdit(true);
    setSelectedTaskId(row.id);

    setFormValues({
      title: row.title,
      description: row.description || "",
      status: row.status,
      priority: row.priority,
      dueDate: row.dueDate?.split("T")[0],
    });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_BE_URL}/tasks/${selectedTaskId}`);
      fetchTasks();
      setSelectedTaskId(null);

      document.querySelector(".modal.show .btn-close")?.click();
      toast.success("Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (name, option) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: option?.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formValues.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formValues.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else if (formValues.dueDate < getTodayDate()) {
      newErrors.dueDate = "Due date cannot be in the past";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isEdit) {
        // UPDATE
        await axios.put(
          `${process.env.NEXT_BE_URL}/tasks/${selectedTaskId}`,
          formValues
        );

        toast.success("Created");
      } else {
        // CREATE
        await axios.post(`${process.env.NEXT_BE_URL}/tasks`, formValues);

        toast.success("Updated");
      }

      fetchTasks();
      resetForm();

      // close modal
      document.querySelector(".modal.show .btn-close")?.click();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormValues({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: getTodayDate(),
    });
    setErrors({});
    setIsEdit(false);
    setSelectedTaskId(null);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_BE_URL}/tasks`);
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
      cell: (_row, index) => (page - 1) * perPage + index + 1,
      sortable: true,
      width: "70px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "350px",
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

        const statusOptions = ["todo", "in_progress", "done"];

        const handleStatusChange = async (newStatus) => {
          try {
            await axios.put(`${process.env.NEXT_BE_URL}/tasks/${row.id}`, {
              ...row,
              status: newStatus,
            });
            fetchTasks();
            toast.success("Updated");
          } catch (err) {
            console.error(err);
          }
        };

        return (
          <div className="d-flex gap-1 pointer">
            {statusOptions.map((status) => (
              <span
                key={status}
                className={`badge bg-${
                  row.status === status ? statusColor[status] : "light"
                } cursor-pointer me-2`}
                onClick={() => handleStatusChange(status)}
                style={{
                  transform: row.status === status ? "scale(1.2)" : "scale(1)",
                  transition: "transform 0.2s",
                  opacity: row.status === status ? 1 : 0.6,
                }}
              >
                {status}
              </span>
            ))}
          </div>
        );
      },
      width: "170px",
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

        const priorityOptions = ["low", "medium", "high"];

        const handlePriorityChange = async (newPriority) => {
          try {
            await axios.put(`http://localhost:3000/tasks/${row.id}`, {
              ...row,
              priority: newPriority,
            });
            fetchTasks();
            toast.success("Updated");
          } catch (err) {
            console.error(err);
          }
        };

        return (
          <div className="d-flex gap-1">
            {priorityOptions.map((priority) => (
              <span
                key={priority}
                className={`badge bg-${
                  row.priority === priority ? priorityColor[priority] : "light"
                } cursor-pointer me-2`}
                onClick={() => handlePriorityChange(priority)}
                style={{
                  transform:
                    row.priority === priority ? "scale(1.2)" : "scale(1)",
                  transition: "transform 0.2s",
                  opacity: row.priority === priority ? 1 : 0.4,
                }}
              >
                {priority}
              </span>
            ))}
          </div>
        );
      },
      width: "170px",
    },
    {
      name: "Due Date",
      selector: (row) =>
        row.dueDate ? new Date(row.dueDate).toLocaleDateString() : "-",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            title={""}
            data-bs-toggle="modal"
            data-bs-target="#createTaskModal"
            className={`btn btn-sm btn-icon btn-outline-secondary rounded-circle mx-1`}
            onClick={() => handleEdit(row)}
          >
            <i className="uil uil-pen"></i>
          </button>
          <button
            title={""}
            data-bs-toggle="modal"
            data-bs-target="#confirmDeleteTaskModal"
            className={`btn btn-sm btn-icon btn-outline-danger rounded-circle mx-1`}
            onClick={() => setSelectedTaskId(row.id)}
          >
            <i className="uil uil-trash-alt"></i>
          </button>
        </div>
      ),
      width: "120px",
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

  const statusOptions = [
    { value: "todo", label: "Todo" },
    { value: "in_progress", label: "In Progress" },
    { value: "done", label: "Done" },
  ];

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

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
              disabled={loading}
              onClick={() => handleCreate()}
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
          <div className="row mb-3">
            <div className="col-md-6 col-md-4"></div>
            <div className="col-md-6 col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredData}
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

      {/* Create Model*/}
      <div
        id="createTaskModal"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="createTaskModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEdit ? "Update Task" : "Create Task"}
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <div className="row">
                  {/* Title */}
                  <div className="col-12 mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formValues.title}
                      onChange={handleChange}
                      className={`form-control ${
                        errors?.title ? "is-invalid" : ""
                      } ${textMutated(formValues.title)}`}
                      placeholder="e.g., My Business Task"
                    />
                    {errors?.title && (
                      <div className="invalid-feedback">{errors.title}</div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="col-12 mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      value={formValues.description}
                      onChange={handleChange}
                      className={`form-control ${textMutated(
                        formValues.description
                      )}`}
                      rows={3}
                      placeholder="Task description"
                    />
                  </div>

                  {/* Status */}
                  <div className="col-6 mb-3">
                    <label className="form-label">Status</label>
                    <Select
                      options={statusOptions}
                      value={statusOptions.find(
                        (opt) => opt.value === formValues.status
                      )}
                      onChange={(option) =>
                        handleSelectChange("status", option)
                      }
                      placeholder="Select status"
                    />
                  </div>

                  {/* Priority */}
                  <div className="col-6 mb-3">
                    <label className="form-label">Priority</label>
                    <Select
                      options={priorityOptions}
                      value={priorityOptions.find(
                        (opt) => opt.value === formValues.priority
                      )}
                      onChange={(option) =>
                        handleSelectChange("priority", option)
                      }
                      placeholder="Select priority"
                    />
                  </div>

                  {/* Due Date */}
                  <div className="col-12 mb-3">
                    <label className="form-label">Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formValues.dueDate}
                      onChange={handleChange}
                      className={`form-control  ${
                        errors?.dueDate ? "is-invalid" : ""
                      }`}
                    />
                    {errors?.dueDate && (
                      <div className="invalid-feedback">{errors.dueDate}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  {isEdit ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Confirm Delete Model*/}
      <div id="confirmDeleteTaskModal" className="modal fade" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              Are you sure you want to delete this task?
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
