// NOTE :
// #5 Fetching data dengan useEffect
// fungsi = hampir sama dengan component
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ReactDOM from 'react-dom'
import DataTable from 'react-data-table-component';
import helpers from '../components/helpers';

function App() {

  const [dataModel, setDataModel] = useState([]);
  const [processing, modeProcessing] = useState(false);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const getdataAll = async page => {
    modeProcessing(true);
    const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);
      setDataModel(response.data.data);
      setTotalRows(response.data.total);
      modeProcessing(false);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
      modeProcessing(true);
      const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);
        setDataModel(response.data.data);
        setPerPage(newPerPage);
        modeProcessing(false);
      };

      const handlePageChange = page => {
        getdataAll(page);
      };

      // logic conditions per field.
      const conditionalRowStyles = [
        { when: row => row.first_name == 'George',  style: helpers.green() },
        { when: row => row.first_name == 'Eve',     style: helpers.warning() },
        { when: row => row.first_name == 'Tobias',  style: helpers.warning() }
      ]

      const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
      }, []);

      const contextActions = React.useMemo(() => {
        const handleDelete = () => {

          if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(row => row.id)}?`)) {
            setToggleCleared(!toggleCleared);
            setDataModel(dataModel, selectedRows, 'id');
          }
        };

        return (
          <button key="delete" name="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
          Delete
          </button>
        );
      }, [dataModel, selectedRows, toggleCleared]);

      useEffect(() => {
        getdataAll(1); // fetch page 1 of users
      }, []);


      const columns = [
        {
          name: 'NAME', selector: row => row.first_name,
          sortable: true,
          filterable: true,
          conditionalCellStyles: conditionalRowStyles
        },
        {
          name: 'E-MAIL', selector: row => row.email,
          sortable: true
        }
      ];

      var materialGrid =
      <DataTable
      // selectableRows
      title="Users"
      columns={columns}
      data={dataModel}
      progressPending={processing}
      selectableRows
      contextActions={contextActions}
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      />;

      return(materialGrid);

    }

    export default App;
