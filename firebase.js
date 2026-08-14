rules_version = '2';

service cloud.firestore {

    match /databases/{database}/documents {


        /* USERS */

        match /users/{userId} {

            allow read:
                if request.auth != null;

            allow create:
                if request.auth != null
                && request.auth.uid == userId;

            allow update:
                if request.auth != null
                && request.auth.uid == userId;

            allow delete:
                if request.auth != null
                && request.auth.uid == userId;
        }


        /* POSTS */

        match /posts/{postId} {

            allow read:
                if request.auth != null;

            allow create:
                if request.auth != null
                && request.resource.data.authorId
                   == request.auth.uid;

            allow update:
                if request.auth != null;

            allow delete:
                if request.auth != null
                && resource.data.authorId
                   == request.auth.uid;
        }


        /* PRIVATE CHAT */

        match /chats/{chatId} {

            allow read, write:
                if request.auth != null
                && request.auth.uid
                   in resource.data.participants;


            match /messages/{messageId} {

                allow read:
                    if request.auth != null
                    && request.auth.uid
                       in get(
                            /databases/$(database)
                            /documents/chats/$(chatId)
                       ).data.participants;


                allow create:
                    if request.auth != null
                    && request.auth.uid
                       == request.resource.data.senderId
                    && request.auth.uid
                       in get(
                            /databases/$(database)
                            /documents/chats/$(chatId)
                       ).data.participants;


                allow update, delete:
                    if false;
            }
        }
    }
              }
