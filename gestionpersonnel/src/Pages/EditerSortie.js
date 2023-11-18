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

function EditerSortie() {

    const navigate = useNavigate();
    const { id } = useParams()
    const [numSortie, setNumSortie] = useState("")
    const [imperso, setImperso] = useState("")
    const [nompers, setNompers] = useState("")
    let [duree, setDuree] = useState("")
    const [fonction, setFonction] = useState("")
    const [motif, setMotif] = useState("")
    const [heurdebut, setHeurdebut] = useState("")
    let [heurefin, setHeurefin] = useState("")
    let [daty, setDaty] = useState("")
    
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
  
    useEffect(()=>{
        fetchSortie()
      }, [])
      const fetchSortie = async () => {
        await axios.get(`http://127.0.0.1:8000/api/editerSortie/${id}`).then(({data})=>{
          const {numSortie, imperso, nompers, duree, fonction, motif,heurdebut,heurefin, daty} = data
          setNumSortie(numSortie)
          setImperso(imperso)
          setNompers(nompers)
          setDuree(duree)
          setFonction(fonction)
          setMotif(motif)
          setHeurdebut(heurdebut)
          setHeurefin(heurefin)
          setDaty(daty)
        })
      }
      const updateSortie = async(e) => {
        e.preventDefault();
    
        const formData = new FormData()
        formData.append('_method', 'PUT');
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
        await axios.post(`http://localhost:8000/api/modifierSortie/${id}`, formData).then(({data})=>{
            Swal.fire({
              icon:"success",
              text:data.message
            })
            navigate("/presence");
          }).catch(({response})=>{
              Swal.fire({
                text:"erreur",
                icon:"error"
              })
        })
    }
  return (
    <div>
        <Navbar/>
        <div className="container" id="editPer">
        <div className="row justify-content-center">
                  <div className="card-body">
                      <h4 className="card-title">Modifier les informations pour l'autorisation de sortie</h4>
                      <hr/>
                      <div className="form-wrapper">
                          <Form onSubmit={updateSortie}>
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
                              <Form.Group controlId="Im">
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
                              <Form.Group controlId="Nombre">
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
                              <Form.Group controlId="Debut">
                                <Form.Label className="soratra">Durée</Form.Label>
                                <Form.Control type="number" value={duree} onChange={(event)=>{
                                  setDuree(event.target.value)
                                }} required="required"  className="daty"/>
                              </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group controlId="Fin">
                              <Form.Label className="soratra">Heure debut</Form.Label>
                              <Form.Control type="time" value={heurdebut} onChange={(event)=>{
                                setHeurdebut(event.target.value)
                              }} required="required"  className="daty"/>
                            </Form.Group>
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                            <Form.Group controlId="Destination">
                              <Form.Label className="soratra">Heure fin</Form.Label>
                              <Form.Control type="text" value={heurefin} onChange={(event)=>{
                                setHeurefin(event.target.value)
                              }} required="required"  className="daty"/>
                            </Form.Group>
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                            <Form.Group controlId="Destination">
                              <Form.Label className="soratra">Heure fin</Form.Label>
                              <Form.Control type="date" value={daty} onChange={(event)=>{
                                setDaty(event.target.value)
                              }} required="required"  className="daty"/>
                            </Form.Group>
                          </Col>
                      </Row>
                      <Row>
                        <Col>
                            <Form.Group controlId="Nombre">
                            <Form.Label className="soratra">Fonction</Form.Label>
                            <Form.Control type="text" value={fonction} onChange={(event)=>{
                                setFonction(event.target.value)
                            }} required="required"  className="daty"/>
                            </Form.Group>
                        </Col>
                        </Row>
                        </div>
                        <button  className="btn btn-primary mt-2 float-start" size="lg" block="block" type="submit"><FaIcons.FaRegEdit></FaIcons.FaRegEdit> Modifier</button>
                        <Link to={"/presence"} className="btn btn-danger float-end mt-2"><IoIcons.IoMdArrowRoundBack></IoIcons.IoMdArrowRoundBack>Retour</Link>
                        </div>
                        </Form>
                      </div>
                  </div>
          </div>
    </div>
    </div>
  )
}

export default EditerSortie