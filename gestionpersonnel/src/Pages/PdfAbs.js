import jsPDF from 'jspdf';
import Navbar from '../compnents/Navbar';
import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
import * as IoIcons from "react-icons/io"

function PdfAbs() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [numAbs, setNumAbs] = useState("")
    const [impersoo, setImpersoo] = useState("")
    const [nomprenom, setNomprenom] = useState("")
    const [motifabs, setMotifabs] = useState("")
    const [duree, setDuree] = useState("")
    let [datedebut, setDatedebut] = useState("")
    const [datefin, setDatefin] = useState("")
    const [lieu, setlieu] = useState("")
    
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
  
    const generatePdf =() =>{
        var doc =new jsPDF('p', 'pt','a3');
        doc.html(document.querySelector("#content"), {
            callback: function(pdf){
                pdf.save("Autorisation d'absence pour "+nomprenom);
            }
        });
    
      };
      var date=new Date(datedebut).getFullYear();
      var jour;
      if (duree > 1) {
        jour="jours";
      }else if(duree===1){
        jour="jour";
      }
      var date1=new Date(datedebut);
      var date2=date1.toLocaleDateString('en-GB');
     
     
  return (
    <>
    <Navbar/>
    <center>
    <div>
      <div id="content">

        <div className='entetePdfAbs'>
            <div id='gchh'>
            <label id='abs'>UNIVERSITE&nbsp;&nbsp;&nbsp;&nbsp;DE&nbsp;&nbsp;FIANARANTSOA</label>
            <label id='abs'>ECOLE&nbsp;&nbsp;NATIONALE &nbsp;&nbsp;D'INFORMATIQUE</label>
            </div>
            <div id='drtt'>
            <label id='absss'>REPOBLIKAN'I&nbsp;&nbsp;&nbsp;MADAGASIKARA</label>
            <label id='abss'>Fitiavana-Tanindrazana-&nbsp;Fandrosoana</label>
            </div>
            <div id='autoabs'>
            <br></br><br></br><br></br><label><b>AUTORISATION D'ABSENCE</b></label><br></br>
            <label id='decret'>N°{date}/{numAbs}/UF/ENI/DIR</label>
        </div>
        <div id='contenue'>
            <div id='cnt'>
            Nom et prénom(s) : <label id='colo'>{nomprenom}</label><br></br>
            IM : <label id='colo'>{impersoo}</label><br></br>
            <label>CORPS : </label><br></br>
            <label>GRADE :</label><br></br>
            <label>FONCTION : </label><br></br>
            EN SERVICE : <label id='colo'> ENI</label><br></br>
            MOTIF : <label id='colo'>{motifabs}</label><br></br>
            Durée : <label id='colo'>{duree}&nbsp;{jour}</label><br></br>
            A compter du : <label id='colo'>{date2}</label><br></br>
            Lieu de jouissance : <label id='colo'>{lieu}</label><br></br>
            </div>
            <div id='ambany'>
                <div id='lft'><label id='favorable'><u>Avis Favorable</u></label></div>
                <div id='rgt'>
                    <label>Fait à Fianarantsoa, le</label>
                </div><br></br><br></br>
                <label id='secretaire'>LE&nbsp;&nbsp;SECRETAIRE&nbsp;&nbsp;&nbsp;&nbsp;PRINCIPALE</label>
            </div>  
    </div>
        </div>
    </div>
    <div>
    <button onClick={generatePdf} className='btn  btn-success float-center' id='btnpdf'>Créer en pdf</button>
    <Link to={'/presence'} className="btn  btn-danger float-end mt-2" id='btnrpdf'><IoIcons.IoMdArrowRoundBack></IoIcons.IoMdArrowRoundBack>Retour</Link>
    </div>
    </div>   
    </center>
    </>
  )
}

export default PdfAbs