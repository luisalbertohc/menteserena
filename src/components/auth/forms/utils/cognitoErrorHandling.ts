export const cognitoErrorHandling = cognitoCode => {
  switch (cognitoCode) {
    case 'NotAuthorizedException':
      return 'Nombre de usuario o contraseña incorrecta.';
    case 'UserNotConfirmedException':
      return 'El usuario no está confirmado. Favor de confirmar su correo electrónico.';
    case 'UsernameExistsException':
      return 'Ya existe una cuenta con el correo electrónico proporcionado.';
    case 'CodeMismatchException':
      return 'Se proporcionó un código de verificación no válido. Vuelva a intentarlo';
    case 'ExpiredCodeException':
      return 'Se proporcionó un código no válido. Vuelva a solicitar un código';
    case 'LimitExceededException':
      return 'Se superó el límite de intentos, inténtelo mas tarde.';
    default:
      return 'Acaba de suceder un error';
  }
};
