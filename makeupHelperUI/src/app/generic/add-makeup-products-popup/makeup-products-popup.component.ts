import { Component, OnInit , Inject} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { DataService } from 'src/app/services/data-service';
import { MakeupProduct } from 'src/app/models/MakeupProduct';
import { tap } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/DialogData';
import { InputNumberModule } from 'primeng/inputnumber';
import { TranslationService } from 'src/app/services/translation.service';
import { Constants } from 'src/app/Constants';

@Component({
  selector: 'app-makeup-products-popup',
  templateUrl: './makeup-products-popup.component.html',
  styleUrls: ['./makeup-products-popup.component.css']
})
export class AddMakeupProductsPopupComponent implements OnInit {
  productTypes: String[] = [];
  faceParts: string[] = [];
  product: MakeupProduct = {
    productName: '',
    brand: '',
    facePart: '',
    productType: '',
    mediaNames: [],
    averageReview: 0,
    currentImageIndex: 0,
    price: 0,
    hover: false,
    favorite: false
  };
  selectedProductType:string = '';
  selectedFacePart:string = '';
  productName:string = '';
  description: string = '';
  files:File[] = [];
  brand: string = '';

  constructor(private dataService:DataService,private translationService:TranslationService
  ) {

  }
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

      this.dataService.getProductTypes().pipe(tap(
        response => {this.productTypes = response.map((x)=>  {   debugger;       
          return this.translationService.translateValue('en',x as string);
        });
      }))
      .subscribe({
        next: () => {
        },
        error: (error) => {
        }
      });
   }


  onUpload( event: { files: File[]; }) {debugger;
    this.product.facePart = this.translationService.translateValue('bg',this.product.facePart);
    this.product.productType = this.translationService.translateValue('bg',this.product.productType);
    this.dataService.addMakeupProduct(this.product,event.files).pipe(tap(
      response => {  debugger;
    }))
    .subscribe({
      next: () => {
      },
      error: (error) => {
      }
    });
    
    
  }


}
