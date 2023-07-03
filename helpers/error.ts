export function generateErrorMessage(
  baseString: string,
  error: unknown,
  includeHeader = true
): string {
  let message = 'Unknown Error';
  if (error instanceof Error) {
    message = error.message;
  }

  const headerMessage = includeHeader
    ? `OOPS! Please take a screenshot and send to our devs, thank you!.\n\n${baseString}\n\n`
    : '';
  const errorMessage = `${headerMessage}${message}`;
  return errorMessage;
}
