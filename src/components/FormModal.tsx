import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RxCross1 } from "react-icons/rx";

type Task = {
  id?: string;
  text: string;
  description?: string;
  completed: boolean;
  userId?: string;
};

type ModalProps = {
  modalMode: "add" | "edit";
  onAddTask: (text: string, description: string) => void;
  onUpdateTask: (text: string, description: string) => void;
  task?: Task | null;
  closeModal: () => void;
};

const FormModal: React.FC<ModalProps> = ({
  modalMode,
  onAddTask,
  onUpdateTask,
  task,
  closeModal,
}) => {
  const validationSchema = Yup.object().shape({
    text: Yup.string().required("Task description is required"),
    description: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      text: task?.text || "",
      description: task?.description || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (modalMode === "add") {
        onAddTask(values.text, values.description);
      } else {
        if (task && task.id) {
          onUpdateTask(values.text, values.description);
        }
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
        <div className="flex justify-end">
          <button
            className="text-gray-700 hover:text-gray-900"
            onClick={closeModal}
          >
            <RxCross1 />
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-2">
          {modalMode === "add" ? "Add Task" : "Edit Task"}
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="text"
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full border rounded p-2 mb-2 ${
              formik.touched.text && formik.errors.text
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Task Title"
          />
          {formik.touched.text && formik.errors.text ? (
            <div className="text-red-500">{formik.errors.text}</div>
          ) : null}
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full border rounded p-2 mb-4 ${
              formik.touched.description && formik.errors.description
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Task description (optional)"
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500">{formik.errors.description}</div>
          ) : null}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
            >
              {modalMode === "add" ? "Add" : "Save"}
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
