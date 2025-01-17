import { Controller, Post, Body, Inject } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { CreateUrlUseCase } from './usecases/create-url.usecase';

@Controller('url')
export class UrlController {
  @Inject()
  private createUrlUseCase: CreateUrlUseCase;

  @Post()
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.createUrlUseCase.execute(createUrlDto);
  }

  // @Get()
  // findAll() {
  //   return this.urlService.findAll();
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
