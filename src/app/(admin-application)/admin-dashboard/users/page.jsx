"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
  Chip,
  User,
} from "@nextui-org/react";
import { SearchIcon } from "@/components/back/SearchIcon";

const statusColorMap = {
  admin: "success",
  user: "default",
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('/api/Admin/users');
        setUsers(Array.isArray(usersResponse.data.users) ? usersResponse.data.users : []);
      } catch (err) {
        setError(err.response?.data?.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteUser = useCallback(async (userId) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Failed to delete user: it has existing orders', err);
      if (err.response && err.response.data && err.response.data.error === 'Cannot delete user with existing orders') {
        alert('Cannot delete user with existing orders.');
      } else {
        alert('Failed to delete user it has existing orders.');
      }
    }
  }, [users, setUsers]);

  const changeUserRole = useCallback(async (userId, newRole) => {
    try {
      await axios.put(`/api/Admin/users/${userId}`, { role: newRole });
      setUsers(users.map(user => user.id === userId ? { ...user, rol: newRole } : user));
    } catch (err) {
      console.error('Failed to change user role:', err);
      alert('Failed to change user role.');
    }
  }, [users, setUsers]);

  const filteredItems = useMemo(() => {
    if (filterValue) {
      return users.filter(user =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.email.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return users;
  }, [users, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return <User name={user.name} description={user.email} />;
      case "role":
        return (
          <Dropdown>
            <DropdownTrigger className="cursor-pointer">
              <Chip color={statusColorMap[user.rol === 1 ? 'admin' : 'user']} size="sm" variant="flat">
                {user.rol === 1 ? 'Admin' : 'User'}
              </Chip>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="admin" onClick={() => changeUserRole(user.id, 1)}>Admin</DropdownItem>
              <DropdownItem key="user" onClick={() => changeUserRole(user.id, 2)}>User</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      case "actions":
        return (
          <Button onClick={() => deleteUser(user.id)} color="danger" size="sm">Borrar</Button>
        );
      default:
        return cellValue;
    }
  }, [changeUserRole, deleteUser]);

  const onSearchChange = useCallback((value) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center gap-3">
          <Input
            isClearable
            placeholder="Search by name or email..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} usuarios</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
      <Table
        aria-label="Users table with custom cells, pagination, and sorting"
        bottomContent={
          <div className="py-2 px-2 flex justify-between items-center">
            <span className="w-[30%] text-small text-default-400">
              {selectedKeys === "all"
                ? "All items selected"
                : `${selectedKeys.size} of ${filteredItems.length} selected`}
            </span>
            <Pagination
              isCompact
              showControls
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        }
        classNames={{
          wrapper: "max-h-[382px] bg-secondary",
        }}
      >
        <TableHeader>
          <TableColumn className="bg-secondary text-primary font-bold" key="id">User ID</TableColumn>
          <TableColumn className="bg-secondary text-primary font-bold" key="name">Nombre</TableColumn>
          <TableColumn className="bg-secondary text-primary font-bold" key="email">Email</TableColumn>
          <TableColumn className="bg-secondary text-primary font-bold" key="role">Rol</TableColumn>
          <TableColumn className="bg-secondary text-primary font-bold" key="actions">Acciones</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
