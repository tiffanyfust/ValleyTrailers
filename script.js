
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebase.storage();
const dbRef = db.collection('trailers');
const storageRef = storage.ref();
const imagesRef = storageRef.child('hideout');

// console.log(dbRef.get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data().sleeps);
//     });
// }))

const trailers = document.querySelectorAll('.trailer');


trailers.forEach((trailer) => {
    trailer.addEventListener('click', () => {
        const trailerId = trailer.id;
    })
})

// Now we get the references of these images
imagesRef.listAll().then(function(result) {
    
    result.items.forEach(function(imageRef) {
      // And finally display them
    displayImage(imageRef);
    });
}).catch(function(error) {
    // Handle any errors
})


function displayImage(imageRef) {
    imageRef.getDownloadURL().then(function(url) {
        const test = url;

        const imgContainer = document.querySelector('.trailerImages');
        const newLi = document.createElement('li');
        const img = document.createElement('img');
        img.src = test;

        // adds a mainImage class to the main Image
        if (imageRef._delegate._location.path_ === 'hideout/main.jpg') {
            newLi.classList.add('mainImage')
        } else {
            newLi.classList.add('smallImage')
        }

        newLi.append(img);
        imgContainer.append(newLi);
    }).then (function() {
        const smallImages = document.querySelectorAll('.smallImage');
        const main = document.querySelector('.mainImage');
        main.addEventListener('click', () => changeMain(main));
        smallImages.forEach((image) => {
            image.addEventListener('click', () => changeMain(image))
        })
    }).catch(function(error) {
      // Handle any errors
    });
}

const changeMain = (image) => {
    const mainImage = document.querySelector('.mainImage')
    mainImage.classList.add('smallImage');
    mainImage.classList.remove('mainImage');
    image.classList.add('mainImage');
    image.classList.remove('smallImage');
}



// storageRef.child('hideout/main.jpg').getDownloadURL().then(function(url) {
//     const test = url;
//     document.querySelector('.imgTest').src = test;

// }).catch(function(error) {

// });

// const test = 'firebase_url';

// document.querySelector('.imgTest').src = test;
