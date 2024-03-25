import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

export function IsPhoto(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsPhoto',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: PhotoTypeValidation,
    });
  };
}

@ValidatorConstraint({ name: 'IsPhoto', async: true })
export class PhotoTypeValidation implements ValidatorConstraintInterface {
  async validate(value: string): Promise<boolean> {
    const fileType = value.split('.').pop();
    enum types {
      'jpg',
      'png',
      'jpeg',
    }
    return fileType! in types;
  }

  defaultMessage() {
    return 'Provided file is not a photo.';
  }
}
