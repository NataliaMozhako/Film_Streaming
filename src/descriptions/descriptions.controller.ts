import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { DescriptionsService } from './descriptions.service';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { Description } from './schema/description.schema';

@Controller('descriptions')
export class DescriptionsController {

  constructor(private readonly descriptionsService: DescriptionsService) { }

  @Get()
  getAll(): Promise<Description[]> {
    return this.descriptionsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Description> {
    return this.descriptionsService.getById(id)
  }

  // @Post()
  // create(@Body() createDescriptionDto: CreateDescriptionDto): Promise<Description> {
  //   return this.descriptionsService.create(createDescriptionDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<Description> {
  //   return this.descriptionsService.remove(id)
  // }

  @Put(':id')
  update(@Body() updateDescriptionDto: UpdateDescriptionDto, @Param('id') id: string): Promise<Description> {
    return this.descriptionsService.update(id, updateDescriptionDto)
  }
}
