import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiRequest } from "../lib/api";
import { clearToken, getToken } from "../lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const getAuthHeaders = useCallback(() => {
    const token = getToken();
    if (!token) {
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  }, []);

  const handleAuthError = useCallback(() => {
    clearToken();
    router.replace("/login");
  }, [router]);

  const loadTasks = useCallback(async () => {
    const headers = getAuthHeaders();
    if (!headers) {
      handleAuthError();
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await apiRequest("/tasks", { headers });
      setTasks(data);
    } catch (requestError) {
      if (requestError.message.toLowerCase().includes("unauthorized")) {
        handleAuthError();
        return;
      }
      setError(requestError.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders, handleAuthError]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const createTask = async (event) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    const headers = getAuthHeaders();
    if (!headers) {
      handleAuthError();
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const newTask = await apiRequest("/tasks", {
        method: "POST",
        headers,
        body: JSON.stringify({ title })
      });
      setTasks((current) => [newTask, ...current]);
      setTitle("");
    } catch (requestError) {
      setError(requestError.message || "Failed to create task");
    } finally {
      setSubmitting(false);
    }
  };

  const updateTaskStatus = async (taskId, currentStatus) => {
    const headers = getAuthHeaders();
    if (!headers) {
      handleAuthError();
      return;
    }

    const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";
    try {
      const updatedTask = await apiRequest(`/tasks/${taskId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: newStatus })
      });
      setTasks((current) =>
        current.map((task) => (task._id === taskId ? updatedTask : task))
      );
    } catch (requestError) {
      setError(requestError.message || "Failed to update task");
    }
  };

  const deleteTask = async (taskId) => {
    const headers = getAuthHeaders();
    if (!headers) {
      handleAuthError();
      return;
    }

    try {
      await apiRequest(`/tasks/${taskId}`, {
        method: "DELETE",
        headers
      });
      setTasks((current) => current.filter((task) => task._id !== taskId));
    } catch (requestError) {
      setError(requestError.message || "Failed to delete task");
    }
  };

  const logout = () => {
    clearToken();
    router.push("/login");
  };

  return (
    <main className="container">
      <header className="page-header">
        <h1>Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <form className="card inline-form" onSubmit={createTask}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={200}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Task"}
        </button>
      </form>

      {error ? <p className="error">{error}</p> : null}

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <section className="task-list">
          {tasks.length === 0 ? (
            <p className="card">No tasks yet.</p>
          ) : (
            tasks.map((task) => (
              <article className="card task-item" key={task._id}>
                <div>
                  <h3>{task.title}</h3>
                  <p className={`status status-${task.status.toLowerCase()}`}>{task.status}</p>
                </div>
                <div className="actions">
                  <button onClick={() => updateTaskStatus(task._id, task.status)}>
                    Mark {task.status === "Completed" ? "Pending" : "Completed"}
                  </button>
                  <button className="danger" onClick={() => deleteTask(task._id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      )}
    </main>
  );
}

