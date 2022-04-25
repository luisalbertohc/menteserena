import { Warning as WarningIcon } from '@material-ui/icons';

import ErrorDialog from './ErrorDialog';

interface RestrictedChatInfoDialogProps {
  onClose: () => void;
  onClick?: () => void;
}

const RestrictedChatInfoDialog = ({ onClose, onClick }: RestrictedChatInfoDialogProps) => {
  const content = (
    <>
      El usuario ha alcanzado el límite de mensajes que puede enviarle (3), con el objetivo de asegurar que sea costo
      efectivo el tiempo que invierta en orientarle. Usted puede enivarle un mensaje (1), y esto le permite que el
      usuario responda (1) con otro mensaje.
      <br />
      <br />
      Le exhortamos a que le provea un teléfono o correo electrónico laboral si no desea extender la comunicación via
      chat, o le acepte para compartirle documentación a completar. Una vez le acepte como paciente, no tendrá límites
      de envío de mensajes.
    </>
  );

  return <ErrorDialog onClose={onClose} content={content} onClick={onClick || onClose} />;
};

export default RestrictedChatInfoDialog;
