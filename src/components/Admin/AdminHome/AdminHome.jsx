import React, { useEffect, useState } from 'react'
import './AdminHome.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const AdminHome = () => {
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:9000/api/admin/all/users').then((response) => {
      setAllUsers(response.data)
    })
  }, [allUsers])


  //Delete User Function
  const deleteUser = (userId) => {
    if (!userId) {
      toast.error('Somthing wrong ,network error')
    } else {
      //delete to user 
      axios.delete(`http://localhost:9000/api/admin/user/delete/${userId}`).then((response) => {
        if (response.data.status) {
          toast.success(response.data.message)
        }
      }).catch((err) => {
        toast.error(err)
      })
    }
  }


  return (
    <div>
      <section>
        {/* for demo wrap */}
        <h1>All Users List</h1>
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th>Code ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {
                allUsers.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td><Link to={`/admin/edit-user/${user._id}`} style={{ background: 'none', outline: 'none', borderRadius: '3px', fontWeight: 'bold', border: 'none', padding: '5px 15px', cursor: 'pointer', color: 'white', fontSize: '12px', backgroundColor: '#4671b8' }}>Edit</Link></td>
                      <td><button style={{ background: 'none', outline: 'none', border: 'none', borderRadius: '3px', fontWeight: 'bold', backgroundColor: '#c7544a', padding: '5px 15px', cursor: 'pointer', color: 'white', fontSize: '12px' }} onClick={() => deleteUser(user._id)}>Delete</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default AdminHome 