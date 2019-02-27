import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { WebApiProvider } from '../../providers/web-api/web-api';
import { Http, RequestOptions, Headers } from '@angular/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[
    WebApiProvider
  ]
})
export class LoginPage {
  public resp: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public webApiProvider: WebApiProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

  }

  Login(cpf,senha) {
    this.presentLoadingDefault()
    this.resp = this.webApiProvider.Authenticar(cpf,senha);
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }
}
