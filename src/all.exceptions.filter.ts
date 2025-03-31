import {
    Catch,
    ArgumentsHost,
    HttpStatus,
    HttpException,
    BadRequestException,
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { MyLoggerService } from "./my-logger/my-logger.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

type MyResponseObj = {
    statusCode: number;
    timestamp: string;
    path: string;
    response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const myResponseObj: MyResponseObj = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: '',
        };

        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            
            // Handling validation errors specifically
            if (
                exception instanceof BadRequestException &&
                typeof exceptionResponse === 'object' &&
                'message' in exceptionResponse
            ) {
                const messages = (exceptionResponse as any).message;
                if (Array.isArray(messages)) {
                    myResponseObj.statusCode = HttpStatus.BAD_REQUEST;
                    myResponseObj.response = messages.join(', ');
                } else {
                    myResponseObj.statusCode = status;
                    myResponseObj.response = exceptionResponse;
                }
            } else {
                myResponseObj.statusCode = status;
                myResponseObj.response = exceptionResponse;
            }
        } else if (exception instanceof PrismaClientValidationError) {
            myResponseObj.statusCode = 442;
            myResponseObj.response = exception.message.replaceAll(/\n/g, '');
        } else {
            myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            myResponseObj.response = 'Internal Server Error';
        }

        response.status(myResponseObj.statusCode).json(myResponseObj);

        this.logger.error(myResponseObj.response, AllExceptionsFilter.name);

        super.catch(exception, host);
    }
}