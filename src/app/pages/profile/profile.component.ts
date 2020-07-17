import { Component, OnInit } from "@angular/core";
import { AllService } from "src/app/all.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  email: string;
  password: string;
  submit: boolean = false;
  constructor(private allService: AllService) {}

  ngOnInit() {}
  login() {
    this.allService.loginWithGoogle();
  }
}
