import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Res, Req, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
