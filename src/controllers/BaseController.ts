import { controller, EndpointDefenition } from '../interfaces';

export class BaseController implements controller {
  endpoint!: string;
  endpoints!: { [key: string]: EndpointDefenition; };
  
  send_message() {
    console.log("BaseController send_message");
  }
  
}