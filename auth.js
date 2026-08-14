import {
    auth,
    db
} from "../firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


/* ================= REGISTER ================= */

window.registerUser = async function(){

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const message =
        document.getElementById("message");


    if(!name || !email || !password){

        message.innerText =
            "সব তথ্য পূরণ করুন।";

        return;
    }


    if(password.length < 6){

        message.innerText =
            "Password কমপক্ষে ৬ অক্ষরের হতে হবে।";

        return;
    }


    if(password !== confirmPassword){

        message.innerText =
            "Password মিলছে না।";

        return;
    }


    try{

        const result =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            result.user;


        await setDoc(
            doc(db,"users",user.uid),
            {

                uid:user.uid,

                name:name,

                email:user.email,

                photoURL:"",

                bio:"",

                createdAt:
                    serverTimestamp()

            }
        );


        message.innerText =
            "Account তৈরি হয়েছে।";


        setTimeout(() => {

            window.location.href =
                "index.html";

        },1000);


    }catch(error){

        console.error(error);

        message.innerText =
            firebaseError(error.code);

    }

};


/* ================= LOGIN ================= */

window.loginUser = async function(){

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("message");


    if(!email || !password){

        message.innerText =
            "Email এবং Password দিন।";

        return;
    }


    try{

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        message.innerText =
            "Login successful.";


        setTimeout(() => {

            window.location.href =
                "index.html";

        },500);


    }catch(error){

        console.error(error);

        message.innerText =
            firebaseError(error.code);

    }

};


/* ================= LOGOUT ================= */

window.logoutUser = async function(){

    try{

        await signOut(auth);

        window.location.href =
            "login.html";

    }catch(error){

        console.error(error);

    }

};


/* ================= LOGIN PROTECTION ================= */

window.protectPage = function(){

    onAuthStateChanged(
        auth,
        user => {

            if(!user){

                window.location.href =
                    "login.html";

            }

        }
    );

};


/* ================= FIREBASE ERRORS ================= */

function firebaseError(code){

    switch(code){

        case "auth/email-already-in-use":
            return "এই Email দিয়ে ইতিমধ্যে account আছে।";

        case "auth/invalid-email":
            return "Email সঠিক নয়।";

        case "auth/weak-password":
            return "Password আরও শক্ত করুন।";

        case "auth/invalid-credential":
            return "Email অথবা Password ভুল।";

        case "auth/user-not-found":
            return "এই account পাওয়া যায়নি।";

        default:
            return "কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।";

    }

}
