import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './schema/role.schema';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>){}


  async getAll(): Promise<Role[]>{
    return this.roleModel.find().exec();
  }

  async getById(id: string) /*: Promise<Role>*/ {
    return this.roleModel.findById(id)
  }
    
  async create(roleDto: CreateRoleDto): Promise<Role> {
    const newRole= new this.roleModel(roleDto) 
    return newRole.save()
  }
  
  async remove(id: string): Promise<Role> {
      return this.roleModel.findByIdAndRemove(id)
  }
  
  async update(id: string, roleDto: UpdateRoleDto): Promise<Role> {
      return this.roleModel.findByIdAndUpdate(id, roleDto, {new: true})
  }

  async getRoleByTitle(title: string){
    const role = await this.roleModel.findOne({'title': title})
    return role
  }

}
