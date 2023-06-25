import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/DialogData';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { DataService } from 'src/app/services/data-service';
import { tap } from 'rxjs';
import { TranslationService } from 'src/app/services/translation.service';
import { Constants } from 'src/app/Constants';


@Component({
  selector: 'app-upload-file-popup',
  templateUrl: './upload-file-popup.component.html',
  styleUrls: ['./upload-file-popup.component.css']
})
export class UploadFilePopupComponent implements OnInit {
  uploadedFiles: any[] = [];
  faceParts: String[] = [];
  faceShapes: String[]= [];  
  selectedFacePart: string = '';
  selectedFaceShape: string = '';
  description: string = '';

  constructor(public dialogRef: MatDialogRef<UploadFilePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private dataService:DataService, private translationService:TranslationService) {}

    ngOnInit(): void {
      this.initializeData();
    }

  initializeData() {
   let facePartsMSG = [
    "UI_MESS_EYES",
    "UI_MESS_MOUTH",
    "UI_MESS_NOSE",
    "UI_MESS_FACE"    
   ];
   facePartsMSG.forEach(m=>{
    this.faceParts.push(this.translationService.getTranslation('bg',m));
   })
  }

  onUpload( event: { files: File[]; }) {debugger;
    this.dataService.uploadFiles(event.files, this.translationService.translateValue('bg',this.selectedFacePart),  this.translationService.translateValue('bg',this.selectedFaceShape), this.description).
    subscribe({
      next: (data) => {
        debugger;
      },
      error: (error) => {
        debugger;
      }
    });
  }

  onFacePartChange(event: any) {debugger;
    this.dataService.getFacePartShapes(this.translationService.translateValue('bg',this.selectedFacePart)).pipe(tap(
      response => {
        this.faceShapes =  response.map((x)=>  {   debugger;       
          return this.translationService.translateValue('en',x as string);
        });
    }))
    .subscribe({
      
      next: () => {
       
        debugger;
        // Handle successful completion
      },
      error: (error) => {
        debugger;
        console.error('Error:', error);
        // Handle the error
      }
    });
    // Or you can use 'event.value' which also gives the selected value.
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

 
}


