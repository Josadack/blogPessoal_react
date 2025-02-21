import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem";


function Home() {
    return (

    <>
      <div className="flex justify-center bg-indigo-900" >
        <div  className="container grid grid-cols-2 text-white">
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <h2 className="text-2xl sm:text-5xl font-bold">
                Seja Bem Vindo!
                </h2>
            <p className="text-xl">
                Expresse aqui seus pensamentos e opiniões
                </p>

                <div className="flex justify-around gap-4">

                <div className="flex justify-around gap-4">
                                <ModalPostagem />
                </div>
               
                </div>
          </div>
   
          <div className="flex justify-center ">
            <img
              src="https://ik.imagekit.io/oois5ivj4v/online-world-animate.svg?updatedAt=1739555802260"
              alt="Imagem da Página Home"
              className="w-2/3"
            />
          </div>
        </div>
      </div>
      
    <ListaPostagens />

      </>
    );
  }
   
  export default Home;