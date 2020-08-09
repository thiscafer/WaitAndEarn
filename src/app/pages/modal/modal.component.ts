import { Component, OnInit } from "@angular/core";
import { ModalController } from '@ionic/angular';

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  userLang : string
  constructor(public modalController: ModalController,public viewCtrl: ModalController) {}

  ngOnInit() {
    this.userLang = navigator.language;
  }

  close () {
    this.viewCtrl.dismiss()
  }
}
