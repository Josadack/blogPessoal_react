

function Home() {
  return (
    <div style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
    }}>
        <div>
            <div style={{
                width: "80vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <h2>Seja bem Vindo</h2>
                <p>Expresse aqui seus pensamentos e opinioes</p>

                <div style={{
                width: "80vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <img
                    src="https://i.imgur.com/VpwApCU.png"
                    alt="Imagem da pagina "
                    width="400px"/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Home