import { Component, OnInit } from "@angular/core";
import { ModalController } from '@ionic/angular';

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  constructor(public modalController: ModalController,public viewCtrl: ModalController) {}

  ngOnInit() {
   
  }

  close () {
    this.viewCtrl.dismiss()
  }
}
