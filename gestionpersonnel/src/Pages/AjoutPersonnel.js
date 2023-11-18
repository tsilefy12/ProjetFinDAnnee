import React, { useState} from "react";
import Form from 'react-bootstrap/Form';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from '../compnents/Navbar';
import '../compnents/Navrbar.css';
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import { Link } from 'react-router-dom'

function AjoutPersonnel() {
  const navigate = useNavigate();

  const [im, setIm] = useState("")
  const [nomperson, setNomperson] = useState("")
  const [fonction, setFonction] = useState("")
  const [indice, setIndice] = useState("")
  const [grade, setGrade] = useState("")
  const [corps, setCorps] = useState("")
  const [dateAffect, setDateaffect] = useState("")
  const [budget, setBudget] = useState("")
  const [imputbudget, setImputbudget] = useState("")
  const [lieuService, setLieuservice] = useState("")
  const [validationError, setValidationError] = useState({})

  const creatPersonnel = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('im', im)
    formData.append('nomperson', nomperson)
    formData.append('fonction', fonction)
    formData.append('indice', indice)
    formData.append('grade', grade)
    formData.append('corps', corps)
    formData.append('dateAffect', dateAffect)
    formData.append('budget', budget)
    formData.append('imputbudget', imputbudget)
    formData.append('lieuService', lieuService)

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
    const datenow = Date.now();
    var datteaffect = new Date(dateAffect).getTime();
    console.log("date now ", datenow, "date debut", datteaffect);
    if (datteaffect > datenow) {
      Swal.fire({
        icon: "error",
        text:"Attention!! la date que vous avez saisie (date d'affectation) est superieure que la date d'aujourd'hui!!."
      })
    }else{
      await axios.post(`http://localhost:8000/api/ajoutPersonnel`, formData).then(({data})=>{
        Swal.fire({
          icon: "success",
          text:data.message
        })
        navigate("/personnel")
      }).catch(({response, data})=>{
        if (response.status===422) {
          setValidationError(response.data.errors)
          Swal.fire({
            text:"Le numéro matricule "+im+" est déjà enregistré!!",
            icon:"warning",
            color:"orange"
          })
        }else{
          Swal.fire({
            text:"erreur",
            icon:"error"
          })
        }
      })
      
   
    }
      
  }
  return (
    <>
     <Navbar/>
     <div className="container" id="ajoutPer">
        <div className="row justify-content-center">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Enregistrer nouveau personnel</h4>
                        <hr/>
                        <div className="form-wrapper">
                            <Form onSubmit={creatPersonnel}>
                              <div className="form-group">
                              <div className="havia">
                              <Row>
                                    <Col>
                                    <Form.Group controlId="Name">
                                      <Form.Label className="soratra">Matricule</Form.Label>
                                      <Form.Control type="number" value={im} onChange={(event)=>{
                                        setIm(event.target.value)
                                      }} required="required" className="daty" min={1} maxLength={6}/>
                                    </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <Form.Group controlId="Nom">
                                      <Form.Label className="soratra">Nom et Prénom(s)</Form.Label>
                                      <Form.Control type="text" value={nomperson} onChange={(event)=>{
                                        setNomperson(event.target.value)
                                      }} required="required" className="daty"/>
                                    </Form.Group>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                    <Form.Group controlId="Fonction">
                                      <Form.Label className="soratra">Fonction</Form.Label>
                                      <Form.Control type="text" value={fonction} onChange={(event)=>{
                                        setFonction(event.target.value)
                                      }} required="required"  className="daty"/>
                                    </Form.Group>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                    <Form.Group controlId="Indice">
                                      <Form.Label className="soratra">Indice</Form.Label>
                                      <Form.Control type="number" value={indice} onChange={(event)=>{
                                        setIndice(event.target.value)
                                      }} required="required"  className="daty" min={0} max={9999}/>
                                    </Form.Group>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                    <Form.Group controlId="Grade">
                                      <Form.Label className="soratra">Grade</Form.Label>
                                      <Form.Control type="text" value={grade} onChange={(event)=>{
                                        setGrade(event.target.value)
                                      }} required="required"  className="daty"/>
                                    </Form.Group>
                                  </Col>
                              </Row>
                              </div>
                              <div className="havanana">
                              <Row>
                                  <Col>
                                    <Form.Group controlId="Corps">
                                      <Form.Label className="soratra">Corps</Form.Label>
                                      <Form.Control type="text" value={corps} onChange={(event)=>{
                                        setCorps(event.target.value)
                                      }} required="required"  className="daty"/>
                                    </Form.Group>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                    <Form.Group controlId="Affectation">
                                      <Form.Label className="soratra">Date d'affectation à l'ENI</Form.Label>
                                      <Form.Control type="date" value={dateAffect} onChange={(event)=>{
                                        setDateaffect(event.target.value)
                                      }} required="required" className="daty"/>
                                    </Form.Group>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                    <Form.Group controlId="Budget">
                                      <Form.Label className="soratra">Budget</Form.Label>
                                      <Form.Control type="text" value={budget} onChange={(event)=>{
                                        setBudget(event.target.value)
                                      }} required="required"  className="daty"/>
                                    </Form.Group>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                    <Form.Group controlId="Imputation">
                                      <Form.Label className="soratra">Imputation budgetaire</Form.Label>
                                      <Form.Control type="text" value={imputbudget} onChange={(event)=>{
                                        setImputbudget(event.target.value)
                                      }} required="required"  className="daty"/>
                                    </Form.Group>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                    <Form.Group controlId="Lieu">
                                      <Form.Label className="soratra">Lieu de service</Form.Label>
                                      <Form.Control type="text" value={lieuService} onChange={(event)=>{
                                        setLieuservice(event.target.value)
                                      }} required="required"  className="daty"/>
                                    </Form.Group>
                                  </Col>
                              </Row>
                              </div>
                              <button  className="btn btn-primary mt-2 float-start" size="lg" block="block" type="submit"><IoIcons.IoIosAdd></IoIcons.IoIosAdd> Ajouter</button>
                              <Link to={"/personnel"} className="btn btn-danger float-end mt-2"><IoIcons.IoMdArrowRoundBack></IoIcons.IoMdArrowRoundBack>Retour</Link>
                              </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
     </div>
    </>
  );
}

export default AjoutPersonnel