import { Button } from '@mui/material'
import axios from 'axios';
import React from 'react'
import EditModal from '../EditModal/EditModal';
import "./selectedItems.css"

const SelectedItems = ({ id, reFetch }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpen = () => setOpenEdit(true);

  const handleDelete = async () => {
    try {
      await axios.delete(`/plants/${id}`)
      reFetch()
    } catch (e) { console.log(e.message); }
  }

  return (
    <>
      <EditModal
        open={openEdit}
        setOpen={setOpenEdit}
        id={id}
        reFetch={reFetch}
      />
      <div id={id} className="selected-row">


        <div>{id}</div>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <Button variant="contained" color="error" size="small" onClick={handleDelete}>Delete</Button>
          <Button variant="contained" size="small" onClick={handleOpen}>Edit</Button>
        </div>
      </div>
    </>
  )
}

export default SelectedItems