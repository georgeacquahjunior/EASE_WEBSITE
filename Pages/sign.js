const container = document.getElementById('container');
const overlaycon = document.getElementById('overlaycon');
const overlayBtn = document.getElementById('overlayBtn');

overlayBtn.addEventListener('click', () => {
    container.classList.toggle('right-panel-active');

    overlayBtn.addEventListener('btnScaled', () => {
        window.requestAnimationFrame(() => {
            overlayBtn.classList.add('btnScaled');
        });
    });
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhn14EKHrbFFqI0pIG8iefRny2M2SXlOs",
    authDomain: "e-commerce-22108.firebaseapp.com",
    projectId: "e-commerce-22108",
    storageBucket: "e-commerce-22108.appspot.com",
    messagingSenderId: "796429144798",
    appId: "1:796429144798:web:7896a1989d50b1f3a2e84f",
    measurementId: "G-2KEDTYW0YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign-in function
function signIn(event) {
    event.preventDefault(); // Prevent form submission
    const email = document.getElementById('email-signin').value;
    const password = document.getElementById('password-signin').value;

    console.log('Email:', email);
    console.log('Password:', password);

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('Signed in successfully:', user);
            alert('Sign in successful! Redirecting to home page...');
            setTimeout(() => {
                window.location.href = 'after_login.html'; // Redirect to after login page
            }, 2000); // Delay for 2 seconds
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing in:', errorCode, errorMessage);
            alert('Error signing in: ' + errorMessage);
        });
}

// Sign-up function
function signUp(event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById('name-signup').value;
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('password-signup').value;

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // User created
            const user = userCredential.user;
            console.log('User created successfully:', user);

            // Store user name in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email
            });

            alert('Sign up successful! Redirecting to login page...');
            setTimeout(() => {
                window.location.href = 'after_login.html'; // Redirect to after signup page
            }, 2000); // Delay for 2 seconds
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing up:', errorCode, errorMessage);
            alert('Error signing up: ' + errorMessage);
        });
}

document.getElementById('signin-button').addEventListener('click', signIn);
document.getElementById('signup-button').addEventListener('click', signUp);