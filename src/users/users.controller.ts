import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
    /*
    GET /users -> index
    GET /users/:id -> show
    POST /users -> create
    PATCH /users/:id -> update
    DELETE /users/:id -> delete
    */

    @Get() // GET /users
    findAll(){
        return []
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id') id:string){
        return {id}
    }
}
