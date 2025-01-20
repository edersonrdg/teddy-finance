import { Controller, Get, Param, Inject, Res } from '@nestjs/common';
import { GetUrlUseCase } from './usecases/get-url.usecase';
import { Response } from 'express';
import { ApiResponse } from '@nestjs/swagger';

@Controller('')
export class UrlRedirectController {
  @Inject()
  private getUrlUseCase: GetUrlUseCase;

  @ApiResponse({ status: 302, description: 'Redirect to original url' })
  @Get('/:shortened_url')
  async redirect(
    @Param('shortened_url') shortened_url: string,
    @Res() res: Response,
  ) {
    const url = await this.getUrlUseCase.execute(shortened_url);

    return res.redirect(url);
  }
}
