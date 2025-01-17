import { Controller, Post, Body, Inject, Get, UseGuards } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { CreateUrlUseCase } from './usecases/create-url.usecase';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetAllUrlsUseCase } from './usecases/getAll-urls.usecase';

@Controller('url')
export class UrlController {
  @Inject()
  private createUrlUseCase: CreateUrlUseCase;

  @Inject()
  private getAllUrlsUseCase: GetAllUrlsUseCase;

  @Post()
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.createUrlUseCase.execute(createUrlDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.getAllUrlsUseCase.execute();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
  //   return this.urlService.update(+id, updateUrlDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.urlService.remove(+id);
  // }
}
