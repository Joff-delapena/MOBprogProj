import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function(notification) {
    console.log("NOTIFICATION:", notification);
  },
    onRegister: function(token) {
    console.log("TOKEN:", token);
  },

  requestPermissions: Platform.OS === 'ios',
});
