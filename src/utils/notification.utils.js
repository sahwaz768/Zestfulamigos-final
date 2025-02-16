export const NotificationModules = {};

export function getNotificationButton(notification) {
  const module = notification.moduleotherDetails;
  if (!module) return null;
  const innerModule = module.module;
  switch (innerModule) {
    case 'rating':
      return {
        buttoncontent: 'Rate your booking',
        route: `./rate?bookingId=${module.id}`
      };

    default:
      return null;
  }
}
