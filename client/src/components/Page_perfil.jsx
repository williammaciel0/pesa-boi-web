import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import btnSair from "../assets/icons/botao-de-energia.png"
import icoLixo from "../assets/icons/deposito-de-lixo.png"
import utilizador from "../assets/icons/user.png"

const Page__perfil = () => {
    const location = useLocation();
    const [dados, setDados] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const id = location.state?.id;
        if (!id) {
            setErro("Perfil não encontrado.");
            return;
        }

        const buscarPerfil = async () => {
            try {
                setCarregando(true);
                setErro("");

                const result = await fetch(`http://localhost:3000/animais?produtor_id=${id}`);
                const dadosApi = await result.json();
                setDados(Array.isArray(dadosApi) ? dadosApi : []);
            } catch (error) {
                console.error(error);
                setErro("Não foi possível carregar o perfil.");
            } finally {
                setCarregando(false);
            }
        };

        buscarPerfil();
        
    }, [location.state?.id]);

    const nomeProdutor = location.state?.nome || "Produtor";

    if (carregando) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-100 text-lg font-semibold text-stone-700">
                Carregando perfil...
            </div>
        );
    }

    if (erro) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-700 font-semibold">
                {erro}
            </div>
        );
    }

    function enviarDados(){
        navigate("/cad_animal", {
            state: {
                id: location.state?.id,
                nome: location.state?.nome,
                senha: location.state?.senha,
                email: location.state?.email
            }
        })
    }

    function pageDetal(animal){
        navigate("/detal_animal", {
            state: {
                id: location.state?.id,
                nome: location.state?.nome,
                senha: location.state?.senha,
                email: location.state?.email,
                animal: animal
            }
        })
    }

    function perfilProdutor(){
        navigate("/perfil_produtor", {
            state: {
                id: location.state?.id,
                nome: location.state?.nome,
                email: location.state?.email,
                senha: location.state?.senha,
            }
        });
    };

    async function deletarRegistro(id){
        let resultado = confirm('Você irá Apagar esse Registro?')
        if(resultado){
            try {
                const resposta = await fetch(`http://localhost:3000/deletar-animal?id=${id}`);
                
                alert('Animal deletado')
            } catch (error) {
                console.log(error)
            }
        }
    }

    function sair(){
        let resultado = confirm('Desenja realmente sair?')
        if (resultado) {
            setCarregando(true);
            navigate("/login")
        }
    }
    
    return (
        <div className="min-h-screen bg-stone-100 p-6">
            <div className="max-w-5xl mx-auto flex flex-col justify-center">
                <header className="mb-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 p-6 text-white shadow-lg flex justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.2em] opacity-80">Perfil</p>
                    <h1 className="mt-2 text-3xl font-bold">{nomeProdutor}</h1>
                </div>
                <img src={utilizador} onClick={()=>{perfilProdutor()}} className="w-20 h-20 cursor-pointer" alt="" />
            
                </header>

                {dados.length === 0 ? (
                    <div className="rounded-2xl bg-white p-8 text-center shadow-sm border border-stone-200 text-stone-600">
                        Nenhum animal cadastrado para esse produtor.
                    </div>
                ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {dados.map((animal)=>{
                        
                        return(
                        <div key={animal.id} className="rounded-2xl  bg-white p-5 shadow-sm border border-stone-200 " >
                            
                            <div onClick={()=>(pageDetal(animal))}  className="cursor-pointer flex justify-between">
                                 <div className="font-bold mr-40">
                                    <p>Desc.</p>
                                    <p>Peso</p>
                                    <p>Perímetro</p>
                                    <p>Sexo</p>
                                    
                                </div>
                                <div className="">
                                    <p className="rounded-[3px] p-1 font-bold bg-blue-700 text-amber-50 ">{animal.nome}</p>
                                    <p>{animal.peso} <span className="font-bold">kg</span></p>
                                    <p>{animal.torax} <span className="font-bold">cm</span></p>
                                    <p>{animal.genero == true ? 'Macho':'Femea'}</p>
                                </div>
                            </div>
                            <img onClick={()=>(deletarRegistro(animal.id))} src={icoLixo} className="w-7 cursor-pointer" alt="" />
                        </div>    
                        )
                    })}
                </div>
                )}
               <div className="flex w-[100%] justify-between items-center">
                <button className="w-[300px] mt-8 bg-gradient-to-r from-emerald-600 to-green-500 active:bg-[#00FF70] cursor-pointer p-4 rounded-4xl font-bold text-amber-50 transition-transform duration-150" onClick={enviarDados}>
                        Novo animal
                </button>
                <img onClick={sair} src={btnSair} width={50} className="cursor-pointer mt-8" />
               </div>


            </div>
            
        </div>
    );
};

export { Page__perfil };