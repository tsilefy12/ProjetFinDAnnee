import './App.css';
import Navbar from './compnents/Navbar';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './Pages/Home';
import Demande from './Pages/Demande';
import Personnel from './Pages/Personnel';
import Conge from './Pages/Conge';
import Presence from './Pages/Presence';
import 'bootstrap/dist/css/bootstrap.css';
import AjoutPersonnel from './Pages/AjoutPersonnel';
import EditPersonnel from './Pages/EditPersonnel';
import AjoutConge from './Pages/AjoutConge';
import EditConge from './Pages/EditConge';
import AjoutAutoSortie from './Pages/AjoutAutoSortie';
import AjoutAutoAbs from './Pages/AjoutAutoAbs';
import React, { useEffect, useState } from 'react';
import EditerAbsence from './Pages/EditerAbsence';
import EditerSortie from './Pages/EditerSortie';
import PdfAbs from './Pages/PdfAbs';
import PdfSrt from './Pages/PdfSrt';

function App() {
  return (
    <>
    <Router>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/personnel' element={<Personnel/>}/>
       <Route path='/demande' element={<Demande/>}/>
       <Route path='/conge' element={<Conge/>}/>
       <Route path='/presence' element={<Presence/>}/>
       <Route path='/ajoutpersonnel' element={<AjoutPersonnel/>}/>
       <Route path='/editPersonnel/:id' element={<EditPersonnel/>}/>
       <Route path='/ajoutConge' element={<AjoutConge/>}/>
       <Route path='/editConge/:id' element={<EditConge/>}/>
       <Route path='/ajoutSortie' element={<AjoutAutoSortie/>}/>
       <Route path='/ajoutAbs' element={<AjoutAutoAbs/>}/>
       <Route path='/editerAbsence/:id' element={<EditerAbsence/>}/>
       <Route path='/editerSortie/:id' element={<EditerSortie/>}/>
       <Route path='/pdfAbs/:id' element={<PdfAbs/>}/>
       <Route path='/pdfSrt/:id' element={<PdfSrt/>}/>
     </Routes>
    </Router>
    </>
  );
}

export default App;
