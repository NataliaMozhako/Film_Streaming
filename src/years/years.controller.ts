import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateYearDto } from './dto/create-year.dto';
import { UpdateYearDto } from './dto/update-year.dto';
import { Year } from './schema/year.schema';
import { YearsService } from './years.service';

@Controller('years')
export class YearsController {

  constructor(private readonly yearsService: YearsService){}

  @Get()
  getAll(): Promise<Year[]> {
    return this.yearsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Year> {
    return this.yearsService.getById(id)
  }

  @Post()
  create(@Body() createYearDto: CreateYearDto): Promise<Year> {
    return this.yearsService.create(createYearDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Year> {
    return this.yearsService.remove(id)
  }

  @Put(':id')
  update(@Body() updateYearDto: UpdateYearDto, @Param('id') id: string): Promise<Year> {
    return this.yearsService.update(id, updateYearDto)
  }
}
