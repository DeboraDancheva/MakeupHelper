import { Component } from '@angular/core';
import { MegaMenuItem } from 'primeng/api/megamenuitem';
import { MegaMenuModule } from 'primeng/megamenu';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {
  items: MegaMenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-users',
      },
      {
        label: 'Products',
        icon: 'pi pi-fw pi-calendar',
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        items: [
          [
            {
              label: 'Setting 1',
              items: [{ label: 'Setting 1.1' }, { label: 'Setting 1.2' }]
            },
            {
              label: 'Setting 2',
              items: [{ label: 'Setting 2.1' }, { label: 'Setting 2.2' }]
            },
            {
              label: 'Setting 3',
              items: [{ label: 'Setting 3.1' }, { label: 'Setting 3.2' }]
            }
          ],
        ]
      }
    ];
  }
}
