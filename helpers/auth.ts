export function isEmailValid(email: string | null): boolean {
  if (!email?.includes('@cpu.edu.ph') && email !== 'eimagbanua@up.edu.ph') {
    return false;
  }

  return true;
}
