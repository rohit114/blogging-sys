import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Check if the req header has the "ADMIN" role
    return request.headers.role == UserRole.ADMIN
  }
}
