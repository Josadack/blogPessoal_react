import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import UsuarioLogin from '../../models/UsuarioLogin';
import { AuthContext } from '../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';

function Login() {

  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin)

  const {usuario, handleLogin, isLoading} = useContext(AuthContext)

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  useEffect(()=> {
    if(usuario.token !== ''){
      navigate('/home')
    }
  }, [usuario])

  function login(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault()

    handleLogin(usuarioLogin)
  }
  return (
   <>
    <div className="h-screen flex justify-center items-center font-bold fundoLogin">
      <form 
      className="flex justify-center items-center flex-col w-[450px] gap-6 border-3 rounded-3xl p-5 backdrop-blur-sm border-amber-50 text-blue-200"
      onSubmit={login} 
      >
        <h2 className="text-blue-200 text-5xl ">Login</h2>

          <div className='flex flex-col w-full border-b'>
            <label htmlFor="usuario"></label>
            <input 
            type="text" 
            name="usuario" 
            id="usuario" 
            placeholder='Usuário' 
            className='gap-2 py-1 focus:outline-none'
            value={usuarioLogin.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)}/>
         </div>

         <div className='flex flex-col w-full border-b '>
            <label htmlFor="senha"></label>
            <input 
            type="password" 
            name="senha" 
            id="senha" 
            placeholder='Senha' 
            className='gap-2 py-1 focus:outline-none'
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)}
              />
         </div>

         <button type='submit'
                        className='rounded text-white bg-indigo-400 
                                hover:bg-indigo-900 w-1/2 py-2
                                flex justify-center'> 
                                {isLoading ?
                                <RotatingLines
                                 strokeColor="white"
                                 strokeWidth="5"
                                 animationDuration="0.75"
                                 width="24"
                                 visible={true}/> 
                                :
                                <span>Entrar</span>
                                }
                                
                   </button>
        <hr className='border-indigo-600 w-full  '/>

        <p>
          Ainda não tem uma conta?{' '}
          <Link to='/cadastro' className="text-indigo-800 hover:underline"> Cadastre-se
          </Link>
        </p>
     
      </form>
      {/* <div className="fundoLogin hidden lg:block"></div> */}
    </div>

    </>
  )
}

export default Login