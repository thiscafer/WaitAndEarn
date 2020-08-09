import { Component } from "@angular/core";

import { Platform, ModalController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ModalComponent } from "./pages/modal/modal.component";
import { AllService } from "./all.service";
import "@codetrix-studio/capacitor-google-auth";
import { DeviceDetectorService } from "ngx-device-detector";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  userLang: string;
  isMobile: boolean = true;
  isTablet: boolean = false;
  isDesktopDevice: boolean = false;
  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public modalController: ModalController,
    public allService: AllService,
    private deviceService: DeviceDetectorService
  ) {
    this.initializeApp();

    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async ngOnInit() {
    this.userLang = navigator.language;

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
