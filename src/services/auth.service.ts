import { AuthApiRepository } from '@/src/infrastructure/auth/auth.repository';
import { LoginUseCase } from '@/src/core/auth/application/login.use-case';
import { LogoutUseCase } from '@/src/core/auth/application/logout.use-case';

const authRepo = new AuthApiRepository();

const loginUseCase = new LoginUseCase(authRepo);
const logoutUseCase = new LogoutUseCase(authRepo);

export async function loginUser(email: string, password: string) {
  return loginUseCase.execute(email, password);
}

export async function logout(refreshToken: string) {
  return logoutUseCase.execute(refreshToken);
}