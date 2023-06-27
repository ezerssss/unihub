import { match } from 'ts-pattern';
import { StatusEnum } from '../enums/status';

export function getStatusText(status: StatusEnum): string {
  const text = match(status)
    .with(StatusEnum.DENY, () => 'Seller denied your order.')
    .with(StatusEnum.CONFIRM, () => 'Waiting for confirmation.')
    .with(StatusEnum.MEETUP, () => 'Meetup in progress.')
    .with(StatusEnum.SUCCESS, () => 'Order successful.')
    .exhaustive();

  return text;
}

export function getStatusColor(status: StatusEnum): string {
  const textColor = match(status)
    .with(StatusEnum.DENY, () => 'text-red-600')
    .with(StatusEnum.CONFIRM, () => 'text-gray-400')
    .with(StatusEnum.MEETUP, () => 'text-yellow-500')
    .with(StatusEnum.SUCCESS, () => 'text-green-600')
    .exhaustive();

  return textColor;
}

export function getStatusSellerText(status: StatusEnum, seller: string) {
  const text = match(status)
    .with(StatusEnum.CONFIRM, () => `${seller} is reading your order.`)
    .with(StatusEnum.DENY, () => `${seller} denied your order.`)
    .with(StatusEnum.MEETUP, () => `${seller} agreed to meetup.`)
    .with(StatusEnum.SUCCESS, () => `${seller} marked the order as successful.`)
    .exhaustive();

  return text;
}
