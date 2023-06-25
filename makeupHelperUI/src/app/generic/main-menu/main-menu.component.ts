import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { PopupSliderComponent } from '../popup-slider/popup-slider.component';
import { UploadFilePopupComponent } from 'src/app/admin/upload-file-popup/upload-file-popup.component';
import { AddMakeupProductsPopupComponent } from '../add-makeup-products-popup/makeup-products-popup.component';



@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  @Input() items: MenuItem[] = [];
  @Input() facePart: string = '';
  adminMenus:MenuItem[] = [];


  constructor(private authService:AuthenticationService,public activatedRoute: ActivatedRoute, public dialog:MatDialog,
    private router: Router,public makeupMediDialog: MatDialog, public makeupProductDialog:MatDialog){}
 
  ngOnInit(): void {
  
    const extrasForFavorites: NavigationExtras = {
      skipLocationChange: true,
      state: { favoriteView:'true' }
    };
    if(!this.authService.isCurrentUserAdmin()){
      this.items = [   
        {
          label: 'Грим продукти',
          icon: 'pi pi-fw pi-eye',
          command: (event: any) => {
            this.router.navigateByUrl('makeupProducts'); 
          }
        },
        {
          label: 'Редактирай лицеви конфигурации',
          icon: 'pi pi-fw pi-eye',
          command: (event: any) => {
           this.openSliderDialog();
          }
        },
        {
          label: 'Гледай по-късно',
          icon: 'pi pi-fw pi-eye',
          command: (event: any) => {
            this.router.navigateByUrl('favoriteMakeupData', {state:{ favoriteView:'true' }}); 
          }
        },
        {
          label: 'Любими грим продукти',
          icon: 'pi pi-fw pi-eye',
          command: (event: any) => {
            this.router.navigate(['favoriteMakeupProducts'], { state:{ favoriteView:'true' } });
          }
        },     
      ]; 

      if(this.facePart != '') {
        this.items.push( {
          label: 'Грим продукти за ' + this.facePart ,
          icon: 'pi pi-fw pi-eye',
          command: (event: any) => {
            this.router.navigateByUrl('makeupProducts', { state: { facePart:this.facePart } }); 
          }
        });
      }
      if(this.router.url !== '/selectFacePart'){
        this.items.push( {
          label: 'Смени избрана лицева форма',
          icon: 'pi pi-fw pi-eye',
          command: (event: any) => {
            this.router.navigate(['selectFacePart']);
          }
        });
      }
  
    } else{
   
    this.items = [   
      {
        label: 'Добави грим продукт',
        icon: 'pi pi-fw pi-eye',
        command: (event: any) => {
          this.openMakeupProductDialog();
        }
      },
      {
        label: 'Добави файл',
        icon: 'pi pi-fw pi-eye',
        command: (event: any) => {
          this.openMakeupMediaDialog();
        }
      },
    ];
  }
  }
  
  openSliderDialog(): void {
    const dialogRef = this.dialog.open(PopupSliderComponent, {
      height: '30rem',
      width: '60rem',
    });}

    openMakeupMediaDialog(): void {
      const dialogRef = this.makeupMediDialog.open(UploadFilePopupComponent, {
        height: '35rem',
        width: '60rem',
      });
    }
  
    openMakeupProductDialog(): void {
      const dialogRef = this.makeupProductDialog.open(AddMakeupProductsPopupComponent, {
        height: '45rem',
        width: '60rem',
      });
    }


  
  signOut() {
    this.authService.logout();
  }
}
