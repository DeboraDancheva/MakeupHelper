import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-media-popup',
  templateUrl: './add-media-popup.component.html',
  styleUrls: ['./add-media-popup.component.css']
})
export class MediaPopupComponent implements OnInit{

  mediaName:string = '';
  mediaType:string = '';
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any ){}

  ngOnInit(): void {debugger;
    this.mediaName = this.data.mediaName;
    this.mediaType = this.data.mediaType;
    console.log(this.mediaName);
  }

  @HostListener('mouseenter', ['$event']) onMouseEnter(event: MouseEvent) {
    const target = event.target as HTMLMediaElement;
    if (target instanceof HTMLMediaElement) {debugger;
      target.play();
    }
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: MouseEvent) {
    const target = event.target as HTMLMediaElement;
    if (target instanceof HTMLMediaElement) {debugger;
      target.pause();
    }
  }

}
