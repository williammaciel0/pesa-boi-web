import { useState } from 'react'
import arrowLeft from '../assets/icons/arrow-left-svgrepo-com.svg'
import { useLocation, useNavigate } from 'react-router-dom';
import { useCalculoDePeso } from '../hooks/useCalculoDePeso';

const Cadastro_animal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const perfilState = location.state ?? {};

    const [inputs, setInputs] = useState({
        nome: '',
        perimetro: '',
        genero: '',
        produtor_id: perfilState.id,
        peso: ''
    });

    const pegarDados = (event) => {
        const { name, value } = event.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const validacaoForm = async(event) => {
        event.preventDefault();

        const perimetroNumero = Number(inputs.perimetro);

        if (Number.isNaN(perimetroNumero) || perimetroNumero >= 1000 || perimetroNumero <= 60) {
            setInputs((prev) => ({
                ...prev,
                perimetro: ''
            }));
            alert('Válido somente entre 60 e 999!');
            return;
        }

        const pesoCalculado = useCalculoDePeso(perimetroNumero, inputs.genero);

        if (pesoCalculado === '' || Number.isNaN(Number(pesoCalculado))) {
            alert('Não foi possível calcular o peso para esse perímetro e gênero.');
            return;
        }

        const animais = {
            nome: inputs.nome.trim(),
            perimetro: perimetroNumero,
            genero: inputs.genero,
            produtor_id: inputs.produtor_id,
            peso: Number(pesoCalculado)
        }

        try {
            const respost = await fetch("http://localhost:3000/cad-animal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(animais)
            });

            if (!respost.ok) {
                const erroResposta = await respost.json().catch(() => ({ erro: 'Erro ao cadastrar animal' }));
                alert(erroResposta.erro || 'Erro ao cadastrar animal');
                return;
            }

            navigate('/page_perfil', {
                state: {
                    id: perfilState.id,
                    nome: perfilState.nome,
                    senha: perfilState.senha,
                }
            });
        } catch (erro) {
            console.error(erro);
            alert('Não foi possível salvar o animal.');
        }
    };

    function retornarAoPerfil() {
        navigate('/page_perfil', {
            state: {
                id: perfilState.id,
                nome: perfilState.nome,
                senha: perfilState.senha,
            }
        });
    }

    return(
        <>
            <div className="flex justify-between items-center w-[100%] p-4 shadow-md">
                <img className='cursor-pointer' src={arrowLeft} width={50} onClick={retornarAoPerfil} />
                <p className="font-bold text-2xl">Cadastro</p>
                <img src="" width={50} alt="" />
            </div>
            <form className="flex px-4 flex-col gap-5 w-[100%]" onSubmit={validacaoForm}>
               <input className="p-4 border-b-2 border-b-gray-400 focus:outline-none focus:ring-0" type="text" placeholder="Nome do Animal" name='nome' onChange={pegarDados} value={inputs.nome} required/>
                <input className="p-4 border-b-2 border-b-gray-400 focus:outline-none focus:ring-0" type="number" placeholder="Perímetro em centimentros (cm)" name='perimetro' onChange={pegarDados} value={inputs.perimetro} required/>
                <label htmlFor="">Sexo</label>
                <select name="genero" onChange={pegarDados} value={inputs.genero} required>
                    <option value=""></option>
                    <option value="macho">Macho</option>
                    <option value="femea">Femea</option>
                </select>
                <button type='submit' className="w-[300px] self-center bg-blue-700 active:bg-blue-600 cursor-pointer p-4 rounded-4xl font-bold text-amber-50 transition-transform duration-150">
                    Salvar
                </button>
            </form>
        </>
    )
}

export { Cadastro_animal }