import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useFetch from '../../hooks/useFetch';
import { Switch, TextField } from '@mui/material';
import "./editModal.css"
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
};

export default function EditModal({ open, setOpen, id, reFetch }) {

  const handleClose = () => setOpen(false);
  const { data, loading } = useFetch(`/plants/${id}`)
  const [checked, setChecked] = React.useState(false);

  const handleChecked = (event) => {
    setChecked(event.target.checked);
    setPlantData(prev => ({
      ...prev,
      featured: !checked
    }))
  };

  const [plantData, setPlantData] = React.useState({
    name: data?.name,
    featured: data?.featured,
    discount: data?.discount,
    desc: data?.desc,
    availableQuantity: data?.availableQuantity,
    rating: data?.rating,
    type: data?.type,
    vendor: data?.vendor,
    price: data?.price
  })

  React.useEffect(() => {

    setPlantData(prev => ({
      ...prev, name: data?.name,
      featured: data?.featured,
      discount: data?.discount,
      desc: data?.desc,
      availableQuantity: data?.availableQuantity,
      rating: data?.rating,
      type: data?.type,
      vendor: data?.vendor,
      price: data?.price
    }));

    setChecked(data?.featured)

  }, [data])

  const handleChange = (e) => {
    setPlantData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/plants/${id}`, plantData)
      setOpen(false)
      reFetch()
    } catch (e) { console.log(e.message) }
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? "Loading" : <div>
            <h2>{data?.name}</h2>
            <div className="edit-form">
              <TextField
                id="name" onChange={e => handleChange(e)} defaultValue={plantData?.name} label="Name" variant="standard" />

              <TextField
                id="availableQuantity" onChange={e => handleChange(e)} defaultValue={plantData?.availableQuantity} label="Quantity" variant="standard" />

              <TextField
                id="discount" onChange={e => handleChange(e)} defaultValue={plantData?.discount} label="Discount" variant="standard" />

              {/* <TextField
                id="featured" onChange={e => handleChange(e)} defaultValue={plantData?.featured} label="Featured" variant="standard" /> */}

              <TextField
                id="vendor" onChange={e => handleChange(e)} defaultValue={plantData?.vendor} label="Vendor" variant="standard" />

              <TextField
                id="rating" onChange={e => handleChange(e)} defaultValue={plantData?.rating} label="Rating" variant="standard" />

              <TextField
                id="price" onChange={e => handleChange(e)} defaultValue={plantData?.price} label="Price" variant="standard" />

              <TextField
                id="type" onChange={e => handleChange(e)} defaultValue={plantData?.type} label="Type" variant="standard" />

              <TextField
                id="desc" onChange={e => handleChange(e)} defaultValue={plantData?.desc} label="Description" variant="standard" />
              <div>
                <span>Featured</span>
                <Switch
                  label="featured"
                  checked={checked}
                  onChange={handleChecked}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>

              <Button onClick={handleEdit} variant="contained">Edit</Button>
            </div>
          </div>}
        </Box>
      </Modal>
    </div>
  );
}
