import React, { useState, useEffect } from 'react'
import '../App.css'

import { Modal, Button } from 'react-bootstrap'
import '../../src/todo.css'
const Crud = () => {
 // post
  const [Task, setTask] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://13.51.85.64:4005/api/todo", {
        method: 'POST',
        body: JSON.stringify({
          Task: Task,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const result = await response.json();
      console.log(result);
      setTask("");

      fetch("http://13.51.85.64:4005/Todo").then((result) => {
        result.json().then((resp) => {
          setData(resp);
        });
      });
    } catch (err) {

    }
  };
  // get
  const [data, setData] = useState([])
  useEffect(() => {
    fetch("http://13.51.85.64:4005/Todo").then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
  }, []);
  // delete
  async function deleteData(id) {
    let result = await fetch(`http://13.51.85.64:4005/Todo/${id}`, {
      method: "delete",
    });

    let data = await result.json();

    fetch("http://13.51.85.64:4005/Todo").then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
  }
  // edit
  const editHandleClose = () => setEditShow(false);
  const editHandleShow = () => setEditShow(true);
  const [editShow, setEditShow] = useState(false);
  const handleClose = () => setEditShow(false);
  const handleShow = () => setEditShow(true);
  
  const [Task1, setTask1] = useState("");
  const [id, setId] = useState("")
  function editDataDisplay(uid, id) {

    const filterData = data.filter((item) => {
      return item._id === id;
    });
    setTask1(filterData[0].Task);
    setId(filterData[0]._id);
  }

  async function editData() {
    let databody = {
      Task: Task1,

    };

    let result = await fetch(`http://13.51.85.64:4005/Todo/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(databody),
    });
    let data = await result.json();




    fetch("http://13.51.85.64:4005/Todo").then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
  }
  return (
    
    <div >
       <div class="container">
        <h1>ToDo App</h1>
        <div class="inputs">
          <form>
            <input type="text" placeholder="Enter Your Task" value={Task} onChange={(e) => { setTask(e.target.value) }} /><br />
            <button type='button' onClick={() => {
              handleSubmit();
            }} className='btn btn-success' style={{ marginTop: "30px" }}>Add</button>
          </form>
        </div>



        <br />
        <table

          class="table"
        >
          <thead>
            <tr>
              <th class="bl5"> #</th>
              <th class="bl5"> Task</th>
              <th class="bl5"> Action</th>



            </tr>
          </thead>
          <tbody>
            {data &&
              data
                .map((item, index) => (
                  <tr key={item._id}>
                    <td data-label="User Id">{index + 1}</td>
                    <td data-label="firstName">{item.Task}</td>
                    <td><button type='button' className='btn btn-danger' onClick={() => deleteData(item._id)}>
                      Delete</button> <button type='button' className='btn btn-info' onClick={() => {
                        editDataDisplay(item.uid, item._id);
                        editHandleShow();
                      }}>Update</button>

                      <Modal
                        size="small"
                        show={editShow}
                        onHide={editHandleClose}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Edit Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div class="container-fluid">
                            
                            <div class="d-sm-flex align-items-center justify-content-between mb-4"></div>
                            <form>
                              <div class="row">
                                <div
                                  class="col-md-2"
                                  style={{ marginTop: "6px;" }}
                                >
                                  Task
                                </div>
                                <div class="col-md-10">
                                  <div class="input-group mb-3">
                                    <div class="custom-file">
                                      <input
                                        type="text"
                                        value={Task1}
                                        onChange={(e) => {
                                          setTask1(e.target.value)
                                        }}

                                        required

                                      />

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={editHandleClose}
                          >
                            Close
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => {
                              editData(item._id);
                              editHandleClose();
                            }}
                            style={{
                              backgroundColor: "#DD3333",
                              color: "white",
                              border: "none",
                            }}
                          >
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>



                    </td>



                  </tr>
                ))}
          </tbody>
        </table>
      </div> 
    </div>
  )
}

export default Crud
