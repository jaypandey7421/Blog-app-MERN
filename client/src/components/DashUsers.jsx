import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './styles/dashPosts.css'

export default function DashUsers() {
    const {currentUser} = useSelector((state)=> state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [deleteWarning, setDeleteWarning] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    useEffect(()=>{
        const fetchUsers = async ()=>{
            try{
                const res = await fetch(`/api/user/getusers`);
                const data = await res.json();

                if(res.ok){
                    setUsers(data.users);
                    if(data.users.length < 9){
                        setShowMore(false);
                    }
                }
            }catch (err){
                console.log(err.message);
            }
        };

        if(currentUser.isAdmin){
            fetchUsers();
        }
    }, [currentUser._id]);

    const handleShowMore = async ()=>{
        const statrtIndex = users.length;
        try{
            const res = await fetch(`/api/user/getusers?startIndex=${statrtIndex}`);
            const data = await res.json();
            if(res.ok){
                setUsers((pre)=> [...pre, ...data.users]);
                if(data.users.length < 9){
                    setShowMore(false)
                }
            }
        }catch(err){
            console.log(err.message);
        }
    };

    const handleDeleteUser = async ()=>{
        try{
            const res = await fetch(`/api/user/delete/${userIdToDelete}`,{
                method: 'DELETE',
            });
            const data = await res.json();

            if(res.ok){
                setUsers((pre)=> (
                    pre.filter((user)=> user._id !== userIdToDelete)
                ));
                setDeleteWarning(false);
            }else{
                console.log(data.message);
            }
        }catch (err){
            console.log(err.message);
        }
    }

  return (
    <div className="users">
        {(currentUser.isAdmin && users.length > 0) && (
            <table>
                <thead>
                    <tr>
                        <td>Date created</td>
                        <td>User image</td>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Admin</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=> (
                        <tr key={user._id}>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>
                                <img src={user.profilePicture} alt="user" />
                            </td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? (
                                    <i className="fa-solid fa-check"></i>
                                ):(
                                    <i className="fa-solid fa-x"></i>
                                )}
                            </td>
                            <td>
                                <span onClick={()=>{
                                    setDeleteWarning(true);
                                    setUserIdToDelete(user._id)
                                }}>
                                    Delete
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        {showMore && (
            <p className='show-more' onClick={handleShowMore}> Show more...</p>
        )}
        {deleteWarning && (
            <div className="pop-up-warning">
              <h4>
                <i className="fa-solid fa-xmark" 
                  onClick={()=> setDeleteWarning(false)}>
                </i>
              </h4>
              <span><i className="fa-solid fa-circle-exclamation"></i></span>
              <p>Are you sure you wanna delete the user?</p>
              <button className='dlt-user' onClick={handleDeleteUser} >Yes</button>
              <button 
                className='cancel-dlt' 
                onClick={()=> setDeleteWarning(false)}>
                  Cancel
              </button>
            </div>
        )}
    </div>
  )
}
