import Navbar from '../compnents/Navbar'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import '../compnents/Navrbar.css';
import Swal from 'sweetalert2';
import { format } from 'date-fns'
function Presence() {
  const [sorties, setSortie] = useState([])
   const [im, setIm] = useState("");
  useEffect(()=>{
    recherche();
  }, [])
  const fetchSortie = async () =>{
    await axios.get(`http://localhost:8000/api/indexSortie`).then(({data})=>{
      setSortie(data)
    })
    window.setTimeout(function(){
      sortie().location.reload();
     }, 1);
  }
  let searchSortie = async () =>{
    await axios.get(`http://localhost:8000/api/searchSortie/${im}`).then(({data})=>{
       setSortie(data)
     });
     window.setTimeout(function(){
      sortie().location.reload();
     }, 1);
   }
   const recherche=()=>{
     if (im==="") {
       fetchSortie();
     }else{
       searchSortie();
     }
   }
   function sortie(){
    var tbl=document.getElementById('tb');
    if (tbl!=null) {
      var i=0;
      while (i<tbl.rows.length) {
        var va=(tbl.rows[i].cells[5]).innerText;
        var va2=(tbl.rows[i].cells[7]).innerText;
        var nom=(tbl.rows[i].cells[1]).innerText;
        
        console.log("heure ", va, "eta", va2, "nom", nom);
        var now=Date.now();
        var timer=new Date(now);
        var tm=timer.getHours()+":"+timer.getMinutes();
        var heureActuele=Number(tm.split(':')[0])*60*60*1000+Number(tm.split(':')[1])*60*1000;
        var vaa=Number(va.split(':')[0])*60*60*1000+Number(va.split(':')[1])*60*1000;
        var va3=(tbl.rows[i].cells[6]).innerText;
        var daty2=new Date(va3).getTime();
        var datenow = timer.toLocaleDateString('en-US');
        const androan =new Date(datenow).getTime();
        console.log("daty vaovao",va3,"now date", datenow);
        console.log("int date androan",daty2,"int date now", androan);
      //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
        if(vaa > heureActuele && daty2 >= androan) {
          var color=document.getElementById('txtt');
          color= (tbl.rows[i].cells[7]);
          color.style.color="green";
          var text="en cour...";
          (tbl.rows[i].cells[7]).innerText=text;
        }else if(daty2 <= androan){
          var color=document.getElementById('txtt');
          color= (tbl.rows[i].cells[7]);
          color.style.color="red";
          var text="expirée";
          (tbl.rows[i].cells[7]).innerText=text;
          document.getElementById('txtt').style.color="red";
        }else if (daty2 > androan) {
          var color=document.getElementById('txtt');
          color= (tbl.rows[i].cells[7]);
          color.style.color="green";
          var text="en cour...";
          (tbl.rows[i].cells[7]).innerText=text;
          document.getElementById('txtt').style.color="green";

        }
        i=i+1;
    }
  } 
   }
   window.setTimeout(function(){
    fetchSortie().location.reload();
   }, 60000);
  
  //affichage pour autorisation d'absence
  const [absences, setAbsence] = useState([])
  let [imm, setImm] =useState("")
  useEffect(()=>{
    rechercheAbsence();
  }, [])
  const fetchAbsence= async () =>{
    await axios.get(`http://localhost:8000/api/indexAbsence`).then(({data})=>{
      setAbsence(data)
    })
    window.setTimeout(function(){
      abs().location.reload();
     }, 1);
  }
  let searchAbsence = async () =>{
    await axios.get(`http://localhost:8000/api/searchAbs/${imm}`).then(({data})=>{
       setAbsence(data)
     });
     window.setTimeout(function(){
      abs().location.reload();
     }, 1);
   }
   const rechercheAbsence=()=>{
     if (imm==="") {
       fetchAbsence();
     }else{
       searchAbsence();
       
     }
   }

 function abs() {
  var table=document.getElementById('tbod');
  if (table!=null) {
    var i=0;
    while (i<table.rows.length) {
      var va=(table.rows[i].cells[4]).innerText;
      var va2=(table.rows[i].cells[5]).innerText;

      var dattenizy=new Date(va).getTime();
      var datyandroan=Date.now();
      var dt=new Date(datyandroan);
      var dtt=dt.toLocaleDateString('en-US');
      const dttt=new Date(dtt).getTime();

      if (dattenizy > dttt) {
        var color=document.getElementById('txt');
        color= (table.rows[i].cells[5]);
        color.style.color="green";
        (table.rows[i].cells[5]).innerText="en cour...";
      }else{
        var color=document.getElementById('txt');
        color= (table.rows[i].cells[5]);
        color.style.color="red";
        (table.rows[i].cells[5]).innerText="expiré";
      }
      i=i+1;
     
  }
}
 }
  const deleteSortie = async (id) => {
    const isConfirm = await Swal.fire({
      title: 'Vous êtes sûre?',
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
    await axios.delete(`http://localhost:8000/api/suppSortie/${id}`).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      fetchSortie()
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }
  const deleteAbsence = async (id) => {
    const isConfirm = await Swal.fire({
      title: 'Vous êtes sûre?',
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
    await axios.delete(`http://localhost:8000/api/suppAbsence/${id}`).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      fetchAbsence()
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }

  return (
 
    <div className='presence'>
        <Navbar/>
        <u className='underline text-danger'><h1 className='prese'>LISTE DE PRESENCE</h1></u>
        <audio id='audio'>
          <source src='./notification.mp3' type='audio/mpeg'></source>
        </audio>
        <label id='expir'>expirée</label>
        <div className='container'>
          <div className='cgauche'>
            <div className='autori'> 
              <label className='autor'>AUTORISATION DE SORTIE </label>
              <Link className='btn btn-success float-end' to={"/ajoutSortie"} id='but'>
              <IoIcons.IoIosAddCircle/>
                ajout
              </Link> 
            </div>
            <div className='container'>
            <div className='inpt float-start'>
              <input type={'text'} className='form-control' placeholder='search...' value={im} onChange={(event)=>{
                    setIm(event.target.value)}} />
            </div>
            <div className='search float-end'><button className='btn btn-primary' onClick={recherche}>Recherche</button></div>
            </div>
             <div className='tblS'>
             <table className='table table-bordered mb-0 text-center' id='custom'>
              <thead>
                <tr>
                  <th>IM</th>
                  <th id='nom'>Nom</th>
                  <th>Motif</th>
                  <th>Durée</th>
                  <th>Heure debut</th>
                  <th>Heure fin</th>
                  <th>Date</th>
                  <th>Etat</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id='tb'>
              {
                   sorties.length > 0 && (
                    sorties.map((row, key)=>(
                  <tr key={key}>
                  <td>{row.imperso}</td>
                  <td id='nom'>{row.nompers}</td>
                  <td>{row.motif}</td>
                  <td>{row.duree}</td>
                  <td>{row.heurdebut}</td>
                  <td>{row.heurefin}</td>
                  <td>{format(new Date(row.daty), 'MM/dd/yyyy')}</td>
                  <td id='txtt'></td>
                  <td>
                  <div className='edit float-start'>
                    <Link to={`/editerSortie/${row.id}`}> <AiIcons.AiFillEdit></AiIcons.AiFillEdit></Link>
                    <Link to={`/pdfSrt/${row.id}`} id="view"> <AiIcons.AiOutlineFilePdf></AiIcons.AiOutlineFilePdf> </Link>
                  </div>
                 <div className='sup'><button variant="danger" id='btn2' onClick={()=>deleteSortie(row.id)}><AiIcons.AiFillDelete></AiIcons.AiFillDelete></button></div> 
                  </td>
                </tr>
                    ))
                   )
                }
              </tbody>
             </table>
             </div>
            
          </div>
          <div className='cdroite'>
            <div  className='autori2'>
            <label className='autor'>AUTORISATION D'ABSENCE</label>
            <Link className='btn btn-success float-end' to={"/ajoutAbs"} id='but2'>
            <IoIcons.IoIosAddCircle/>
                ajout
              </Link> 
            </div>
          <div className='container'>
            <div className='inpt2 float-start'>
              <input type={'text'} className='form-control' placeholder='search...' value={imm} onChange={(event)=>{
                    setImm(event.target.value)}}/>
            </div>
            <div className='search float-end'><button className='btn btn-primary' onClick={rechercheAbsence}>Recherche</button></div>
            </div>
             <div className='tblA'>
             <table className='table table-bordered mb-0 text-center' id='custom'>
              <thead>
                <tr>
                  <th>IM</th>
                  <th>Motif</th>
                  <th>Duration</th>
                  <th>Date debut</th>
                  <th>Date fin</th>
                  <th>Etat</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id='tbod'>
                    {
                   absences.length > 0 && (
                    absences.map((row, key)=>(
                  <tr key={key}>
                  <td>{row.impersoo}</td>
                  <td>{row.motifabs}</td>
                   <td>{row.duree} jour(s)</td>
                  <td>{format(new Date(row.datedebut), 'dd/MM/yyyy')}</td>
                  <td>{row.datefin}</td>
                  <td id='txt'></td>
                  <td>
                  <div className='edit float-start'>
                    <Link to={`/editerAbsence/${row.id}`}> <AiIcons.AiFillEdit></AiIcons.AiFillEdit></Link>
                    <Link to={`/pdfAbs/${row.id}`} id="view"> <AiIcons.AiOutlineFilePdf></AiIcons.AiOutlineFilePdf> </Link>
                  </div>
                 <div className='sup'><button variant="danger" id='btn2' onClick={()=>deleteAbsence(row.id)}><AiIcons.AiFillDelete></AiIcons.AiFillDelete></button></div> 
                  </td>
                </tr>
                    ))
                   )
                }
              </tbody>
             </table>
             </div>
            
          </div>
        </div>
    </div>
  )
}

export default Presence