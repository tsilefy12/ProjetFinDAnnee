import Navbar from '../compnents/Navbar'
import React, { useEffect, useState } from "react"
import Form from 'react-bootstrap/Form'
import Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate, useParams } from "react-router-dom"
import * as IoIcons from "react-icons/io"
import * as FaIcons from "react-icons/fa"
import { Link } from 'react-router-dom'
import '../compnents/Navrbar.css'
function EditConge() {
  const navigate = useNavigate();

  const { id } = useParams()

  const [num, setNum] = useState("")
  const [impers, setImpers] = useState("")
  const [nbrjrs, setNbrjrs] = useState("")
  const [datedebut, setDatedebut] = useState("")
  let [datefin, setDatefin] = useState("")
  const [destination, setDestination] = useState("")

  let firtsDate = new Date(datedebut).getTime();
    
  let oneDay = 24*60*60*1000;

  let test= ((nbrjrs * oneDay) + firtsDate);
  let test2=new Date(test);
  let test3 = test2.toLocaleDateString('en-US');
  if (nbrjrs === "") {
    datefin="";
  }else{
    datefin=test3;
    console.log("date", test3);
  }
  useEffect(()=>{
    fetchConge()
  }, [])

  const fetchConge = async () => {
    await axios.get(`http://127.0.0.1:8000/api/editConge/${id}`).then(({data})=>{
      const {num, impers, nbrjrs, datedebut, datefin, destination} = data
      setNum(num)
      setImpers(impers)
      setNbrjrs(nbrjrs)
      setDatedebut(datedebut)
      setDatefin(datefin)
      setDestination(destination)
    })
  }
  const updateConge = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'PUT');
    formData.append('num', num)
    formData.append('impers', impers)
    formData.append('nbrjrs', nbrjrs)
    formData.append('datedebut', datedebut)
    formData.append('datefin', datefin)
    formData.append('destination', destination)
     
    const isConfirm = await Swal.fire({
      title: 'Voulez-vous Modifier?',
      text: "Vous pouvez annuler cette action!",
      icon: 'warning', 
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirButtonText: 'Yes, delete it!',     
    }).then((result) => {
      return result.isConfirmed
    });
    if (!isConfirm) {
      return;
    }

    await axios.post(`http://localhost:8000/api/modifConge/${id}`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/conge");
    })
}
  return (
 
    <div>
        <Navbar/>
        <div className="container" id="editPer">
        <div className="row justify-content-center">
                  <div className="card-body">
                      <h4 className="card-title">Modifier les informations du congé</h4>
                      <hr/>
                      <div className="form-wrapper">
                          <Form onSubmit={updateConge}>
                            <div className="form-group">
                            <div className='havia'>
                            <Row>
                              
                              <Col>
                              <Form.Group controlId="Name">
                                <Form.Label className="soratra">Numéro</Form.Label>
                                <Form.Control type="number" value={num} onChange={(event)=>{
                                  setNum(event.target.value)
                                }} required="required" className="daty"/>
                              </Form.Group>
                              </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Group controlId="Im">
                                <Form.Label className="soratra">Matricule</Form.Label>
                                <Form.Control type="text" value={impers} onChange={(event)=>{
                                  setImpers(event.target.value)
                                }} required="required" className="daty"/>
                              </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                              <Form.Group controlId="Nombre">
                                <Form.Label className="soratra">Nombre de jour</Form.Label>
                                <Form.Control type="number" value={nbrjrs} onChange={(event)=>{
                                  setNbrjrs(event.target.value)
                                }} required="required"  className="daty"/>
                              </Form.Group>
                            </Col>
                        </Row>
                        </div>
                        <div className='havanana'>
                        <Row>
                            <Col>
                              <Form.Group controlId="Debut">
                                <Form.Label className="soratra">Date debut</Form.Label>
                                <Form.Control type="date" value={datedebut} onChange={(event)=>{
                                  setDatedebut(event.target.value)
                                }} required="required"  className="daty"/>
                              </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group controlId="Fin">
                              <Form.Label className="soratra">Date fin</Form.Label>
                              <Form.Control type="text" value={datefin} onChange={(event)=>{
                                setDatefin(event.target.value)
                              }} required="required"  className="daty"/>
                            </Form.Group>
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                            <Form.Group controlId="Destination">
                              <Form.Label className="soratra">Destination</Form.Label>
                              <Form.Control type="text" value={destination} onChange={(event)=>{
                                setDestination(event.target.value)
                              }} required="required"  className="daty"/>
                            </Form.Group>
                          </Col>
                      </Row>
                        </div>
                        <button  className="btn btn-primary mt-2 float-start" size="lg" block="block" type="submit"><FaIcons.FaRegEdit></FaIcons.FaRegEdit> Modifier</button>
                        <Link to={"/conge"} className="btn btn-danger float-end mt-2"><IoIcons.IoMdArrowRoundBack></IoIcons.IoMdArrowRoundBack>Retour</Link>
                        </div>
                        </Form>
                      </div>
                  </div>
          </div>
    </div>
    </div>
  )
}

export default EditConge