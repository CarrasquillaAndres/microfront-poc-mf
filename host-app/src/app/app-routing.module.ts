import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4300/remoteEntry.js',
        // remoteName: 'micro-frontend',
        type: 'module',
        exposedModule: './UserModule'
      }).then(m => {
        console.log('Remote module loaded:', m);
        return m.UserModule;
      }).catch(err => {
        console.error('Error loading remote module:', err);
      })
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
