import { Task } from "@/types";
import React from "react";
import { BsTrash, BsPencilSquare } from "react-icons/bs";

interface TaskListProps {
  tasks: Task[];
  handleMarkComplete: (id: string) => void;
  handleDeleteTask: (id: string) => void;
  openModal: (mode: "add" | "edit", task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  openModal,
  handleDeleteTask,
  handleMarkComplete,
}) => {
  if (!tasks.length) {
    return <p className="text-gray-500 text-center">No tasks added yet.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-center">Created At</th>
            <th className="py-3 px-6 text-center">Updated At</th>
            <th className="py-3 px-6 text-center">Edit</th>
            <th className="py-3 px-6 text-center">Delete</th>
            <th className="py-3 px-6 text-center">Completed</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {tasks.map((task) => (
            <tr key={task.id} className="border-b border-gray-300">
              <td className="py-3 px-6 text-left" style={{ minWidth: "200px" }}>
                <div className="line-clamp-1">{task.text}</div>
              </td>
              <td className="py-3 px-6 text-left" style={{ minWidth: "200px" }}>
                <div className="line-clamp-1">{task.description}</div>
              </td>
              <td
                className="py-3 px-6 text-center"
                style={{ minWidth: "100px" }}
              >
                {new Date(task?.createdAt).toDateString()}
              </td>
              <td
                className="py-3 px-6 text-center"
                style={{ minWidth: "100px" }}
              >
                {new Date(task?.updatedAt).toDateString()}
              </td>
              <td
                className="py-3 px-6 text-center"
                style={{ minWidth: "100px" }}
              >
                <button onClick={() => openModal("edit", task)}>
                  <BsPencilSquare />
                </button>
              </td>
              <td
                className="py-3 px-6 text-center"
                style={{ minWidth: "100px" }}
              >
                <button onClick={() => task.id && handleDeleteTask(task.id)}>
                  <BsTrash />
                </button>
              </td>
              <td
                className="py-3 px-6 text-center"
                style={{ minWidth: "100px" }}
              >
                {!task.completed ? (
                  <button
                    onClick={() => task.id && handleMarkComplete(task.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </svg>
                  </button>
                ) : (
                  <button type="button" className=" cursor-auto ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500 opacity-30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
