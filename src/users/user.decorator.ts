import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);

type RUser = {
    username: string,
    sub: string
}

export type {
    RUser
}
