import { Component } from "@angular/core";

import { Platform, ModalController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ModalComponent } from "./pages/modal/modal.component";
import { AllService } from './all.service';
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalController: ModalController,
    private allService: AllService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async ngOnInit() {
    if (!localStorage.getItem("user")) {
      const modal = await this.presentModal();
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
    });

    return await modal.present();
  }
}
