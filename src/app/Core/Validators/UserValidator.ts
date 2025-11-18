// validators/user-validators.ts
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UserServiceService } from '../Services/UserService/user-service.service';

export function emailExistsValidator(userService: UserServiceService, currentId?: string): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return userService.getUsers().pipe(
      map(users => {
        const exists = users.some(user => user.email === control.value && user.id != currentId);
        return exists ? { emailExists: true } : null;
      })
    );
  };
}

export function dniExistsValidator(userService: UserServiceService, currentId?: string): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return userService.getUsers().pipe(
      map(users => {
        const exists = users.some(user => user.dni === control.value && user.id != currentId);
        return exists ? { dniExists: true } : null;
      })
    );
  };
}