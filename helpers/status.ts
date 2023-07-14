import { match } from 'ts-pattern';
import { StatusEnum } from '../enums/status';

export function getStatusText(status: StatusEnum): string {
  const text = match(status)
    .with(StatusEnum.PENDING, () => 'Order pending.')
    .with(StatusEnum.DENY, () => 'Seller denied your order.')
    .with(StatusEnum.CONFIRM, () => 'Waiting for confirmation.')
    .with(StatusEnum.MEETUP, () => 'Meetup in progress.')
    .with(StatusEnum.SUCCESS, () => 'Order successful.')
    .with(StatusEnum.CANCEL, () => 'Seller canceled the order.')
    .exhaustive();

  return text;
}

export function getStatusSellerText(status: StatusEnum) {
  const text = match(status)
    .with(StatusEnum.PENDING, () => 'Order pending.')
    .with(StatusEnum.CONFIRM, () => 'Order awaiting request confirmation.')
    .with(StatusEnum.DENY, () => 'Order is denied.')
    .with(StatusEnum.MEETUP, () => 'Order is approved.')
    .with(StatusEnum.SUCCESS, () => 'Order successful.')
    .with(StatusEnum.CANCEL, () => 'Order is cancelled.')
    .exhaustive();

  return text;
}

export function getNextStatusText(status: StatusEnum) {
  const text = match(status)
    .with(StatusEnum.PENDING, () => '')
    .with(StatusEnum.CONFIRM, () => '')
    .with(StatusEnum.DENY, () => '')
    .with(StatusEnum.MEETUP, () => 'Finalize and confirm meetup details.')
    .with(StatusEnum.SUCCESS, () => 'Enjoy.')
    .with(StatusEnum.CANCEL, () => '')
    .exhaustive();

  return text;
}

export function getNotificationSellerText(status: StatusEnum, seller: string) {
  const text = match(status)
    .with(StatusEnum.PENDING, () => 'Order pending.')
    .with(StatusEnum.CONFIRM, () => `${seller} is reading your order.`)
    .with(StatusEnum.DENY, () => `${seller} denied your order.`)
    .with(StatusEnum.MEETUP, () => `${seller} agreed to meetup.`)
    .with(StatusEnum.SUCCESS, () => `${seller} marked the order as successful.`)
    .with(StatusEnum.CANCEL, () => `${seller} cancelled the order.`)
    .exhaustive();

  return text;
}
