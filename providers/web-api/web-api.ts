import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, CompilerFactory } from '@angular/core';
import { LoadingController, Loading, AlertController, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
/*
  Generated class for the WebApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebApiProvider {

  //private baseUrl = 'https://localhost:5001/api/';
  private baseUrl = 'https://api-pucmg.azurewebsites.net/api/';

  public loading: Loading;  
  constructor(public http: Http,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public storage: Storage,
              public navCtrl: NavController) {

  }

  Authenticar (cpf,senha): any {
    let urlAuth = "Auth"

    let body = { cpf, senha };
    var headers = new Headers();

    headers.append('content-type','application/json');

    let options = new RequestOptions({ headers: headers, withCredentials: false});

    this.presentLoadingDefault();
    
    this.http.post(this.baseUrl+urlAuth, body, options).subscribe( 
      res => {
        if(res.status==200)
        {  
          const response = (res as any);
          const token = JSON.parse(response._body);
          this.storage.set('token', token);
          this.ObtemDadosAluno(token,cpf);
          this.loading.dismiss();       
        }
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.showAlert("Verifique sua conexão com a internet.");
          } else {
            this.showAlert("Verifique o usuário ou a senha digitada.");
          }
      });
  };

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
  
    this.loading.present();
  
    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);
  };

  ObtemDadosAluno(token: string, cpf:string) {
    let urlGetAluno = "Aluno/ObtemDadosUsuario";

    let body = { 
       cpf:cpf
    };
    var headers = new Headers();

    headers.append('content-type','application/json');
    headers.append('Authorization','Bearer '+token,);

    let options = new RequestOptions({ headers: headers, withCredentials: false});

    this.http.post(this.baseUrl+urlGetAluno, cpf, options).subscribe( 
      res => {
        if(res.status==200)
        {          
          const response = (res as any);
          const aluno = JSON.parse(response._body);
          this.obtemMatriculaAluno(token,cpf);
        }
      },
        (err: HttpErrorResponse) => {
          this.showAlert("Verifique sua conexão com a internet.");
      });
  };

  showAlert(mensagem:string) {
    const alert = this.alertCtrl.create({
      title: 'Algo deu errado =(',
      subTitle: mensagem,
      buttons: ['OK!']
    });
    alert.present();
  };

  obtemMatriculaAluno(token: string, cpf:string) {
    let urlObtemMatricula = "Matricula/ObtemMatriculaAluno"

    let body = { cpf: cpf };
    var headers = new Headers();CompilerFactory
    
    headers.append('content-type','application/json');
    headers.append('Authorization','Bearer '+token,);

    let options = new RequestOptions({ headers: headers, withCredentials: false});
   
    this.http.post(this.baseUrl+urlObtemMatricula, cpf, options).subscribe( 
      res => {
        if(res.status==200)
        {  
          const response = (res as any);
          var matricula = JSON.parse(response._body);
          this.navCtrl.push(HomePage, { data: matricula });
        }
      },
        (err: HttpErrorResponse) => {
          console.log(err);
      });
  }
}

/*  storage.get('age').then((val) => {
    console.log('Your age is', val);  
}); 
*/                                
