import { useNavigate } from 'react-router-dom'
import './Cadastro.css'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Usuario from '../../models/Usuario';
import { cadastrarUsuario } from '../../services/Service';
import { RotatingLines } from 'react-loader-spinner'
import { ToastAlerta } from '../../utils/ToastAlerta';

function Cadastro() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [confirmarSenha, setConfirmarSenha] = useState<string>("")

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    useEffect(() => {
        if(usuario.id !== 0){
            retornar()
        }
    })

function retornar(){
    navigate('/login')
}

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(e.target.value)
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if(confirmarSenha === usuario.senha && usuario.senha.length>= 8){
            
            setIsLoading(true)

            try {
                await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario)
                ToastAlerta('Usuário cadastro com sucesso!', 'sucesso')

            } catch (error) {
                ToastAlerta('Erro ao Cadastrar o usuário!', 'erro')
            }
        }else{
            ToastAlerta('Dados do usuario estão inconsistente! Verifique', 'info')
            setUsuario({...usuario, senha: ''})
            setConfirmarSenha('')
        }

        setIsLoading(false)
    }

    console.log(JSON.stringify(usuario))
  return (
   <>
   <div className="h-screen flex justify-center items-center font-bold fundoCadastro ">
    {/* <div className="fundoCadastro hidden lg:block"></div> */}
        <form 
        className='flex justify-center items-center flex-col w-1/3 gap-3 border-3 rounded-3xl p-4 backdrop-blur-sm border-amber-50 text-blue-200 '
        onSubmit={cadastrarNovoUsuario}>
            <h2 className="text-blue-200 text-5xl"> Cadastrar</h2>

                <div className="flex flex-col w-full border-b-2">
                    <label htmlFor="nome"></label>
                    <input type="text" id="nome" name="nome" placeholder="Nome" className=" p-2 focus:outline-none"
                    value={usuario.nome}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}>
                    </input>
                </div>

                <div className="flex flex-col w-full border-b-2">
                    <label htmlFor="usuario"></label>
                    <input type="text" id="usuario" name="usuario" placeholder="Usuário" className="b p-2"
                    value={usuario.usuario}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}>
                    </input>
                </div>    
                 
                <div className="flex flex-col w-full border-b-2">
                    <label htmlFor="foto"></label>
                    <input type="text" id="foto" name="foto" placeholder="Foto" className=" rounded p-2"
                    value={usuario.foto}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
                </div>

                <div className="flex flex-col w-full border-b-2">
                   <label htmlFor="senha"></label>
                   <input type="password" id="senha" name="senha" placeholder="Senha"  className=" rounded p-2"
                   value={usuario.senha}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
                </div>

               <div className="flex flex-col w-full border-b-2">
                    <label htmlFor="confirmarSenha"></label>
                    <input type="password" id="confirmarSenha" name="confirmarSenha" placeholder="Confirmar Senha"  className="rounded p-2"
                    value={confirmarSenha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}/>
               </div>

               <div className="flex justify-around w-full gap-8 p-2">
                    <button type='reset' className='rounded text-white bg-red-400 
                  hover:bg-red-700 w-1/2 py-2'
                  onClick={retornar} >
                    Cancelar
                    </button>
                    
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
                                <span>Cadastrar</span>
                                }
                                
                   </button> 
            
             </div>  
        </form>
   </div>
   
   </>
  )
}

export default Cadastro