import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../models/BaseUrl';
import { MakeupProduct } from '../models/MakeupProduct';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 

 
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProductTypes() {
    return this.http.get<String[]>(this.baseUrl + `/api/makeup/products/types`);
  }
  
  // addMakeupProductMedia(files: File[], product:MakeupProduct) {
  //   const formData = new FormData();
  //   // Append the file
  //   for (let i = 0; i < files.length; i++) {
  //     formData.append('files', files[i]);
  //   }

  //   formData.append('product', JSON.stringify(product));

  //   // Send the request
  //   return this.http.post(this.baseUrl + `/api/makeup/products/${product.productName}`, formData);
  // }
  addCommentForCurrentUser(comment:{}) {

    return this.http.post(this.baseUrl + `/api/makeup/comments`, comment);
  }

  loadCommentsForCurrentUser(productName: string) {
    return this.http.get(this.baseUrl + `/api/makeup/comments/by-product/${productName}`);
  }

  addMakeupProduct(product:MakeupProduct, files:File[]) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    let productNew = new MakeupProduct(product.productName,product.brand, product.facePart, product.productType,product.mediaNames, product.averageReview, product.price, product.favorite, product.description);
    debugger;
    formData.append('product', JSON.stringify(productNew));

    return this.http.post(this.baseUrl + `/api/makeup/products/add/product`, formData);
  }

  getMakeupProductsByFacePart(facePart:string){debugger;
  return this.http.get(this.baseUrl + `/api/makeup/products/${facePart}`);
  }

  changeProductFavouriteState(productName: string, favorite: boolean) {debugger;
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('favorite', String(favorite));
    return this.http.post(this.baseUrl + `/api/makeup/products/change/favorite`, formData);
  }

  getMakeupProducts() {debugger;
    return this.http.get(this.baseUrl + `/api/makeup/products/`);
  }

  getFavoriteProducts() {
    return this.http.get(this.baseUrl + `/api/makeup/products/favorites`);
  }

  changeMediaFavouriteState(mediaName: string, favorite: boolean) {debugger;
    const formData = new FormData();
    formData.append('mediaName', mediaName);
    formData.append('favorite', String(favorite));
    return this.http.post(this.baseUrl + `/api/media/change/favorite`, formData);
  }

  getFavoriteMakeupData() {
    return this.http.get(this.baseUrl + `/api/media/favorites`);
  }

  getFacePartShapes(facePart: String) {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
    debugger;
    return this.http.get<String[]>(this.baseUrl + `/api/faceParts/facePartShapes/${facePart}`, {headers});
  }

  uploadFiles(files:File[], facePart:string, faceShape:string, description:string) {
    const formData: FormData = new FormData();
    debugger;
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }

   return this.http.post(this.baseUrl + `/api/media/upload/${facePart}/${faceShape}/${description}`, formData)
  }

  getMakeupDataForFacePart(facePart: string) {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
    debugger;
    return this.http.get(this.baseUrl + `/api/media/data/${facePart}`, {headers});
  }

  getUsers() {
    return this.http.get(this.baseUrl + `/api/users`);
  }

  getMedia() {
   return this.http.get(this.baseUrl + `/api/media/`);
  }

}
