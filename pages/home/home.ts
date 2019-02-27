import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public dados: any;
  public media: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.dados = this.navParams.get("data");
    let total = 0;
    let soma = 0;
    this.dados.matricula.curso.avaliacoes.forEach(ava => {
      soma = soma + ava.notaAvaliacao.valorNota;
      total = total + 1;
    });

    this.media = Math.round( soma / total );
  }

}