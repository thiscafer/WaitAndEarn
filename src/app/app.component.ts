import { Component } from "@angular/core";

import { Platform, ModalController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ModalComponent } from "./pages/modal/modal.component";
import { AllService } from './all.service';
import "@codetrix-studio/capacitor-google-auth";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  userLang : string
  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public modalController: ModalController,
    public allService: AllService
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
    this.userLang = navigator.language ; 

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
