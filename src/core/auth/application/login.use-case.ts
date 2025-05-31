import { AuthRepository } from '../domain/AuthRepository';
import { AuthResponse } from '../type';

export class LoginUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(email: string, password: string): Promise<AuthResponse | null> {
    return this.authRepo.login(email, password);
  }
}
