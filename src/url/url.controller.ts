import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { CreateUrlUseCase } from './usecases/create-url.usecase';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetAllUrlsUseCase } from './usecases/get-all-urls.usecase';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UpdateUrlUseCase } from './usecases/update-url.usecase';
import { DeleteUrlUseCase } from './usecases/delete-url.usecase';

@Controller('url')
export class UrlController {
  @Inject()
  private createUrlUseCase: CreateUrlUseCase;

  @Inject()
  private getAllUrlsUseCase: GetAllUrlsUseCase;

  @Inject()
  private updateUrlUseCase: UpdateUrlUseCase;

  @Inject()
  private deleteUrlUseCase: DeleteUrlUseCase;

  @Post()
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.createUrlUseCase.execute(createUrlDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.getAllUrlsUseCase.execute();
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.updateUrlUseCase.execute(id, updateUrlDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/delete')
  remove(@Param('id') id: string) {
    return this.deleteUrlUseCase.execute(id);
  }
}
