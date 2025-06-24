import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = "jkd5436shfkjij218jhfdwkonl324sor24k"

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async update(user: User): Promise<UpdateResult> {
        return await this.userRepository.update(user.id, user);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    async findOne(id: number): Promise<any> {
        // let id: string
        // id = itemId.toString()
        return await this.userRepository.findOne({ where: { id } })
    }

    async findByLogin(login: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { login } });
        if (!user) {
            throw new NotFoundException(`User with login ${login} not found`);
        }
        return user;
    }

    async auth(userData: any): Promise<any> {
        const login = userData.login
        const password = userData.password

        const user = await this.userRepository.findOne({ where: { login } });
        if (!user) {
            throw new NotFoundException(`User with login ${login} not found`);
        }
        
        if (user?.password === password) {
            const token = jwt.sign(
                { 
                  userId: user?.id,
                  userRole: user?.role
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );
            return { token, user: { id: user.id, login: user.login, role: user.role } };
        } else {
            throw new NotFoundException('Invalid password');
        }
    }
}
