import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import arrowLeft from '../assets/icons/arrow-left-svgrepo-com.svg'

const Detal_animal = ()=>{
    const location = useLocation()
    const navigate = useNavigate()
    const perfilState = location.state ?? {};
    const animal = perfilState.animal ?? {};

    const [perimetro, setPerimetro] = useState(animal.torax ?? "")
    const [peso, setPeso] = useState("")
    const [dataPesagem, setDataPesagem] = useState(animal.data_pesagem ?? "")

    useEffect(() => {
        setPerimetro(animal.torax ?? "")
        setPeso("")
        setDataPesagem(animal.data_pesagem ?? "")
    }, [animal])

    console.log({ peso, perimetro, dataPesagem })

    async function updateForm(event) {
        event.preventDefault();
    }

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
         <div className="flex justify-between items-center w-full p-4 shadow-md">
            <img className='cursor-pointer' src={arrowLeft} width={50} onClick={retornarAoPerfil} />
            <p className="font-bold text-2xl">Atualizar</p>
            <img src="" width={50} alt="" />
        </div>
        <form className="flex px-4 flex-col gap-5 w-full" onSubmit={updateForm}>
            <div>
                 <p className="font-bold text-2xl">{animal.nome ?? "Animal"}</p>
                 <p>{peso || "Peso não informado"} Kg</p>
                 <p>Última pesagem: {dataPesagem || "Sem data"}</p>
            </div>
            <input
                className="p-4 border-b-2 border-b-gray-400 focus:outline-none focus:ring-0"
                type="number"
                placeholder="Novo perímetro (cm)"
                name='perimetro'
                onChange={(event) => setPerimetro(event.target.value)}
                value={perimetro}
                required
            />
            <button type='submit' className="w-75 self-center bg-blue-700 active:bg-blue-600 cursor-pointer p-4 rounded-4xl font-bold text-amber-50 transition-transform duration-150">
                Atualizar
            </button>
        </form>
        </>
    )
}

export { Detal_animal }