import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../services/data-service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../models/BaseUrl';
import { PopupSliderComponent } from '../generic/popup-slider/popup-slider.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-human-face-popup',
  templateUrl: './human-face-popup.component.html',
  styleUrls: ['./human-face-popup.component.css']
})
export class HumanFacePopupComponent implements OnInit {
  highlightedFacePart:string = '';
  eyes:string ='eyes';
  nose:string ='nose';
  mouth:string ='mouth';
  face:string ='face';
  redirectUrl:string = 'dashboard'
  private baseUrl: string = environment.apiUrl;
  

  constructor(
    private dataService:DataService, private route: ActivatedRoute,
    private router: Router,public dialog: MatDialog) {
      
    }
    
  ngOnInit(): void {debugger;
    if(localStorage.getItem('isUserFaceConfigSet')=='true') {
      this.router.navigate(['selectFacePart']);
      // this.openHumanFaceDialog();
    } else {
      this.openSliderDialog();
    }
  }

  openSliderDialog(): void {
    const dialogRef = this.dialog.open(PopupSliderComponent, {
      height: '30rem',
      width: '60rem',
    });
  }

    
    hightlightFacePart(facePart:string) {
      this.highlightedFacePart = facePart;
    }

    getMediaForFacePart(facePart:string) {debugger;
      this.dataService.getMakeupDataForFacePart(facePart).pipe()
      .subscribe({       
        next: (data) => {
           debugger;this.router.navigateByUrl(this.redirectUrl, { state: { media:data, facePart:facePart} }); 
        },
        error: (error) => {
          debugger;
          console.error('Error:', error);
          // Handle the error
        }
      });
    }

}
