import React, { useEffect, useState } from "react";
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";

function AdminViewAllUsers() {
  const [userId, setUserId] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewUsers`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setUserId(res.data.data);
        } else {
          console.log("Failed to fetch user data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch user data");
      });
  }, []);

  const handleReject = (userId) => {
    axiosInstance
      .post(`/deleteUserById/${userId}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success('Removed');
          setUserId((prevData) =>
            prevData.filter((user) => user._id !== userId)
          );
        } else {
          toast.error("Failed to Removed");
        }
      })
      .catch(() => {
        toast.error("Failed to Removed");
      });
  };

  return (
    <div>
      {userId.length > 0 ? (
        <table className="table table-dark table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Contact</th>
              <th scope="col">Genres</th>
              <th scope="col">Languages</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {userId.map((user) => {
              return (
                <tr key={user._id}>
                  <th>{user.name}</th>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td>
                    {user.preferredGenre
                      ? user.preferredGenre.map((genre, index) => (
                          <span key={index}>
                            {genre}
                            {index < user.preferredGenre.length - 1 && ", "}
                          </span>
                        ))
                      : ""}
                  </td>
                  <td>
                    {user.preferredLanguages
                      ? user.preferredLanguages.map((language, index) => (
                          <span key={index}>
                            {language}
                            {index < user.preferredLanguages.length - 1 && ", "}
                          </span>
                        ))
                      : ""}
                  </td>
                  <td>
                    <button type="button" className="btn btn-outline-danger" onClick={()=>{handleReject(user._id)}}>
                      <i class="ri-delete-bin-6-line"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="no_data_found">
          <p>No Users Found</p>
        </div>
      )}
    </div>
  );
}

export default AdminViewAllUsers;
