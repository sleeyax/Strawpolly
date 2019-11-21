import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';

export default function EmailValidator(control: AbstractControl): ValidationErrors {
  if (!control.value)
    return null;

  return Validators.email(control);
}
