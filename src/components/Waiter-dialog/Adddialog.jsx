import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().trim().min(2).max(25).required("Please enter your name"),
  phone: Yup.string().trim().matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Please enter your phone number"),
});

const Adddialog = ({ isOpen, onClose, onAdd, onEdit, initialData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItems = [
    { name: "Pizza", price: 10 },
    { name: "Burger", price: 8 },
    { name: "Pasta", price: 12 },
    { name: "Pasta", price: 12 },
    { name: "Pasta", price: 12 },
    { name: "Pasta", price: 12 },
    { name: "Pasta", price: 12 },
    { name: "Pasta", price: 12 },
    // Add more items here
  ];

  useEffect(() => {
    const results = searchTerm
      ? menuItems.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : menuItems;
    setFilteredMenuItems(results);
  }, [searchTerm]);

  const handleSelectItem = (item) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
    setSearchTerm(""); // Clear search term
    setFilteredMenuItems(menuItems); // Reset the list to show all menu items
    setIsDropdownOpen(false); // Close dropdown
  };

  const handleRemoveItem = (index) => {
    setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const calculateTotalBill = () => {
    return selectedItems.reduce((total, item) => total + item.price, 0);
  };

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || "",
      phone: initialData?.phone || "",
    },
    validationSchema,
    onSubmit: (values) => {
      const order = {
        ...values,
        items: selectedItems,
        total: calculateTotalBill(),
      };
      if (initialData) {
        onEdit({ ...initialData, ...order });
      } else {
        onAdd(order);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      name: initialData?.name || "",
      phone: initialData?.phone || "",
    });
    setSelectedItems(initialData?.items || []);
  }, [initialData]);

  // Close dropdown when clicking outside
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed bg-black inset-0 flex items-center justify-center  bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-lg font-semibold">{initialData ? "Edit Order" : "Add Order"}</h3>
        <form onSubmit={formik.handleSubmit} className="mt-4">
          {/* Name */}
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
          
          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone Number</label>
            <Input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            ) : null}
          </div>
          
          {/* Search and Select Menu Items */}
          <div className="mb-4 relative" ref={wrapperRef}>
            <label className="block text-sm font-medium">Search Menu Items</label>
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
              className="w-full border rounded-md p-2"
            />
            {isDropdownOpen && filteredMenuItems.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
                {filteredMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                    onClick={() => handleSelectItem(item)}
                  >
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Selected Items and Total Bill */}
          <div className="mb-4">
            {selectedItems.length > 0 ? (
              <>
                <h4 className="text-sm font-medium">Selected Items</h4>
                {selectedItems.map((item, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <span>{item.name}</span>
                    <div className="flex items-center">
                      <span className="mr-2">${item.price}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveItem(index)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="text-right font-semibold">Total: ${calculateTotalBill()}</div>
              </>
            ) : null}
          </div>
          
          {/* Buttons */}
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
