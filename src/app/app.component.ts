import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NewsService } from './service/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'TopTenNews';
  public sources:any = [];
  public articles:any = [];
  public selectedNewsChannel: string = "Top 10 Trending News!"
  @ViewChild(MatDrawer) sideNav!: MatDrawer;
  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef, private newsApi: NewsService) {

  }
  ngOnInit(): void {
    this.newsApi.initArticles()
    .subscribe((res: any) => {
      this.articles = res.articles;
    })

    this.newsApi.initSources()
    .subscribe((res: any) => {
      this.sources = res.sources;
    })
  }
  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width: 787px)'])
    .subscribe((res: any) => {
      if(res?.matches) {
        this.sideNav.mode = "over";
        this.sideNav.close();
      } else {
        this.sideNav.mode = "side";
        this.sideNav.open();
      }
    })
    this.cdr.detectChanges();
  }

  searchSource(source: any) {
    this.newsApi.getArticlesByID(source.id)
    .subscribe((res: any) => {
      this.articles = res.articles;
      this.selectedNewsChannel = source.name;
    })
  }
}
