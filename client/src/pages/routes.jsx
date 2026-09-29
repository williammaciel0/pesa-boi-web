import { Cadastro_produtor } from "../components/Cadastro_produtor";
import { Cadastro_animal } from "../components/Cadastro_animal";
import { Login } from "../components/Login";
import { Page__perfil } from "../components/Page_perfil";
import { Detal_animal } from "../components/Detal_animal";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/cad_cadastro" element={<Cadastro_produtor/>} />
                <Route exact path="/cad_animal" element={<Cadastro_animal/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/page_perfil" element={<Page__perfil/>} />                
                <Route exact path="/detal_animal" element={<Detal_animal/>} />                
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }