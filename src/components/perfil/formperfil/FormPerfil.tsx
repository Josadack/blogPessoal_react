import { ChangeEvent, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import Usuario from "../../../models/Usuario";
import { atualizar, buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";



function FormPerfil() {

 const navigate = useNavigate();

 const [usuarios, setUsuarios] = useState<Usuario>( {} as Usuario)

 const [isLoading, setIsLoading] = useState<boolean>(false)

 const [confirmarSenha, setConfirmarSenha] = useState<string>("")

 const { id } = useParams <{ id: string }>()
 
 const { usuario, handleLogout } = useContext(AuthContext)
 const token = usuario.token

 async function buscarUsuarioPorId(id: string) {
    try {
        await buscar (`/usuarios/${id}`, setUsuarios,{
            headers: {authorization: token}
        })
    } catch (error: any) {
        if (error.toString().includes('401')) {
            handleLogout()
        }
    }

 }

 useEffect(() => {
    if (token === '') {
        ToastAlerta('Você precisa estar logado', 'info');
        navigate('/');
    }
}, [token])

useEffect(() => {
    if (id !== undefined) {
        buscarUsuarioPorId(id)
    }
}, [id])

useEffect(() => {  
    if(usuario.id){  
        buscarUsuarioPorId(usuario.id.toString())  
    }  
}, [usuario]);  

 function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuarios({
         ...usuarios,
    [e.target.name]: e.target.value,
    }) 
 }

 function retornar() {
    navigate('/perfil');
}

function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(e.target.value)
}

async function atualizarPerfil(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault();
    setIsLoading(true)

    if( confirmarSenha === usuarios.senha && usuarios.senha.length>= 8){
        try {
            await atualizar('/usuarios/atualizar', usuarios, setUsuarios, {
                headers: {
                    Authorization: token,
                }
            })

            ToastAlerta('Usuário atualizado com sucesso❗', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao atualizar a Postagem', 'erro')
            }
        }
    }else{
        ToastAlerta('Dados do usuario estão inconsistente! Verifique', 'info')
        setUsuarios({...usuarios, senha: ''})
        setConfirmarSenha('')
    }

    setIsLoading(false)   
    retornar()
}

 
 
  
  return (
  <div className="container flex flex-col mx-auto items-center">
              <h3 className="text-4xl text-center my-4">
                   
                <img
                        src={usuario.foto}
                        className='flex h-12 rounded-full justify-center' 
                        alt="Perfil"
                        />
                       
                        
              </h3>
              <p className='flex items-center justify-center text-gray-800 text-2xl'> Editar</p>

              <form className="flex flex-col w-1/2 gap-4" 
              onSubmit={atualizarPerfil}>
                  <div className="flex flex-col gap-2">
                      <label htmlFor="titulo">Nome</label>
                      <input
                          type="text"
                          placeholder="Nome"
                          name="nome"
                          required
                          className="border-2 border-slate-700 rounded p-2"
                         value={usuarios.nome}
                         onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                      />
                  </div>
                  <div className="flex flex-col gap-2">
                      <label htmlFor="titulo">E-mail </label>
                      <input
                          type="email"
                          placeholder="E-mail "
                          name="email"
                          required
                          className="border-2 border-slate-700 rounded p-2"
                          value={usuarios.usuario}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}  
                      />
                  </div>
                  <div className="flex flex-col gap-2">
                      <label htmlFor="titulo">Foto </label>
                      <input
                          type="text"
                          placeholder="foto "
                          name="foto"
                          required
                          className="border-2 border-slate-700 rounded p-2"
                          value={usuarios.foto}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        
                      />
                  </div>
                  <div className="flex flex-col gap-2">
                      <label htmlFor="titulo">Senha </label>
                      <input
                          type="password"
                          placeholder="Senha "
                          name="senha"
                          required
                          className="border-2 border-slate-700 rounded p-2"
                          value={usuarios.senha}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}  
                      />
                  </div>
                  <div className="flex flex-col gap-2">
                      <label htmlFor="titulo">Confirma Senha </label>
                      <input
                          type="password"
                          placeholder="Confirma Senha "
                          name="confirmasenha"
                          required
                          className="border-2 border-slate-700 rounded p-2"
                          value={confirmarSenha}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}  
                      />
                  </div>
                
                  <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center'>
                              {isLoading}  Atualizar
                 </button>
              </form>
          </div>
  )
}

export default FormPerfil