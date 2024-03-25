import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

export function IsVideo(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsVideo',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: VideoTypeValidation,
    });
  };
}

@ValidatorConstraint({ name: 'IsVideo', async: true })
export class VideoTypeValidation implements ValidatorConstraintInterface {
  async validate(value: string): Promise<boolean> {
    const fileType = value.split('.').pop();
    enum types {
      'mp4',
    }
    return fileType! in types;
  }

  defaultMessage() {
    return 'Provided file is not a video.';
  }
}
