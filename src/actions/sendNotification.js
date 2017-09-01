export default function sendNotification(titleName, tagName, textName, iconSrc) {
  var notification = new Notification(titleName, {
    tag : tagName,
    icon: iconSrc,
    body: textName
  });
  console.info('%cSend Notification...', 'color: green;')
}