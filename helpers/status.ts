import { match } from 'ts-pattern';
import { StatusEnum } from '../enums/status';

export function getStatusText(status: StatusEnum): string {
  const text = match(status)
    .with(StatusEnum.DENY, () => 'Seller denied your order.')
    .with(StatusEnum.CONFIRM, () => 'Waiting for confirmation.')
    .with(StatusEnum.MEETUP, () => 'Meetup in progress.')
    .with(StatusEnum.SUCCESS, () => 'Order successful.')
    .with(StatusEnum.CANCEL, () => 'Seller canceled the order.')
    .exhaustive();

  return text;
}

export function getStatusSellerText(status: StatusEnum, seller: string) {
  const text = match(status)
    .with(StatusEnum.CONFIRM, () => `${seller} is reading your order.`)
    .with(StatusEnum.DENY, () => `${seller} denied your order.`)
    .with(StatusEnum.MEETUP, () => `${seller} agreed to meetup.`)
    .with(StatusEnum.SUCCESS, () => `${seller} marked the order as successful.`)
    .with(StatusEnum.CANCEL, () => `${seller} cancelled the order.`)
    .exhaustive();

  return text;
}
