export function isEmailValid(email: string | null): boolean {
  if (
    !email?.includes('@cpu.edu.ph') &&
    email !== 'eimagbanua@up.edu.ph' &&
    email !== 'jeromecabugwason2@gmail.com' &&
    email !== 'gabrieldaduya@gmail.com'
  ) {
    return false;
  }

  return true;
}
