import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { MakeupProduct } from 'src/app/models/MakeupProduct';
import { DataService } from 'src/app/services/data-service';
import { RatingModule } from 'primeng/rating';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { AddMakeupProductsPopupComponent } from '../add-makeup-products-popup/makeup-products-popup.component';
import { SignleMakeupProductPopupComponent } from '../signle-makeup-product-popup/signle-makeup-product-popup.component';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-makeup-products',
  templateUrl: './makeup-products.component.html',
  styleUrls: ['./makeup-products.component.css']
})
export class MakeupProductsComponent implements OnInit{
   facePart:string = '';
   makeupProducts:MakeupProduct[] = [];
   filteredMakeupProducts:MakeupProduct[] = [];
   currentImageIndex: number = 0;
   responsiveOptions: any[] = [];
   selectedPrice:number=50;
  favoriteView: boolean = false;   

  constructor(public activatedRoute: ActivatedRoute, private dataService:DataService, private primengConfig: PrimeNGConfig,public dialogRef: MatDialog){}

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .pipe(tap()).subscribe({      
      next: (data) => { 
        if(window.history.state.facePart){
          this.facePart = window.history.state.facePart;
        } else if(window.history.state.favoriteView){
            this.favoriteView = Boolean(window.history.state.favoriteView);
        }
      }
      });
      if(this.facePart!==''){
        this.getAllProductsByFacePart(this.facePart);
      } else if(this.favoriteView){
        this.getFavoritesProducts();
      } else {
        this.getAllProducts();
      }

  }
  getFavoritesProducts() {
    this.dataService.getFavoriteProducts().subscribe({
      next: (data) => {
        this.initializeProducts(data as any[]);
      },
      error: (error) => {
      }}
    )
  }

  getAllProductsByFacePart(facePart:string){
    this.dataService.getMakeupProductsByFacePart(facePart).subscribe({
      next: (data) => {
        this.initializeProducts(data as any[]);
      },
      error: (error) => {
      }}
    )
  }

  getAllProducts(){
    this.dataService.getMakeupProducts().subscribe({
      next: (data) => {
        this.initializeProducts(data as any[]);
      },
      error: (error) => {
      }}
    )
  } 

  changeImage(offset: number, product:MakeupProduct) {
    product.currentImageIndex = product.currentImageIndex? + offset:offset;
  }

  initializeSliderConfig() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.primengConfig.ripple = true;
  }
  
  initializeProducts(data: any[]) {
   data.forEach((el) => {
    let pr = new MakeupProduct(el.productName, el.brand,el.facePart,el.productType,el.mediaNames,el.averageReview,el.price,el.favorite,el.description,);
    this.makeupProducts.push(pr);
    this.filteredMakeupProducts.push(pr);
  });
  }

  openPopup(product:MakeupProduct){
    const dialogRef = this.dialogRef.open(SignleMakeupProductPopupComponent, {
      height: '40rem',
      width: '50rem',
      data: {'product': product}
    });
  }

  filterResults(text: string) {
    let filterText = text.toLocaleLowerCase();
    if (text) {
     this.filteredMakeupProducts = this.makeupProducts.filter((product) => {
      const productNameMatch = product.productName.toLowerCase().includes(filterText);
      const brandMatch = product.brand.toLowerCase().includes(filterText);
      const productTypeMatch = product.productType.toLowerCase().includes(filterText);
  
      return productNameMatch || brandMatch || productTypeMatch;
    });
    }  
  }

  clearFilters() {
    this.filteredMakeupProducts = this.makeupProducts;
  }

  handleSliderChange(){
    if(this.selectedPrice>0){
       this.filteredMakeupProducts = this.makeupProducts.filter((product) => {
        const productPriceMatch = product.price<=this.selectedPrice;
    
        return productPriceMatch;
      });
    }
  }

  toggleFavorite(product:MakeupProduct,event: Event) {debugger;
    event.stopPropagation();
    if(product.favorite){
      const newArray = this.filteredMakeupProducts.filter(obj => obj.productName !== product.productName);
      this.filteredMakeupProducts = newArray;
    }
    product.favorite = !product.favorite;
    this.dataService.changeProductFavouriteState(product.productName, product.favorite).pipe().subscribe(
      {
        next : () => {
        },
        error : (error) => {
        }
      }
    );
  }
}
 

