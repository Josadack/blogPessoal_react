import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"


function Navbar() {

    const navigate = useNavigate();

    const{handleLogout} = useContext(AuthContext)

    function logout(){
        handleLogout()
        alert('O Usuário foi desconectado com sucesso')
        navigate('/')
    }

    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-indigo-900 text-white'>
            
                <div className="container flex justify-between text-lg w-full relative flex-wrap gap-3">
                    <p className="text-lg  group relative w-max">
                   <Link to='/home' className="text-2xl font-bold">
                   <span>Blog Pessoal</span>
                   </Link> 
                   <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-gray-950 group-hover:w-full"></span>
                   </p>
                   
                    <div className='flex gap-4'>
                         <Link to='/postagens' className='hover:underline'>
                         Postagens
                         </Link>

                         <Link to='/temas' className='hover:underline'>
                         Temas
                         </Link>

                         <Link to='/cadastrartema' className='hover:underline'>
                         Cadastrar tema
                         </Link>

                         Perfil
                         
                        <Link to='' onClick={logout} className="hover:underline">
                         Sair
                        </Link>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar