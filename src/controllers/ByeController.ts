import { Request, Response } from 'express';
import { Controller, Get, Post } from "../decorators";
import { controller, EndpointDefenition } from '../interfaces';
import { BaseController } from './BaseController';

@Controller('/bye')
export class ByeController extends BaseController {
  static endpoint = '';
  static endpoints = {}

  soemthing:string = "sds";

  constructor() {
    super();
    console.log("ByeController constructor");
    this.soemthing = "changed";
  }

  @Get('/')
  hello(req: Request, res: Response) {
    console.log(this.soemthing)
    res.status(200).send({
      message: 'bye, World!'
    });
  }
  
}