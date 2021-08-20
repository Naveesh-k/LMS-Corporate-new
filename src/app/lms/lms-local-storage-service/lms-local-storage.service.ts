import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LmsLocalStorageService {

  constructor() { }

  lms_localstorage : any = {
    authtoken:'',
}

local_storage : any = localStorage.getItem('lms_localstorage')
LocalstorageGetItem = (this.local_storage === null) ? this.lms_localstorage : JSON.parse(this.local_storage)



// For set data in localstorage:-
    setLocalStorage(mode:any , data:any){
        this.local_storage[mode] = data;
        let setStorage = JSON.stringify(this.local_storage)
        localStorage.setItem('lms_localstorage' , setStorage)
   }

// get data localStorage:-
      getLocalStorage(){
        return this.local_storage
    }

// remove localStorage
    removeLocalStorage(mode:any){

    }

}
