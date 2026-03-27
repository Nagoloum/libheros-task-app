import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';

import { 
  LogIn, 
  UserPlus, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  CheckCircle, 
  List, 
  Calendar, 
  LogOut,
  AlertTriangle 
} from 'lucide-angular';

import { routes } from './app.routes';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),

    // Configuration correcte de Lucide Icons pour Angular standalone
    importProvidersFrom(
      LucideAngularModule.pick({
        LogIn, 
        UserPlus, 
        Eye, 
        EyeOff, 
        Plus, 
        Trash2, 
        CheckCircle, 
        List, 
        Calendar, 
        LogOut,
        AlertTriangle
      })
    )
  ]
};