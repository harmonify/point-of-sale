import { Prisma } from '@prisma/client';

const notificationQueryField = {} satisfies Record<
  string,
  () => Prisma.NotificationSelectScalar
>;

const notificationQueryFilter = {
  search: (term: string) =>
    ({
      OR: [
        { name: { contains: term } },
        { description: { contains: term } },
        { url: { contains: term } },
      ],
    }) satisfies Prisma.NotificationWhereInput,
  byId: (id: string) => ({ id }) satisfies Prisma.NotificationWhereInput,
} satisfies Record<string, (...args: any) => Prisma.NotificationWhereInput>;

export class NotificationQuery {
  static readonly Field = notificationQueryField;
  static readonly Filter = notificationQueryFilter;
}
