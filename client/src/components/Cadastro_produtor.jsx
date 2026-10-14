import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import arrowLeft from '../assets/icons/arrow-left-svgrepo-com.svg'

const Cadastro_produtor = () => {
     const [ inputs, setInputs ] = useState({
        nome: '',
        senha: '',
        email: ''
    });
    const navigate = useNavigate();
    
    const pegarDados = (event)=>{
        const { name, value } = event.target;
        setInputs((prev)=>({
            ...prev, [name]: value
        }))
    }
    const validacaoForm = async(event) =>{
        event.preventDefault();

        if (!inputs.nome.trim() || !inputs.senha.trim()) {
            alert('Informe o nome do usuário e a senha.');
            return;
        }

        const produtor = {
            nome: inputs.nome.trim(),
            senha: inputs.senha.trim(),
            email: inputs.email.trim()
        }

        try {
            const respost = await fetch("http://localhost:3000/cad-produtor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produtor)
            });

            if (!respost.ok) {
                const erroResposta = await respost.json().catch(() => ({ erro: 'Erro ao cadastrar produtor' }));
                alert(erroResposta.erro || 'Erro ao cadastrar produtor');
                return;
            }

            alert('Produtor cadastrado com sucesso!');
            navigate('/login');
        } catch (erro) {
            console.error(erro);
            alert('Não foi possível cadastrar o produtor.');
        }
    }
    return(
        <>
        <div className="flex justify-between items-center w-[100%] p-4 shadow-md">
            <Link to='/login'>
                <img className='cursor-pointer' src={arrowLeft} width={30} />
            </Link>
            <p className="font-bold text-2xl">Produtor</p>
            <img src="" width={50} alt="" />
        </div>
        <form className="flex px-4 flex-col gap-5 w-[100%]" onSubmit={validacaoForm}>
            <input className="p-4 border-b-2 border-b-gray-400 focus:outline-none focus:ring-0" type="text" placeholder="Nome de usuário" name='nome' onChange={pegarDados} value={inputs.nome} required/>
            <input className="p-4 border-b-2 border-b-gray-400 focus:outline-none focus:ring-0" type="text" placeholder="E-mail" name='email' onChange={pegarDados} value={inputs.email} required/>
            <input className="p-4 border-b-2 border-b-gray-400 focus:outline-none focus:ring-0" type="password" placeholder="Senha" name='senha' onChange={pegarDados} value={inputs.senha} required/>
            <button type='submit' className="w-[300px] self-center bg-blue-700 active:bg-blue-600 cursor-pointer p-4 rounded-4xl font-bold text-amber-50 transition-transform duration-150">
                Cadastrar
            </button>
        </form>
    </>
    )
}

export { Cadastro_produtor }