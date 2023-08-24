"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db, taskRef } from "../utils/firebase";
import { CSVLink } from "react-csv";

import {
  clearDataFromLocalStorage,
  getDataFromLocalStorage,
} from "@/utils/localStorage-utils";
import { toast } from "react-toastify";
import FormModal from "@/components/FormModal";
import TaskList from "@/components/TaskList";
import { redirect, useRouter } from "next/navigation";
import { Task } from "@/types";
import header from "@/utils/csv-header";

type LoggedInUser = {
  uid: string;
};

const TaskManager = () => {
  const { push } = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const loggedInUser: LoggedInUser = getDataFromLocalStorage("loggedInUser");
  const userId = loggedInUser?.uid;

  useEffect(() => {
    if (userId) {
      const taskQuery = query(
        collection(db, "task"),
        where("uid", "==", userId)
      );
      const unSubscribe = onSnapshot(taskQuery, (snapshot) => {
        const tasksData: Task[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            text: data.text,
            description: data.description,
            createdAt: `${new Date(data.createdAt).toISOString()}`,
            updatedAt: `${new Date(data.updatedAt).toISOString()}`,
            completed: data.completed,
          };
        });
        setTasks(tasksData);
      });

      return () => unSubscribe();
    }
  }, [userId]);

  const openModal = (mode: "add" | "edit", task?: Task) => {
    setModalMode(mode);
    setIsModalOpen(true);

    if (mode === "edit" && task?.id) {
      setEditingTask(task);
    } else {
      setEditingTask(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleMarkComplete = async (taskId: string) => {
    if (userId && taskId) {
      const taskDoc = doc(db, "task", taskId);
      await updateDoc(taskDoc, {
        completed: true,
        updatedAt: `${new Date().toISOString()}`,
      })
        .then(() => {
          toast.success("Task marked as complete");
        })
        .catch((error) => {
          if (error && error.message) {
            let errorMessage =
              error.message || "Failed to mark task as complete";
            toast.error(errorMessage);
          }
        });
    }
  };

  const onAddTask = async (text: string, description: string) => {
    if (userId) {
      const newTask: Task = {
        text,
        description,
        completed: false,
        createdAt: `${new Date().toISOString()}`,
        updatedAt: `${new Date().toISOString()}`,
      };

      addDoc(taskRef, { ...newTask, uid: userId })
        .then(() => {
          toast.success("Task added successfully");
          closeModal();
        })
        .catch((error) => {
          if (error && error.message) {
            let errorMessage = error.message || "Failed to add a task";
            toast.error(errorMessage);
          }
        });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (userId && taskId) {
      const taskDoc = doc(db, "task", taskId);
      deleteDoc(taskDoc)
        .then(() => {
          toast.success("Task deleted successfully");
        })
        .catch((error) => {
          if (error && error.message) {
            let errorMessage = error.message || "Failed to delete a task";
            toast.error(errorMessage);
          }
        });
    }
  };

  const onUpdateTask = async (
    text?: string,
    description?: string,
    completed?: boolean
  ) => {
    if (editingTask && editingTask.id) {
      const updatedTask: Task = {
        text: text || editingTask?.text,
        description: description || editingTask?.description,
        completed: completed || editingTask?.completed,
        createdAt: `${new Date(editingTask?.createdAt).toISOString()}`,
        updatedAt: `${new Date().toISOString()}`,
      };

      const taskRefDoc = doc(db, "task", editingTask.id);

      updateDoc(taskRefDoc, updatedTask)
        .then(() => {
          toast.success("Task updated successfully");
          closeModal();
        })
        .catch((error) => {
          if (error && error.message) {
            let errorMessage = error.message || "Failed to update a task";
            toast.error(errorMessage);
          }
        });
    }
  };

  const onLogoutClick = () => {
    clearDataFromLocalStorage();
    push("/login");
  };

  if (!userId && typeof window !== "undefined") {
    return redirect("/login");
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 items-center max-lg:flex-col ">
        <h1 className="text-2xl font-semibold mb-4">Task Manager</h1>
        <div className=" flex-1 flex justify-end items-center ">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => openModal("add")}
          >
            Add Task
          </button>
          <CSVLink data={tasks} filename="tasks.csv" headers={header}>
            <button className="bg-blue-500 mx-2 text-white px-3 py-1 rounded">
              Download Tasks
            </button>
          </CSVLink>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={onLogoutClick}
          >
            Logout
          </button>
        </div>
      </div>
      <TaskList
        tasks={tasks}
        openModal={openModal}
        handleDeleteTask={handleDeleteTask}
        handleMarkComplete={handleMarkComplete}
      />

      {isModalOpen && (
        <FormModal
          task={editingTask}
          closeModal={closeModal}
          onAddTask={onAddTask}
          onUpdateTask={onUpdateTask}
          modalMode={modalMode}
        />
      )}
    </div>
  );
};

export default TaskManager;
