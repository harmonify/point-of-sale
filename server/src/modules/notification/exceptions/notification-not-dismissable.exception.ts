import { BadRequestException } from '@nestjs/common';

export class NotificationNotDismissableException extends BadRequestException {
  static readonly error = 'NOTIFICATION_NOT_DISMISSABLE';
  static readonly message = 'The notification is not dismissable.';

  constructor() {
    super({
      error: NotificationNotDismissableException.error,
      message: NotificationNotDismissableException.message,
    });
  }
}
