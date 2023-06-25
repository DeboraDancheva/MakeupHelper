import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/DialogData';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CarouselModule } from 'primeng/carousel';
import { UserFaceConfigDataServiceService } from 'src/app/services/user-face-config-data-service.service';
import { tap } from 'rxjs';
import { UserFaceConfigData } from 'src/app/models/UserFaceConfigData';
import { HumanFacePopupComponent } from '../../human-face-popup/human-face-popup.component';
import { environment } from 'src/app/models/BaseUrl';
import { Router } from '@angular/router';

declare function slider(): void;
@Component({
  selector: 'app-popup-slider',
  templateUrl: './popup-slider.component.html',
  styleUrls: ['./popup-slider.component.css']
})
export class PopupSliderComponent implements OnInit {

  faceFormImages: string[] = [];
  faceFormType: string = '';
  responsiveOptions: any[] = [];
  userFaceConfigDataList: UserFaceConfigData[] = [];
  selected: boolean = false;
  selectedFileName: string = '';
  currentSlideIndex: number = 0;
  buttonLabel = "Следващ";
  facePartLabel: string = "";
  selectedFaceConfigurations: Object[] = [];
  currentSlideImages: string[] = [];
  resourcesPath = "../../../assets/resources/";
  isUserFaceConfigSet:boolean = false;


  constructor(public dialogRef: MatDialogRef<PopupSliderComponent>,private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private userFaceConfigDataServiceService: UserFaceConfigDataServiceService) { }

  ngOnInit(): void {
      slider();
      this.initializeFaceConfigMedia();
      this.setResponsiveOptions();   
  }

  initializeFaceConfigMedia() {
    this.userFaceConfigDataServiceService.getUserFaceConfigData().pipe(
    ).subscribe({
      next: (data) => {
        this.populateUserConfigData(data);
      },
      error: (error) => {
        debugger;
        console.error('Error:', error);
      }
    });
  }

  populateUserConfigData(response: Object[]) {
    response.forEach(element => {
      this.userFaceConfigDataList = response as UserFaceConfigData[];
    });

    this.currentSlideImages = this.userFaceConfigDataList[0].facePartMediaFileNames;
    this.facePartLabel = this.userFaceConfigDataList[0].facePart;
    console.log(this.currentSlideImages);
  }

  setResponsiveOptions() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  faceFormSelected(data: string) {debugger;
    this.selectedFileName = data;
    this.selected = true;   
  }

  nextButtonClicked() {

     if(this.userFaceConfigDataList.length > this.currentSlideIndex) {    debugger; 
      this.selectedFaceConfigurations.push(new Object({facePart: this.facePartLabel, fileName: this.selectedFileName}));
      if(this.buttonLabel == "Запази") {
        this.setUserFaceConfig(this.selectedFaceConfigurations);
        return;
      }
    }

    this.currentSlideIndex++;
     this.currentSlideImages = this.userFaceConfigDataList[this.currentSlideIndex].facePartMediaFileNames;
     this.facePartLabel = this.userFaceConfigDataList[this.currentSlideIndex].facePart;
     
    if(this.currentSlideIndex == this.userFaceConfigDataList.length-1){
      this.buttonLabel = "Запази";
    }

  }
  
  setUserFaceConfig(selectedFaceConfigurations: Object[]) {
    this.userFaceConfigDataServiceService.postData(selectedFaceConfigurations).subscribe({
      next: () => {
       localStorage.setItem('isUserFaceConfigDataSet','true');
       this.dialogRef.close();
      },
      error: (error) => {
      }
    });

    this.openHumanFacePage(); 
  }

  openHumanFacePage(): void {
    if(this.router.url=="/selectFacePart"){
      this.dialogRef.close();
    } else {
      this.router.navigate(['selectFacePart']);
    }
   
  }
}