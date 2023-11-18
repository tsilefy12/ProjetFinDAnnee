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

function EditerAbsence() {
  const navigate = useNavigate();

  const { id } = useParams()
  const [numAbs, setNumAbs] = useState("")
  const [impersoo, setImpersoo] = useState("")
  let [nomprenom, setNomprenom] = useState("")
  const [motifabs, setMotifabs] = useState("")
  let [duree, setDuree] = useState("")
  const [datedebut, setDatedebut] = useState("")
  let [datefin, setDatefin] = useState("")
  const [lieu, setlieu] = useState("")
   
  let firtsDate = new Date(datedebut).getTime();
    
  let oneDay = 24*60*60*1000;

  let test= ((duree * oneDay) + firtsDate);
  let test2=new Date(test);
  let test3 = test2.toLocaleDateString('en-US');
  if (duree === "") {
    datefin="";
  }else{
    datefin=test3;
    console.log("date", test3);
  }
  useEffect(()=>{
    fetchAbs()
  }, [])
  const fetchAbs = async () => {
    await axios.get(`http://127.0.0.1:8000/api/editAbsence/${id}`).then(({data})=>{
      const {numAbs, impersoo, nomprenom, motifabs, duree, datedebut,datefin,lieu} = data
      setNumAbs(numAbs)
      setImpersoo(impersoo)
      setNomprenom(nomprenom)
      setMotifabs(motifabs)
      setDuree(duree)
      setDatedebut(datedebut)
      setDatefin(datefin)
      setlieu(lieu)
    })
  }
  const updateAbs = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'PUT');
    formData.append('numAbs', numAbs)
    formData.append('impersoo', impersoo)
    formData.append('nomprenom', nomprenom)
    formData.append('motifabs', motifabs)
    formData.append('duree', duree)
    formData.append('datedebut', datedebut)
    formData.append('datefin', datefin)
    formData.append('lieu', lieu)
     
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

    await axios.post(`http://localhost:8000/api/modifAbs/${id}`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/presence");
    })
}
  return (
    <div>
        <Navbar/>
        <div className="container" id="ajoutConge">
        <div className="row justify-content-center">
              <div className="selection">
                  <div className="card-body">
                      <h4 className="card-title">Enregistrer nouvelle autorisation d'absence <label id='test'></label><span id='sp'></span></h4>
                      
                      <hr/>
                      <div className="form-wrapper">
                          <Form onSubmit={updateAbs}>
                            <div className="form-group">
                            <div className='havia'>
                            <Row>
                              <Col>
                              <Form.Group controlId="Name">
                                <Form.Label className="soratra">Numéro d'absence</Form.Label>
                                <Form.Control type="number" value={numAbs} onChange={(event)=>{
                                  setNumAbs(event.target.value)
                                }} required="required" className="daty"/>
                              </Form.Group>
                              </Col>
                          </Row>
                          <Row>
                              <Col>
                              <Form.Group controlId="Name">
                                <Form.Label className="soratra">Matricule</Form.Label>
                                <Form.Control type="text" value={impersoo} onChange={(event)=>{
                                  setImpersoo(event.target.value)
                                }} required="required" className="daty"/>
                              </Form.Group>
                              </Col>
                          </Row>
                        <Row>
                            <Col>
                              <Form.Group controlId="Nombre">
                                <Form.Label className="soratra">Nom et prénom(s)</Form.Label>
                                <Form.Control type="text" value={nomprenom} onChange={(event)=>{
                                  setNomprenom(event.target.value)
                                }} required="required"  className="daty"/>
                              </Form.Group>
                            </Col>
                        </Row>
                      <Row>
                            <Col>
                              <Form.Group controlId="Debut">
                                <Form.Label className="soratra">Motif</Form.Label>
                                <Form.Control type="text" value={motifabs} onChange={(event)=>{
                                  setMotifabs(event.target.value)
                                }} required="required"  className="daty"/>
                              </Form.Group>
                            </Col>
                        </Row>
                        </div>
                        <div className='havanana'>
                        <Row>
                            <Col>
                              <Form.Group controlId="Fin">
                                <Form.Label className="soratra">Duree</Form.Label>
                                <Form.Control type="number" value={duree} onChange={(event)=>{
                                  setDuree(event.target.value)
                                }} required="required"  className="daty"/>
                              </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group controlId="Destination">
                              <Form.Label className="soratra">Date debut</Form.Label>
                              <Form.Control type="date" value={datedebut} onChange={(event)=>{
                                setDatedebut(event.target.value)
                              }} required="required"  className="daty"/>
                            </Form.Group>
                          </Col>
                      </Row>
                        <Row>
                          <Col>
                            <Form.Group controlId="Destination">
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
                              <Form.Label className="soratra">Lieu</Form.Label>
                              <Form.Control type="text" value={lieu} onChange={(event)=>{
                                setlieu(event.target.value)
                              }} required="required"  className="daty"/>
                            </Form.Group>
                          </Col>
                      </Row>
                        </div>
                        <button  className="btn btn-primary mt-2 float-start" size="lg" block="block" type="submit"><FaIcons.FaRegEdit></FaIcons.FaRegEdit> Modifier</button>
                        <Link to={'/presence'} className="btn btn-danger float-end mt-2"><IoIcons.IoMdArrowRoundBack></IoIcons.IoMdArrowRoundBack>Retour</Link>
                        </div>
                        </Form>
                      </div>
                  </div>
              </div>
          </div>
    </div>
    </div>
  )
}

export default EditerAbsence