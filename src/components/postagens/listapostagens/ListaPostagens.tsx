import { useNavigate } from "react-router-dom";
import CardPostagens from "../cardpostagens/CardPostagens";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
//import { DNA } from "react-loader-spinner";
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaPostagens() {

    const navigate = useNavigate();

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const [searchPost, setSearchPost] = useState(''); // Estado para o termo de busca  
    const [postagensFiltrados, setPostagensFiltrados] = useState<Postagem[]>([]); // Estado para a lista filtrada

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPostagens() {
        try {
            await buscar('/postagens', setPostagens, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info')
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length])


    useEffect(() => {
        const filtered = postagens.filter(postagem =>{
           const pesquisar = searchPost.toLowerCase();
           return(
                postagem.titulo.toLowerCase().includes(pesquisar) ||
                postagem.texto.toLowerCase().includes(pesquisar)  ||
                postagem.usuario?.nome.toLowerCase().includes(pesquisar)
           );
    });
        setPostagensFiltrados(filtered);
    }, [searchPost, postagens]);


    return (
        <>
            {postagens.length === 0 && (
               <DotLottieReact
               src="https://lottie.host/42bfe1c6-586b-4972-8955-a72c3cee277e/3bEPSAZYsw.lottie"
               loop
               autoplay
             />
            )}
             <div  className="flex justify-center w-full my-4 ">
                        <input 
                        type="text"
                         placeholder="Buscar por Título, Texto, Usuário... "
                         className="border-2 rounded p-1 w-1/2 "
                         value={searchPost}
                         onChange={(e) => setSearchPost(e.target.value)}
                         >
                        </input>
                    </div>
                    

            <div className="flex justify-center w-full my-4 ">
                <div className="container flex flex-col mx-2 ">
                    <div className='container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                    >
                        {postagensFiltrados.map((postagem) => (
                            <CardPostagens key={postagem.id} postagem={postagem} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaPostagens;