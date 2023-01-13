import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const MatchRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const cpassword = control.get('cpassword');
  
    return password && cpassword && password.value === cpassword.value ? null : { 'match': true } ;
  };