import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { inject } from '@angular/core';
import { RoutesApp } from 'src/enums/routes.enum';
/**
 * 
Este guardián se utiliza para proteger las rutas de la aplicación, permitiendo el acceso solo a usuarios autenticados. Su función es asegurarse de que el usuario esté autenticado antes de permitir el acceso a determinadas rutas.

Inyección de Dependencias: Se inyectan instancias del servicio de inicio de sesión (LoginService) y del enrutador (Router) para su uso dentro del guardián.

Verificación de Autenticación: Se llama al método isLoggedIn() del servicio de inicio de sesión para verificar si el usuario está autenticado. Si el usuario no está autenticado (isLoggedIn es false), significa que el usuario no tiene permiso para acceder a la ruta protegida.

Redirección a la Página de Inicio de Sesión: En caso de que el usuario no esté autenticado, se redirige al usuario a la página de inicio de sesión utilizando el enrutador y la ruta definida en RoutesApp.LOGIN.

Permisos de Acceso: El guardián devuelve true, lo que indica que el acceso a la ruta protegida está permitido si el usuario está autenticado. Si el usuario no está autenticado y se redirige a la página de inicio de sesión, el guardián evita que se acceda a la ruta protegida.
 */
export const sessionGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const isLoggedIn = loginService.isLoggedIn();
  if (!isLoggedIn) router.navigate([RoutesApp.LOGIN]);

  return true;
};
