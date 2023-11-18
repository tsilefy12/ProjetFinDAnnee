import React, { useEffect, useState } from 'react'
import Navbar from '../compnents/Navbar'
import * as AiIcons from "react-icons/ai"
import Swal from 'sweetalert2'
import axios, { all } from 'axios'
import * as IoIcons from "react-icons/io"
import { Link } from 'react-router-dom'
import { format } from "date-fns"

function Conge() {
 
  let [conges, setConges] = useState([])
  let [im, setIm] = useState("")

  useEffect(()=>{
    recherche();
  }, [])
 
  const fetchConges = async () =>{
    await axios.get(`http://localhost:8000/api/indexConge`).then(({data})=>{
      setConges(data)
    })
   
    window.setTimeout(function(){
      Affich().location.reload();
     }, 1);
    }

 const searcheConge =async () =>{
  var test= await axios.get(`http://localhost:8000/api/searchConge/${im}`).then(({data})=>{
     setConges(data)
   });
   window.setTimeout(function(){
    Affich().location.reload();
   }, 1);
 }
 function recherche(){
    if (im==="") {
      fetchConges();
    }else{
      searcheConge();
    }
  }
  
  function Affich() {
   
    var table=document.getElementById('tbod');
      console.log("longueur",table.rows.length);
      if (table!=null) {
        var i=0;
        while (i<table.rows.length) {
          var va=(table.rows[i].cells[4]).innerText;
          var va2=(table.rows[i].cells[6]).innerText;
          console.log("count", va, "eta", va2);
   
          var dattenizy=new Date(va).getTime();
          var datyandroan=Date.now();
          var dt=new Date(datyandroan);
          var dtt=dt.toLocaleDateString('en-US');
          const dttt=new Date(dtt).getTime();
          console.log("date", dattenizy, "date androan", dttt);
   
          if (dattenizy > dttt) {
            var color=document.getElementById('txt');
            color= (table.rows[i].cells[6]);
            color.style.color="green";
            (table.rows[i].cells[6]).innerText="congé en cour...";
          }else{
            var color=document.getElementById('txt');
            color= (table.rows[i].cells[6]);
            color.style.color="red";
            (table.rows[i].cells[6]).innerText="expiré";
          }
          i=i+1;
      }
    }
  }

  const deleteConge = async (id) => {
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
    await axios.delete(`http://localhost:8000/api/suppConge/${id}`).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      
      fetchConges()
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }
  
  return (
    <div className='demande'>
        <Navbar/>
        <div className='table-responsive'>
          <div className='container5'>
          <div className='but6 float-start'>
              <Link className='btn btn-success float-start' to={'/ajoutConge'} id='boutton'>
                  <IoIcons.IoIosAddCircle/>
                Nouvelle demande
                </Link>
                <label className='lbl' id='lbl1'>Liste de congé</label>
              </div>
              <div className='inpt3 float-end'>
              <div id='putsrh'>
                  <input type={'text'} className='form-control' name='im'  placeholder='search...' value={im} onChange={(event)=>{
                    setIm(event.target.value)}} />
              </div>
              <div id='srch'>
                 <button className='btn btn-primary' onClick={recherche} >search</button>
              </div>
              </div>
          </div>
           <br></br>
           <br></br>
           <div  className='tbl'>
           <table className='table table-bordered mb-0 text-center' id='custom'>
              <thead>
                  <tr>
                    <th>Numéro</th>
                    <th>IM</th>
                    <th>Nombre de jour</th>
                    <th>Date début format: j/m/aa</th>
                    <th>Date fin format: m/j/aa</th>
                    <th>Destination</th>
                    <th>Etat du congé</th>
                    <th>Actions</th>
                  </tr>
              </thead>
              <tbody id='tbod'>
                {
                  conges.length > 0 && (
                  conges.map((row, key)=>(
                   
                  <tr key={key} id='trr'>
                  <td>{row.num}</td>
                  <td>{row.impers}</td>
                  <td>{row.nbrjrs}</td>
                  <td>{format(new Date(row.datedebut), 'dd/MM/yyyy')}</td>
                  <td id='dateio'>{row.datefin}</td>
                  <td>{row.destination}</td>
                  <td id='txt'></td>
                  <td>
                  <div className='edit float-start'>
                    <Link to={`/editConge/${row.id}`}> <AiIcons.AiFillEdit></AiIcons.AiFillEdit></Link>
                  </div>
                 <div className='sup'><button variant="danger" id='btn2' onClick={()=>deleteConge(row.id)}><AiIcons.AiFillDelete></AiIcons.AiFillDelete></button></div> 
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
    
  )
}
export default Conge