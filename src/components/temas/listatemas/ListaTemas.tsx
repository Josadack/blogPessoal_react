import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import Tema from "../../../models/Tema"
import CardTemas from "../cardtemas/CardTemas"
import { buscar } from "../../../services/Service"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { ToastAlerta } from "../../../utils/ToastAlerta"
 
function ListaTemas() {

    const navigate = useNavigate();
 
    const [temas, setTemas] = useState<Tema[]>([])

    const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de busca  
    const [temasFiltrados, setTemasFiltrados] = useState<Tema[]>([]); // Estado para a lista filtrada

 
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
 
    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any){
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }
 
    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado!", 'info')
            navigate("/")
        }
    }, [token])
 
    useEffect(() => {
        buscarTemas()
    }, [temas.length])

    useEffect(() => {  
        // Filtra os temas quando o termo de busca ou a lista de temas mudam  
        const filtered = temas.filter(tema =>  
            tema.descricao.toLowerCase().includes(searchTerm.toLowerCase())  
        );  
        setTemasFiltrados(filtered);  
    }, [searchTerm, temas]);  
 
    return (
        <>
            {temas.length === 0 && (
                <DotLottieReact
                src="https://lottie.host/42bfe1c6-586b-4972-8955-a72c3cee277e/3bEPSAZYsw.lottie"
                loop
                autoplay
                />
            )}
             <div className="flex justify-center w-full my-4 ">  
                <input  
                    type="text"  
                    placeholder="Buscar por descrição"  
                    className="border-2 border-slate-700 rounded p-2 w-1/2"  
                    value={searchTerm}  
                    onChange={(e) => setSearchTerm(e.target.value)}  
                />      
            </div>

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col mx-2">
                    <div
                        className="grid grid-cols-1 md:grid-cols-2
                                    lg:grid-cols-3 gap-8"
                    >
                        {temasFiltrados.map((tema: Tema) => (
                            <CardTemas key={tema.id} tema={tema} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaTemas