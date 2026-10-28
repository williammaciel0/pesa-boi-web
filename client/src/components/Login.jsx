import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const [ nome, setNome ] = useState("")
    const [ senha, setSenha ] = useState("")
    const [ statusUser, setStatusUser ] = useState("")
    const navigate = useNavigate()
   
    async function validarLogin(event) {
        event.preventDefault();
        try {
            const result = await fetch(
                `${import.meta.env.VITE_API_URL}/produtor?nome=${nome}&senha=${senha}`
            );
            const dados = await result.json()

            if (!dados.length) {
                setStatusUser('Usuário não encontrado')
                return
            } else {
                setStatusUser('')
            }

            navigate('/page_perfil', {
                state: {
                    id: dados[0].id,
                    nome: dados[0].name_user,
                    senha: dados[0].senha,
                    email: dados[0].email,
                }
            })

        } catch (erro) {
            console.error(erro)
        }
    }

    return(
    <>
        <div className="flex justify-center items-center w-[100%] p-4 shadow-md">
            <p className="font-bold text-2xl">Login</p>
        </div>
        <p>{statusUser}</p>
        <form className="flex px-4 flex-col gap-5 w-[100%]" onSubmit={validarLogin}>
            <input className="p-4 border-b-2 border-b-gray-400 focus:outline-none focus:ring-0" type="text" placeholder="Nome de usuário" value={nome} onChange={(e)=> setNome(e.target.value)} required/>
            <input className="p-4 border-b-2 border-b-gray-400 focus:outline-none focus:ring-0" type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)} required/>
            <button type='submit' className="w-[300px] self-center bg-blue-700 active:bg-blue-600 cursor-pointer p-4 rounded-4xl font-bold text-amber-50 transition-transform duration-150">
                Entrar
            </button>
            <p className="self-center text-center">Ainda não possue uma conta? Clque no Botão abaixo!</p> 
        </form>
        <Link to='/cad_cadastro'>
            <button type='submit' className="w-[300px] self-center bg-gradient-to-r from-emerald-600 to-green-500 active:bg-[#00FF70] cursor-pointer p-4 rounded-4xl font-bold text-amber-50 transition-transform duration-150">
                    Cadastrar
            </button>
        </Link>
       
        </>
    )
}

export { Login }