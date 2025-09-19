import {
  HttpException,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpResponseDto } from 'src/core/dtos/http-response';

export function HandleAxiosMetaError(res: HttpResponseDto) {
  const { statusCode = 200, errorMessage, success } = res.meta;

  if ((statusCode >= 200 && statusCode < 400) || success) {
    return res.data;
  }

  switch (statusCode) {
    case 400:
      throw new BadRequestException(errorMessage);
    case 401:
      throw new UnauthorizedException(errorMessage);
    case 403:
      throw new ForbiddenException(errorMessage);
    case 404:
      throw new NotFoundException(errorMessage);
    case 500:
    default:
      throw new InternalServerErrorException(
        errorMessage ?? 'Something Went Wrong',
      );
  }
}
