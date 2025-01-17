import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller('url')
export class UrlController {
  // @Post()
  // create(@Body() createUrlDto: CreateUrlDto) {
  //   return this.urlService.create(createUrlDto);
  // }
  // @Get()
  // findAll() {
  //   return this.urlService.findAll();
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.urlService.findOne(+id);
  // }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
  //   return this.urlService.update(+id, updateUrlDto);
  // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.urlService.remove(+id);
  // }
}
