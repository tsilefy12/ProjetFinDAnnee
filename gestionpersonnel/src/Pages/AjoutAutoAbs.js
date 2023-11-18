import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios, { HttpStatusCode } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from '../compnents/Navbar';
import '../compnents/Navrbar.css';
import * as IoIcons from "react-icons/io"
import { Link } from 'react-router-dom'

function AjoutAutoAbs() {

  const navigate = useNavigate();
  const [numAbs, setNumAbs] = useState("")
  const [impersoo, setImpersoo] = useState("")
  let [nomprenom, setNomprenom] = useState("")
  const [motifabs, setMotifabs] = useState("")
  let [duree, setDuree] = useState("")
  const [datedebut, setDatedebut] = useState("")
  let [datefin, setDatefin] = useState("")
  const [lieu, setlieu] = useState("")
  const [validationError, setValidationError] = useState({})
   
  let firtsDate = new Date(datedebut).getTime();
    
  let oneDay = 24*60*60*1000;
  let test= ((duree * oneDay) + firtsDate);
  let test2=new Date(test);
  console.log("daty fah 2", test2);
  let test3 = test2.toLocaleDateString('en-US');
  
  if (duree === "") {
    datefin="";
  }else{
    datefin=test3;
    console.log("date", test3);
  }
   
  const creatAbsence =async(e) =>{
    e.preventDefault();
  
    const formData = new FormData()
   
    formData.append('numAbs', numAbs)
    formData.append('impersoo', impersoo)
    formData.append('nomprenom', nomprenom)
    formData.append('motifabs', motifabs)
    formData.append('duree', duree)
    formData.append('datedebut', datedebut)
    formData.append('datefin', datefin)
    formData.append('lieu', lieu)

    const isConfirm = await Swal.fire({
      title: 'Voulez-vous ajouter?',
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
    var nb;
   
    await axios.get(`http://localhost:8000/api/countNbrjoursAbs/${impersoo}`).then(({data})=>{
      nb=data;
     
   })
   console.log("donnee", nb);

   var nbr = parseInt(duree);
   var calcul = nb + nbr;
   var kajy = 15 - nb;
   console.log("kajy", calcul);
   if (kajy < 6) {
    document.getElementById("testabs").style.color="red";
    document.getElementById("testabs").style.backgroundColor="white";
  }
  if (kajy > 1) {
    document.getElementById("testabs").innerText=kajy+" jour(s) pour votre autorisation d'absence";
  }else if(kajy <= 1){
    document.getElementById("testabs").innerText=kajy+" jour pour votre autorisation d'absence";
  }
  var val=document.getElementById("testabs").innerText;
  if (val===null) {
    document.getElementById("sp").style.color="white";
  }else if(val!=null){
    document.getElementById("sp").innerText="il reste ";
  }
  //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
   if (calcul > 15) {
    Swal.fire({
      icon: "error",
      text:"Le TOTAL nombre du jour d'autorisation d'absence ne doit pas dépasser 15 jours par an, Il vous reste "+kajy+" jour(s) au maximum pour la prochaine de votre autorisation d'absence"
    })
  }else {
    await axios.post(`http://localhost:8000/api/ajoutAbsence`, formData).then(({data})=>{
      Swal.fire({
        icon: "success",
        text:data.message
      })
      navigate("/presence")
    }).catch(({response})=>{
      if (response.status===422) {
        setValidationError(response.data.errors)
        Swal.fire({
          text:"Le numéro "+numAbs+" est  déjà existe!!",
          icon:"warning",
          color: "orange"
          
        })
      } else{
        Swal.fire({
          text:"erreur",
          icon:"error"
        })
      }
  })
  }
  }
  return (
    <div>
        <Navbar/>
        <div className="container" id="ajoutConge">
        <div className="row justify-content-center">
              <div className="selection">
                  <div className="card-body">
                      <h4 className="card-title">Enregistrer nouvelle autorisation d'absence <label id='testabs'></label><span id='sp'></span></h4>
                      
                      <hr/>
                      <div className="form-wrapper">
                          <Form onSubmit={creatAbsence}>
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
                        <button  className="btn btn-primary mt-2 float-start" size="lg" block="block" type="submit"><IoIcons.IoIosAdd></IoIcons.IoIosAdd> Ajouter</button>
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

export default AjoutAutoAbs