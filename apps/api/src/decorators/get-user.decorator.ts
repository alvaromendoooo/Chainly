import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserResponseDTO } from "src/users/application/dto/users.registry.dto";

export const GetUser = createParamDecorator( // Converts user request type from User to UserResponseDTO
    (data: unknown, ctx: ExecutionContext): UserResponseDTO => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);