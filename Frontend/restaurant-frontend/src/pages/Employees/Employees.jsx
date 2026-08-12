import "./Employees.css";
import Sidebar from "../../components/Sidebar/Sidebar";

import {
  FaBell,
  FaSearch,
  FaUsers,
  FaMoneyBillWave,
  FaUserTie,
  FaMotorcycle,
  FaCalendarAlt,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function Employees() {

  const employees = [
    {
      id: 1,
      icon: "👨‍🍳",
      name: "Yacine Belaid",
      position: "Chef",
      phone: "0556 12 34 56",
      type: "Chef",
      salary: "55,000 DA",
      hireDate: "2024-03-01",
    },
    {
      id: 2,
      icon: "🧑‍🍳",
      name: "Imane Saadi",
      position: "Head Waiter",
      phone: "0661 22 33 44",
      type: "Waiter",
      salary: "38,000 DA",
      hireDate: "2024-06-15",
    },
    {
      id: 3,
      icon: "🛵",
      name: "Riad Mansouri",
      position: "Delivery Rider",
      phone: "0770 88 99 00",
      type: "Delivery",
      salary: "32,000 DA",
      hireDate: "2025-01-10",
    },
    {
      id: 4,
      icon: "🧑‍🍳",
      name: "Lina Cherif",
      position: "Waiter",
      phone: "0541 45 67 89",
      type: "Waiter",
      salary: "34,000 DA",
      hireDate: "2025-02-20",
    },
  ];

  return (
    <div className="dashboard-page">

      <Sidebar />

      <div className="dashboard-main">

        <header className="topbar">

          <div className="topbar-search">
            <FaSearch className="search-icon"/>
            <input
              type="text"
              placeholder="Search employees..."
            />
          </div>

          <div className="topbar-actions">

            <button className="icon-button">
              <FaBell/>
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

        <main className="content">

          <div className="content-header">

            <div>

              <h1>Employees</h1>

              <p>
                Manage your team and salaries
              </p>

            </div>

            <div className="header-date">

              <FaCalendarAlt/>

              Fri, 26 Jun 2026

            </div>

          </div>

          <div className="stats-grid">

            <div className="stat-card">

              <span className="stat-label">
                Total Employees
              </span>

              <div className="employee-card">

                <FaUsers/>

                <h2>4</h2>

              </div>

            </div>

            <div className="stat-card">

              <span className="stat-label">
                Total Salaries
              </span>

              <div className="employee-card">

                <FaMoneyBillWave/>

                <h2>159,000 DA</h2>

              </div>

            </div>

            <div className="stat-card">

              <span className="stat-label">
                Waiters
              </span>

              <div className="employee-card">

                <FaUserTie/>

                <h2>2</h2>

              </div>

            </div>

            <div className="stat-card">

              <span className="stat-label">
                Chefs & Delivery
              </span>

              <div className="employee-card">

                <FaMotorcycle/>

                <h2>2</h2>

              </div>

            </div>

          </div>

          <div className="panel">

            <div className="panel-header">

              <input
                className="employee-search"
                placeholder="🔍 Search employees..."
              />

              <button className="add-employee-btn">

                <FaPlus/>

                Add Employee

              </button>

            </div>

            <table className="employee-table">

              <thead>

                <tr>

                  <th>Employee</th>
                  <th>Position</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th>Salary</th>
                  <th>Hire Date</th>
                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>              {employees.map((employee) => (

                <tr key={employee.id}>

                  <td>

                    <div className="employee-info">

                      <div className="employee-avatar">
                        {employee.icon}
                      </div>

                      <div>

                        <strong>{employee.name}</strong>

                        <p>{employee.phone}</p>

                      </div>

                    </div>

                  </td>

                  <td>{employee.position}</td>

                  <td>{employee.phone}</td>

                  <td>

                    <span className={`employee-type ${employee.type.toLowerCase()}`}>
                      {employee.type}
                    </span>

                  </td>

                  <td className="salary">
                    {employee.salary}
                  </td>

                  <td>{employee.hireDate}</td>

                  <td>

                    <div className="table-actions">

                      <button className="edit-btn">

                        <FaEdit />

                      </button>

                      <button className="delete-btn">

                        <FaTrash />

                      </button>

                    </div>

                  </td>

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

export default Employees;
              