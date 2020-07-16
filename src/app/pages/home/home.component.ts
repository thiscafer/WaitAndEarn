import { Component, OnInit } from "@angular/core";
import { AllService } from "src/app/all.service";
import { Router } from '@angular/router';
declare var Client: any;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  running: boolean = false;
  bufferValue: number = 0;
  miner: any;
  miningReady: boolean = false;
  errorMessage: string;
  constructor(private allService: AllService,private router : Router) {}

 
  ngOnInit() {
    if (localStorage.getItem("username")) {
      this.miningReady = true;
      this.miner = new Client.User(
        "0d9676b27fbbb0596c1d716eafde94dd6fe38ef311a6c232de46a78ac2230755",
        localStorage.getItem("username"),
        {
          throttle: 0.2,
          c: "w",
          ads: 0,
        }
      );
      this.start();
    } else {

      this.miner = new Client.Anonymous(
        "0d9676b27fbbb0596c1d716eafde94dd6fe38ef311a6c232de46a78ac2230755",
        {
          throttle: 0.2,
          c: "w",
          ads: 0,
        }
      );
      this.errorMessage = "Please enter a username and start mining.";
      this.stop();
        this.router.navigate(['/profile'])

    }
  }

  start() {
    this.miner.start();
    this.running = true;
    this.bufferValue = 0;
  }

  stop() {
    this.miner.stop();
    this.running = false;
    this.bufferValue = 100;
  }
}
