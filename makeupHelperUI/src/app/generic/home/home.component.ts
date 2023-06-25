import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PopupSliderComponent } from '../popup-slider/popup-slider.component';
import {MatToolbarModule} from '@angular/material/toolbar';

import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { HumanFacePopupComponent } from 'src/app/human-face-popup/human-face-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  modalRef: any;

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {   debugger;
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
 

}
