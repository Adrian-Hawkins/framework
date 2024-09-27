import { Request, Response } from 'express';
import { Controller, Get, Post } from "../decorators";
import { controller, EndpointDefenition } from '../interfaces';

@Controller('/hello')
export class HelloController implements controller {
  // Define these to make the interface happy
  endpoint!: string;
  endpoints!: { [key: string]: EndpointDefenition; };
  // define these to make the array in index.ts happy
  static endpoint = '';
  static endpoints = {}

  soemthing:string = "sds";

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