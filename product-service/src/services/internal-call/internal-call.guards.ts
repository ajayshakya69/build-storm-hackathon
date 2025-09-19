import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  EXPIRED_TOKEN_ERROR_MESSAGE,
  INVALID_TOKEN_ERROR_MESSAGE,
  NO_HEADER_ERROR_MESSAGE,
} from 'src/core/constants/http.constants';
import { USER_ROLE } from 'src/core/constants/user.constants';
import { InternalCallService } from './internal-call.service';
import { HandleAxiosMetaError } from './internal-call.utils';

@Injectable()
export class OpenGuard implements CanActivate {
  constructor(private readonly internalCallService: InternalCallService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException(NO_HEADER_ERROR_MESSAGE);
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(INVALID_TOKEN_ERROR_MESSAGE);
    }
    const sessionRes =
      await this.internalCallService.authAxiosInstance.getSessionFromToken(
        token,
      );
    const { user, session } = HandleAxiosMetaError(sessionRes);

    try {
      request.user = user;
      request.session = session;
      return true;
      // if (user.role == USER_ROLE.AUTHENTICATED) return true;

      // else throw new UnauthorizedException('Unauthorized');
    } catch (error) {
      throw new UnauthorizedException(EXPIRED_TOKEN_ERROR_MESSAGE);
    }
  }
}
