import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { UploadFilePopupComponent } from '../upload-file-popup/upload-file-popup.component';
import { MakeupProductsComponent } from 'src/app/generic/makeup-products/makeup-products.component';
import { AddMakeupProductsPopupComponent } from 'src/app/generic/add-makeup-products-popup/makeup-products-popup.component';
import { TabViewModule } from 'primeng/tabview';
import { DataService } from 'src/app/services/data-service';
import { Constants } from 'src/app/Constants';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent {

  items: MenuItem[] = [];
  genericTableData:any[] = [];
  genericTableColumns :string[] = [];

  users: any[] = [];
  media: any[] = [];
  products: any[] = [];
  usersColumns: string[] = Constants.userColumns;
  mediaColumns: string[] = Constants.mediaColumns;
  productsColumns: string[] = Constants.productColumns;

  constructor(public makeupMediDialog: MatDialog, public makeupProductDialog:MatDialog, private dataService:DataService) { }

  ngOnInit() {
    this.initializeMenu();
    this.getUsers();
    
  
  }

  openMakeupMediaDialog(): void {
    const dialogRef = this.makeupMediDialog.open(UploadFilePopupComponent, {
      height: '30rem',
      width: '60rem',
    });
  }

  openMakeupProductDialog(): void {
    const dialogRef = this.makeupProductDialog.open(AddMakeupProductsPopupComponent, {
      height: '30rem',
      width: '60rem',
    });
  }

  initializeMenu() {
    this.items = [
      {
        label: 'Upload',
        icon: 'pi pi-fw pi-file',
        items: [
          
              {
                label: 'Makeup media',
                icon: 'pi pi-fw pi-video',
                command: (event: any) => {
                  this.openMakeupMediaDialog(); // Add your functionality here
                }
              },
              {
                label: 'Makeup product',
                icon: 'pi pi-fw pi-video',
                command: (event: any) => {
                  this.openMakeupProductDialog(); // Add your functionality here
                }
              },                     
        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus'
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus'
          }
        ]
      }      
    ];
  }

  getUsers(){
    this.dataService.getUsers().subscribe(
      {
        next : (data) => {debugger;
          this.users = data as any[];
          this.getMedia();
          this.getProducts()
        },
        error : (error) => {debugger;

        }
      }
    )
  }

  getMedia(){
    this.dataService.getMedia().subscribe(
      {
        next : (data) => {debugger;
          this.media = data as any[];
        },
        error : (error) => {debugger;

        }
      }
    )
  }

  getProducts(){
    this.dataService.getMakeupProducts().subscribe(
      {
        next : (data) => {debugger;
          this.products = data as any[];
        },
        error : (error) => {debugger;

        }
      }
    )
  }
}
