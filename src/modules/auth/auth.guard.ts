import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PRIVATE } from "./public.decorator";
import { Request } from "express";


export interface TokenPayload{
  identifier: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPrivate = this.reflector.getAllAndOverride<boolean>(IS_PRIVATE, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!isPrivate) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
    throw new UnauthorizedException();
    }
    try {
    const payload : TokenPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
    });
    request['token'] = payload;
    return true
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
