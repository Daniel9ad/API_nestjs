import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            'id':1,
            'name':'daniel',
            'role':'ad'
        },
        {
            'id':2,
            'name':'daniel2',
            'role':'us'
        },
        {
            'id':3,
            'name':'daniel3',
            'role':'us'
        },
        {
            'id':4,
            'name':'daniel4',
            'role':'us'
        }
    ]

    findAll(role?: 'ad' | 'us'){
        if (role){
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number){
        const user = this.users.filter(user => user.id === id)
        return user
    }

    create(createUserDto: CreateUserDto){
        const userByHighestId = [...this.users].sort((a,b) => b.id - a.id)
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto){
        this.users = this.users.map(user => {
            if (user.id === id){
                return {...user, ...updateUserDto}
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number){
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }

}
