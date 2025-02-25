import {LinkedinLogo, GithubLogo } from "@phosphor-icons/react";
import { ReactNode, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
//fixed bottom-0 w-full

function Footer() {

    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)
    
     let componente: ReactNode;

     if(usuario.token !== ''){

      componente = (
        <div className="flex  justify-center bg-gray-900 text-violet-400 " >
        <div className="container flex flex-col items-center py-4 text-xl">
          <h2 className="font-bold">
              Blog Pessoal Josadaque Ferreira | Copyright: {data}
          </h2>
          <p>
              Acesse minhas redes sociais
          </p>
      
          
         <div className="flex gap-3">
          <a 
          href="https://www.linkedin.com/in/josadaque-ferreira/"
           target="blank"
           className="hover:scale-110 hover:rotate-6 transition-all duration-200 block" 
           >
         <LinkedinLogo size={48} color="#e3d9de" weight="bold"/>
         </a>
         
         <a
          href="https://www.github.com/josadack"
          target="blank"
          className="hover:scale-110 hover:rotate-12 transition-all duration-200 block" >
         <GithubLogo size={48} color="#e3d9de" weight="bold" />
         </a>
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

export default Footer