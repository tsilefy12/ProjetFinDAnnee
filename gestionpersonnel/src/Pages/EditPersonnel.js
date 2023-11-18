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

function EditPersonnel() {
  const navigate = useNavigate();

  const { id } = useParams()

  const [im, setIm] = useState("im")
  const [nomperson, setNomperson] = useState("")
  const [fonction, setFonction] = useState("")
  const [indice, setIndice] = useState("")
  const [grade, setGrade] = useState("")
  const [corps, setCorps] = useState("")
  const [dateAffect, setDateaffect] = useState("")
  const [budget, setBudget] = useState("")
  const [imputbudget, setImputbudget] = useState("")
  const [lieuService, setLieuservice] = useState("")

  useEffect(()=>{
    fetchPersonnel()
  }, [])

  const fetchPersonnel = async () => {
    await axios.get(`http://localhost:8000/api/editerPersonnele/${id}`).then(({data})=>{
      const {im, nomperson, fonction, indice, grade, corps, dateAffect, budget, imputbudget, lieuService} = data
      setIm(im)
      setNomperson(nomperson)
      setFonction(fonction)
      setIndice(indice)
      setGrade(grade)
      setCorps(corps)
      setDateaffect(dateAffect)
      setBudget(budget)
      setImputbudget(imputbudget)
      setLieuservice(lieuService)
    })
  }
    const updatePersonnele = async (e) => {
      e.preventDefault();

      const formData = new FormData()
      formData.append('_method', 'PUT');
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

      await axios.post(`http://localhost:8000/api/updatePersonnel/${id}`, formData).then(({data})=>{
        Swal.fire({
          icon:"success",
          text:data.message
        })
        navigate("/personnel");
      })
}
return (
  <>
  <Navbar/>
  <div className="container" id="editPer">
      <div className="row justify-content-center">
              <div className="card">
                  <div className="card-body">
                      <h4 className="card-title">Modifier les informations du personnel</h4>
                      <hr/>
                      <div className="form-wrapper">
                          <Form onSubmit={updatePersonnele}>
                            <div className="form-group">
                            <div className="havia">
                            <Row>
                                  <Col>
                                  <Form.Group controlId="Name">
                                    <Form.Label className="soratra">Matricule</Form.Label>
                                    <Form.Control type="number" value={im} onChange={(event)=>{
                                      setIm(event.target.value)
                                    }} required="required" className="daty"/>
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
                                    }} required="required"  className="daty"/>
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
                            <button  className="btn btn-primary mt-2 float-start" size="lg" block="block" type="submit"><FaIcons.FaRegEdit></FaIcons.FaRegEdit> Modifier</button>
                            <Link to={"/personnel"} className="btn btn-danger float-end mt-2"><IoIcons.IoMdArrowRoundBack></IoIcons.IoMdArrowRoundBack>Retour</Link>
                            </div>
                          </Form>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  </>
)
}

export default EditPersonnel