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
} from "@nextui-org/react";
import { SearchIcon } from "@/components/back/SearchIcon";
import { VerticalDotsIcon } from "@/components/back/VerticalDotsIcon";

const statusColorMap = {
  Paid: "success",
  Pending: "warning",
  Cancelled: "danger",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, usersResponse] = await Promise.all([
          axios.get("/api/Admin/orders"),
          axios.get("/api/Admin/users"),
        ]);

        setOrders(
          Array.isArray(ordersResponse.data.allOrders)
            ? ordersResponse.data.allOrders
            : []
        );
        setUsers(
          Array.isArray(usersResponse.data.users)
            ? usersResponse.data.users
            : []
        );
      } catch (err) {
        setError(err.response?.data?.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = useMemo(() => {
    if (filterValue) {
      return orders.filter(order =>
        order.id.toString().includes(filterValue.toLowerCase()) ||
        (users.find(user => user.id === order.user_id)?.name.toLowerCase().includes(filterValue.toLowerCase()) || "")
      );
    }
    return orders;
  }, [orders, users, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = useCallback((order, columnKey) => {
    const user = users.find((user) => user.id === order.user_id);
    const cellValue = order[columnKey];

    switch (columnKey) {
      case "user_name":
        return user ? user.name : "Unknown User";
      case "status":
        return (
          <Chip color={statusColorMap[order.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, [users]);

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
      <h1 className="text-2xl font-bold mb-6">Pedidos</h1>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center gap-3">
          <Input
            isClearable
            placeholder="Search by order ID or user name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {orders.length} Pedidos</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="12">12</option>
            </select>
          </label>
        </div>
      </div>
      <Table
        aria-label="Orders table with custom cells, pagination, and sorting"
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
          <TableColumn className="bg-secondary text-primary font-bold" key="id">ID Pedido</TableColumn>
          <TableColumn className="bg-secondary text-primary font-bold" key="user_id">ID Usuario</TableColumn>
          <TableColumn className="bg-secondary text-primary font-bold" key="user_name">Nombre Usuario</TableColumn>
          <TableColumn className="bg-secondary text-primary font-bold" key="total_price">Total Precio</TableColumn>
          <TableColumn className="bg-secondary text-primary font-bold" key="created_at">Creado el</TableColumn>
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
