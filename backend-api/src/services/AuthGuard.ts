// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      if (!request.headers.authorization) {
        return false;
      }
      request.user = this.validateToken(request.headers.authorization);
      return true;

    } catch (error) {
      console.error("Err canActivate", error.message)
    }
  }

  private validateToken(auth: string) {
    const token = auth.split(' ')[1];
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new Error("Err validateToken");
    }
  }
}
