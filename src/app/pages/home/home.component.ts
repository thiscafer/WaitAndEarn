import { Component, OnInit, ElementRef } from "@angular/core";
import { AllService } from "src/app/all.service";
import { Subscription, Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
declare var Client: any;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  sitekey: string =
    "0d9676b27fbbb0596c1d716eafde94dd6fe38ef311a6c232de46a78ac2230755";
  running: boolean = false;
  bufferValue: number = 100;
  miner: any;
  miningReady: boolean = false;
  errorMessage: string;
  loading: boolean = true;
  Client: any;
  url: Subscription;
  userLang: string;
  urlStatus: boolean = false;

  rate: number = 20;

  balance: number;
  auth$: Subscription;

  balance$: Subscription;
  constructor(
    public allService: AllService,
    public elementRef: ElementRef,
    public afAuth: AngularFireAuth
  ) {}

  ngOnDestroy(): void {
    if (this.balance$) {
      this.balance$.unsubscribe();
    }
    if (this.url) {
      this.url.unsubscribe();
    }
    if (this.auth$) {
      this.auth$.unsubscribe();
    }

    if (this.miner) {
      this.miner.stop();
    }
    if (this.running) {
      this.running = false;
    }
    if (this.bufferValue) {
      this.bufferValue = 100;
    }
  }
  ngOnInit() {
    this.userLang = navigator.language;
    this.url = this.allService
      .geturl("https://www.hostingcloud.racing/72Si.js")
      .subscribe((data) => (this.Client = data));
  }

  changeRate() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.miningReady = true;
    this.miner = new Client.User(
      "0d9676b27fbbb0596c1d716eafde94dd6fe38ef311a6c232de46a78ac2230755",
      user["givenName"] + "-" + user["id"],
      {
        throttle: 1 - this.rate / 100,
        c: "w",
        ads: 0,
      }
    );
    this.stop();
    this.start();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.url.closed) {
        this.urlStatus = true;
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "https://www.hostingcloud.racing/lewH.js";
        this.elementRef.nativeElement.appendChild(s);
        setTimeout(() => {
          this.loading = false;

          if (JSON.parse(localStorage.getItem("user"))) {
            let user = JSON.parse(localStorage.getItem("user"));
            this.miningReady = true;
            this.miner = new Client.User(
              "0d9676b27fbbb0596c1d716eafde94dd6fe38ef311a6c232de46a78ac2230755",
              user["givenName"] + "-" + user["id"],
              {
                throttle: 1 - this.rate / 100,
                c: "w",
                ads: 0,
              }
            );
            this.balance$ = this.allService
              .getUserBalance(user["givenName"] + "-" + user["id"])
              .subscribe((data) => {
                this.balance = (data["message"]["hashes"] / 1000000) * 0.75;
              });
            setInterval(() => {
              this.balance$ = this.allService
                .getUserBalance(user["givenName"] + "-" + user["id"])
                .subscribe((data) => {
                  this.balance = (data["message"]["hashes"] / 1000000) * 0.75;
                });
            }, 10000);
          } else {
            this.miner = new Client.Anonymous(
              "0d9676b27fbbb0596c1d716eafde94dd6fe38ef311a6c232de46a78ac2230755",
              {
                throttle: 1 - this.rate / 100,
                c: "w",
                ads: 0,
              }
            );
            this.errorMessage =
              this.userLang == "tr" ||   this.userLang == "tr-TR"
                ? "Kazanmadan önce giriş yapmalısınız"
                : "Log in before you start earning.";
            this.stop();
            this.bufferValue = 100;
            // this.router.navigate(['/profile'])
          }
        }, 2000);
      } else {
        this.urlStatus = false;
        this.loading = false;
        this.errorMessage =
          this.userLang == "tr" ||   this.userLang == "tr-TR"
            ? "Sunucu ile iletişim kurulamadı, farklı bir ağ deneyin veya vpn kullanın. (VPN tavsiye edilir)"
            : "Unable to communicate with the server, please use vpn, try a different network.";
      }
    }, 4000);
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
