import React, { useEffect, useState } from 'react';
import './CSS/MisServicios.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const MisServicios = () => {
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);


  /*Nos conectamos a la API y consumimos los datos*/
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/mjarancibiasuazo/portal-clientes/main/mis-servicios')
      .then(response => response.json())
      .then(data => {
        const rowsWithIds = data.data.map((row, index) => ({ ...row, id: index + 1 }));
        setRows(rowsWithIds);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  /*Función que abre Modal*/
  const handleCellClick = (params) => {
    const field = params.field;
    const value = params.value;
    if (field === 'estado_proforma' && value === 'Resolución') {
      setOpenModal(true);
      setSelectedRowData(params.row);
    }
  };

  /*Función cerrar modal*/
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  
  /*Función para escribir en Textarea  */
  const handleTextareaChange = (event) => {
    setComment(event.target.value);
  };

  //Función para agrgar comentario
  const handleAddComment = () => {
    setComments([...comments, comment]);
    setComment('');
  };

  const columns = [
    { field: 'fecha_contable_nv', headerName: 'Fecha Contable NV', width: 150 },
    { field: 'destino', headerName: 'Destino', width: 100 },
    { field: 'patente_tracto', headerName: 'Tracto', width: 100 },
    { field: 'patente_rampla', headerName: 'Rampla', width: 100 }, 
    { field: 'servicio', headerName: 'Servicio', width: 100 },
    { field: 'estado_de_servicio', headerName: 'Estado de Servicio', width: 150 },
    { field: 'documentacion_viaje', headerName: 'Documentación Viaje', width: 150 },
    { field: 'valor_servicio', headerName: 'Valor Servicio', width: 150 },
    { 
      field: 'estado_proforma',
      headerName: 'Estado Proforma',
      width: 150,
      renderCell: (params) => (
        <div style={{ color: params.value === 'Resolución' ? 'blue' : 'inherit', textDecoration: params.value === 'Resolución' ? 'underline' : 'none' }}>
          {params.value}
        </div>
      )
    },
    { field: 'numero_orden_compra', headerName: 'Número Orden Compra', width: 150 },
    { field: 'numero_factura', headerName: 'Número Factura', width: 150 },
    { field: 'estado_factura', headerName: 'Estado Factura', width: 100 },
    { field: 'fecha_emision_factura', headerName: 'Fecha Emisión Factura', width: 100 },
  ];

  return (
    <div className='misservicios-background'>
      <div className='misservicios-content'>
        <h1>Mis Servicios</h1>
        <div className='filter-container'>
          {/* Acá va DatePicker con rango de fechas */}
        </div>
      </div>
      <div className='misservicios-container'>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            onCellClick={handleCellClick}
            getRowId={(row) => row.id}
          />
        </Box>
        <Stack direction="row-reverse" spacing={2} style={{ padding: '20px' }}>
          <Button variant="contained" color="success">Descargar en Excel</Button>
        </Stack>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Paper sx={{ p: 2, width: 400 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
              Foro
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {selectedRowData && (
                <>
                  <p>Servicio: { selectedRowData.servicio }</p>
                  <p>Patente: { selectedRowData.patente_tracto }</p>
                  
                  <div style={{ marginTop: '20px' }} />
                  {/* Área de texto para escribir comentarios */}
                  <TextField
                    id="outlined-multiline-static"
                    label="Escriba su comentario"
                    multiline
                    rows={4}
                    fullWidth
                    value={comment}
                    onChange={handleTextareaChange}
                  />
                  {/* Botón para enviar comentario */}
                  <Button onClick={handleAddComment} variant="contained" color="primary" style={{ marginTop: '10px' }}>
                    Enviar
                  </Button>
                  {/* Mostrar comentarios */}
                  <Typography variant="h6" component="h3" style={{ marginTop: '20px' }}>
                    Comentarios:
                  </Typography>
                  {comments.map((comment, index) => (
                    <Typography key={index} variant="body1" component="p" style={{ marginTop: '10px' }}>
                      {comment}
                    </Typography>
                  ))}
                </>
              )}
            </Typography>
          </Paper>
        </Box>
      </Modal>
    </div>
  );
};

export default MisServicios;


