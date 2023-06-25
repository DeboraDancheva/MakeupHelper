import { Media } from './Media';

export class MakeupProduct {
      productName: string;
      description?: string;
      brand: string;
      facePart:string;
      productType:string;
      mediaNames:string[];
      averageReview:number;
      currentImageIndex:number;
      price:number;
      hover:boolean;
      favorite:boolean = false;
  
    constructor( productName: string,brand: string, facePart: string,productType:string, mediaNames:string[], averageReview:number,price:number, favorite:boolean,description?: string) {
     debugger;
      this.productName = productName;
     
     this.brand = brand;
     this.facePart = facePart;
     this.productType = productType;
      this.mediaNames = mediaNames;
      this.averageReview = averageReview;
     if(description){
      this.description = description;
     }
     this.currentImageIndex=0;
     this.hover = false;
     this.price = price;
     this.favorite = favorite;
    }
    
    
  }
  