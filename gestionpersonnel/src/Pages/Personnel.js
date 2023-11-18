import '../compnents/Navrbar.css';
import Navbar from '../compnents/Navbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import {format} from 'date-fns'

function Personnel() {
  let [personnels, setPersonnel] = useState([])
  let [im, setIm]=useState("");

  useEffect(()=>{
    recherche()
  }, [])
  let fetchPersonnel = async () =>{
    await axios.get(`http://localhost:8000/api/indexPersonnel`).then(({data})=>{
      setPersonnel(data)
    });
    var tbl=document.getElementById('tbody');
    var ln=tbl.rows.length;
    if (ln > 1) {
      document.getElementById('srtr').innerText="Effectifs";
      document.getElementById('effectif').innerText=ln;
    }else{
      document.getElementById('srtr').innerText="Effectif";
      document.getElementById('effectif').innerText=ln;
    }
   
  }
  
  let searchPersonnel = async () =>{
   var test= await axios.get(`http://localhost:8000/api/search/${im}`).then(({data})=>{
      setPersonnel(data)
    });
    var tbl=document.getElementById('tbody');
    var ln=tbl.rows.length;
    if (ln > 1) {
      document.getElementById('srtr').innerText="Effectifs";
      document.getElementById('effectif').innerText=ln;
    }else{
      document.getElementById('srtr').innerText="Effectif";
      document.getElementById('effectif').innerText=ln;
    }
  }
  
  const recherche=()=>{
    if (im==="") {
      fetchPersonnel();
      window.setTimeout(function(){
        fetchPersonnel().location.reload();
       }, 0.1);
     
    }else{
      searchPersonnel();
      window.setTimeout(function(){
        searchPersonnel().location.reload();
       }, 0.1);
    }
  }

    const deletePersonnel = async (id) => {
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
      await axios.delete(`http://localhost:8000/api/suppPersonnel/${id}`).then(({data})=>{
        Swal.fire({
          icon:"success",
          text:data.message
        })
        fetchPersonnel();
        window.setTimeout(function(){
          fetchPersonnel().location.reload();
         }, 1);
      }).catch(({response:{data}})=>{
        Swal.fire({
          text:data.message,
          icon:"error"
        })
      })
    }
  return (
    <>
    <div className='personnel'>
      <Navbar/>
      
       <u><h1 className='pers'>Personnels Administratif et Techniques (PAT)</h1></u> 
          <div className='table-responsive'>
            <div className='container4'>
              <div className='but6 float-start'>
              <Link className='btn btn-success float-start' to={"/ajoutpersonnel"} id='boutton'>
                  <IoIcons.IoIosAddCircle/>
                Ajout personnel
                </Link>
                <label className='lbl' id='lbl1'>Liste du personnel :</label><span id='effectif'></span> <label id='srtr'></label>
              </div>
            <div className='inpt3 float-end'>
              <div id='putsrh'>
                  <input type={'text'} className='form-control' name='im'  placeholder='search...' value={im} onChange={(event)=>{
                    setIm(event.target.value)}} />
              </div>
              <div id='srch'>
                 <button className='btn btn-primary' onClick={recherche}>search</button>
              </div>
              </div>
            </div>
           <table className='table table-bordered mb-0 text-center' id='custom'>
              <thead>
                  <tr>
                    <th>IM</th>
                    <th>Nom et prénoms</th>
                    <th>Fonction</th>
                    <th>Indice</th>
                    <th>Grade</th>
                    <th>Corps</th>
                    <th>Date d'affectation à l'ENI (jj/mm/aaaa)</th>
                    <th>Budget</th>
                    <th>Imputation budgetaire</th>
                    <th>Lieu de service</th>
                    <th>Actions</th>
                  </tr>
              </thead>
              <tbody id='tbody'>
              {
                   personnels.length > 0 && (
                    personnels.map((row, key)=>(
                  <tr key={key}>
                  <td>{row.im}</td>
                  <td>{row.nomperson}</td>
                  <td>{row.fonction}</td>
                  <td>{row.indice}</td>
                  <td>{row.grade}</td>
                  <td>{row.corps}</td>
                  <td>{format(new Date(row.dateAffect), 'dd/MM/yyyy')}</td>
                  <td>{row.budget}</td>
                  <td>{row.imputbudget}</td>
                  <td>{row.lieuService}</td>
                  <td>
                  <div className='edit float-start'><Link to={`/editPersonnel/${row.id}`}> <AiIcons.AiFillEdit></AiIcons.AiFillEdit> </Link></div> 
                 <div className='sup float-end'><button variant="danger" id='btn2' onClick={()=>deletePersonnel(row.id)}><AiIcons.AiFillDelete></AiIcons.AiFillDelete></button></div> 
                  </td>
                </tr>)))}
              </tbody>
            </table>
          </div>
        </div>
        </>
  )
}

export default Personnel