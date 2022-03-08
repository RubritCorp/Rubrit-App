import {
  useColorModeValue,
  Flex,
  Box,
  chakra,
  Text,
  Container,
  useTheme,
  ListItem,
  UnorderedList,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

import Layout from "../layout";

const TermServe: React.FC = () => {
  const theme = useTheme();
  return (
    <Layout>
      <Box
        bg={useColorModeValue("#BBE1C3", "dark_green")}
        color={useColorModeValue("dark_green", "medium_grey")}
      >
        <Flex justifyContent="center" p={"2.5em"}>
          <Text
            fontSize={{ base: "0.5rem", md: "0.5rem", lg: "2rem" }}
            fontWeight={300}
          >
            TERMINOS Y CONDICIONES DEL SERVICIOS
            <chakra.span fontWeight={"bold"}>{" RUBRIT"}</chakra.span>
          </Text>
        </Flex>
      </Box>
      <Container maxW="container.xl" p={"2em 0"}>
        <Box p={"1em 3em 0 3em"} w="100%" justifyContent="center">
          <Text fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}>
            <chakra.p
              fontFamily={"Poppins"}
              fontWeight={"bold"}
              fontSize="1rem"
            >
              _ A través de los términos y condiciones de RUBRIT, se regulará el
              uso de los servicios y productos de la marca, para la APP y sitios
              web Dichas condiciones constituyen un acuerdo vinculante entre
              cualquier usuario a cualquier título y RUBRIT Se consideran
              aceptadas por parte del usuario cada vez que este acceda a
              cualquiera de los productos, por lo que se recomienda leer y
              entender todas las condiciones generales y demás documentos de
              términos de uso
            </chakra.p>
          </Text>
        </Box>
        <Flex padding={5}>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{
                    color: "medium_green",
                    textDecoration: "none",
                  }}
                >
                  <Box flex="1" textAlign="left">
                    <Text
                      fontSize={{ base: "0.5rem", md: "1rem", lg: "1em" }}
                      fontWeight={400}
                    >
                      TERMINOS TECNICOS
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box p={"1em 3em 0 3em"} w="100%" justifyContent="center">
                  <Text>
                    Los productos de RUBRIT están optimizados para ser
                    visualizados en dispositivos nativos y en definiciones
                    responsive (en definiciones menores aparecerán barras de
                    desplazamiento tanto horizontal como verticalmente
                    respectivamente). Para la visualización del sitio web, se
                    recomienda la utilización de Firefox 3.0 (o versiones
                    posteriores) o Chrome 4.1 (o versiones posteriores). El uso
                    de versiones anteriores de navegador, la utilización de un
                    navegador no compatible o la desactivación de algunas
                    propiedades, como la compatibilidad con Javascript o la
                    desactivación de las cookies, puede reducir la funcionalidad
                    del sitio. Si se accede al sitio mediante un firewall
                    (cortafuegos) o servidor proxy, asegúrese que permite la
                    recepción de cookies.
                  </Text>
                </Box>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  <Box flex="1" textAlign="left">
                    <Text
                      fontSize={{ base: "0.5rem", md: "1rem", lg: "1em" }}
                      fontWeight={400}
                    >
                      TERMINOS Y CONDICIONES DE USO EN GENERAL
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box p={"1em 3em 0 3em"} w="100%" justifyContent="center">
                  <Text>
                    Estas Condiciones Generales regulan el uso de los sitios web
                    pertenecientes y gestionados por RUBRIT. Algunos de nuestros
                    sitios web podrán recoger sus propias Condiciones
                    Particulares que, según los casos completarán, modificarán o
                    sustituirán las presentes Condiciones Generales. La
                    utilización de cualquiera de los sitios web de RUBRIT supone
                    la comprensión y aceptación plena de todas y cada una de las
                    Condiciones Generales aquí recogidas así como de las
                    Condiciones Particulares que, en su caso, se establezcan en
                    algunos sitios web.
                  </Text>
                </Box>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{
                    color: "medium_green",
                    textDecoration: "none",
                  }}
                >
                  <Box flex="1" textAlign="left">
                    <Text
                      fontSize={{ base: "0.5rem", md: "1rem", lg: "1em" }}
                      fontWeight={400}
                    >
                      REGISTRO DE USUARIOS
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box p={"1em 3em 0 3em"} w="100%" justifyContent="center">
                  <Text>
                    Para el acceso y/o utilización de determinados servicios y/o
                    productos bajo registro, el usuario deberá asignar un nombre
                    de usuario así como una contraseña, comprometiéndose a hacer
                    un uso diligente, responsable y ajustado a la ley de ambos
                    (nombre de usuario y contraseña), y a mantener el secreto de
                    las mismas, respondiendo así de todos los daños y/o
                    perjuicios que el uso incorrecto, inadecuado e ilícito
                    cause. En cualquier momento, y sin necesidad de previo
                    aviso, RUBRIT podrá denegar o retirar la utilización de
                    nuestros sitios web cuando el usuario incumpla con estas las
                    Condiciones Generales o con las Condiciones Particulares,
                    según corresponda.
                  </Text>
                </Box>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{
                    color: "medium_green",
                    textDecoration: "none",
                  }}
                >
                  <Box flex="1" textAlign="left">
                    <Text
                      fontSize={{ base: "0.5rem", md: "1rem", lg: "1em" }}
                      fontWeight={400}
                    >
                      PROTECION DE DATOS
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box p={"1em 3em 0 3em"} w="100%" justifyContent="center">
                  <Text>
                    Para poder utilizar algunos de nuestros sitios web, app y
                    demás productos de manera eficiente y segura, los usuarios
                    deberán aportar ciertos datos dependiendo de su rol dentro
                    del producto, entre ellos pueden figurar: su nombre y
                    apellido, documento nacional de identidad, o cualquier otra
                    identificación tributaria o previsional, profesión o
                    actividad comercial, dirección, número de teléfono y cuenta
                    de e-mail, sin los cuales se tornaría imposible brindar los
                    servicios. Por eso se requiere que éstos sean verdaderos y
                    exactos. Los datos recabados por los formularios
                    correspondientes serán objeto de tratamiento directamente
                    por RUBRIT y/o terceros.
                  </Text>
                </Box>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  <Box flex="1" textAlign="left">
                    <Text
                      fontSize={{ base: "0.5rem", md: "1rem", lg: "1em" }}
                      fontWeight={400}
                    >
                      GRATUITIDAD Y NO EXIGENCIA DE SUSCRIPCION
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box p={"1em 3em 0 3em"} w="100%" justifyContent="center">
                  <Text>
                    El acceso y/o utilización de nuestros sitios web de RUBRIT
                    es gratuito, excepto para aquellos servicios que así se
                    señalen en sus respectivas Condiciones Particulares. La
                    cumplimentación del formulario de registro es obligatoria
                    para acceder y disfrutar de los servicios ofrecidos en la
                    pagina. Así, para boletines informativos deberá facilitar su
                    dirección de correo electrónico y para el uso de
                    determinados servicios bajo registro deberá inscribirse como
                    usuario registrado de la red de TIMBRIT pudiéndose
                    identificar siempre con el mismo usuario y contraseña,
                    aprovechando con ello todas las posibilidades. El no
                    facilitar los datos personales solicitados o el no aceptar
                    la política de protección de datos supone la imposibilidad
                    de suscribirse, registrarse o participar en cualquiera de
                    las promociones en las que se soliciten datos carácter
                    personal.
                  </Text>
                </Box>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{
                    color: "medium_green",
                    textDecoration: "none",
                  }}
                >
                  <Box flex="1" textAlign="left">
                    <Text
                      fontSize={{ base: "0.5rem", md: "1rem", lg: "1em" }}
                      fontWeight={400}
                    >
                      VERACIDAD Y ACTUALIZACION DE DATOS
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box p={"1em 3em 0 3em"} w="100%" justifyContent="center">
                  <Text>
                    El usuario registrado (cliente o profesional) o el
                    suscriptor de boletines informativos es el único responsable
                    de la veracidad y corrección de los datos incluidos. RUBRIT
                    se exonera de cualquier responsabilidad al respecto.
                  </Text>
                </Box>
              </AccordionPanel>
            </AccordionItem>
              <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{
                    color: "medium_green",
                    textDecoration: "none",
                  }}
                >
                  <Box flex="1" textAlign="left">
                    <Text
                      fontSize={{ base: "0.5rem", md: "1rem", lg: "1em" }}
                      fontWeight={400}
                    >
                      MAYORIA DE EDAD
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box p={"1em 3em 0 3em"} w="100%" justifyContent="center">
                  <Text>
                    Al aceptar estas Condiciones Generales el usuario manifiesta que es
                    mayor de edad, que tiene plena capacidad de obrar, que ha leído y
                    comprendido las Condiciones de uso, términos y condiciones que a
                    continuación se desarrollan y demás términos legales como la
                    política de privacidad o la política de cookies.
                  </Text>
                </Box>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{
                    color: "medium_green",
                    textDecoration: "none",
                  }}
                >
                  <Box flex="1" textAlign="left">
                    <Text
                      fontSize={{ base: "0.5rem", md: "1rem", lg: "1em" }}
                      fontWeight={400}
                    >
                      PROPIEDAD INTELECTUAL(derechos de autor, propiedad industrial y
                      equivalentes)
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box p={"1em 3em 0 3em"} w="100%" justifyContent="center">
                  <Text>
                    Toda la información contenida en la página web y demás productos,
                    incluyendo, sin carácter limitativo, bases de datos, diseño gráfico,
                    fotografías, logos, marcas, imágenes, audio, video, documentos,
                    código fuente (HTML y Typescript), constituye una obra cuya
                    propiedad intelectual pertenece a RUBRIT, o a terceros, sin que
                    pueda entenderse que el uso o acceso a los sitios web y demás
                    productos y/o a los servicios que se ofrecen, atribuya al usuario
                    derecho alguno sobre esta información. El usuario se abstendrá de
                    reproducir o copiar, distribuir, permitir el acceso del público a
                    través de cualquier modalidad de comunicación pública, transformar o
                    modificar los servicios, a menos que se cuente con la autorización
                    de RUBRIT; suprimir, eludir o manipular cualquier dato o signo
                    identificativo de los derechos de RUBRIT o de sus titulares
                    incorporados a los servicios así como los dispositivos técnicos de
                    protección, y en particular, utilizar la información de cualquier
                    clase obtenida a través del sitio web de TIMBRIT o de los servicios,
                    para remitir comunicaciones con fines de venta directa o con
                    cualquier otra clase de finalidad comercial, enviar mensajes no
                    solicitados dirigidos a una pluralidad de personas con independencia
                    de su finalidad, así como a abstenerse de comercializar o divulgar
                    de cualquier modo dicha información; obtener cualquier imagen,
                    grabación, software y, en general, cualquier clase de material
                    accesible a través de la página web y demás productos, mediante
                    cualquier medio diferente a los que RUBRIT ponga a disposición de
                    los usuarios.
                  </Text>
                </Box>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{
                    color: "medium_green",
                    textDecoration: "none",
                  }}
                >
                  <Box flex="1" textAlign="left">
                    <Text
                      fontSize={{ base: "0.5rem", md: "1rem", lg: "1em" }}
                      fontWeight={400}
                    >
                      CONDICIONES QUE RIGEN EL CONTRATO ENTRE RUBRIT Y PROFESIONAL (QUIEN
                      TAMBIÉN PODRÁ DENOMINARSE “EL USUARIO”)
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box p={"1em 3em 0 3em"} w="100%" justifyContent="center">
                  <Text>
                    El Usuario se obliga con RUBRIT a: (i) Entregar y/o suministrar de
                    manera exacta y veraz todos los datos e información que RUBRIT le
                    solicite para la adecuada ejecución del Contrato; (ii) Tomar las
                    medidas necesarias para asegurar que la información entregada a
                    TIMBRIT sea verídica; refleje adecuadamente la realidad jurídica de
                    su negocio y actividades mercantiles y profesionales; no induzca a
                    error a terceros ni a los consumidores finales de sus servicios,
                    bienes o productos (en adelante los “Consumidores Finales”); cumpla
                    con la normatividad vigente que regula su actividad mercantil o
                    profesional, en especial, la relativa a la protección de los
                    derechos de los consumidores (Estatuto de Protección al Consumidor
                    en adelante el “EPC”, si a ello hay lugar) y no vulnere derechos de
                    terceros; (iii) Cumplir estrictamente con las normas que sobre
                    incentivos, información y publicidad contiene el EPC respecto de la
                    información que le entrega y/o suministra a TIMBRIT para la
                    ejecución del Contrato. En este sentido, el Usuario se abstendrá,
                    entre otras conductas, de entregar y/o suministrar a TIMBRIT
                    información que pueda calificarse como publicidad engañosa, que no
                    corresponda a la realidad o sea insuficiente de manera que induzca o
                    pueda inducir al Consumidor Final a engaño, error o confusión
                    respecto de los bienes o productos ofrecidos por el Cliente; (iv)
                    cumplir con las condiciones objetivas y subjetivas anunciadas en la
                    publicidad que contrata a través de RUBRIT; (v) Realizar las
                    correcciones a que haya lugar y enviar la información adicional que
                    RUBRIT le solicite en desarrollo del contrato dentro de los plazos
                    contenidos en la respectiva solicitud; (vi) Pagar el precio de
                    conformidad con los términos y plazos de pago pactados; (vii)
                    Garantizar la calidad, idoneidad y seguridad de los bienes,
                    productos y servicios que ofrezca a los Consumidores Finales a
                    través de TIMBRIT y (viii) Defender, reparar y mantener indemne a
                    RUBRIT por reclamaciones judiciales o extrajudiciales presentadas
                    por los Consumidores Finales o por cualquier tercero, derivadas del
                    uso por parte de TIMBRIT de la información entregada y/o
                    suministrada por el Usuario para la ejecución del Contrato,
                    incluyendo pero sin limitarse a infracciones de derechos de
                    propiedad intelectual de terceros, violaciones al EPC y/o a otras
                    normas de protección al consumidor por publicidad engañosa y, en
                    general, por cualquier violación o incumplimiento de la normatividad
                    vigente. RUBRIT se obliga con el Usuario a prestar los Servicios
                    contratados basándose exclusivamente en la información entregada y/o
                    suministrada por el Usuario y de acuerdo con las condiciones
                    previstas en el Contrato. En caso de retardo por parte del Usuario
                    en el pago del precio dentro del plazo previsto, se causarán a favor
                    de RUBRIT intereses moratorios calculados a la tasa máxima permitida
                    por la ley vigente al momento del incumplimiento. - El Usuario
                    renuncia expresamente a todo requerimiento judicial o extrajudicial
                    para constituirse en mora en el cumplimiento de las obligaciones que
                    se contemplan en este u otro contrato. RUBRIT podrá abstenerse
                    válidamente de prestar los Servicios sin que ello constituya un
                    incumplimiento del Contrato, cuando el Usuario se encuentre en mora
                    de pagar a TIMBRIT cualquier obligación o prestación en virtud de
                    este u otro Contrato suscrito entre las partes. El contrato, las
                    órdenes de servicio y demás anexos prestan mérito ejecutivo para
                    exigir por parte de RUBRIT el pago de las obligaciones a cargo del
                    Usuario. Cualquier solicitud del Usuario posterior a la firma del
                    Contrato de cambio en la estructura, información y/o datos
                    suministrados por el Usuario para la prestación de los Servicios por
                    parte de RUBRIT, se sujetará a las limitaciones, condiciones y
                    plazos previstos en el Contrato y en los Anexos para cada Servicio.
                    RURIT podrá abstenerse de incluir la información del Usuario dentro
                    de anuncios, productos, publicaciones u otro material que elabore en
                    desarrollo del Contrato sin que ello constituya un incumplimiento de
                    su parte cuando a juicio exclusivo de RUBRIT, la información
                    entregada y/o suministrada por el Usuario: i) no sea veraz, clara,
                    exacta y/o pueda ser confusa para el público en general y/o para los
                    Consumidores Finales; (ii) implique que la prestación de los
                    Servicios atenta contra el orden público, la moral o las buenas
                    costumbres; (iii) implique que la prestación de los Servicios pueda
                    afectar o violar derechos de terceros y/o de los Consumidores
                    Finales, y (iv) pueda violar el EPC o cualquier otra norma vigente.
                    La anterior facultad no implica, en ningún caso y bajo ninguna
                    circunstancia, que TIMBRIT asuma obligación alguna o sea responsable
                    de controlar el contenido, veracidad, exactitud, claridad y/o
                    correspondencia con la realidad de la información entregada y/o
                    suministrada por el Usuario para la prestación de los Servicios. El
                    Usuario garantiza y declara a la fecha de este Contrato y durante
                    toda su vigencia que: (i) toda la información que entrega y/o
                    suministra a RUBRIT para la prestación de los Servicios, escrita y
                    verbal, es verídica, exacta, cierta, fidedigna, suficiente, completa
                    y refleja adecuadamente la realidad jurídica de su negocio y
                    actividades mercantiles y profesionales, no induce a error a
                    terceros, cumple con la normatividad vigente que regula su actividad
                    mercantil o profesional, no viola el EPC ni ninguna otra norma
                    vigente de protección al consumidor y/o ninguna normatividad que le
                    resulte aplicable, y no vulnera derechos de terceros ni de los
                    Consumidores Finales; (ii) quien acepta este Contrato se encuentra
                    plenamente facultado para actuar por cuenta y representación del
                    Usuario en la calidad que se indica en el Contrato; (iii) tiene
                    todas las licencias, permisos, consentimientos, autorizaciones o
                    aprobaciones de todas las entidades gubernamentales o regulatorias
                    para adelantar sus negocios, prestar los servicios o bienes que
                    ofrece al público y/o a Consumidores Finales y desarrollar las
                    actividades propias de su objeto social durante el período previsto
                    para su existencia; (iv) la realización de las operaciones,
                    servicios y/o bienes ofrecidos por el Usuario a través de RUBRIT no
                    contraviene ni está en conflicto con la propiedad intelectual de un
                    tercero; (v) está en cumplimiento con todas las leyes que le son
                    aplicables. La existencia y veracidad de las anteriores
                    declaraciones constituyen la causa determinante que induce a TIMBRIT
                    a celebrar el presente Contrato por lo que su falsedad o
                    incumplimiento se tendrá como un incumplimiento del Contrato de
                    parte del cliente. El Contrato está sujeto a las siguientes
                    exclusiones y limitaciones de responsabilidad de RUBRIT: (i) La
                    composición, diagramación, ubicación, tipo de letra, tamaño, orden y
                    disposición de la información del Usuario dentro de anuncios,
                    productos, publicaciones u otro material que elabore RUBRIT en
                    desarrollo de los Servicios, serán determinados exclusivamente por
                    RUBRIT, de acuerdo con su criterio y experiencia. En consecuencia,
                    el precio pagado por el Usuario no le asegura ninguna ubicación
                    específica en los anuncios, productos, publicaciones u otro material
                    que elabore RUBRIT en desarrollo de los Servicios contratados, salvo
                    que expresamente se disponga lo contrario en el anexo
                    correspondiente firmado por RUBRIT y el cliente; (ii) RUBRIT se
                    reserva el derecho de modificar unilateralmente las características
                    y funcionalidades de los sistemas operativos, plataformas, software
                    y/o demás plataformas que se utilicen para la prestación de los
                    Servicios; (iii) RUBRIT no asume responsabilidad alguna por la
                    legalidad, claridad, exactitud, correspondencia con la realidad y/o
                    veracidad de la información y/o datos suministrados por el Usuario;
                    (iv) TIMBRIT no asume responsabilidad alguna por la prestación de
                    los servicios o la calidad de los productos ofrecidos por el Usuario
                    a los Consumidores Finales y/o a cualquier tercero y, en
                    consecuencia, tampoco asume ningún tipo de responsabilidad por el
                    contenido de los anuncios, productos, publicaciones u otro material
                    que elabore TIMBRIT en desarrollo de los Servicios basados en la
                    información y los datos entregados y/o suministrados a RUBRIT por el
                    Usuario; (v) RUBRIT no asume responsabilidad alguna de ningún tipo
                    por el contenido, veracidad, exactitud, claridad y correspondencia
                    con la realidad de la información entregada y/o suministrada por el
                    Usuario y por medio de este Contrato no adquiere la obligación de
                    controlar ni verificar su contenido ni veracidad; (vi) Si la
                    prestación de los Servicios involucra el uso de la plataforma
                    tecnológica, la prestación de los Servicios dependerá de la
                    disponibilidad del sistema. En consecuencia, RUBRIT no garantiza la
                    disponibilidad, continuidad, precisión y fiabilidad del
                    funcionamiento de los Servicios o de dichos sistemas; (vii) TIMBRIT
                    no garantiza que su sitio en internet funcione sin interrupción
                    alguna o que esté libre de errores o virus, ni responde en el caso
                    de interrupción de sus sitios o por cualquier error que se produzca
                    en estos, así como tampoco por la pérdida de datos que se produzcan
                    con ocasión o por causa de la actividad, gestión y administración
                    del proveedor de acceso a internet u otras personas; (viii) RUBRIT
                    no responderá por variaciones visuales que sufran las imágenes o
                    logotipos que contengan información del Usuario, o de los borradores
                    enviados a este, al ser publicada o insertada en los anuncios,
                    publicaciones u otros materiales que elabore RUBRIT en desarrollo
                    del Contrato y que sean consecuencia de la adaptación de la
                    respectiva imagen al medio impreso o electrónico respectivo; (ix)
                    RUBRIT no responderá por daños derivados de quejas, reclamos,
                    demandas, acciones de cualquier tipo que presenten los Consumidores
                    Finales en su contra o en contra de el Usuario, incluyendo pero sin
                    limitarse a las que se sustentan en vulneración de la buena fe
                    contractual, inexactitud en la información o datos del Usuario, y/o
                    defectos o mala calidad de sus productos o servicios, así como
                    tampoco RUBRIT responderá por incumplimientos del Usuario, eventos
                    en los cuales el Cliente se obliga a defender y mantener indemne a
                    RUBRIT. En estos eventos y en los demás que razonablemente considere
                    pertinentes, RUBRIT podrá suspender el acceso del profesional a su
                    plataforma hasta tanto no se aclaren adecuadamente los hechos objeto
                    de quejas, denuncias o reclamaciones. RUBRIT actúa en forma
                    independiente del Usuario, con autonomía técnica y administrativa en
                    la prestación de los Servicios. Por lo anterior, no existirá
                    relación laboral o de subordinación alguna ni de ningún tipo entre
                    RUBRIT y el personal del Usuario. La suscripción del Contrato
                    tampoco crea relación de intermediación, de agencia, ni una empresa
                    conjunta (joint venture), sociedad de hecho, contrato de cuentas en
                    participación, ni ninguna otra forma asociativa entre RUBRIT y el
                    Usuario ni entre estos y los funcionarios o empleados de la otra
                    Parte. A su vez, el Usuario actuará frente a los Consumidores
                    Finales, como el proveedor, fabricante o expendedor exclusivo y
                    directo de los bienes o servicios que ofrezca a los mismos, con
                    autonomía técnica y administrativa, de forma independiente de
                    RUBRIT. Todo nuevo diseño, clasificación, base de datos,
                    diagramación, programa de computador, incluyendo gráficos e imágenes
                    que hayan sido creados por RUBRIT o que esté autorizado para su uso
                    en ejecución del Contrato y que no haya sido entregado y/o
                    suministrado directamente por el Usuario, es propiedad de RUBRIT o
                    de un tercero de quien RUBRIT ha obtenido la autorización. En tal
                    virtud, dichas creaciones de RUBRIT no podrán ser utilizadas para
                    fines privados o comerciales, ni copiados y/o divulgados por ningún
                    medio por el Cliente o por un tercero sin la previa y expresa
                    autorización de RUBRIT. En caso de que los Servicios impliquen el
                    uso de una plataforma tecnológica de RUBRIT y/o administrada por
                    RUBRIT y si a juicio de RUBRIT, el Usuario está usando los Servicios
                    o dicha plataforma con un fin u objeto ilícito o violando el aviso
                    legal de la respectiva plataforma, RUBRIT podrá suspender en forma
                    inmediata o terminar unilateralmente y a su arbitrio el contrato,
                    sin que ello dé lugar a reparación o indemnización de ningún tipo a
                    favor del Usuario y sin que se afecte el derecho de RUBRIT de cobrar
                    las obligaciones causadas a la fecha de suspensión, las sanciones
                    previstas en el Contrato y de buscar una reparación integral de los
                    perjuicios sufridos, si a ello hubiere lugar. En cumplimiento del
                    deber legal que le asiste a RUBRIT con la cooperación en la
                    prevención y control sobre el lavado de activos, financiación del
                    terrorismo y cualquier otro delito de similar categoría contemplado
                    en normas nacionales e internacionales, el Cliente declara que su
                    patrimonio y las fuentes económicas que permiten desarrollar su
                    objeto social no son fruto de actividades ilícitas, tales como
                    narcotráfico, testaferrato, enriquecimiento ilícito, terrorismo,
                    lavado de activos, tráfico de estupefacientes, secuestro y/o trata
                    de personas, entre otras, razón por la cual acepta que en el evento
                    en que el Usuario o alguno de sus socios o accionistas, empleados,
                    administradores y/o representantes legales, hagan parte de la lista
                    OFAC (Office of Foreign Assets Control) o de alguna otra de igual o
                    similar naturaleza, de carácter nacional o internacional, o haya
                    sido sentenciado judicialmente por cualquier delito, será
                    responsable por los daños y perjuicios que dicho reporte o sentencia
                    le ocasione a RUBRIT, sin perjuicio de la responsabilidad penal que
                    le asiste. Además, faculta a RUBRIT para dar por terminado
                    unilateralmente el presente Contrato en cualquier momento sin previo
                    aviso y sin lugar al pago de ninguna reparación o indemnización.
                    Cualquier información dato y/o documentación comercial, financiera,
                    técnica, contable y demás información entregada y/o suministrada por
                    cualquier medio por RUBRIT al Usuario en la negociación,
                    celebración, ejecución o terminación del Contrato tendrá el carácter
                    de confidencial. En consecuencia, el Usuario no podrá copiarla,
                    divulgarla a terceros o explotarla con fines comerciales o privados.
                    Así mismo, el Usuario deberá utilizar la máxima diligencia y la
                    buena fe para preservar y mantener como confidencial la información
                    que ha recibido de TIMBRIT. La responsabilidad total agregada de
                    TIMBRIT bajo el presente Acuerdo, ya sea de manera contractual,
                    extracontractual o, de cualquier forma y bajo cualquier teoría de
                    responsabilidad, se limitará al ciento por ciento (100 %) del precio
                    de los servicios del contrato sobre el cual se presente la
                    reclamación. En ningún caso, TIMBRIT será responsable por daños
                    imprevisibles, lucro cesante, ninguna pérdida de beneficios, pérdida
                    de oportunidades, pérdida de ingresos, pérdida de tiempo, pérdida de
                    fondo de comercio o menoscabo del prestigio, daños punitivos o
                    cualesquiera pérdidas o daños indirectos, derivados o especiales con
                    independencia de su causa y de que fueran previsibles o no,
                    circunstancia que el Usuario acepta libre y voluntariamente. TIMBRIT
                    podrá terminar unilateralmente el presente Contrato en cualquier
                    momento, sin previo aviso, sin justificación, sin necesidad de
                    declaración judicial y sin que haya lugar a indemnización o
                    reparación alguna. En tal circunstancia, restituirá el precio en
                    caso de que se haya pagado por parte del Usuario, si a ello hay
                    lugar y solo en la proporción que le corresponda. No aplicación del
                    estatuto de protección al consumidor (EPC): El EPC no le resulta
                    aplicable ni a este Contrato ni a la relación comercial entre las
                    Partes, toda vez que el Usuario contrata los Servicios de TIMBRIT
                    con una finalidad intrínsecamente ligada a su actividad económica,
                    esto es, para publicitar sus productos o servicios frente a los
                    Consumidores Finales. Lo anterior, sin perjuicio de que respecto de
                    la relación comercial que el Usuario establezca con los Consumidores
                    Finales se de aplicación al EPC y, por ende, el Usuario deba cumplir
                    en su totalidad, con las normas contenidas en el mismo.
                  </Text>
                </Box>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{
                    color: "medium_green",
                    textDecoration: "none",
                  }}
                >
                  <Box flex="1" textAlign="left">
                    <Text
                      fontSize={{ base: "0.5rem", md: "1rem", lg: "1em" }}
                      fontWeight={400}
                    >
                      CONDICIONES DE CERTIFICADOS DE SEGURIDAD PARA PROFESIONALES
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box p={"1em 3em 0 3em"} w="100%" justifyContent="center">
                  <Text>
                    Los profesionales podrán acceder al beneficio de “Certificado de
                    Seguridad” añadiendo una serie de requisitos legales que certifiquen
                    y avalen credenciales como profesionales, tales como:
                    <UnorderedList spacing={3}>
                      <ListItem>
                        a. Documento de identidad personal acorde a su país de
                        residencia
                      </ListItem>
                      <UnorderedList spacing={2}>
                        <ListItem>
                          i. Registro fotográfico del frente del documento de identidad
                        </ListItem>
                        <ListItem>
                          ii. Registro fotográfico del contrafrente del documento de
                          identidad
                        </ListItem>
                      </UnorderedList>
                      <ListItem>
                        b. Número de identificación o permiso de trabajo como
                        profesional independiente si aplica en el país en el que el
                        profesional desarrolla su actividad. c. Documento de
                        Identificación Tributaria acorde a su país de residencia si el
                        profesional es sujeto de impuestos por la prestación de sus
                        servicios.
                        <ListItem>
                          i. Registro fotográfico de certificado o registro de
                          profesional independiente tributista
                        </ListItem>
                        <ListItem>
                          d. Foto de los Certificados de Formación con los que cuenta el
                          profesional
                        </ListItem>
                      </ListItem>
                    </UnorderedList>
                    En orden de obtener el Certificado de Seguridad, el profesional
                    deberá cumplir con todos los requisitos antes mencionados. Siendo
                    A,B, C y D obligatorios, sujetos a revisión por parte de TIMBRIT,
                    quien podrá aceptar o declinar los requisitos entregados por el
                    profesional. TIMBRIT no está en la obligación de otorgar el
                    certificado de seguridad a ningún profesional, así mismo podrá
                    privar o eliminar dicho Certificado de Seguridad, en cualquier
                    momento y sin previo aviso, a cualquier Profesional que incumpla con
                    los requisitos o con los términos y condiciones de RUBRIT.
                  </Text>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Container>
    </Layout>
  )
};

export default TermServe;
