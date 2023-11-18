import jsPDF from 'jspdf';
import Navbar from '../compnents/Navbar';
import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
import * as IoIcons from "react-icons/io"

function PdfSrt() {
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
    
    useEffect(()=>{
        fetchAbs()
      }, [])
      const fetchAbs = async () => {
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
  
    const generatePdf =() =>{
        var doc =new jsPDF('p', 'pt','a3');
        doc.html(document.querySelector("#content"), {
            callback: function(pdf){
                pdf.save("Autorisation de sortie pour "+nompers);
            }
        });
    
      };
      var date=new Date(daty).getFullYear();
      var heure1=Number(heurdebut.split(':')[0]);
      var heure2=Number(heurefin.split(':')[0]);
      var text="(Le Chef de service n'est pas responsable in de l'absence ni du retard de l'agent qui";
  return (
    <>
    <Navbar/>
    <center>
    <div>
      <div id="content">

        <div className='entetePdfAbs'>
            <div id='gch'>
            <label id='abs'>MINISTER&nbsp;&nbsp;&nbsp;&nbsp;DE&nbsp;&nbsp;L'ENSEIGNEMENT&nbsp;&nbsp;SUPERIEUR</label><br></br>
            <label id='recher'>ET DE <u>LA RECHERCHE SCIENT</u>IFIQUE</label>
            <label id='absuniv'>UNIVE<u>RSITE&nbsp;&nbsp;&nbsp;&nbsp;DE&nbsp;&nbsp;FIANARA</u>NTSOA</label>
            <label><b id='bold'>Ecole&nbsp;&nbsp;Nationale &nbsp;&nbsp;d'Informatique</b></label>
            </div>
            <div id='drt'>
            <label id='absss'>REPOBLIKAN'I&nbsp;&nbsp;&nbsp;MADAGASIKARA</label>
            <label id='abss'>Fitiavana&nbsp;-<u>Tanindrazana</u>&nbsp;-&nbsp;Fandrosoana</label>
            </div>
            <div id='autoabs'>
            <br></br><br></br><br></br><br></br><br></br><label><b>AUTORISATION DE SORTIE</b></label><br></br>
            <label id='decret'>N°{date}/{numSortie}/UF/ENI/AS</label>
        </div>
        <div id='contenue'>
            <div id='cnt'>
            M : <label id='colo'>{nompers}</label>&nbsp;
            IM : <label id='colo'>{imperso}</label><br></br>
            Fonction : <label id='colo'>&nbsp;{fonction}&nbsp;&nbsp;</label>est autorisé(e) à sortir pour motif&nbsp;&nbsp;
            <label id='colo'>{motif}</label><br></br>
            de : <label id='colo'>{heure1}&nbsp;heures</label>&nbsp;&nbsp;à<label id='colo'>&nbsp;&nbsp;&nbsp;{heure2}&nbsp;heures.</label>{text}<br></br>doit reprendre immédiatement son service après ce délai.)
            </div>
            <div id='ambany'>
                Fait à Fianarantsoa, le..........................................
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
export default PdfSrt