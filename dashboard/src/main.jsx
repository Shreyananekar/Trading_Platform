import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter , Routes, Route} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Apps from "./components/Apps";
import Home from "./components/Home";
import TopBar from './components/TopBar';


createRoot(document.getElementById('root')).render(
 <BrowserRouter>
     
     <Routes>
       <Route path="/*" element={<Home />} />
       
       
     </Routes>
     
   </BrowserRouter>
)
