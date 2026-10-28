import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCalculoDePeso } from '../hooks/useCalculoDePeso';
import arrowLeft from '../assets/icons/arrow-left-svgrepo-com.svg'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList
} from 'recharts';

const Detal_animal = ()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const perfilState = location.state ?? {};
    const animal = perfilState.animal ?? {};

    const [dados, setDados] = useState([])
    const [perimetro, setPerimetro] = useState(animal.torax)
    const [nome, setNome] = useState(animal.nome)
    const [peso, setPeso] = useState(animal.peso)
    const [produtor_id, setProdutor_id] = useState(animal.produtor_id ?? "")
    const [dataPesagem, setDataPesagem] = useState(animal.data_pesagem ?? "")
    const [genero, setGenero] = useState(animal.genero === true ? 'macho' : 'femea')
    
    useEffect(() => {
        setPerimetro(animal.torax ?? "")
        setPeso(animal.peso ?? "")
        setDataPesagem(animal.data_pesagem ?? "")
        listarHistorico()
    }, [animal]);

    async function updateForm(event) {
        event.preventDefault();
        const calcularNovoPeso = await useCalculoDePeso(perimetro, genero)
        setPeso(calcularNovoPeso)
        setPerimetro(event.target.value)
        const animais = {
            perimetro: perimetro,
            peso: calcularNovoPeso,
            id: animal.id
        }
        const respost = await fetch(`${import.meta.env.VITE_API_URL}/up-animal`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animais)
        });
        

    }

    async function listarHistorico(){
        const animal_id = animal.id
        const resposta = await fetch(`${import.meta.env.VITE_API_URL}/listar-animal?animal_id=${animal_id}`)
        const dadosApi = await resposta.json();
        setDados(Array.isArray(dadosApi) ? dadosApi : [])
    }

    function retornarAoPerfil() {
        navigate('/page_perfil', {
            state: {
                id: perfilState.id,
                nome: perfilState.nome,
                senha: perfilState.senha,
                email: perfilState.email
            }
        });
    }

    const formatarData = (dataATU) => {
        const data = new Date(dataATU)
        return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }
   
    return(
        <>
         <div className="flex justify-between items-center w-full p-4 shadow-md">
            <img className='cursor-pointer' src={arrowLeft} width={50} onClick={retornarAoPerfil} />
            <p className="font-bold text-2xl">Atualizar</p>
            <img src="" width={50} alt="" />
        </div>
       
        <form className="flex p-4  flex-col gap-2 w-full" onSubmit={updateForm}>
            <p className="font-bold text-2xl">{animal.nome ?? "Animal"}</p>
            <p className="text-sm uppercase tracking-[0.2em] opacity-80">{genero}</p>
            <p>Peso Atual  <span className="font-bold text-1xl">{peso ?? "Animal"} Kg</span></p>
            <p>Perímetro Atual (cm)</p>
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
            {dados.length == '' ? (
                <p className="font-bold text-2xl self-center">Esse animal ainda não possue hitórico!</p>
            ):(
                <section>
                <div>
                    <p className="font-bold">GRÁFICO DE EVOLUÇÃO</p>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={dados}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="data_history" tickFormatter={formatarData} />
                                <YAxis/>
                                <Tooltip />
                                <Bar dataKey="peso_history" fill="#8884d8">
                                    <LabelList dataKey="peso_history" position="top"/>
                                </Bar>
                                <Bar dataKey="torax_history" fill="#82ca9d">
                                    <LabelList dataKey="torax_history" position="top"/>
                                </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                <div className="w-[100%] mb-4">
                    <p className="font-bold text-2xl">Hitórico</p>
                    <table className="flex flex-col gap-1 max-w-[100%] border border-collapse bg-[#ffffff] shadow-[0 4px 6px ] rounded-[5px] overflow-hidden">
                        <thead>
                            <tr className="flex justify-around bg-mist-200">
                                <th className="px-[12px] py-[15px]">Peso (Kg)</th>
                                <th className="px-[12px] py-[15px]">Medida (cm)</th>
                                <th className="px-[12px] py-[15px]">Data </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.toReversed().map((item, index)=>(
                                <tr className="flex justify-around border-t">
                                    <td className="px-[12px] py-[15px]" key={index}>{item.peso_history || "Peso não informado"}</td>
                                    <td className="px-[12px] py-[15px]" key={index}>{item.torax_history || "Peso não informado"} cm</td>
                                    <td className="px-[12px] py-[15px]" key={index}>{ formatarData(item.data_history) || "Peso não informado"}</td>
                                </tr>
                            
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            )}
            
            
        </form>
        </>
    )
}

export { Detal_animal }