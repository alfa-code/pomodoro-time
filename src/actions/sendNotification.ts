export default function sendNotification(titleName: any, tagName: any, textName: any, iconSrc: any) {
  new Notification(titleName, {
    tag: tagName,
    icon: iconSrc,
    body: textName,
  });
  console.info('%cSend Notification...', 'color: green;');
}
