import "./Expenses.css";
import Sidebar from "../../components/Sidebar/Sidebar";

import {
  FaBell,
  FaSearch,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaHome,
  FaPlus,
  FaPen,
  FaTrash,
} from "react-icons/fa";

function Expenses() {
  const dailyExpenses = [
    {
      id: 1,
      title: "Cleaning Supplies",
      amount: "1,200 DA",
      date: "2026-06-25",
    },
    {
      id: 2,
      title: "Taxi (urgent supply run)",
      amount: "800 DA",
      date: "2026-06-24",
    },
    {
      id: 3,
      title: "Packaging Boxes",
      amount: "2,400 DA",
      date: "2026-06-23",
    },
    {
      id: 4,
      title: "Extra Gas Bottle",
      amount: "1,500 DA",
      date: "2026-06-21",
    },
  ];

  const fixedExpenses = [
    {
      id: 1,
      title: "Restaurant Rent",
      amount: "65,000 DA",
      due: "Every Month",
    },
    {
      id: 2,
      title: "Internet",
      amount: "3,500 DA",
      due: "Every Month",
    },
    {
      id: 3,
      title: "Electricity",
      amount: "18,000 DA",
      due: "Every Month",
    },
    {
      id: 4,
      title: "Water",
      amount: "7,200 DA",
      due: "Every Month",
    },
    {
      id: 5,
      title: "Employees Salaries",
      amount: "8,500 DA",
      due: "Weekly",
    },
  ];

  return (
    <div className="dashboard-page">

      <Sidebar />

      <div className="dashboard-main">

        {/* Topbar */}

        <header className="topbar">

          <div className="topbar-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search expense..."
            />
          </div>

          <div className="topbar-actions">

            <button className="icon-button">
              <FaBell />
              <span className="notif-dot"></span>
            </button>

            <div className="topbar-user">

              <div className="user-avatar">
                A
              </div>

              <div className="user-info">
                <span className="user-name">
                  Amine K.
                </span>

                <span className="user-role">
                  Owner / Admin
                </span>
              </div>

            </div>

          </div>

        </header>

        {/* Content */}

        <main className="content">

          <div className="content-header">

            <div>

              <h1>Expenses</h1>

              <p>
                Daily costs and fixed monthly bills
              </p>

            </div>

            <div className="header-date">

              <FaCalendarAlt />

              <span>Fri, 26 Jun 2026</span>

            </div>

          </div>

          {/* Cards */}

          <div className="stats-grid">

            <div className="stat-card">

              <span className="stat-label">
                Daily Expenses (week)
              </span>

              <div className="expense-card">

                <FaMoneyBillWave />

                <h2>5,900 DA</h2>

              </div>

            </div>

            <div className="stat-card">

              <span className="stat-label">
                Fixed Expenses (month)
              </span>

              <div className="expense-card">

                <FaHome />

                <h2>102,200 DA</h2>

              </div>

            </div>

            <div className="stat-card">

              <span className="stat-label">
                Total Monthly Expenses
              </span>

              <div className="expense-card">

                <FaMoneyBillWave />

                <h2>137,600 DA</h2>

              </div>

            </div>

          </div>

          {/* Tabs */}

          <div className="expense-tabs">

            <button className="active">
              Daily Expenses
            </button>

            <button>
              Fixed Expenses
            </button>

            <button className="add-expense">

              <FaPlus />

              Add Daily Expense

            </button>

          </div>

          {/* Daily Expense Table */}

          <div className="panel">

            <div className="panel-header">

              <h3>Daily Expenses</h3>

            </div>

            <table className="expense-table">

              <thead>

                <tr>

                  <th>Title</th>

                  <th>Amount</th>

                  <th>Date</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {dailyExpenses.map((expense) => (

                  <tr key={expense.id}>

                    <td>{expense.title}</td>

                    <td>{expense.amount}</td>

                    <td>{expense.date}</td>

                    <td>

                      <button className="table-btn edit">

                        <FaPen />

                      </button>

                      <button className="table-btn delete">

                        <FaTrash />

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
                    {/* Fixed Expenses */}

          <div className="panel">

            <div className="panel-header">

              <h3>Fixed Expenses</h3>

              <button className="add-expense">

                <FaPlus />

                Add Fixed Expense

              </button>

            </div>

            <table className="expense-table">

              <thead>

                <tr>

                  <th>Title</th>

                  <th>Amount</th>

                  <th>Frequency</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {fixedExpenses.map((expense) => (

                  <tr key={expense.id}>

                    <td>{expense.title}</td>

                    <td>{expense.amount}</td>

                    <td>{expense.due}</td>

                    <td>

                      <button className="table-btn edit">

                        <FaPen />

                      </button>

                      <button className="table-btn delete">

                        <FaTrash />

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </main>

      </div>

      {/* Add Expense Modal (UI only) */}

      <div className="modal-overlay">

        <div className="expense-modal">

          <div className="modal-header">

            <h2>Add Expense</h2>

          </div>

          <div className="modal-body">

            <div className="form-group">

              <label>Expense Title</label>

              <input
                type="text"
                placeholder="Enter expense title"
              />

            </div>

            <div className="form-group">

              <label>Amount</label>

              <input
                type="number"
                placeholder="Amount"
              />

            </div>

            <div className="form-group">

              <label>Date</label>

              <input
                type="date"
              />

            </div>

            <div className="form-group">

              <label>Category</label>

              <select>

                <option>Daily Expense</option>

                <option>Fixed Expense</option>

              </select>

            </div>

          </div>

          <div className="modal-footer">

            <button className="cancel-btn">

              Cancel

            </button>

            <button className="save-btn">

              Save Expense

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Expenses;