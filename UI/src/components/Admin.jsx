import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { apiRequest } from "../utils/api";

export default function Admin() {
  const [emps, setEmps] = useState([]);
  const [selected, setSelected] = useState(null);

  async function fetchEmployees() {
    const data = await apiRequest("/users/all", "GET");
    setEmps(data);
  }

  async function deleteEmp(id) {
    await apiRequest(`/users/employee/${id}`, "DELETE");
    setSelected(null);
    fetchEmployees();
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  function toggleSelect(emp) {
    if (selected && selected.emp_id === emp.emp_id) {
      setSelected(null);
    } else {
      setSelected(emp);
    }
  }

  return (
    <>
      <Navbar user={{ full_name: "Admin" }} />

      <div className="container mt-4">
        <div className="row">

          {/* CARD GRID */}
          <div className={selected ? "col-lg-8 col-md-12" : "col-12"}>
            <div className="row g-3">
              {emps.map((emp) => (
                <div className="col-sm-6 col-md-4" key={emp.emp_id}>
                  <div
                    className={
                      "card h-100 shadow-sm hover-shadow " +
                      (selected?.emp_id === emp.emp_id
                        ? "border-primary border-3"
                        : "")
                    }
                    onClick={() => toggleSelect(emp)}
                    style={{ cursor: "pointer" }}
                  >
                     <div className="card-body text-center p-2 ">
                      <small className="text-muted">
                        {emp.company_name}
                      </small>
                    </div>
                    <div
                      className="card-img-top d-flex align-items-center justify-content-center"
                      style={{ height: "140px" }}
                    >
                      <img
                        src={
                          emp.photo_url ||
                          "https://via.placeholder.com/300x200?text=No+Image"
                        }
                        alt={emp.full_name}
                        className="w-100"
                        style={{
                          objectFit: "contain",
                          maxHeight: "140px",
                        }}
                      />
                    </div>
                    <div className="card-body text-center p-2">
                      <h4>{emp.full_name}</h4>
                      <p>{emp.emp_id}</p>
                    </div>

                   
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DETAILS SIDEBAR */}
          {selected && (
            <div className="col-lg-4 col-md-12 mt-3 mt-lg-0">
              <div className="border p-3 shadow-sm">
                <h5 className="text-center mb-3">{selected.full_name}</h5>

                <div className="text-center mb-3">
                  <img
                    src={
                      selected.photo_url ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={selected.full_name}
                    className="img-fluid rounded"
                    style={{ objectFit: "contain", maxHeight: "250px" }}
                  />
                </div>

                <p>
                  <strong>Employee ID:</strong> {selected.emp_id}
                </p>
                <p>
                  <strong>Email:</strong> {selected.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selected.phone}
                </p>
                <p>
                  <strong>Address:</strong> {selected.address}
                </p>

                <button
                  className="btn btn-danger w-100 mt-3"
                  onClick={() => deleteEmp(selected.id)}
                >
                  Delete Employee
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hover Shadow Style */}
      <style>{`
        .hover-shadow:hover {
          transform: scale(1.02);
          box-shadow: 0px 8px 20px rgba(0,0,0,0.15);
          transition: 0.2s ease;
        }
      `}</style>
    </>
  );
}