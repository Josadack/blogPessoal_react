
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormPerfil from '../formperfil/FormPerfil';


function ModalPostagem() {


  return (
    <>
     <Popup
        trigger={
          <button className=' text-white bg-indigo-400 
                    hover:bg-indigo-800 flex items-center justify-center py-2
                    rounded-full w-36 border-8 border-white '>
                    Editar Perfil
          </button>
            }
            modal
        >

            <FormPerfil />
    </Popup>
    </>
  );
}

export default ModalPostagem

