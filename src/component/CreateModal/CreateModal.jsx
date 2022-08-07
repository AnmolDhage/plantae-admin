import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useFetch from '../../hooks/useFetch';
import { TextField } from '@mui/material';
import "./../EditModal/editModal.css"
import axios from 'axios';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";


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

export default function CreateModal({ open, setOpen, reFetch }) {
  const [files, setFiles] = React.useState("");
  const handleClose = () => setOpen(false);
  const [plantData, setPlantData] = React.useState({})

  const handleChange = (e) => {
    setPlantData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }


  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(Object.values(files).map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dzfhjz1bs/image/upload", data);
        const { url } = uploadRes.data;
        return url;
      }))
      const newPlant = {
        ...plantData,
        photos: list,
      }
      await axios.post("/plants", newPlant)

      setOpen(false);
      reFetch()

    } catch (e) {
      console.log(e);
    }
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
          <div>
            <h2>Create</h2>


            <div className="edit-form">
              <div className="formInput">
                <label htmlFor="file" style={{ display: "flex" }}>
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              <TextField
                id="name" onChange={e => handleChange(e)} label="Name" variant="standard" />

              <TextField
                id="availableQuantity" type="number" onChange={e => handleChange(e)} label="Quantity" variant="standard" />

              <TextField
                id="discount" type="number" onChange={e => handleChange(e)} label="Discount" variant="standard" />

              {/* <TextField
                id="featured" onChange={e => handleChange(e)} label="Featured" variant="standard" /> */}

              <TextField
                id="vendor" onChange={e => handleChange(e)} label="Vendor" variant="standard" />

              <TextField
                id="rating" type="number" onChange={e => handleChange(e)} label="Rating" variant="standard" />

              <TextField
                id="price" type="number" onChange={e => handleChange(e)} label="Price" variant="standard" />

              <TextField
                id="type" onChange={e => handleChange(e)} label="Type" variant="standard" />

              <TextField
                id="desc" onChange={e => handleChange(e)} label="Description" variant="standard" />

              <Button onClick={handleCreate} variant="contained">Create</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
