import { Injectable, signal } from '@angular/core';
interface GlobalState {
  email: string;
  fullname: string;
  _id: string;
  jwt: string;
}

const initialSate = {
  email: '',
  fullname: '',
  _id: '',
  jwt: '',
};
@Injectable({
  providedIn: 'root',
})
export class StateService {
  $state = signal<GlobalState>(initialSate);
  
  constructor() {}
}
