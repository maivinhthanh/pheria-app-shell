import { AuthRepository } from '../domain/AuthRepository';
import { LogoutResponse } from '../type';

export class LogoutUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(refreshToken: string): Promise<LogoutResponse | null> {
    return this.authRepo.logout(refreshToken);
  }
}
