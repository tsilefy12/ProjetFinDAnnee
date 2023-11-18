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

function AjoutConge() {
  const navigate = useNavigate();
  const [num, setNum] = useState("")
  const [impers, setImpers] = useState("")
  let [nbrjrs, setNbrjrs] = useState("")
  const [datedebut, setDatedebut] = useState("")
  let [datefin, setDatefin] = useState("")
  const [destination, setDestination] = useState("")
  const [validationError, setValidationError] = useState({})
  
  const [selected, setSelected]=useState([]);
  let [text, setText]=useState("");
  var long;
  useEffect(()=>{
      fetchIms();
  }, [])
  const fetchIms=async () =>{
    await axios.get(`http://localhost:8000/api/selectIm`).then(({data})=>{
      setSelected(data);
      long=data.length;
      var i=0;
      while (i<long) {
        text=data[i]['im'];
        console.log("im", text);
        i=i+1;
      }
    }) 
   }
  let firtsDate = new Date(datedebut).getTime();
    
  let oneDay = 24*60*60*1000;

  let test= ((nbrjrs * oneDay) + firtsDate);
  let test2=new Date(test);
  console.log("daty fah 2", test2);
  let test3 = test2.toLocaleDateString('en-US');
  
  if (nbrjrs === "") {
    datefin="";
  }else{
    datefin=test3;
    console.log("date", test3);
  }
  const createConge = async (e) => {
    e.preventDefault();
  
    const formData = new FormData()
   
    formData.append('num', num)
    formData.append('impers', impers)
    formData.append('nbrjrs', nbrjrs)
    formData.append('datedebut', datedebut)
    formData.append('datefin', datefin)
    formData.append('destination', destination)
 

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
   
     await axios.get(`http://localhost:8000/api/countnbrjrs/${impers}`).then(({data})=>{
       nb=data;
      
    })
    console.log("donnee", nb);
 
    var nbr = parseInt(nbrjrs);
    var calcul = nb + nbr;
    var kajy = 30 - nb;
    console.log("kajy", calcul);
    
    if (kajy < 6) {
      document.getElementById("test").style.color="red";
      document.getElementById("test").style.backgroundColor="white";
    }
    if (kajy > 1) {
      document.getElementById("test").innerText=kajy+" jour(s) pour votre congé";
    }else if(kajy <= 1){
      document.getElementById("test").innerText=kajy+" jour pour votre congé";
    }
    var val=document.getElementById("test").innerText;
    if (val===null) {
      document.getElementById("sp").style.color="white";
    }else if(val!=null){
      document.getElementById("sp").innerText="il reste ";
    }
    //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    const datenow = Date.now();
    var datedeb = new Date(datedebut).getTime();
    console.log("date now ", datenow, "date debut", datedeb);
    if (calcul > 30) {
      Swal.fire({
        icon: "error",
        text:"Le TOTAL nombre du jour de congé ne doit pas dépasser 30 jours par an, Il vous reste "+kajy+" jour(s) au maximum pour la prochaine de votre congé"
      })
    }else if (datedeb < datenow) {
      Swal.fire({
        icon: "error",
        text:"Attention!! la date que vous avez saisie est inferieure que la date d'aujourd'hui!!."
      })
    }else if (nb===0 && nbrjrs < 15) {
      Swal.fire({
        icon: "warning",
        text:"Pour le premier congé, on doit prendre plus de 15 jours."
      })
    }else{
      await axios.post(`http://localhost:8000/api/ajoutConge`, formData).then(({data})=>{
        Swal.fire({
          icon: "success",
          text:data.message
        })
        navigate("/conge")
      }).catch(({response})=>{
        if (response.status===422) {
          setValidationError(response.data.errors)
          Swal.fire({
            text:"Le numéro "+num+" est  déjà existe!!",
            icon:"warning",
            color: "orange"
            
          })
        }
        else if (response.status===403) {
          setValidationError(response.data.errors)
          Swal.fire({
            text:response.data.message,
            icon:"error",
            
          })
        }
        else{
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
                      <h4 className="card-title">Enregistrer nouveau congé <label id='test'></label><span id='sp'></span></h4>
                      
                      <hr/>
                      <div className="form-wrapper">
                          <Form onSubmit={createConge}>
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
                               <Form.Group controlId="Name">
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
                                }} required="required"  className="daty" min={0} max={29}/>
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
                              }} required="required"  className="daty" placeholder='format mois/jour/année'/>
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
                        <button  className="btn btn-primary mt-2 float-start" size="lg" block="block" type="submit"><IoIcons.IoIosAdd></IoIcons.IoIosAdd> Ajouter</button>
                        <Link to={'/conge'} className="btn btn-danger float-end mt-2"><IoIcons.IoMdArrowRoundBack></IoIcons.IoMdArrowRoundBack>Retour</Link>
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

export default AjoutConge