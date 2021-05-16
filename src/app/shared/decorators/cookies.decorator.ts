import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type CookieOptions = Partial<{ key: string; signed: boolean }>;

export const Cookies = createParamDecorator((data: CookieOptions, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  if (data?.signed) {
    return data?.key ? request.signedCookies[data.key] : request.signedCookies;
  } else {
    return data?.key ? request.cookies[data.key] : request.cookies;
  }
});
