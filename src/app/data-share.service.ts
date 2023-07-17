import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  uid:any = '';
  email:any = '';
  
  recordId:any = null;
  record:any ;

  constructor() { }

}
