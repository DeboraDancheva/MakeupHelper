import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MakeupProduct } from 'src/app/models/MakeupProduct';
import { DataService } from 'src/app/services/data-service';
import { TranslationByValuePipe } from 'src/app/helpers/TranslationByValuePipe';

@Component({
  selector: 'app-signle-makeup-product-popup',
  templateUrl: './signle-makeup-product-popup.component.html',
  styleUrls: ['./signle-makeup-product-popup.component.css']
})
export class SignleMakeupProductPopupComponent implements OnInit {
  product!:MakeupProduct;
  userRating:number =0;
  newComment: string = '';
  isCommentAdded=false;
  comments: any[] = [
    { username: 'User1', comment: '"Чудесен продукт!"', rating: 4 },
    { username: 'User2', comment: 'Обожавам го!', rating: 5 },
    // Add more comments as needed
  ];
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private dataService:DataService){
   
  }

  ngOnInit(): void {debugger;
    this.product = this.data.product;

    this.loadCommentsForCurrentProduct();
  }

  changeImage(offset: number) {    debugger; 
    this.product.currentImageIndex = this.product.currentImageIndex + offset;
  }


  addComment() {debugger;
    this.isCommentAdded = true;
    if (this.newComment.trim() !== '') {
      const comment = { comment: this.newComment, rating: this.userRating,product: this.product };
      this.dataService.addCommentForCurrentUser(comment).pipe().subscribe({
        next: () =>{
          debugger;
        },
        error: (error) => {
          debugger;
        }
      });
    }
  }

  loadCommentsForCurrentProduct() {
    this.dataService.loadCommentsForCurrentUser(this.product.productName).pipe().subscribe(
      {
        next: () =>{
          debugger;
        },
        error: (error) => {
          debugger;
        }
      }
    );
  }
}


