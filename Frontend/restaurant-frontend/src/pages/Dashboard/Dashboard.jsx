import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";

import {
  FaBell,
  FaSearch,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function Dashboard() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Placeholder data — swap these for real API calls once the backend is connected.

  const todayStats = [
    {
      label: "Total Sales Today",
      value: "$13.20",
      change: "+12%",
      up: true,
      context: "vs yesterday",
      icon: "💰",
      tone: "rose",
    },
    {
      label: "Total Expenses Today",
      value: "$4.60",
      change: "+4%",
      up: false,
      context: "vs yesterday",
      icon: "🧾",
      tone: "peach",
    },
    {
      label: "Net Profit Today",
      value: "$8.60",
      change: "+18%",
      up: true,
      context: "vs yesterday",
      icon: "📈",
      tone: "mint",
    },
    {
      label: "Current Stock Remaining",
      value: "193 units",
      change: "3 items need attention",
      up: false,
      context: null,
      icon: "📦",
      tone: "sand",
    },
  ];

  const monthStats = [
    {
      label: "Monthly Sales",
      value: "$325",
      context: "June 2026",
      icon: "📊",
      tone: "rose",
    },
    {
      label: "Monthly Expenses",
      value: "$529",
      context: "June 2026",
      icon: "💳",
      tone: "peach",
    },
    {
      label: "Monthly Profit",
      value: "-$204",
      context: "June 2026",
      icon: "📉",
      tone: "mint",
      negative: true,
    },
    {
      label: "Total Salaries",
      value: "$612",
      context: "4 employees",
      icon: "👥",
      tone: "sand",
    },
  ];

  const dailySales = [
    { day: "Sat", value: 11 },
    { day: "Sun", value: 12 },
    { day: "Mon", value: 14 },
    { day: "Tue", value: 13 },
    { day: "Wed", value: 15 },
    { day: "Thu", value: 16 },
    { day: "Fri", value: 2 },
  ];

  const monthlyTrend = [
    { month: "Jan", value: 277 },
    { month: "Feb", value: 302 },
    { month: "Mar", value: 285 },
    { month: "Apr", value: 312 },
    { month: "May", value: 344 },
    { month: "Jun", value: 325 },
  ];

  const expenseBreakdown = [
    { name: "Rent", value: 308, color: "#8B1A1A" },
    { name: "Salaries", value: 612, color: "#1A1A1A" },
    { name: "Utilities", value: 83, color: "#C08A2E" },
    { name: "Daily costs", value: 136, color: "#F2B9C4" },
  ];

  const profitMargin = [
    { month: "Jan", value: 10 },
    { month: "Feb", value: 14 },
    { month: "Mar", value: 12 },
    { month: "Apr", value: 18 },
    { month: "May", value: 24 },
    { month: "Jun", value: 16 },
  ];

  const quickAlerts = [
    {
      icon: "⚠️",
      title: "Low stock: Chicken Breast",
      detail: "8 kg remaining · minimum required is 10 kg",
    },
    {
      icon: "⚠️",
      title: "Low stock: Bread Buns",
      detail: "5 piece remaining · minimum required is 30 piece",
    },
    {
      icon: "🚫",
      title: "Out of stock: Tomatoes",
      detail: "0 kg remaining · minimum required is 5 kg",
    },
    {
      icon: "💸",
      title: "High expenses warning: Daily expenses up 4% from yesterday's average",
      detail: "Mostly driven by packaging and transport costs",
    },
    {
      icon: "🏆",
      title: "Best-selling item: Grilled Chicken Burger",
      detail: "Sold 5 times this week",
    },
    {
      icon: "💎",
      title: "Most profitable item: Grilled Beef Plate",
      detail: "Approx. $1.45 margin per unit sold",
    },
  ];

  const recentOrders = [
    { id: "#RM-3021", item: "Grilled Salmon Bowl", table: "Table 4", status: "Served", amount: "$24.00" },
    { id: "#RM-3020", item: "Truffle Pasta", table: "Table 2", status: "Preparing", amount: "$31.50" },
    { id: "#RM-3019", item: "House Red Wine", table: "Bar", status: "Served", amount: "$14.00" },
    { id: "#RM-3018", item: "Beef Tartare", table: "Table 9", status: "Pending", amount: "$19.00" },
    { id: "#RM-3017", item: "Chocolate Fondant", table: "Table 6", status: "Served", amount: "$11.00" },
  ];

  const statusClass = (status) => {
    if (status === "Served") return "status served";
    if (status === "Preparing") return "status preparing";
    return "status pending";
  };

  return (
    <div className="dashboard-page">
      <Sidebar />

      <div className="dashboard-main">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-search">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search orders, products, suppliers..." />
          </div>

          <div className="topbar-actions">
            <button className="icon-button">
              <FaBell />
              <span className="notif-dot"></span>
            </button>

            <div className="topbar-user">
              <div className="user-avatar">B</div>
              <div className="user-info">
                <span className="user-name">Boulam</span>
                <span className="user-role">Manager</span>
              </div>
            </div>
          </div>
        </header>

        <main className="content">
          <div className="content-header">
            <div>
              <h1>Welcome back, Boulam</h1>
              <p>Here's what's happening at your restaurant today.</p>
            </div>
            <div className="content-date">
              <FaCalendarAlt />
              {today}
            </div>
          </div>

          {/* Today's Overview */}
          <div className="section-title">Today's Overview</div>
          <div className="stats-grid">
            {todayStats.map((stat, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-top">
                  <span className="stat-label">{stat.label}</span>
                  <span className={`stat-icon tone-${stat.tone}`}>{stat.icon}</span>
                </div>
                <div className="stat-value-row">
                  <span className="stat-value">{stat.value}</span>
                </div>
                {stat.context !== undefined && (
                  <span className={`stat-change ${stat.up ? "up" : "down"}`}>
                    {stat.up !== null && (stat.up ? <FaArrowUp /> : <FaArrowDown />)}
                    {stat.change}
                    {stat.context ? ` ${stat.context}` : ""}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* This Month / Finance */}
          <div className="section-title">This Month · Finance</div>
          <div className="stats-grid">
            {monthStats.map((stat, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-top">
                  <span className="stat-label">{stat.label}</span>
                  <span className={`stat-icon tone-${stat.tone}`}>{stat.icon}</span>
                </div>
                <div className="stat-value-row">
                  <span className={`stat-value ${stat.negative ? "negative" : ""}`}>
                    {stat.value}
                  </span>
                </div>
                <span className="stat-context">{stat.context}</span>
              </div>
            ))}
          </div>

          {/* Charts row 1 */}
          <div className="charts-grid">
            <div className="panel chart-panel">
              <div className="panel-header">
                <h3>Daily Sales (last 7 days)</h3>
                <span className="panel-tag">$</span>
              </div>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={dailySales}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#707070" }} />
                  <Tooltip cursor={{ fill: "rgba(139,26,26,.05)" }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {dailySales.map((entry, i) => (
                      <Cell key={i} fill={i === dailySales.length - 1 ? "#8B1A1A" : "#DB9CA9"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="panel chart-panel">
              <div className="panel-header">
                <h3>Monthly Sales Trend</h3>
                <span className="panel-tag">6 months</span>
              </div>
              <ResponsiveContainer width="100%" height={210}>
                <LineChart data={monthlyTrend}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#707070" }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8B1A1A"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#8B1A1A" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts row 2 */}
          <div className="charts-grid">
            <div className="panel chart-panel">
              <div className="panel-header">
                <h3>Expense Breakdown</h3>
                <span className="panel-tag">June 2026</span>
              </div>
              <div className="donut-row">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie
                      data={expenseBreakdown}
                      dataKey="value"
                      innerRadius={50}
                      outerRadius={78}
                      paddingAngle={2}
                    >
                      {expenseBreakdown.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <ul className="donut-legend">
                  {expenseBreakdown.map((entry, i) => (
                    <li key={i}>
                      <span className="legend-dot" style={{ background: entry.color }}></span>
                      <span className="legend-label">{entry.name}</span>
                      <span className="legend-value">${entry.value.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="panel chart-panel">
              <div className="panel-header">
                <h3>Profit Margin</h3>
                <span className="panel-tag">$ · last 6 months</span>
              </div>
              <ResponsiveContainer width="100%" height={210}>
                <LineChart data={profitMargin}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#707070" }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1D8348"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#1D8348" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Alerts */}
          <div className="panel alerts-panel-full">
            <div className="panel-header">
              <h3>Quick Alerts</h3>
              <span className="live-badge">
                <span className="live-dot"></span>
                Live
              </span>
            </div>

            <ul className="quick-alert-list">
              {quickAlerts.map((alert, i) => (
                <li key={i}>
                  <span className="quick-alert-icon">{alert.icon}</span>
                  <div>
                    <strong>{alert.title}</strong>
                    <p>{alert.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Orders */}
          <div className="panel orders-panel">
            <div className="panel-header">
              <h3>Recent Orders</h3>
              <a href="#">View all</a>
            </div>

            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Item</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-id">{order.id}</td>
                    <td>{order.item}</td>
                    <td>{order.table}</td>
                    <td>
                      <span className={statusClass(order.status)}>{order.status}</span>
                    </td>
                    <td className="order-amount">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;