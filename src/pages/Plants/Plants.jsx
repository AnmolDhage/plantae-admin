import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useFetch from "./../../hooks/useFetch"
import { columns } from "./../../utils/PlantData"
import { Button } from '@mui/material';
import SelectedItems from '../../component/SelectedItems/SelectedItems';
import CreateModal from '../../component/CreateModal/CreateModal';


export default function DataTable() {
  const { data, loading, reFetch } = useFetch("/plants")

  const [rows, setRows] = React.useState([])

  useEffect(() => {
    setRows([])
    data?.plants?.map(plant =>
      setRows(prev => [...prev, { id: plant?._id, availableQuantity: plant?.availableQuantity, discount: plant?.discount, name: plant?.name, featured: plant?.featured, price: plant?.price, rating: plant?.rating, type: plant?.type, vendor: plant?.vendor }])

    )
  }, [data])

  const [selectionModel, setSelectionModel] = useState();
  const [openCreate, setOpenCreate] = React.useState(false);
  const handleOpen = () => setOpenCreate(true);
  return (
    <>
      <h2>Plants:</h2>
      <div style={{ height: 400, width: '100%', marginTop: '15px' }}>
        <CreateModal
          open={openCreate}
          setOpen={setOpenCreate}
          reFetch={reFetch}
        />
        {loading ? "Loading..." : <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          onSelectionModelChange={(id) => {
            setSelectionModel(id);
          }}
          selectionModel={selectionModel}
        />}

        <div className="list">
          <h2>Operations</h2>
          <Button onClick={e => handleOpen()} variant="contained" size="medium" >Add New</Button>

        </div>
        <div style={{ border: "1px solid black", borderBottom: "none" }}>
          {selectionModel?.map(id =>
            <SelectedItems
              key={id}
              id={id}
              reFetch={reFetch}
            />
          )}

        </div>
      </div>
    </>
  );

}
