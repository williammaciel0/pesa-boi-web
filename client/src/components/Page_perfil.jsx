import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
            }
        })
    }

    function pageDetal(animal){
        navigate("/detal_animal", {
            state: {
                id: location.state?.id,
                nome: location.state?.nome,
                senha: location.state?.senha,
                animal: animal
            }
        })
    }
    
    return (
        <div className="min-h-screen bg-stone-100 p-6">
            <div className="max-w-5xl mx-auto flex flex-col justify-center">
                <header className="mb-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 p-6 text-white shadow-lg">
                    <p className="text-sm uppercase tracking-[0.2em] opacity-80">Perfil</p>
                    <h1 className="mt-2 text-3xl font-bold">{nomeProdutor}</h1>
                </header>

                {dados.length === 0 ? (
                    <div className="rounded-2xl bg-white p-8 text-center shadow-sm border border-stone-200 text-stone-600">
                        Nenhum animal cadastrado para esse produtor.
                    </div>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {dados.map((animal) => {
                            const nomeAnimal = animal.nome || animal.name || animal.raca || `Animal ${animal.id}`;
                            const campos = Object.entries(animal).filter(
                                ([chave]) => !["id", "produtor_id"].includes(chave)
                            );

                            return (
                                <article onClick={()=>(pageDetal(animal))} key={animal.id} className="rounded-2xl cursor-pointer bg-white p-5 shadow-sm border border-stone-200">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">Animal</p>
                                            <h2 className="mt-1 text-2xl font-bold text-stone-800">{nomeAnimal}</h2>
                                        </div>
                                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                            #{animal.id}
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-sm text-stone-700">
                                        {campos.map(([chave, valor]) => (
                                            <div key={chave} className="flex justify-between gap-4 border-b border-stone-100 pb-2">
                                                <span className="font-medium capitalize text-stone-500">
                                                    {chave.replace(/_/g, " ")}
                                                </span>
                                                <span className="text-right font-semibold text-stone-800">
                                                    {valor ?? "-"}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
               
                    <button className="w-[300px] mt-8 self-center bg-gradient-to-r from-emerald-600 to-green-500 active:bg-[#00FF70] cursor-pointer p-4 rounded-4xl font-bold text-amber-50 transition-transform duration-150" onClick={enviarDados}>
                        Novo animal
                    </button>

            </div>
            
        </div>
    );
};

export { Page__perfil };