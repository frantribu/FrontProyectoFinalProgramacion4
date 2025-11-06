import { UserFormComponentComponent } from './Pages/User/user-form/user-form-component.component';
import { Routes } from '@angular/router';
import { UserPageComponent } from './Pages/User/user-page/user-page.component';
import { ModifyUserComponent } from './Pages/User/modify-user/modify-user.component';

export const routes: Routes = [
    {
        path: 'form', component: UserFormComponentComponent
    },
    {
        path: 'userpage', component: UserPageComponent
    },
    {
        path: 'userpage/modify/:id', component: ModifyUserComponent
    }
    
];
