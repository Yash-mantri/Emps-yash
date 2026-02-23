import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { apiRequest } from "../utils/api";

export default function User() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    address: ""
  });

  async function fetchUser() {
    const result = await apiRequest("/users/me", "GET");
    setUser(result);
    setFormData({ phone: result.phone, address: result.address });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await apiRequest("/users/me", "PUT", formData);
    setEditing(false);
    fetchUser();
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar user={user} />

      {user && (
        <div className="container mt-4">
          <div className="row align-items-center">
            
            {/* Image Left */}
            <div className="col-md-4 text-center mb-3">
              <img
                src={user.photo_url || "https://via.placeholder.com/250x250"}
                alt={user.full_name}
                className="img-fluid rounded shadow-sm"
                style={{ objectFit: "contain", maxHeight: "250px" }}
              />
              <p></p>
              <h3>{user.company_name}</h3>
            </div>

            {/* Details Right */}
            <div className="col-md-8">
              <h2 className="mb-2">{user.full_name}</h2>
              <p><strong>Employee ID:</strong> {user.emp_id}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Company:</strong> {user.company_name}</p>

              {!editing ? (
                <>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Address:</strong> {user.address}</p>

                  {/* Edit Button */}
                  <button
                    className="btn btn-success"
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="mt-3">

                  {/* Phone Input */}
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Address Input */}
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Submit & Cancel */}
                  <button type="submit" className="btn btn-primary me-2">
                    Update Profile
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}