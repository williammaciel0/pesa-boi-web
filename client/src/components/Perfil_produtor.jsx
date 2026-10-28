import { useLocation, useNavigate } from 'react-router-dom';
import arrowLeft from '../assets/icons/arrow-left-svgrepo-com.svg'
import utilizador from "../assets/icons/utilizador.png"
// import { usePagePerfil } from "../hooks/usePagePerfil"
import { useState } from 'react';

const Perfil_produtor = () => {
    const location = useLocation();
    const navigate = useNavigate()
    
    console.log(location.state)
    const [id, setId] = useState(location.state?.id || '');
    const [nome, setNome] = useState(location.state?.nome || '');
    const [email, setEmail] = useState(location.state?.email || '');
    const [senha, setSenha] = useState(location.state?.senha || '');

    async function alterarPerfil(event){
        event.preventDefault();
        const perfil = {
            id: id,
            nome: nome,
            email: email,
            senha: senha
        }
        const respost = await fetch(`${import.meta.env.VITE_API_URL}/up-perfilprodutor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(perfil)
        });
        
        navigate('/page_perfil', {
            state: {
                id: perfil.id,
                nome: perfil.nome,
                senha: perfil.senha,
                email: perfil.email
            }
        });
    }

    const retornarAoPerfil = ()=> {
        navigate('/page_perfil', {
            state: {
                id: id,
                nome: nome,
                senha: senha,
                email: email
            }
        });
    }

    return(<>
        <div className="flex justify-between items-center w-[100%] p-4 shadow-md">
            <img className='cursor-pointer' src={arrowLeft} width={50} onClick={retornarAoPerfil} />
            <p className="font-bold text-2xl">Usuário</p>
            <img src={utilizador} width={50} alt="" />
        </div>
        <section className='min-h-screen p-6 m-4 bg-stone-100'>
            <div className='max-w-5xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 flex flex-col'>
                <div className='text-amber-50'>
                    <p className="text-sm uppercase tracking-[0.2em] opacity-80">Perfil</p>
                    <p className="text-sm uppercase tracking-[0.2em] opacity-80">#ID: {id}</p>
                    <h1 className="mt-2 text-3xl font-bold">{nome}</h1>
                </div>
                <form className='text-amber-50 p-1 flex flex-col gap-5' onSubmit={alterarPerfil}>
                    <label htmlFor="">Nome de Usuário</label>
                    <input className='p-3 bg-blue-100 rounded-2xl text-black text-gray-600' type="text" onChange={(event)=>setNome(event.target.value)} value={nome} required />
                    <label htmlFor="">Email de Usuário</label>
                    <input className='p-3 bg-blue-100 rounded-2xl text-gray-600' type="text" value={email} onChange={(event)=>setEmail(event.target.value)} required />
                    <label htmlFor="">Senha</label>
                    <input className='p-3 bg-blue-100 rounded-2xl text-gray-600' type="text" value={senha} onChange={(event)=>setSenha(event.target.value)} required />
                    <button type='submit' className="w-[300px] self-center bg-blue-700 active:bg-blue-600 cursor-pointer p-4 rounded-4xl font-bold text-amber-50 transition-transform duration-150 shadow-2xl">Alterar</button>
                </form>
            </div>
        </section>
    </>)
}

export { Perfil_produtor }