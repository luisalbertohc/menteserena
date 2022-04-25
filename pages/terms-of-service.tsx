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
      '& > a': {
        color: 'blue',
      },
    },
    '& > ul, & > ol': {
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
  },
  underlineText: {
    textDecoration: 'underline',
  },
}));

const TermsOfService = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography color="primary" variant="h4" className={classes.header}>
        TÉRMINOS DE SERVICIO
      </Typography>
      <Typography>
        Estos Términos y Condiciones de Uso ("Términos") rigen su uso del sitio web Mente Serena (“Mente Serena” o la
        “compañía”) y cualquier otro sitio web, plataforma virtual, aplicación, o servicio en línea que opere Mente
        Serena y que se vincule a estos Términos (colectivamente, los "Servicios").
      </Typography>
      <Typography>
        Mente Serena le ofrece acceso a los Servicios condicionado al estricto cumplimiento de las disposiciones que se
        detallan a continuación. Por favor revise estos Términos detenidamente antes de utilizar los Servicios.{' '}
        <b>Al utilizar los Servicios usted acepta y voluntariamente se obliga a quedar vinculado por los Términos.</b>
      </Typography>
      <Typography>
        Mente Serena puede modificar los Términos en cualquier momento. Las enmiendas a estos Términos serán efectivas
        desde que sean pautadas. Por lo tanto, usted deberá leer estos Términos de tiempo en tiempo. De usted no
        consentir o de no poder cumplir con los Términos, según enmendados, usted acepta que solamente tendrá a su
        disposición como único remedio el desistir de continuar haciendo uso de los Servicios. De lo contrario, si usted
        continúa utilizando los Servicios habrá expresado su consentimiento a continuar obligado por las disposiciones,
        según enmendados, de estos Términos.
      </Typography>
      <Typography>
        Si usted es menor de 18 años de edad, por favor lea estos Términos junto con sus padres o tutores y pregunte
        sobre cualquier asunto que no entienda.
      </Typography>
      <Typography color="primary" variant="h5">
        I. PRIVACIDAD
      </Typography>
      <Typography>
        Al utilizar los Servicios usted acepta que procesemos su información de acuerdo con nuestra{' '}
        <a href="/privacy-policy" target="_blank">
          Política de Privacidad
        </a>
      </Typography>
      <Typography color="primary" variant="h5">
        II. INFORMACIÓN IMPORTANTE SOBRE LOS SERVICIOS
      </Typography>
      <Typography>
        NO UTILICE LOS SERVICIOS PARA NECESIDADES MÉDICAS DE EMERGENCIA. SI TIENE UNA EMERGENCIA MÉDICA, LLAME AL 9-1-1
        DE INMEDIATO.
      </Typography>
      <Typography>
        SI ESTÁ PENSANDO EN EL SUICIDIO O SI ESTÁ CONSIDERANDO LLEVAR A CABO ACCIONES QUE PUEDAN PONERLO EN PELIGRO A
        USTED O A TERCEROS, LLAME AL 9-1-1 DE INMEDIATO.
      </Typography>
      <Typography>
        Mente Serena facilita la intermediación entre usuarios (“Usuarios”) que solicitan, a través de los Servicios,
        consultas en línea relacionados con el bienestar emocional y psicológico con personas capacitadas en la
        industria de la salud mental (en adelante, “Proveedores”) que aceptan, a su propia cuenta y riesgo,
        comercializarse a través de los Servicios.
      </Typography>
      <Typography>
        <b>
          Mente Serena no proporciona servicios de bienestar emocional, atención médica, de salud mental,
          psicodiagnósticos, de terapia u otros relacionados. Todos los Proveedores son independientes de Mente Serena y
          simplemente utilizan los Servicios para comunicarse con usted, siendo Mente Serena un tercero intermediario
          entre los Usuarios y los Proveedores. Mente Serena no se responsabiliza por la elección que usted realiza de
          su terapeuta y es su responsabilidad verificar los credenciales (e.g., vigencia de licencia de proveedor) y
          peritaje del mismo, ya que Mente Serena no realiza este procedimiento.
        </b>
      </Typography>
      <Typography>
        Cualquier información o consejo recibido de un Proveedor proviene del Proveedor y no de Mente Serena. Los
        consejos, artículos, blogs, videos y toda otra información o contenido que surge de los Servicios (en adelante,
        el "Contenido") no deben considerarse servicios o tratamientos médicos o de atención psicología bajo ninguna
        perspectiva.
      </Typography>
      <Typography>
        Bajo ningún concepto debe entenderse que el Contenido constituye un reemplazo del tratamiento médico, y ante
        cualquier circunstancia el Usuario deberá siempre consultar a un profesional de la salud. Ningún Contenido
        representa una garantiza que ningún medicamento o tratamiento en particular sea seguro, apropiado o efectivo
        para usted.
      </Typography>
      <Typography>
        Mente Serena, ni ninguno de sus licenciantes, suplidores, o terceros que promuevan los Servicios será
        responsable de cualquier asesoramiento profesional que obtenga de un Proveedor a través de los Servicios.{' '}
        <b>
          Usted asume todos los riesgos relativos a, o derivados del uso consulta, o acceso por su parte a los
          Servicios.
        </b>
      </Typography>
      <Typography>
        Mente Serena no hace ninguna declaración o garantía sobre la capacitación o la habilidad de ningún Proveedor que
        utilice los Servicios. En última instancia, usted es responsable de elegir su Proveedor particular.
      </Typography>
      <Typography color="primary" variant="h5">
        III. CUENTA DEL USUARIO
      </Typography>
      <Typography>
        Como parte de las funcionalidades de los Servicios, Mente Serena puede exigir que el Usuario se registre en la
        plataforma creando para ello una cuenta de usuario (en adelante la "Cuenta"). En caso de registrarse, usted
        acepta: (a) suministrar datos exactos, actuales y completos sobre su persona, como se solicita en la forma de
        registro; y (b) actualizar sus datos de manera que la información permanezca exacta, veraz, actualizada y
        completa. Al crear la Cuenta deberá aceptar las Políticas de Privacidad y los presentes Términos.
      </Typography>
      <Typography>
        Al registrarse, acepta recibir notificaciones relacionadas con los Servicios, al correo electrónico indicado en
        la Cuenta. Puede optar por no recibir dichas notificaciones comunicándose con nosotros a{' '}
        <a href="mailto:menteserenapr@gmail.com">menteserenapr@gmail.com</a>.
      </Typography>
      <Typography>
        Usted acepta que no creará más de una Cuenta, ni creará una Cuenta para otra persona que no sea usted mismo (con
        la excepción de las subcuentas establecidas para hijos menores de los cuales usted es padre o tutor legal).
      </Typography>
      <Typography color="primary" variant="h5">
        IV. CANCELACIÓN O CIERRE DE LA CUENTA
      </Typography>
      <Typography>
        Siempre que no haya operaciones pendientes o en curso, el Usuario puede cerrar su Cuenta en cualquier momento.
        Mente Serena se reserva el derecho de suspender o dar de baja una Cuenta, sin estar obligado a comunicar o
        exponer las razones de su decisión y sin que ello genere derecho alguno a indemnización o resarcimiento a favor
        del Usuario
      </Typography>
      <Typography>
        Mente Serena puede suspender o dar de baja una Cuenta ante cualquier incumplimiento o indicio de incumplimiento
        a los presentes Términos, sin necesidad de intimación previa al cumplimiento, en cualquier momento y con efectos
        inmediatos, reservándose el derecho de reclamar los daños y perjuicios que tal incumplimiento haya causado.
      </Typography>
      <Typography color="primary" variant="h5">
        V. NOMBRE DE USUARIO Y CONTRASEÑA
      </Typography>
      <Typography>
        Usted es el único responsable de la seguridad de su nombre de usuario y contraseña, y de cualquier uso de los
        Servicios con su nombre de usuario y contraseña. No debe compartir su nombre de usuario o contraseña con ningún
        tercero ni permitir que un tercero acceda a los Servicios utilizando su nombre de usuario y contraseña.
      </Typography>
      <Typography>
        La confidencialidad del nombre de usuario y contraseña son de su exclusiva responsabilidad. Asimismo, todas las
        actividades realizadas en los Servicios bajo su nombre de usuario y contraseña son de su exclusiva
        responsabilidad.
      </Typography>
      <Typography>
        Usted acepta notificarnos, de forma inmediata, si tiene alguna razón para creer que su nombre de usuario o
        contraseña se ha perdido, comprometido o mal utilizado de alguna manera.
      </Typography>
      <Typography color="primary" variant="h5">
        VI. INFORMACIÓN SOBRE SU USO DE LOS SERVICIOS
      </Typography>
      <Typography>Luego de registrarse, deberá seleccionar el Proveedor con el que desea contratar</Typography>
      <Typography>
        Deberá coordinar mediante chat con el Proveedor una fecha y horario determinados dentro de la agenda disponible
        del Proveedor. Una vez calendarizada, deberá acordar con el Proveedor el método de pago a utilizar.
      </Typography>
      <Typography>
        Usted se compromete a asistir a la sesión en la fecha y hora programada. En caso de no poder asistir, tiene
        derecho a cancelar o reprogramar la misma siempre y cuando notifique a su Proveedor con la antelación acordado
        con el mismo.
      </Typography>
      <Typography>
        Al contratar con el Proveedor, usted acepta contar con los requerimientos técnicos adecuados para llevar a cabo
        la sesión en línea. En caso de que la sesión fuese interrumpida por problemas técnicos del Usuario, no tendrá
        derecho a reprogramar el tiempo perdido.
      </Typography>
      <Typography>
        En caso de incumplimiento por parte del Proveedor de sus obligaciones con usted, deberá informar a Mente Serena
        al siguiente correo electrónico <a href="mailto:menteserenapr@gmail.com">menteserenapr@gmail.com</a>.
      </Typography>
      <Typography color="primary" variant="h5">
        VII. ACTIVIDADES PROHIBIDAS
      </Typography>
      <Typography>
        A. Usted no podrá colocar en los Servicios contenido alguno que, según la determinación exclusiva de la
        compañía, sea:
      </Typography>
      <ul>
        <li>fraudulento, falso, o engañoso;</li>
        <li>hostigador;</li>
        <li>ilegal, abusivo, amenazante;</li>
        <li>viole los derechos de autor o derechos de marcas de otros;</li>
        <li>sexualmente explícito;</li>
        <li>profano, obsceno, o pornográfico;</li>
        <li>difamatorio o libeloso;</li>
        <li>es, o pueda ser, dañino a menores;</li>
        <li>
          constituye o promueve conducta constitutiva de una ofensa criminal, da lugar a una responsabilidad civil
          legalmente exigible, o de otra forma viola cualquier ley local, estatal, nacional o internacional; y/o{' '}
        </li>
        <li>es de otra forma objetable.</li>
      </ul>
      <Typography>
        B. No podrá desactivar o de otra manera bloquear parcial o totalmente el funcionamiento de los Servicios para
        otros y/o la compañía.
      </Typography>
      <Typography>
        C. No está autorizado a utilizar los Servicios para propósitos de mensajes o anuncios de publicidad,
        solicitaciones, o promociones, de naturaleza comercial o política.
      </Typography>
      <Typography>
        D. No está autorizado a cargar ningún programa, información, archivo, o software que sea destructivo (e.g. virus
        o códigos de replicación propia) o a tomar ningún otro tipo de acción que sea dañina a los Servicios o a otras
        computadoras o equipo electrónico.
      </Typography>
      <Typography>
        E. No está autorizado a enviar mensajes de correo electrónico no solicitados, incluyendo mensajes de publicidad
        masiva ("junk mail") y mensajes en cadena, dirigidos a otros usuarios de los Servicios.
      </Typography>
      <Typography>
        F. No está autorizado a solicitar contraseñas u otra información personal de cualquier usuario de los Servicios.
      </Typography>
      <Typography>
        G. No está autorizado a postear o transmitir ningún mensaje que divulgue información privada o personal sobre
        cualquier persona. No autorizado a postear o transmitir ningún contenido, mensaje, texto, data, imágenes o
        programas de manera que viole derechos propietarios de terceros, incluyendo texto no autorizado y protegido por
        derechos de autor, imágenes o programas o software, secretos de negocio u otra información confidencial y marcas
        y etiquetas de páginas web (en inglés, "tags") usadas de manera que violen derechos propietarios de terceros.
      </Typography>
      <Typography>
        H. No está autorizado a darle autorización a persona distinta de usted y no permitirá que nadie utilice los
        Servicios a través de su Cuenta.
      </Typography>
      <Typography>
        I. No está autorizado a transmitir o retransmitir, radiodifundir, difundir, televisar, distribuir o
        redistribuir, o hacer uso comercial de los Servicios.
      </Typography>
      <Typography>
        J. No está autorizado a ni hará ingeniería en reversa, descifra, descompilación o de alguna otra manera alterar
        o interferir con los Servicios ni lo intentará ni ayudará o promoverá a otros a que lo hagan.
      </Typography>
      <Typography>
        K. No está autorizado a someter a la compañía información falsa o incorrecta a través de los Servicios.
      </Typography>
      <Typography>
        Las violaciones a la seguridad de los Servicios pueden resultar en responsabilidad civil o penal. Podemos
        investigar y trabajar con las autoridades pertinentes para enjuiciar a los Usuarios que violen los Términos.
        Podemos suspender o cancelar su acceso a los Servicios por cualquier motivo o sin ningún motivo en cualquier
        momento sin previo aviso.
      </Typography>
      <Typography color="primary" variant="h5">
        VIII. AUTORIZACIÓN DE PAGO
      </Typography>
      <Typography>
        Como parte de su funcionamiento, Mente Serena podrá cobrar por los Servicios. Al proporcionar una tarjeta de
        crédito u otro método de pago aceptado por la compañía ("Método de Pago"), usted acepta expresamente que estamos
        autorizados a cobrar al Método de Pago cualquier tarifa establecida, y según seleccionada por usted, por su uso
        de los Servicios.
      </Typography>
      <Typography>
        Usted acepta que las autorizaciones para cargar su Método de Pago permanecen vigentes hasta que usted la
        cancele, y acepta notificar a la compañía sobre cualquier cambio en su Método de Pago. Usted certifica que es un
        usuario autorizado del Método de Pago y no disputará los cargos por el uso de los Servicios.
      </Typography>
      <Typography>
        Mente Serena se reserva el derecho de tomar las medidas judiciales y extrajudiciales que estime pertinentes para
        obtener el pago de los montos adeudados por el uso de los Servicios.
      </Typography>
      <Typography color="primary" variant="h5">
        IX. DERECHOS DE AUTOR Y MARCAS
      </Typography>
      <Typography>
        Incluyendo sin limitación, texto, gráficas, logos, iconos, pantallas y configuraciones, y, además, todo software
        utilizado en los Servicios es propiedad de la compañía o de sus correspondientes suplidores y licenciadores, y
        se encuentra bajo la protección de las leyes de Estados Unidos ("EE.UU."), de Puerto Rico, e internacionales de
        derechos de autor (copyright) y de marcas. Cualquier software y servicios utilizados en los Servicios son
        propiedad de la compañía o de sus suplidores y también son protegidos por las leyes de los Estados Unidos
        ("EE.UU."), de Puerto Rico, e internacionales de derechos de autor (copyright) y de marcas.
      </Typography>
      <Typography>
        Usted no adquiere ningún interés propietario al aceptar o consentir a estos Términos. Tampoco adquiere un
        interés propietario al imprimir o descargar cualquier información o hacer uso de los Servicios. Cualquier uso
        del contenido o software de los Servicios, que no sea de los usos contemplados en los Términos está
        estrictamente prohibido, incluyendo, sin limitación, la reproducción, modificación, distribución, transmisión,
        replicación o exhibición en público, o crear trabajos derivados.
      </Typography>
      <Typography color="primary" variant="h5">
        X. REPRESENTACIONES Y GARANTÍAS
      </Typography>
      <Typography>
        Su uso de los Servicios es bajo su propio riesgo. Los Servicios se proporcionan "tal cual" sin garantías de
        ningún tipo, ya sean expresas o implícitas, incluidas, entre otras, las garantías de título, comerciabilidad,
        idoneidad para un propósito particular, no infracción u otra violación de derechos. No garantizamos la
        idoneidad, vigencia, precisión, resultados probables o integridad de los Servicios o de los sitios de terceros
        vinculados a los Servicios, o que las funciones proporcionadas serán ininterrumpidas, libres de virus o sin
        errores. Renunciamos expresamente a cualquier responsabilidad por cualquier error u omisión en el Contenido.
      </Typography>
      <Typography>
        En ningún caso, ni nosotros ni nuestras empresas matrices, subsidiarias, afiliadas, otorgantes de licencias,
        proveedores y sus directores, funcionarios, afiliados, subcontratistas, empleados, agentes y cesionarios seremos
        responsables de ningún daño directo o indirecto, especial, incidental, consecuente o punitivo, lucro cesante u
        otros daños que surjan en relación con el uso de los Servicios, cualquier interrupción en la disponibilidad de
        los Servicios, retraso en la operación o transmisión, virus informáticos, pérdida de datos o uso, mal uso,
        dependencia, revisión, manipulación u otra utilización de cualquier manera de los Servicios o los datos
        recopilados a través de los Servicios, incluso si uno o más de ellos han sido advertidos de la posibilidad de
        tales daños o pérdidas.
      </Typography>
      <Typography color="primary" variant="h5">
        XI. RELEVO DE RESPONSABILIDAD
      </Typography>
      <Typography>
        Al acordar a lo dispuesto en estos Términos, usted libera y releva a Mente Serena, sus oficiales, directores,
        propietarios, representantes, contratistas independientes, agentes, empleados, subsidiarios, afiliados, y los
        respectivos sucesores y asignatarios de éstos últimos, de cada y toda forma de responsabilidad, reclamo,
        reconvención, demanda, contrapartida, daño o causa de acción, que posee al momento o que podría acumular en el
        futuro, que al momento haya o no sido reclamada, conocida o sin conocer, que surja de, o que de otro modo se
        relaciona con, el uso de los Servicios; se incluye específicamente, pero no se limita a, cualquier reclamo
        basado, en todo o en parte, en alegaciones sobre negligencia de parte de la compañía en la operación de los
        Servicios.
      </Typography>
      <Typography>
        Usted acepta que su único remedio para cualquier reclamo que surja de o esté relacionado con el uso de los
        Servicios será dejar de usarlo.
      </Typography>
      <Typography>
        Usted reconoce y acepta que Mente Serena sólo pone a su disposición un espacio virtual que le permite contratar
        y entrar en comunicación con Proveedores mediante los Servicios. Mente Serena no se dedica ni presta servicios
        de salud mental ni de atención médica. La compañía no interviene en el tratamiento que se ofrece a través de los
        Servicios. Mente Serena sus otorgantes de licencias, proveedores y todos los terceros que promueven los
        Servicios o que le brindan un enlace a los Servicios renuncian expresamente a toda responsabilidad derivada de
        la prestación de atención psicológica, de salud mental, psicodiagnóstico, terapias u otros relacionados
        incluida, entre otra, a través de los Servicios.
      </Typography>
      <Typography color="primary" variant="h5">
        XII. INDEMNIZACIÓN:
      </Typography>
      <Typography>
        Usted acepta indemnizar, defender y eximir a la compañía y a nuestras empresas matrices, subsidiarias,
        afiliadas, otorgantes de licencias, proveedores y sus directores, funcionarios, afiliados, subcontratistas,
        empleados, agentes y cesionarios de y contra cualquier pérdida, costo, gasto (incluidos los honorarios y gastos
        razonables de los abogados), reclamaciones, daños y responsabilidades relacionadas o asociadas con su uso de los
        Servicios y cualquier presunta violación por su parte de estos Términos. Nos reservamos el derecho de asumir la
        defensa exclusiva de cualquier reclamo por el que tengamos derecho a indemnización en virtud de esta sección. En
        tal caso, nos proporcionará la cooperación que razonablemente solicitemos.
      </Typography>
      <Typography color="primary" variant="h5">
        XII. INDEMNIZACIÓN:
      </Typography>
      <Typography>XIII. CONSENTIMIENTO PARA EL TRATAMIENTO DE LA TELEMIDICINA</Typography>
      <Typography className={classes.underlineText}>
        Proporcionamos esta información en nombre de los Proveedores:
      </Typography>
      <Typography>
        La telemedicina implica el uso de comunicaciones para permitir que los proveedores de servicios de atención
        psicológica en sitios remotos a los pacientes brinden servicios de consulta. La información puede usarse para
        diagnóstico, terapia, seguimiento y/o educación, y puede incluir audio y video bidireccional en vivo y otros
        materiales (por ejemplo, registros médicos, datos de dispositivos médicos).
      </Typography>
      <Typography>
        Los sistemas de comunicaciones utilizados incorporarán protocolos de seguridad razonables para proteger la
        confidencialidad de la información del paciente e incluirán medidas razonables para salvaguardar los datos y
        garantizar su integridad contra la corrupción intencional o no intencional.
      </Typography>
      <Typography>
        Mente Serena respeta y mantiene la confidencialidad del paciente con respecto a la información médica protegida
        según se describe en la ley federal{' '}
        <span className={classes.italicText}>Health Insurance Portability and Accountability Act</span> ("HIPAA") y,
        sujeto a las regulaciones de HIPAA, obtendrá el consentimiento expreso del paciente antes de compartir cualquier
        información identificable del paciente con un tercero para fines distintos al tratamiento, pago u operaciones de
        atención médica.
      </Typography>
      <Typography className={classes.italicText}>Beneficios anticipados de la telemedicina:</Typography>
      <ul>
        <li>
          Mejor acceso a la atención psicológica al permitir que el paciente permanezca en su hogar u oficina mientras
          consulta con el Proveedor.
        </li>
        <li> Evaluación y manejo de consulta y tratamiento eficiente.</li>
      </ul>
      <Typography className={classes.italicText}>Posibles riesgos de la telemedicina:</Typography>
      <Typography>
        Al igual que con cualquier procedimiento médico, existen riesgos potenciales asociados con el uso de
        telemedicina. Estos riesgos pueden incluir, sin limitación, los siguientes:
      </Typography>
      <ul>
        <li>
          Pueden producirse retrasos en la evaluación médica y la consulta o el tratamiento debido a deficiencias o
          fallas del equipo.
        </li>
        <li>
          Los protocolos de seguridad podrían fallar, provocando una violación de la privacidad de la información médica
          o personal.
        </li>
      </ul>
      <Typography>Al aceptar estos Términos, reconoce que comprende y está de acuerdo con lo siguiente:</Typography>
      <ol>
        <li>
          Entiendo que las leyes que protegen la privacidad y la confidencialidad de la información médica también se
          aplican a la telemedicina. Recibí el aviso de HIPAA que explica estos problemas con mayor detalle.{' '}
        </li>
        <li>
          Entiendo que puedo esperar los beneficios anticipados del uso de la telemedicina en mi cuidado, pero que no se
          pueden garantizar ni asegurar resultados.
        </li>
        <li>
          Entiendo que mi información médica puede ser compartida con otros (incluidos proveedores de atención médica y
          aseguradoras de salud) para fines de tratamiento y pago.
        </li>
        <li>
          Entiendo además que mi información médica puede ser compartida en las siguientes circunstancias:
          <ol type="a">
            <li>Cuando se emite una orden judicial válida para los registros médicos. </li>
            <li>Informar sospechas de abuso, negligencia o violencia doméstica. </li>
            <li>Prevenir o reducir una amenaza grave para la salud o la seguridad de cualquier persona. </li>
          </ol>
        </li>
      </ol>
      <Typography className={classes.italicText}>Consentimiento del paciente para el uso de telemedicina: </Typography>
      <Typography>
        Usted reconoce que ha leído y entendido la información proporcionada anteriormente, y entiende los riesgos y
        beneficios de la telemedicina, y al aceptar estos Términos, por la presente da su consentimiento informado para
        participar en una visita de telemedicina bajo los términos descritos en este documento.
      </Typography>
      <Typography color="primary" variant="h5">
        XIV. ENLACES A OTRAS PÁGINAS
      </Typography>
      <Typography>
        Nuestros Servicios podrían tener enlaces a otras páginas de internet que no están operadas por nosotros. Si
        usted accede al enlace de la página de Internet una tercera persona, usted será inmediatamente dirigido a la
        página de Internet de ese tercero. Le recomendamos y sugerimos que revise los términos y condiciones de uso de
        esa página de internet que visite.
      </Typography>
      <Typography>
        La compañía no endorsa ninguno de los otros sitios web y no asume responsabilidad legal, directa o
        indirectamente, por los sitios web de terceros, incluyendo sin limitarse al contenido de dichos. De modo que,
        usted asume todo riesgo al acceder a dichos sitios web enlazados.
      </Typography>
      <Typography color="primary" variant="h5">
        XV. LEY APLICABLE Y JURISDICCIÓN:
      </Typography>
      <Typography>
        Estos Términos serán exclusivamente interpretados y se regirán según las leyes de Puerto Rico sin consideración
        a los principios sobre conflictos de ley o las leyes de cualquier otro estado o país, incluyendo el estado o
        país de su residencia. Usted acuerda que los tribunales federales y estatales localizadas en Puerto Rico tendrán
        exclusividad en cuanto a jurisdicción, sede y competencia territorial sobre cualquier acción instada para exigir
        el cumplimiento de los derechos y obligaciones en o que surjan de estos Términos y usted se somete
        irrevocablemente a la jurisdicción de dichos tribunales.
      </Typography>
      <Typography color="primary" variant="h5">
        XVI. ACUERDO ENTERO; NO SEVERABILIDAD:
      </Typography>
      <Typography>
        Estos Términos constituyen el acuerdo entero entre usted y la compañía, y reemplaza todo acuerdo y entendimiento
        previo, sean escritos u orales o de alguna otra forma, con respecto del asunto objeto de estos Términos.
      </Typography>
      <Typography>
        La invalidez o inaplicabilidad de cualquiera de los presentes Términos -en todo o en parteo de los derechos
        derivados de los mismos, no afectará la validez o la aplicabilidad de los demás derechos, términos y
        condiciones, que continuarán en pleno vigor y efectos, quedando excluida solamente la cláusula viciada. En caso
        de que desee contactarse con Mente Serena a los fines de obtener más información respecto a los Servicios o a
        los presentes Términos deberá hacerlo enviando un correo electrónico a{' '}
        <a href="mailto:menteserenapr@gmail.com">menteserenapr@gmail.com</a>.
      </Typography>
    </Container>
  );
};

export default TermsOfService;
