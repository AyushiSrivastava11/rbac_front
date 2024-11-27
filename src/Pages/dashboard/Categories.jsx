import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axioshelper/Axiosinstance.js";
import { Search, Edit, Trash, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Tabs, TabsContent } from "../../components/ui/tabs";
import Adddialog from "../../components/Categories-dialog/Adddialog.jsx";
import Editdialog from "../../components/Categories-dialog/Editdialog.jsx"; // Import the EditDialog component
import { useSearchParams } from 'react-router-dom';

export default function Categories() {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRow, setEditRow] = useState(null); // Store the row being edited
  const [totalPages, setTotalPages] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const searchTerm = searchParams.get("searchTerm") || "";

    setCurrentPage(page);
    setSortBy(sortBy);
    setSortOrder(sortOrder);
    setSearchTerm(searchTerm);
  }, [searchParams]);

  useEffect(() => {
    dataFetch();
  }, [currentPage, searchTerm, sortBy, sortOrder]);

  const dataFetch = async () => {
    try {
      const response = await axiosInstance.get("/menu/get-categories", {
        params: {
          page: currentPage,
          name: searchTerm,
          sortBy,
          sortOrder,
        },
      });
      const { categories, pagination } = response.data;
      setRows(categories || []);
      setTotalCategories(pagination?.totalCategories || 0);
      setTotalPages(pagination?.totalPages || 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (newCategory) => {
    try {
      await axiosInstance.post('/menu/create-category', newCategory);
      toast.success('Category added successfully!');
      dataFetch();
      setIsModalOpen(false);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to add category.';
      toast.error(errorMessage);
    }
  };

  const handleEdit = (row) => {
    setEditRow(row);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (updatedCategory) => {
    try {
      await axiosInstance.patch(`/menu/update-category/${updatedCategory._id}`, updatedCategory);
      toast.success('Category updated successfully!');
      dataFetch();
      setIsEditModalOpen(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update category.';
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (row) => {
    if (window.confirm(`Are you sure you want to delete the category "${row.name}"?`)) {
      try {
        await axiosInstance.patch(`/menu/delete-category/${row._id}`);
        toast.success('Category deleted successfully!');
        dataFetch();
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to delete category.';
        toast.error(errorMessage);
      }
    }
  };

  const handleSortChange = (e) => {
    const [sortField, order] = e.target.value.split("-");
    setSortBy(sortField);
    setSortOrder(order);
    setSearchParams({ page: currentPage, sortBy: sortField, sortOrder: order, searchTerm });
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1);
    setSearchParams({ page: 1, sortBy, sortOrder: sortOrder, searchTerm: term });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSearchParams({ page: newPage, sortBy, sortOrder, searchTerm });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-6">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center">
            <div className="text-left">
              <CardTitle className="text-lg font-semibold">Categories</CardTitle>
              <CardDescription className="text-base">Manage Categories.</CardDescription>
            </div>
            <Button
              variant="destructive"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center ml-auto text-sm bg-green-500 text-white hover:bg-green-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    />
                  </div>
                  <select
                    className="ml-4 p-2 bg-white border border-gray-300 rounded-md"
                    onChange={handleSortChange}
                    value={`${sortBy}-${sortOrder}`}
                  >
                    <option value="createdAt-desc" className="text-gray-600">Sort by Date (Newest)</option>
                    <option value="createdAt-asc" className="text-gray-600">Sort by Date (Oldest)</option>
                    <option value="name-asc" className="text-gray-600">Sort by Name (A-Z)</option>
                    <option value="name-desc" className="text-gray-600">Sort by Name (Z-A)</option>
                  </select>
                </div>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Created at</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(row.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(row)} className="text-blue-500 hover:bg-blue-100">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(row)} className="text-red-500 hover:bg-red-100">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="flex w-full justify-between items-center text-xs text-muted-foreground">
                  <div>
                    Showing <strong>{rows.length}</strong> of <strong>{totalCategories}</strong> categories
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Adddialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
      />
      <Editdialog
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleEditSubmit}
        initialData={editRow}
      />
      <ToastContainer />
    </div>
  );
}
