import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TodoBody = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user && !user.userId) return request.body;
    return { ...request.body, author: user.userId };
  },
);
