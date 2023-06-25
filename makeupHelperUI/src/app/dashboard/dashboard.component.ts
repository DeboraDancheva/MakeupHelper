import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Media } from '../models/Media';
import { MatDialog } from '@angular/material/dialog';
import { MediaPopupComponent } from '../generic/media-popup/add-media-popup.component';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { DataService } from '../services/data-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit{
  mediaData:Media[] =[];
  facePart:string='';
  items: MenuItem[] = [];
favoriteView: boolean = false;   

  constructor(public activatedRoute: ActivatedRoute, public dialog:MatDialog,
    private router: Router, private dataService:DataService){}

  ngAfterViewInit(): void {
    const mouseTarget = document.querySelector("#mouseTarget");

    mouseTarget?.addEventListener("mouseenter", (e) => {
      const target = e.target as HTMLMediaElement;
      if (target instanceof HTMLMediaElement) {debugger;
        target.play();
      }
    });
    
    mouseTarget?.addEventListener("mouseleave", (e) => {
      const target = e.target as HTMLMediaElement;
    if (target instanceof HTMLMediaElement) {debugger;
      target.pause();
    }
    });
  }
  

  ngOnInit(): void {debugger;
    this.activatedRoute.paramMap
      .pipe(tap()).subscribe({       
        next: (data) => {
          if(window.history.state.favoriteView){
            this.favoriteView = Boolean(window.history.state.favoriteView);
        } else if(window.history.state.facePart) {
          this.facePart = window.history.state.facePart;
          this.initializeMedia(window.history.state.media);
        }
        } 
        });

        if(this.favoriteView){
          this.getFavoritesMedia();
        }

  }

  initializeMedia(data: any[]) {debugger;
    data.forEach((el) => {debugger;
     let m = new Media(el.name, el.type, el.description, el.favorite);
     this.mediaData.push(m);
   });
   }

  getFavoritesMedia() {
    this.dataService.getFavoriteMakeupData().subscribe({
      next: (data) => {
        this.initializeMedia(data as any[]);
      },
      error: (error) => {
      }}
    )
  }

  toggleFavorite(media:Media,event: Event) {debugger;
    event.stopPropagation();
    if(media.favorite){
      const newArray = this.mediaData.filter(obj => obj.name !== media.name);
      this.mediaData = newArray;
    }
    media.favorite = !media.favorite;
    this.dataService.changeMediaFavouriteState(media.name, media.favorite).pipe().subscribe(
      {
        next : () => {
        },
        error : (error) => {
        }
      }
    );
  }

  @HostListener('mouseenter', ['$event']) onMouseEnter(event: MouseEvent, media:Media) {debugger;
    const target = event.target as HTMLMediaElement;
    if (target instanceof HTMLMediaElement) {debugger;
      target.play();
    }
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: MouseEvent, media:Media) {
    const target = event.target as HTMLMediaElement;
    if (target instanceof HTMLMediaElement) {debugger;
      target.pause();
    }
  }

  openDialog(mediaName:string, mediaType:string) {
    const dialogRef = this.dialog.open(MediaPopupComponent, {  
      data: {'mediaName': mediaName,
      'mediaType' : mediaType}
    });
  }


}
