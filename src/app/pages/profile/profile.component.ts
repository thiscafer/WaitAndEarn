import { Component, OnInit } from "@angular/core";
import { AllService } from "src/app/all.service";
import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from "@capacitor/core";
const { SplashScreen, GoogleAuth } = Plugins;
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  email: string;
  password: string;
  submit: boolean = false;
  user: any;
  userLang: string;
  constructor(public allService: AllService) {}

  ngOnInit() {
    this.userLang = navigator.language;
    this.user = JSON.parse(localStorage.getItem("user"));
  }
  login() {
    this.allService.loginWithGoogle();
  }
}
