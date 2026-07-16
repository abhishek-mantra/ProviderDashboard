import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Search, Filter, ArrowUpDown, CheckCircle2, RefreshCw, Clock } from "lucide-react";

interface Order {
  id: string;
  productName: string;
  amount: number;
  startDate: string;
  daysToExpire: string;
  daysToExpireType: "expires-today" | "expired" | "days-left" | "pending";
  status: "Active" | "Expired" | "Refunded" | "Pending";
}

export function ClientOrders() {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [selectedClient, setSelectedClient] = useState("Rachit");

  const clients = [
    "Rachit",
    "Sarah Johnson",
    "Michael Chen",
    "Emily Rodriguez",
    "David Kim"
  ];

  const orders: Order[] = [
    {
      id: "100218000",
      productName: "Chat Therapy",
      amount: 5.0,
      startDate: "01 Mar 2026",
      daysToExpire: "Expires today",
      daysToExpireType: "expires-today",
      status: "Active"
    },
    {
      id: "100215000",
      productName: "Video Therapy",
      amount: 7.0,
      startDate: "20 Jan 2026",
      daysToExpire: "38d ago",
      daysToExpireType: "expired",
      status: "Expired"
    },
    {
      id: "100211000",
      productName: "Wellness Pack",
      amount: 199.0,
      startDate: "01 Mar 2026",
      daysToExpire: "87d left",
      daysToExpireType: "days-left",
      status: "Active"
    },
    {
      id: "100210300",
      productName: "Psychiatry Consult",
      amount: 499.0,
      startDate: "15 Feb 2026",
      daysToExpire: "9d left",
      daysToExpireType: "days-left",
      status: "Active"
    },
    {
      id: "100208100",
      productName: "Chat+1Video (Trial)",
      amount: 0.08,
      startDate: "01 Jan 2026",
      daysToExpire: "56d ago",
      daysToExpireType: "expired",
      status: "Expired"
    },
    {
      id: "100205400",
      productName: "Video Therapy Pro",
      amount: 999.0,
      startDate: "01 Feb 2026",
      daysToExpire: "3d left",
      daysToExpireType: "days-left",
      status: "Active"
    },
    {
      id: "100205300",
      productName: "Video Therapy Pro",
      amount: 999.0,
      startDate: "01 Mar 2026",
      daysToExpire: "87d left",
      daysToExpireType: "days-left",
      status: "Active"
    },
    {
      id: "100201200",
      productName: "Wellness Pack",
      amount: 199.0,
      startDate: "15 Dec 2025",
      daysToExpire: "49d ago",
      daysToExpireType: "expired",
      status: "Refunded"
    },
    {
      id: "100201100",
      productName: "Wellness Pack",
      amount: 199.0,
      startDate: "01 Feb 2026",
      daysToExpire: "55d left",
      daysToExpireType: "days-left",
      status: "Active"
    },
    {
      id: "100194500",
      productName: "Psychiatry Consult",
      amount: 499.0,
      startDate: "01 Mar 2026",
      daysToExpire: "10d left",
      daysToExpireType: "days-left",
      status: "Pending"
    }
  ];

  const getDaysToExpireColor = (type: string) => {
    switch (type) {
      case "expires-today":
        return "text-[#00c0ff] font-medium";
      case "expired":
        return "text-gray-500";
      case "days-left":
        return "text-gray-700 dark:text-gray-300";
      default:
        return "text-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle2 className="size-4 text-green-500" />;
      case "Expired":
        return <RefreshCw className="size-4 text-gray-400" />;
      case "Refunded":
        return <RefreshCw className="size-4 text-red-500" />;
      case "Pending":
        return <Clock className="size-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600";
      case "Expired":
        return "text-gray-500";
      case "Refunded":
        return "text-red-500";
      case "Pending":
        return "text-orange-500";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="bg-[#f8f9fb] dark:bg-gray-900 min-h-screen p-6">
      {/* Back Button & Header */}
      <div className="max-w-[1000px] mb-6">
        <Link
          to={`/clients/${id}`}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Client Profile</span>
        </Link>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Client Orders</h1>
          
          {/* Client Name Filter */}
          <div className="relative">
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent cursor-pointer min-w-[200px]"
            >
              {clients.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1000px]">
        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search order ID or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border-none rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]"
            />
          </div>

          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <Filter className="size-5" />
          </button>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00c0ff] cursor-pointer"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Expired</option>
            <option>Refunded</option>
            <option>Pending</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00c0ff] cursor-pointer"
          >
            <option>All Types</option>
            <option>Chat Therapy</option>
            <option>Video Therapy</option>
            <option>Wellness Pack</option>
            <option>Psychiatry Consult</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#3C4B5C]">
                <th className="text-left py-4 px-6 text-white text-xs font-semibold uppercase tracking-wide">
                  <div className="flex items-center gap-2">
                    Order ID
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 text-white text-xs font-semibold uppercase tracking-wide">
                  <div className="flex items-center gap-2">
                    Product Name
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 text-white text-xs font-semibold uppercase tracking-wide">
                  <div className="flex items-center gap-2">
                    Amount
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 text-white text-xs font-semibold uppercase tracking-wide">
                  Start Date
                </th>
                <th className="text-left py-4 px-6 text-white text-xs font-semibold uppercase tracking-wide">
                  <div className="flex items-center gap-2">
                    Days to Expire
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 text-white text-xs font-semibold uppercase tracking-wide">
                  <div className="flex items-center gap-2">
                    Status
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-[#00c0ff]">
                      #{order.id}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="size-2 bg-[#00c0ff] rounded-full"></span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {order.productName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-900 dark:text-white font-medium">
                      ₹ {order.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {order.startDate}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-sm ${getDaysToExpireColor(order.daysToExpireType)}`}>
                      {order.daysToExpire}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}