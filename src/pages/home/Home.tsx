

function Home() {
    return (


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
                   
                    <button className="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-indigo-100 rounded hover:bg-white group py-1.5 px-2.5">
                       <span className="w-56 h-48 rounded bg-gray-950 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                       <span className="relative w-full text-left text-indigo-600 transition-colors duration-300 ease-in-out group-hover:text-white">Nova Postagem</span>
                  </button>
                   
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
    );
  }
   
  export default Home;