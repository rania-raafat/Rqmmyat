import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { Projects } from './pages/projects/projects';
import { Contact } from './pages/contact/contact';
import { NotFound } from './pages/not-found/not-found';
import { Login } from './pages/admin/login/login';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { AdminClients } from './pages/admin/dashboard/admin-clients/admin-clients';
import { AdminContacts } from './pages/admin/dashboard/admin-contacts/admin-contacts';
import { AdminProjects } from './pages/admin/dashboard/admin-projects/admin-projects';
import { AdminServices } from './pages/admin/dashboard/admin-services/admin-services';
import { AdminTeam } from './pages/admin/dashboard/admin-team/admin-team';
import { DashboardHome } from './pages/admin/dashboard/dashboard-home/dashboard-home';
import { AddService } from './pages/admin/dashboard/admin-services/add-service/add-service';
import { EditService } from './pages/admin/dashboard/admin-services/edit-service/edit-service';
import { AddProject } from './pages/admin/dashboard/admin-projects/add-project/add-project';
import { EditProject } from './pages/admin/dashboard/admin-projects/edit-project/edit-project';
import { AddTeam } from './pages/admin/dashboard/admin-team/add-team/add-team';
import { EditTeam } from './pages/admin/dashboard/admin-team/edit-team/edit-team';
import { AddClient } from './pages/admin/dashboard/admin-clients/add-client/add-client';
import { EditClient } from './pages/admin/dashboard/admin-clients/edit-client/edit-client';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'about', component: About },

  { path: 'services', component: Services },

  { path: 'projects', component: Projects },

  { path: 'contact', component: Contact },

  { path: 'admin', component: Login },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardHome,
      },

      {
        path: 'services',
        component: AdminServices,
      },

      {
        path: 'projects',
        component: AdminProjects,
      },

      {
        path: 'team',
        component: AdminTeam,
      },

      {
        path: 'clients',
        component: AdminClients,
      },

      {
        path: 'contacts',
        component: AdminContacts,
      },
      {
        path: 'services/add',
        component: AddService,
      },

      {
        path: 'services/edit/:id',
        component: EditService,
      },
      {
        path: 'projects/add',
        component: AddProject,
      },
      {
        path: 'projects/edit/:id',
        component: EditProject,
      },
      {
        path: 'team/add',
        component: AddTeam,
      },
      {
        path: 'team/edit/:id',
        component: EditTeam,
      },
      {
        path: 'clients/add',
        component: AddClient,
      },
      {
        path: 'clients/edit/:id',
        component: EditClient,
      },
    ],
  },

  { path: '**', component: NotFound }
];
