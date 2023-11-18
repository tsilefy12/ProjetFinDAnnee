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
import { DatePicker, TimePicker } from 'antd';


function AjoutAutoSortie() {
  const navigate = useNavigate();
  const [numSortie, setNumSortie] = useState("")
  const [imperso, setImperso] = useState("")
  const [nompers, setNompers] = useState("")
  let [duree, setDuree] = useState("")
  const [fonction, setFonction] = useState("")
  const [motif, setMotif] = useState("")
  const [heurdebut, setHeurdebute] = useState("")
  let [heurefin, setHeurefin] = useState("")
  let [daty, setDaty] = useState("")

  const [validationError, setValidationError] = useState({})
  
  var UneHeure=60*60*1000;

  var cal=duree * UneHeure;

  var heure=Number(heurdebut.split(':')[0])*60*60*1000+Number(heurdebut.split(':')[1])*60*1000;
  console.log("dure", cal, "ora milli", heure);
  let cal2=heure+cal;
  console.log("heure", cal2);

  let h,m,s;
  h=Math.floor(cal2/1000/60/60);
  m=Math.floor((cal2/1000/60/60 -h)*60);
  h < 10 ? h =`0${h}`: h = `${h}`
  m < 10 ? m =`0${m}`: m = `${m}`
  console.log("heure 2", `${h}:${m}`);
  let heure2=`${h}:${m}`;
  if (duree==="") {
    heurefin="";
  }else{

    heurefin=heure2;
  }

  const creatSortie =async(e) =>{
    e.preventDefault();
  
    const formData = new FormData()
   
    formData.append('numSortie', numSortie)
    formData.append('imperso', imperso)
    formData.append('nompers', nompers)
    formData.append('duree', duree)
    formData.append('fonction', fonction)
    formData.append('motif', motif)
    formData.append('heurdebut', heurdebut)
    formData.append('heurefin', heurefin)
    formData.append('daty', daty)
    
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

    await axios.post(`http://localhost:8000/api/ajoutSortie`, formData).then(({data})=>{
      Swal.fire({
        icon: "success",
        text:data.message
      })
      navigate("/presence")
    }).catch(({response})=>{
      if (response.status===422) {
        setValidationError(response.data.errors)
        Swal.fire({
          text:"Le numéro "+numSortie+" est  déjà existe!!",
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
  return (
    
    <div>
    <Navbar/>
    <div className="container" id="ajoutConge">
    <div className="row justify-content-center">
          <div className="selection">
              <div className="card-body">
                  <h4 className="card-title">Enregistrer nouvelle autorisation de sortie <label id='test'></label><span id='sp'></span></h4>
                  
                  <hr/>
                  <div className="form-wrapper">
                      <Form onSubmit={creatSortie}>
                        <div className="form-group">
                        <div className='havia'>
                        <Row>
                          <Col>
                          <Form.Group controlId="Name">
                            <Form.Label className="soratra">Numéro</Form.Label>
                            <Form.Control type="number" value={numSortie} onChange={(event)=>{
                              setNumSortie(event.target.value)
                            }} required="required" className="daty"/>
                          </Form.Group>
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                          <Form.Group controlId="Name">
                            <Form.Label className="soratra">Matricule</Form.Label>
                            <Form.Control type="text" value={imperso} onChange={(event)=>{
                              setImperso(event.target.value)
                            }} required="required" className="daty"/>
                          </Form.Group>
                          </Col>
                      </Row>
                    <Row>
                        <Col>
                          <Form.Group controlId="Nombre">
                            <Form.Label className="soratra">Nom et prénom(s)</Form.Label>
                            <Form.Control type="text" value={nompers} onChange={(event)=>{
                              setNompers(event.target.value)
                            }} required="required"  className="daty"/>
                          </Form.Group>
                        </Col>
                    </Row>
                  <Row>
                        <Col>
                          <Form.Group controlId="Debut">
                            <Form.Label className="soratra">Motif</Form.Label>
                            <Form.Control type="text" value={motif} onChange={(event)=>{
                              setMotif(event.target.value)
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
                            }} required="required"  className="daty" id='nombre' min={0} max={5}/>
                          </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="Destination">
                          <Form.Label className="soratra">Heure debut</Form.Label>
                          <Form.Control type="time" value={heurdebut} onChange={(event)=>{
                            setHeurdebute(event.target.value)
                          }} required="required"  className="daty"/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                        <Form.Group controlId="Destination">
                          <Form.Label className="soratra">Heure fint</Form.Label>
                          <Form.Control type="time" value={heurefin} onChange={(event)=>{
                            setHeurefin(event.target.value)
                          }} required="required"  className="daty"/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                        <Form.Group controlId="Destination">
                          <Form.Label className="soratra">Date</Form.Label>
                          <Form.Control type="date" value={daty} onChange={(event)=>{
                            setDaty(event.target.value)
                          }} required="required"  className="daty"/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                        <Form.Group controlId="Destination">
                          <Form.Label className="soratra">Fonction</Form.Label>
                          <Form.Control type="text" value={fonction} onChange={(event)=>{
                            setFonction(event.target.value)
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

export default AjoutAutoSortie