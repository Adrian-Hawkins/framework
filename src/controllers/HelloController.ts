import { Request, Response } from 'express';
import { Controller, Get, Post } from "../decorators";
import { controller, EndpointDefenition } from '../interfaces';
import { BaseController } from './BaseController';

@Controller('/hello')
export class HelloController extends BaseController {
  // These static varaibles are always required as if we have more than one controller it makes use of the base controller and breaks stuff
  static endpoint = '';
  static endpoints = {}

  soemthing:string = "sds";

  constructor() {
    super();
    console.log("HelloController constructor");
    this.soemthing = "changed";
  }

  @Get('/')
  hello(req: Request, res: Response) {
    console.log(this.soemthing)
    res.status(200).send({
      message: 'Hello, World!'
    });
  }

  @Get('/test')
  bye(req: Request, res: Response) {
    console.log(this.soemthing)
    res.status(200).send({
      message: 'bye, World!'
    });
  }


  @Get('/user/:id')
  test(req: Request, res: Response) {
    const { id } = req.params;
    res.send(`User ID: ${id}`);
  }

  @Post('/echo')
  echo(req: Request, res: Response) {
    const { message } = req.body;
    res.send(`You said: hey`);
  }
  
}