
import Layout from "../layout";
import { Container } from "@chakra-ui/react";
import Link from "next/link";
const FindServices: React.FC = () => {
  return (
    <Container>
      <Layout>
        <div>
          <h1>COMO FUNCIONA RUBRIT</h1>
        </div>
        <Link href="/">
          <a>INDEX!</a>
        </Link>
        <div>
          <h2>DESCRIBI LAS TAREAS</h2>
          <p>
            Haces una breve descripcion del trabajo que estas necesitando hacer.
            Si queres podes adjuntar fotos para que el profesional que lo vea
            tenga una idea mas exacta de lo que hay que hacer.
          </p>
        </div>
        <div>
          <h2>BUSCAR PROFESIONALES Y PRECIOS</h2>
          <p>
            Busca en nuestra lista de profesionales cual te parece el mas
            indicado, vas a poder elegir varios filtros. Entre estos,
            calificaciones, reseñas, material grafico de sus trabajos.
          </p>
        </div>
        <div>
          <h2>ELEGI FECHA Y HORA</h2>
          <p>
            Selecciona segun la disponibilidad horaria del profesional un
            horario que te quede comodo para que se pueda realizar el trabajo .
          </p>
        </div>
        <div>
          <h2>CONFIRMA</h2>
          <p>
            Felicitaciones!!! ya completaste todo el formulario. nunca antes fue
            tan facil y seguro contratar a un profesional para que te haga el
            trabajo.
          </p>
        </div>
      </Layout>
    </Container>
  );
};

export default FindServices;

