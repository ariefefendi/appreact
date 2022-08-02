// NOTE :
// #5 Fetching data dengan useEffect
// fungsi = hampir sama dengan component
import React, { useEffect, useState } from 'react';

import axios from 'axios';
// import ReactDOM from 'react-dom'
import {Button, Form, Tab, Tabs} from 'react-bootstrap';
import swal from 'sweetalert';

import DataTable from 'react-data-table-component';
import helpers from '../components/helpers';
import $ from 'jquery';

function App() {
  const [dataModel, setDataModel] = useState([])
  const [dataModelUpdate, setDataModelUpdate] = useState([]);
  const [processing, modeProcessing] = useState(false)
  const [search, setSearch] = useState("")
  const [toggleCleared, setToggleCleared] = React.useState(false)
  const [selectedRows, setSelectedRows] = React.useState([])
  const [mode, setMode] = useState('form')
  const [update, setUpdate] = useState(false);

  const [title, setTitle] = useState("List data Pengguna")

  const [IDPENGGUNA, setIDPENGGUNA] = useState("")
  const [NAMADEPAN, setNAMADEPAN] = useState("")
  const [HP, setHP] = useState("")
  const [KEC, setKEC] = useState("")

  // function selected data of
  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  // function back
  const goBack = (key) => {
    setMode('list')
    setupTitle(update)
    console.log(mode)
    setUpdate(false);
    setDataModelUpdate([]);
    console.log(" ========== ");
    console.log("mode : "+mode+", Mode_update : "+update);
  }
  // button mode Update
  const ButtonMode = () => {
    return (
      (update == true) ?
      <div className="py-2">
      <Button type="button" onClick={(key) => goBack('list')} variant="outline-secondary">Back</Button>
      <Button type="button"
      onClick={(key) => doSave(dataModelUpdate)}
      variant="outline-primary mx-2" >Update</Button>
      <Button type="button" variant="outline-danger">Delete</Button>
      </div>
      :
      <div className="py-2">
      <Button type="button"
      onClick={(key) => doSave(dataModelUpdate)}
      variant="outline-primary">Save</Button>
      </div>
    )
  }

  // get data all
  const getdataAll = async page => {
    modeProcessing(true)
    // const res = await axios.get(`https://restcountries.com/v2/all`)
    const res = await axios.get(`https://aplikasi.whusnet.com/contoh/ApiContoh/getallpengguna`)
      console.log(res.data)
      setDataModel(res.data.Data)
      setDataModelUpdate(res.data.Data)
      modeProcessing(false)
    };

    // logic conditions per field.
    const conditionalRowStyles = [
      { when: row => row.KEC == 'PONOROGO',  style: helpers.green() },
      { when: row => row.KEC == 'KAUMAN',style: helpers.warning() }
    ]

    // action for delete.
    const contextActions = React.useMemo((result) => {
      const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(row => selectedRows.NAMADEPAN)}?`)) {
          console.log(selectedRows);
          setToggleCleared(!toggleCleared);
          setDataModel(dataModel, selectedRows, 'numberCode');
        }
      };
      return (
        <button key="delete" className="btn btn-sm btn-danger" name="delete"
        onClick={handleDelete}
        style={{ backgroundColor: 'red' }}>
        Delete
        </button>
      );
    }, [dataModel, selectedRows, toggleCleared]);

    // for search data
    const getFilterDataAll = (search) => {
      const result = dataModel.filter((dataModel) => {
        return dataModel.NAMADEPAN.toLowerCase().match(( search.toLowerCase() ));
      });
      setDataModel(result);
    }

    // save and update data
    const doSave = (data) => {
      // check mode update ?
      if (update == true) {
        setDataModelUpdate(data)
        setupTitle(update)
        swal("This data will be change!", dataModelUpdate.IDPENGGUNA+" - "+dataModelUpdate.NAMADEPAN);
      } else {
        let data = {
          NAMADEPAN:NAMADEPAN,
          KEC:KEC,
          HP:HP,
        }
        console.log(data)
      }
    }

    // custom classies
    const customClassies = () => {
      $(".tab-content").addClass('px-0');
      $(".tab-pane").addClass('my-2');
      $(".jumbotron>h3").addClass('mb-0');
      $(".dataTables_filter ").addClass('pb-2');
    }

    const setupTitle = (update) => {
      if (mode === 'form' && update === true) {
        setTitle("List data Pengguna")
      }if (mode === 'list' && update === false) {
        setTitle("Form Update same data")
      }
    }

    // function select
    const selectId = (result) => {
      modeProcessing(true)
      setMode('form')
      setupTitle(update)
      setUpdate(true)
      setDataModelUpdate(result)
      console.log(" ============ ")
      console.log(result)
      console.log("result : "+result)
      console.log("getdataId : "+result.IDPENGGUNA)
      console.log("mode : "+mode+", Mode_update : "+update)
      modeProcessing(false)
    }

    useEffect(() => {
      search ? getFilterDataAll(search) : getdataAll();
      setupTitle(update)
      setMode('list')
    }, [search]);

    const columns = [
      {
        name: 'NAME', selector: row => row.NAMADEPAN,
        sortable: true,
        filterable: true,
        conditionalCellStyles: conditionalRowStyles
      },
      {
        name: 'KEC', selector: row => row.KEC,
        sortable: true,
        conditionalCellStyles: conditionalRowStyles
      },
      {
        name: 'HP', selector: row => row.HP,
        sortable: true,
        conditionalCellStyles: conditionalRowStyles
      },
      // {
      //   name: 'FLAG', selector: row => <img src={row.flag} width={65} height={65} className="img-thumbnail rounded mx-auto" />,
      //   sortable: false,
      //   conditionalCellStyles: conditionalRowStyles
      // },
      {
        name: 'ACTION',
        cell: (row) => (
          <button
          className="btn btn-sm btn-warning d-flex flex-column align-items-center"
          // onClick={() => alert(row.IDPENGGUNA) }
          onClick={(key) => selectId(row)}
          > Edit </button>
        ),
        conditionalCellStyles: conditionalRowStyles
      }
    ];

    // adding initialize
    $(document).ready(function () {
      customClassies();
    })

    return(
      <div className="container MainDiv">
        <div className="row pt-3">
          <h3>{title}</h3>
          <Tabs id="controlled-tab-example" activeKey={mode}
          onSelect={(key) => setMode(key)}
          className="ps-0" >
          <Tab eventKey="form" title="Add new">
        <div className="jumbotron text-left">
      <div>
      { <ButtonMode /> }

      <div>
      <Form.Group className="mb-3">
      <Form.Label>IDPENGGUNA : </Form.Label>
      <Form.Control placeholder="Numeric Code here" disabled
      type="text"
      value={ update ? dataModelUpdate.IDPENGGUNA : IDPENGGUNA }
      onChange={(e) => setIDPENGGUNA(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
      <Form.Label>Name : </Form.Label>
      <Form.Control placeholder="Name here"
      type="text"
      value={ update ? dataModelUpdate.NAMADEPAN : NAMADEPAN }
      onChange={(e) => setNAMADEPAN(e.target.value)} />
      </Form.Group>


      <Form.Group className="mb-3">
      <Form.Label>KEC : </Form.Label>
      <Form.Control placeholder="Population here"
      value={ update ? dataModelUpdate.KEC : KEC }
      onChange={(e) => setKEC(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
      <Form.Label>HP : </Form.Label>
      <Form.Control placeholder="Region here"
      value={ update ? dataModelUpdate.HP : HP }
      onChange={(e) => setHP(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
      <Form.Label>Inserted At : </Form.Label>
      <Form.Control placeholder="Timezones here" disabled
      value={ update ? dataModelUpdate.inserted_at : "" } />
      </Form.Group>

      </div>
      </div>
      </div>
      </Tab>

      <Tab eventKey="list" title="List">
      <div className="jumbotron text-left">
      </div>
      <div className="container px-0">
      <DataTable
      // title="Users"
      columns={columns}
      data={dataModel}
      // data={filteredName}
      progressPending={processing}
      contextActions={contextActions}
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      pagination
      // paginationServer
      // paginationTotalRows={totalRows}
      // onChangeRowsPerPage={handlePerRowsChange}
      // onChangePage={handlePageChange}
      fixedHeader
      fixedHeaderScrollHeight="550px"
      selectableRows
      selectableRowsHightlight
      hightlightOnHover
      actions={ <button className="btn btn-sm btn-primary d-flex flex-column align-items-center" onClick={() => alert('export data here') } > Export data </button> }
      subHeader
      subHeaderComponent={ <input type="text" placeholder="Search Here.." className="form-control w-25"
      value={search}
      onChange={(e) => setSearch(e.target.value)} /> }
      onCancelSearch={() => setSearch('')}
      subHeaderAlign="left" />
      </div>

      </Tab>

      </Tabs>
      </div>
      </div>
    );





  }

  export default App;
