import { ReactNode, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta";



function Navbar() {

    const navigate = useNavigate();

    const{handleLogout} = useContext(AuthContext)

   const { usuario } = useContext(AuthContext)

    function logout(){
        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso', 'sucesso')
        navigate('/')
    }

    let componente: ReactNode;

    if(usuario.token !== ''){

        componente = (
            <div className='w-full flex justify-center py-4
            bg-gray-800 text-white'>

 <div className="container flex justify-between text-lg w-full relative flex-wrap gap-3 text-violet-500">
     <p className="text-lg  group relative w-max">
    <Link to='/home' className="text-2xl font-bold">
    <span>Blog Pessoal</span>
    </Link> 
    <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-gray-950 group-hover:w-full"></span>
    </p>
    
   
     <div className='flex gap-4 text-violet-400 hover:text-white'>
          <Link to='/postagens' className='hover:underline'>
          Postagens
          </Link>

          <Link to='/temas' className='hover:underline'>
          Temas
          </Link>

          <Link to='/cadastrartema' className='hover:underline'>
          Cadastrar tema
          </Link>

          <Link to='/perfil' className='hover:underline'>
          <img
         src={usuario?.foto}
         className='h-12 rounded-full' 
         alt="Perfil"
         />
          </Link>

         <Link to='' onClick={logout} className="hover:underline">
          Sair
         </Link>
         
     </div>
 </div>
</div>
        )
    }

    return (
        <>
          {componente}
        </>
    )
}

export default Navbar