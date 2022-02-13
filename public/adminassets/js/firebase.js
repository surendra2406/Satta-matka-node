var base_url = $("#base_url").val();
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEnbrdgbNeeMzQNPRgRe9zqt3nidHkH4k",
  authDomain: "volansoftpanel.firebaseapp.com",
  projectId: "volansoftpanel",
  storageBucket: "volansoftpanel.appspot.com",
  messagingSenderId: "754631736373",
  appId: "1:754631736373:web:6911ecb8b56afc333d057c",
  measurementId: "G-5VTR4FWVZV"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/**
 * We can start messaging using messaging() service with firebase object
 */
var messaging = firebase.messaging();

/** Register your service worker here
 *  It starts listening to incoming push notifications from here
 */
navigator.serviceWorker.register(base_url+'adminassets/js/firebase-messaging-sw.js')
.then(function (registration) {
    /** Since we are using our own service worker ie firebase-messaging-sw.js file */
    messaging.useServiceWorker(registration);

    /** Lets request user whether we need to send the notifications or not */
    messaging.requestPermission()
        .then(function () {
            /** Standard function to get the token */
            messaging.getToken()
            .then(function(token) {
                /** Here I am logging to my console. This token I will use for testing with PHP Notification */
                console.log(token);
                /** SAVE TOKEN::From here you need to store the TOKEN by AJAX request to your server */
				
				$.ajax({
					type: "POST",
					url: base_url + "save-fcm-token",
					data: {token:token},
					dataType: "json",
					success: function (data) {
						
					}
				});
            })
            .catch(function(error) {
                /** If some error happens while fetching the token then handle here */
                updateUIForPushPermissionRequired();
                console.log('Error while fetching the token ' + error);
            });
        })
        .catch(function (error) {
            /** If user denies then handle something here */
            console.log('Permission denied ' + error);
        })
})
.catch(function () {
    console.log('Error in registering service worker');
});

/** What we need to do when the existing token refreshes for a user */
messaging.onTokenRefresh(function() {
    messaging.getToken()
    .then(function(renewedToken) {
        console.log(renewedToken);
        /** UPDATE TOKEN::From here you need to store the TOKEN by AJAX request to your server */
    })
    .catch(function(error) {
        /** If some error happens while fetching the token then handle here */
        console.log('Error in fetching refreshed token ' + error);
    });
});

// Handle incoming messages
messaging.onMessage(function(payload) {
    const notificationTitle = 'Data Message Title';
    const notificationOptions = {
        body: 'Data Message body',
        icon: 'https://c.disquscdn.com/uploads/users/34896/2802/avatar92.jpg',
        image: 'https://c.disquscdn.com/uploads/users/34896/2802/avatar92.jpg'
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});