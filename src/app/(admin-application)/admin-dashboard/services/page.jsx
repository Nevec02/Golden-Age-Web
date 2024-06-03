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
import { PlusIcon } from "@/components/back/PlusIcon";
import { EditIcon } from "@/components/back/EditIcon";
import Link from "next/link";

const statusColorMap = {
  Active: "success",
  Inactive: "default",
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await axios.get('/api/Admin/services');
        setServices(Array.isArray(servicesResponse.data) ? servicesResponse.data : []);
      } catch (err) {
        setError(err.response?.data?.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleServiceStatus = useCallback(async (serviceId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await axios.patch(`/api/Admin/services/${serviceId}`, { active: newStatus });
      setServices(services => services.map(service => 
        service.id === serviceId ? { ...service, active: newStatus } : service
      ));
    } catch (err) {
      console.error('Failed to change service status:', err);
      alert('Failed to change service status.');
    }
  }, []);

  const filteredItems = useMemo(() => {
    if (filterValue) {
      return services.filter(service =>
        service.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        service.description.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return services;
  }, [services, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = useCallback((service, columnKey) => {
    const cellValue = service[columnKey];
    switch (columnKey) {
      case "status":
        return (
          <Dropdown>
            <DropdownTrigger className="cursor-pointer hover:opacity-80">
              <Chip color={statusColorMap[service.active ? 'Active' : 'Inactive']} size="sm" variant="flat">
                {service.active ? 'Active' : 'Inactive'}
              </Chip>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="toggle" onClick={() => toggleServiceStatus(service.id, service.active)}>
                {service.active ? 'Deactivate' : 'Activate'}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      case "actions":
        return (
          <Link href={`/admin-dashboard/services/${service.id}`} passHref legacyBehavior>
            <Button isIconOnly size="sm" variant="light">
              <EditIcon className="text-default-300" />
            </Button>
          </Link>
        );
      default:
        return cellValue;
    }
  }, [toggleServiceStatus]);

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
      <h1 className="text-2xl font-bold mb-6">Services</h1>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center gap-3">
          <Input
            isClearable
            placeholder="Search by name or description..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <Button color="primary" endContent={<PlusIcon />}>
            Add New
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {services.length} services</span>
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
        aria-label="Services table with custom cells, pagination, and sorting"
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
          <TableColumn className="bg-secondary text-primary font-bold" key="id">Service ID</TableColumn>
          <TableColumn className="bg-secondary text-primary font-bold" key="name">Name</TableColumn>
          <TableColumn className="bg-secondary text-primary font-bold" key="description">Description</TableColumn>
          <TableColumn className="bg-secondary text-primary font-bold" key="price">Price</TableColumn>
          <TableColumn className="bg-secondary text-primary font-bold" key="status">Status</TableColumn>
          <TableColumn className="bg-secondary text-primary font-bold" key="actions">Actions</TableColumn>
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
