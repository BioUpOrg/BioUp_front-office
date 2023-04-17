import { BsTrash, BsInfoCircle } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useState, useEffect } from "react";
import { deleteCompost, getSellerComposts } from "../../services/compostService";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCompostDetails } from "../../store/composts";
import Swal from 'sweetalert2';


export default function Composts() {
  const [composts, setComposts] = useState([]);

  useEffect(() => {
    const fetchComposts = async () => {
      const data = await getSellerComposts();
      setComposts(data);
    };
    fetchComposts();
  }, []);

const handleDeleteClick = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this compost!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    await deleteCompost(id);
    setComposts((prevComposts) =>
      prevComposts.filter((compost) => compost._id !== id)
    );
    Swal.fire(
      'Deleted!',
      'Your compost has been deleted.',
      'success'
    );
  }
};


  return (
    <div className="table-responsive">
      <h4>My composts</h4>
      <table className="table">
        <thead>
          <tr>
            <th>image</th>
            <th>name</th>
            <th>quantity</th>
            <th>price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {composts.map((compost) => (
            <CompostRow
              key={compost._id}
              compost={compost}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompostRow({ compost, onDeleteClick }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    onDeleteClick(compost._id);
  };

  const handleCompostDetails = () => {
    dispatch(setCompostDetails(compost));
    console.log(compost);
  };
  return (
    <>
      <tr>
        <td>
          <img src={compost.image} alt="compost" width={60} height={60} />
        </td>
        <td>{compost.name}</td>
        <td>{compost.quantityWeight}</td>
        <td>{compost.unitPrice * compost.quantityWeight}</td>
        <td className="text-center">
          <BsTrash
            size={20}
            color="#FF0000"
            style={{ cursor: "pointer" }}
            onClick={handleDelete}
          />
          <NavLink to={`/Dashboard/compost-Form/${compost._id}`}>
            <FiEdit
              size={20}
              color="#FFA500"
              style={{ cursor: "pointer", marginInline: "10px" }}
            />
          </NavLink>
          <NavLink to={"/Dashboard/compost-Details/Description"} >
            <BsInfoCircle
              size={20}
              color="#00FF00"
              style={{ cursor: "pointer" }}
              onClick={handleCompostDetails}
            />
          </NavLink>
        </td>
      </tr>
    </>
  );
}
