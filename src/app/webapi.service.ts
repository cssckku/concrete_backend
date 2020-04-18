import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class WebapiService {
  public base_url = "https://api.concretedeliveryeasy.com/index.php/";

  constructor(public http: HttpClient, public local: LocalStorageService) {

  }
  presentToast() {

  }
  storage_set(key, val) {
    this.local.set(key, val);
  }
  storage_get(key) {
    return this.local.get(key);
  }
  postData(segment, objdata) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      this.http.post(this.base_url + segment, JSON.stringify(objdata))
        .subscribe((res: any) => {
          resolve(res);

        }, (err) => {
          if (err.status == 0) {
            this.presentToast();
            reject(err);
          }
        });
    });
  }

  getData(segment) {
    return new Promise((resolve, reject) => {
      this.http.get(this.base_url + segment)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          if (err.status == 0) {
            this.presentToast();
            reject(err);
          }
          reject(err);
        });
    });
  }
}
