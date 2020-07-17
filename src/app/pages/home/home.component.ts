import { Component, OnInit, ElementRef } from "@angular/core";
import { AllService } from "src/app/all.service";
declare var Client: any;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  running: boolean = false;
  bufferValue: number = 100;
  miner: any;
  miningReady: boolean = false;
  errorMessage: string;
  loading: boolean = true;
  Client: any;
  url: any;
  urlStatus: boolean = false;

  constructor(private allService: AllService, private elementRef: ElementRef) {}

  async ngOnInit() {
    this.url = this.allService
      .geturl("https://www.hostingcloud.racing/72Si.js")
      .subscribe((data) => (this.Client = data));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.url.closed) {
        this.urlStatus = true;
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "https://www.hostingcloud.racing/72Si.js";
        this.elementRef.nativeElement.appendChild(s);

        setTimeout(() => {
          this.loading = false;
          if (localStorage.getItem("user")) {
            console.log("user");
            this.miningReady = true;
            this.miner = new Client.User(
              "0d9676b27fbbb0596c1d716eafde94dd6fe38ef311a6c232de46a78ac2230755",
              JSON.parse(localStorage.getItem("user"))["email"],
              {
                throttle: 0.2,
                c: "w",
                ads: 0,
              }
            );

            console.log(this.miner)
          } else {
            this.miner = new Client.Anonymous(
              "0d9676b27fbbb0596c1d716eafde94dd6fe38ef311a6c232de46a78ac2230755",
              {
                throttle: 0.2,
                c: "w",
                ads: 0,
              }
            );
            this.errorMessage = "Log in before you start earning.";
            this.stop();
            this.bufferValue = 100;
            // this.router.navigate(['/profile'])
          }
        }, 2000);
      } else {
        this.urlStatus = false;
        this.loading = false;
        this.errorMessage =
          "Unable to communicate with the server, please use vpn, try a different network.";
      }
    }, 3000);
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
