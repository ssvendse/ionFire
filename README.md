# ionFire - Ionic 4 and Firebase Sample App

Firebase security rules:
```
service cloud.firestore {
  match /databases/{database}/documents {
  	function isSignedIn() {
    	return request.auth != null;
    }
    
    match /{document=**} {
      allow read: if isSignedIn();
    }
    
    match /users/{uid} {
    	allow write: if request.auth.uid == uid
    }
    
    match /todos/{todoId} {
    	allow create: if request.auth.uid == request.resource.data.uid
      allow update, delete: if request.auth.uid == resource.data.uid
    }
    
    match /discounts/{discountId} {
      allow create: if isSignedIn();
      allow update, delete: if isSignedIn();
    }
  }
}
```
