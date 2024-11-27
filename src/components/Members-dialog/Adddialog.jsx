import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().trim().min(2).max(25).required("Please enter your name"),
  email: Yup.string().trim().email().required("Please enter your email")
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a @gmail.com address'),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, "Password must contain one uppercase letter and one special character")
    .required("Please enter your password"),
  role: Yup.string().required("Role is required"),
});

const Adddialog = ({ isOpen, onClose, onAdd, onEdit, initialData }) => {
  const formik = useFormik({
    initialValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      role: initialData?.role || "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (initialData) {
        onEdit({ ...initialData, ...values });
      } else {
        onAdd(values);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      name: initialData?.name || "",
      email: initialData?.email || "",
      role: initialData?.role || "",
      password: "",
    });
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-lg font-semibold">{initialData ? "Edit Member" : "Add Member"}</h3>
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <Input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Role</label>
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="w-full border rounded-md p-2"
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="cook">Cook</option>
              <option value="waiter">Waiter</option>
              <option value="accountant">Accountant</option>
            </select>
            {formik.touched.role && formik.errors.role ? (
              <div className="text-red-500 text-sm">{formik.errors.role}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <Input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={!initialData} // Password is required only when adding a new member
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{initialData ? "Update" : "Add"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Adddialog;
