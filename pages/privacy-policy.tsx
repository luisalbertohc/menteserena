import { Container, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    '& > h5': {
      marginBottom: theme.spacing(2),
    },
    '& > p': {
      fontSize: 16,
      marginBottom: theme.spacing(3),
    },
    '& > ul': {
      margin: theme.spacing(2),
      '& > li': {
        fontSize: 16,
        marginBottom: theme.spacing(1),
      },
    },
  },
  header: {
    width: '100%',
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
    textDecoration: 'underline',
  },
}));

const PrivacyPolicy = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography color="primary" variant="h4" className={classes.header}>
        POLÍTICA DE PRIVACIDAD
      </Typography>
      <Typography>
        Mente Serena (“Mente Serena” o “la compañía”) entiende que a usted le interesa cómo su información personal se
        utiliza y comparte. Esta notificación describe nuestra Política de Privacidad.
      </Typography>
      <Typography color="primary" variant="h5">
        I. USO, ACEPTACIÓN DE TÉRMINOS Y ENMIENDAS:
      </Typography>
      <Typography>
        Al visitar, navegar, utilizar nuestro sitio web, plataforma virtual, aplicación, o servicio en línea que opere
        Mente Serena (el “Sitio Web”), usted está aceptando y consintiendo a las prácticas descritas en esta Política de
        Privacidad. Esta Política de Privacidad está sujeta a y debe leerse en conjunto con los términos y condiciones
        de uso del Sitio Web.
      </Typography>
      <Typography>
        Mente Serena puede modificar esta política de privacidad en cualquier momento. Las enmiendas a esta Política de
        Privacidad serán efectivas desde que sean pautadas. Por lo tanto, usted deberá revisar esta Política de
        Privacidad de tiempo en tiempo. De usted no consentir o de no poder cumplir con los términos, según enmendados,
        usted acepta que solamente tendrá a su disposición como único remedio el desistir de continuar haciendo uso del
        Sitio Web. De lo contrario, si usted continúa utilizando los servicios habrá expresado su consentimiento a
        continuar obligado por las disposiciones de los términos, según enmendados, de esta Política de Privacidad.
      </Typography>
      <Typography color="primary" variant="h5">
        II. INFORMACIÓN DEL USUARIO
      </Typography>
      <Typography>
        Como parte de nuestros ofrecimientos a usted, nosotros recopilamos cierto tipo de información de varios tipos y
        para diferentes propósitos.
      </Typography>
      <Typography>
        <span className={classes.italicText}>Información que se recolecta automáticamente: </span> Mente Serena recopila
        cierta información general del usuario, tales como: dirección del Protocolo Internet (IP) de su computadora,
        dirección del IP de su proveedor de servicio de Internet, fecha y hora en que ingresó en el Sitio Web, nombre y
        versión de su explorador, sistema operativo que está usando, secciones del Sitio Web que el Usuario visitó,
        páginas leídas e imágenes visualizadas, y cualquier otro contenido que haya enviado o descargado del Sitio Web.
        Utilizamos esta información con propósitos administrativos o estadísticos y/o para mejorar el servicio que
        brinda el Sitio Web.
      </Typography>
      <Typography>
        <span className={classes.italicText}>Información que provee el usuario: </span> Hay cierta que Mente Serena
        recoge cuando el usuario se registra en el Sitio Web creando una cuenta de usuario, cuando el usuario se
        registra para recibir cierta información, servicios o productos de la compañía, o cuando utiliza nuestros
        servicios de telemedicina (en adelante, “Información Personal”). Esta información podría incluir:
      </Typography>
      <ul>
        <li>
          información y de contacto, tal como el nombre y apellido, edad; género; correo electrónico, número de teléfono
          celular o móvil;
        </li>
        <li>nombre de usuario y contraseña;</li>
        <li>
          información de pago, tales como número de tarjeta de crédito, fecha de expiración y código de seguridad;
        </li>
        <li>
          información personal de salud, incluyendo información sobre diagnósticos y tratamientos previos, información
          general de salud, e información sobre el plan médico;
        </li>
        <li>cualquier otra información de la persona del del usuario que éste nos provea.</li>
      </ul>
      <Typography>
        Los datos anteriormente listados no recolectan automáticamente, solo serán recolectados y utilizados por Mente
        Serena cuando sean proporcionados por el usuario.
      </Typography>
      <Typography color="primary" variant="h5">
        III. RASTREO DE “COOKIES”
      </Typography>
      <Typography>
        Cuando usted visita el Sitio Web o se registra, nosotros podríamos enviarle un “cookie” o “gif file” (“Cookies”)
        para asignar un identificador anónimo a su navegador de internet y/o a su computadora. Un “cookie” será guardado
        en el disco duro de su computadora e incluirá información personal no identificable sobre usted.
      </Typography>
      <Typography>
        Usted puede borrar o bloquear los “Cookies” de su navegador, pero esto podría afectar la calidad y/o
        funcionamiento del sitio de internet. Para inhabilitar o rechazar todos los “Cookies”, siga las instrucciones
        asociadas con su navegador de Internet.
      </Typography>
      <Typography color="primary" variant="h5">
        IV. USO DE INFORMACIÓN
      </Typography>
      <Typography>
        Mente Serena podría usar la información que recopila para varios propósitos tales como para:
      </Typography>
      <ul>
        <li>proveer o mejorar sus servicios;</li>
        <li>proveer a sus usuarios con información que soliciten;</li>
        <li>
          para ajustar o adaptar el Sitio Web, el servicio y/o cualquier descarga para de conformidad con los gustos y
          necesidades del usuario;
        </li>
        <li>
          contactar a sus usuarios cuando sea necesario, por correo, correo electrónico o teléfono (a través de llamadas
          o mensajes) en conexión a transacciones en las que ha entrado con la compañía;
        </li>
        <li>analizar y manejar su negocio y operaciones;</li>
        <li>
          prevenir actividades potencialmente prohibidas o ilegales de conformidad con los términos de uso del Sitio
          Web;
        </li>
        <li>
          y para cualquier otro propósito que sea notificado al usuario al momento en el que se recolecta la información
          o sujeto a su consentimiento.
        </li>
      </ul>
      <Typography>
        Mente Serena no solicitará ni utilizará información de sus usuarios que sea incompatible con la finalidad del
        Sitio Web y de sus servicios.
      </Typography>
      <Typography color="primary" variant="h5">
        V. NOMBRE DE USUARIO Y CONTRASEÑA
      </Typography>
      <Typography>
        Para propósitos de privacidad y seguridad, la información de su cuenta podría estar protegida por contraseña
        (“password”). Si el Sitio Web y/o cualquiera de sus componentes requiere el uso de una contraseña, usted tiene
        la responsabilidad de mantener la secretividad y/o integridad de esa contraseña tomando las medidas razonables
        para asegurarse que esa contraseña no sea mal utilizada. Usted deberá notificarnos inmediatamente en caso de que
        tenga sospechas de que la secretividad y/o integridad de su contraseña está o podría estar comprometida.
      </Typography>
      <Typography color="primary" variant="h5">
        VI. ARCHIVO DE DATOS
      </Typography>
      <Typography>
        Mente Serena conservará la información recopilada por el término necesario para el cumplimiento de las
        finalidades descritas en la presente Política de Privacidad. La Información Personal del usuario será destruida
        cuando haya dejado de ser necesaria o pertinente a los fines para los cuales hubiesen sido recolectados, salvo
        que exista una obligación legal de conservarlos por un término mayor.
      </Typography>
      <Typography color="primary" variant="h5">
        VII. DIVULGACIÓN DE INFORMACIÓN
      </Typography>
      <Typography>
        La Información Personal que provee el usuario es de carácter confidencial y Mente Serena tomará las medidas de
        seguridad para evitar su uso desautorizado. De conformidad con ello, Mente Serena no divulgará Información
        Personal de sus usuarios suscriptores o profesionales, excepto en los casos que se describen a continuación:
      </Typography>
      <ul>
        <li>
          Mente Serena puede divulgar Información Personal de sus usuarios a otras entidades controlantes o controladas,
          subsidiarias o afiliadas. Al hacerlo, esas otras entidades utilizarán su información de una manera que sea
          consistente con los objetivos para los cuales se recolectó la información y para los cuales el usuario otorgó
          su consentimiento.
        </li>
        <li>
          Mente Serena también puede compartir la Información Personal de los usuarios con terceros que sean contratados
          para que presten servicios de apoyo. Dichos terceros tienen la obligación de utilizar la información para
          prestar servicios en nuestro nombre y tratar su información de manera consistente con esta Política de
          Privacidad.
        </li>
        <li>
          Mente Serena puede comunicar la Información Personal de los suscriptores a los profesionales que comercialicen
          sus servicios a través del Sitio Web, siempre bajo un criterio de confidencialidad.
        </li>
      </ul>
      <Typography>
        Nos reservamos el derecho de divulgar Información Personal actual o pasada en la eventualidad de que entendamos
        que usted está usando o ha usado productos, servicios y/o el Sitio Web (en todo o en parte):
      </Typography>
      <ul>
        <li>En violación de los términos y condiciones de uso del Sitio Web;</li>
        <li>Para violar la ley;</li>
        <li>Si se nos solicita esa información mediante citación (“subpoena”) u orden de autoridad competente</li>
        <li>Si nuestra empresa es vendida o adquirida por fusión con otra entidad;</li>
        <li>
          Cuando entendamos que es necesario o apropiado, incluyendo, sin limitación, para compartir su dirección de
          correo electrónico con una tercera persona para propósitos de supresión en cumplimiento con el CAN-SPAM Act de
          2003, según enmendado de tiempo en tiempo y sus regulaciones aplicables según emitidas por el Federal Trade
          Commission.
        </li>
      </ul>
      <Typography>
        Nosotros podríamos divulgar su Información Personal bajo el entendimiento de buena fe de que ello es necesario
        para:
      </Typography>
      <ul>
        <li>Cumplir con una obligación legal;</li>
        <li>Proteger y defender nuestros derechos de propiedad;</li>
        <li>Prevenir o investigar posibles delitos o mal uso del Sitio Web;</li>
        <li>Proteger la seguridad personal de los usuarios del Sitio Web;</li>
        <li>Protegernos de responsabilidad o acción legal.</li>
      </ul>
      <Typography>
        Excepto que de alguna otra manera se provea en esta Política de Privacidad, nosotros no compartiremos su
        Información Personal con terceras personas.
      </Typography>
      <Typography color="primary" variant="h5">
        VIII. INFORMACIÓN PERSONAL BAJO EL “GENERAL DATA PROTECTION REGULATION” (“GDPR”) y DERECHOS DE PROTECCIÓN
      </Typography>
      <Typography>
        Si usted es un ciudadano o residente de la Unión Europea, nuestra base legal para recopilar y usar su
        Información Personal descrita en esta Política de Privacidad depende de la Información Personal que recopilamos
        y del contexto especifico en el que la recopilamos.
      </Typography>
      <Typography>Nosotros podríamos procesar su Información Personal porque:</Typography>
      <ul>
        <li>Nosotros necesitamos llevar a cabo una contratación con usted;</li>
        <li> Usted nos ha dado permiso para hacerlo;</li>
        <li>El procesamiento está en nuestro interés legítimo y no está anulado por sus derechos;</li>
        <li>Para propósitos de procesamiento de pagos;</li>
        <li>Para cumplir con la ley</li>
      </ul>
      <Typography>
        Si usted es un ciudadano o residente de la Unión Europea usted tiene ciertos derechos a la protección de sus
        datos. Es nuestro interés el tomar los pasos necesarios para permitir la corrección, enmienda, eliminación o
        limitación del uso de su Información Personal.
      </Typography>
      <Typography>
        Si usted desea ser informado de la Información Personal que mantenemos acerca de usted y si usted interesa que
        sea removida de nuestros sistemas, por favor contáctenos.
      </Typography>
      <Typography>
        En ciertas circunstancias, usted tiene los siguientes derechos a la protección de sus datos:
      </Typography>
      <ul>
        <li>
          <b>El derecho a acceder, actualizar o eliminar la información que tenemos de usted.</b> Cuando le sea posible,
          usted puede acceder, actualizar o solicitar que se elimine su Información Personal de su cuenta. Si usted no
          puede llevar a cabo esa gestión por si mismo, por favor contáctenos para asistirle.
        </li>
        <li>
          <b>El derecho a rectificación.</b> Usted tiene el derecho a rectificar su información si esa información es
          incorrecta o está incompleta.
        </li>
        <li>
          <b>El derecho a objetar.</b> Usted tiene el derecho a objetar nuestro procesamiento de su Información
          Personal.
        </li>
        <li>
          <b>El derecho a restricción.</b> Usted tiene el derecho a requerir que restrinjamos el procesamiento de su
          Información Personal.
        </li>
        <li>
          <b>El derecho a la portabilidad de los datos.</b> Usted tiene el derecho a que se le provea copia de la
          información que tengamos sobre usted en un formato estructurado, legible y usado comúnmente.
        </li>
        <li>
          <b>El derecho a retirar su consentimiento.</b> Usted también tiene el derecho a retirar su consentimiento en
          cualquier momento que confiábamos en su consentimiento para procesar su Información Personal.
        </li>
      </ul>
      <Typography>
        Usted también tiene el derecho de querellarse ante la Autoridad de Protección de Datos sobre la recopilación y
        uso por nosotros de su Información Personal.
      </Typography>
      <Typography color="primary" variant="h5">
        IX. SEGURIDAD DE DATOS
      </Typography>
      <Typography>
        La seguridad de sus datos es importante para nosotros, pero recuerde que ningún método de transmisión a través
        del Internet o método electrónico de almacenamiento electrónico es 100% seguro. A pesar de que nos esmeramos por
        usar métodos comercialmente aceptables para proteger su Información Personal, nosotros no podemos garantizar su
        absoluta seguridad.
      </Typography>
      <Typography color="primary" variant="h5">
        X. PROVEEDORES DE SERVICIOS
      </Typography>
      <Typography>
        Nosotros podríamos usar terceras personas, compañías o individuos para facilitar, proveer el Sitio Web a cuenta
        de nosotros, para llevar a cabo asuntos relacionados con el Sitio Web, o para asistirnos en analizar cómo el
        Sitio Web es usado.
      </Typography>
      <Typography>
        Esas terceras personas, proveedores de servicios, están prohibidos de usar Información Personal para cualquier
        que los establecidos en esta Policita de Privacidad y están contractualmente obligados a cumplir con las leyes y
        requerimientos aplicables.
      </Typography>
      <Typography color="primary" variant="h5">
        XI. ENLACES A OTRAS PÁGINAS
      </Typography>
      <Typography>
        Nuestro Sitio Web podría tener enlaces a otras páginas de internet que no están operadas por nosotros. Si usted
        accede al enlace de la página de Internet una tercera persona, usted será inmediatamente dirigido a la página de
        Internet de ese tercero. Le recomendamos y sugerimos que usted debe revisar la Política de Privacidad de esa
        página de Internet que visite.
      </Typography>
      <Typography>
        Nosotros no somos responsables por las prácticas de privacidad, promoción y mercadeo de productos, ni por el
        contenido de esas páginas de Internet.
      </Typography>
      <Typography color="primary" variant="h5">
        XII. DERECHO DE PRIVACIDAD DE MENORES
      </Typography>
      <Typography>
        Nosotros reconocemos la importancia de la privacidad y seguridad de los niños. Nuestro Sitio Web no está
        dirigido a nadie que tenga menos de 13 años de edad ("Niños”). Además, de conformidad con el Children's Online
        Privacy Protection Act ("COPPA"), nosotros no solicitamos ni recopilamos ninguna información personal de nadie
        que sepamos tiene menos de 13 años de edad, sin verificación o consentimiento de sus padres o tutores.
      </Typography>
      <Typography>
        Si usted como padre, pariente o tutor sabe que su hijo nos ha provisto su Información Personal, por favor
        contáctenos. De advenir en conocimiento de que hemos recopilado información de niños, sin verificación o
        consentimiento de sus padres o tutores, tomaremos las medidas necesarias para remover esa información de
        nuestros servidores.
      </Typography>
      <Typography color="primary" variant="h5">
        XIII. TRANSFERENCIA DE INFORMACIÓN
      </Typography>
      <Typography>
        Su información, incluyendo su Información Personal, puede ser transferida y/o mantenida en computadoras
        localizadas fuera del país, estado, ciudad y/o jurisdicción donde las leyes de protección de datos podrían ser
        diferentes a las de su jurisdicción.
      </Typography>
      <Typography>
        Si usted está localizado fuera de Puerto Rico y elige proveernos información a nosotros, por favor tome en
        cuenta que transferimos esa información, incluyendo su Información Personal a Puerto Rico y allí la procesamos.
      </Typography>
      <Typography>
        Usted consiente a esta Política de Privacidad y al proveernos su información nos representa que está de acuerdo
        con la transferencia de su información conforme aquí dispuesto.
      </Typography>
      <Typography>
        Nosotros tomaremos todas las medidas necesariamente razonables para asegurarnos que su información es tratada de
        manera segura y de conformidad con esta Política de Privacidad y ninguna transferencia de su Información se hará
        a una organización o a un país a menos que se hayan establecido controles adecuados incluyendo la seguridad de
        sus datos y otra información personal.
      </Typography>
      <Typography color="primary" variant="h5">
        XIV. CONTÁCTANOS
      </Typography>
      <Typography>
        Si usted tiene alguna pregunta o preocupación sobre esta política o sobre nuestras prácticas de privacidad por
        favor comuníquese con nosotros a <a href="mailto:menteserenapr@gmail.com">menteserenapr@gmail.com</a>,
        actualizado Julio 2021.
      </Typography>
      <Typography color="primary" variant="h5">
        XV. DESCARGO DE RESPONSABILIDAD
      </Typography>
      <Typography>
        Nada en esta Política de Privacidad será interpretado como que nuestra empresa está representando, ofreciendo,
        garantizando productos, servicios o programas a usted.
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
