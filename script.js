
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebase.storage();
const dbRef = db.collection('trailers');
const storageRef = storage.ref();
const imagesRef = storageRef.child('hideout');

// dbRef.get().then((querySnapshot) => {
//     console.log(querySnapshot)
//     querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data().Amenities);
//     });
// })

const trailers = document.querySelectorAll('.trailer');

trailers.forEach((trailer) => {
    trailer.addEventListener('click', () => {
        const trailerId = trailer.id;
        displayData(trailerId)
    })
})

const displayData = (trailerId) => {
    window.addEventListener("load", function() {

        dbRef.doc(trailerId).get().then((doc) => {
            const amenities = doc.data().Amenities;
            const list = document.querySelector('.amenitiesList')
            for (let i = 0; i < amenities.length; i++) {
                const li = document.createElement('li');
                li.innerText = amenities[i];
                list.append(li);
            }

            const detailsList = document.querySelector('.detailsList');
            const gvwr = doc.data().gvwr;
            const length = doc.data().length;
            const model = doc.data().model;
            const sleeps = doc.data().sleeps;

            const modelLi = document.querySelector('.model');
            const modelP = document.createElement('p');
            modelP.innerText = model;
            modelLi.append(modelP);

            const gvwrLi = document.querySelector('.gvwr');
            const gvwrP = document.createElement('p');
            gvwrP.innerText = gvwr;
            gvwrLi.append(gvwrP);

            const lengthLi = document.querySelector('.length');
            const lengthP = document.createElement('p');
            lengthP.innerText = length;
            lengthLi.append(lengthP);

            const sleepsLi = document.querySelector('.sleeps');
            const sleepsP = document.createElement('p');
            sleepsP.innerText = sleeps;
            sleepsLi.append(sleepsP);
        })
    });
}
displayData('trailer1')

const trailerImages = [];
// Now we get the references of these images
imagesRef.listAll().then(function(result) {
    
    result.items.forEach(function(imageRef) {
        // And finally display them
        imageRef.getDownloadURL().then(function(url) {
            trailerImages.push(url)
            
            if (trailerImages.length == result.items.length) {
                displayImages(trailerImages)
            }
        })
    })
    
}).catch(function(error) {
    // Handle any errors
})


function displayImages(imagesArr) {

    const index = imagesArr.findIndex((url) => {
        return url.indexOf('main.jpg')!==-1;
    })

    const mainUrl = imagesArr[index];
    imagesArr.splice(index, 1);
    imagesArr.unshift(mainUrl);

    for (i = 0; i < imagesArr.length; i++) {
        const imgContainer = document.querySelector('.trailerImages');
        const newLi = document.createElement('li');
        const img = document.createElement('img');
        img.src = imagesArr[i];

        newLi.classList.add('image');

        if (i === 0) {
            newLi.classList.add('mainImage');
        } else {
            newLi.classList.add('smallImage')
        }

        newLi.append(img);
        imgContainer.append(newLi);
    } 
}

const changeMain = (event) => {
        const images = document.querySelectorAll('.image');
        const arr = [...images];
    const index = arr.findIndex((item) => {
        return item.classList.contains('mainImage');
    })

    if (event.target.classList.contains('fa-arrow-right')) {
        arr[index].classList.remove('mainImage');
        arr[index].classList.add('smallImage');
        if (index >= arr.length - 1) {
            arr[index - (arr.length - 1)].classList.remove('smallImage');
            arr[index - (arr.length - 1)].classList.add('mainImage');
        } else {
            arr[index + 1].classList.add('mainImage');
            arr[index + 1].classList.remove('smallImage');
        }
        
    } else {
        arr[index].classList.remove('mainImage');
        arr[index].classList.add('smallImage');

        if (index === 0) {
            arr[index + (arr.length - 1)].classList.add('mainImage');
            arr[index + (arr.length - 1)].classList.remove('smallImage');
        } else {
            arr[index - 1].classList.remove('smallImage');
            arr[index - 1].classList.add('mainImage');
        }
    }

}

const controls = document.querySelectorAll('.control');

controls.forEach((control) => {
    control.addEventListener('click', (e) => changeMain(e))
})


// const changeMain = (image) => {
//     const mainImage = document.querySelector('.mainImage')
//     mainImage.classList.add('smallImage');
//     mainImage.classList.remove('mainImage');
//     image.classList.add('mainImage');
//     image.classList.remove('smallImage');
// }



// function displayImages(imageRef) {
//     imageRef.getDownloadURL().then(function(url) {
//         const test = url;

//         const imgContainer = document.querySelector('.trailerImages');
//         const newLi = document.createElement('li');
//         const img = document.createElement('img');
//         img.src = test;

//         // adds a mainImage class to the main Image
//         if (imageRef._delegate._location.path_ === 'hideout/main.jpg') {
//             newLi.classList.add('mainImage')
//         } else {
//             newLi.classList.add('smallImage')
//         }

//         newLi.append(img);
//         imgContainer.append(newLi);
//     }).then (function() {
//         const smallImages = document.querySelectorAll('.smallImage');
//         const main = document.querySelector('.mainImage');
//         main.addEventListener('click', () => changeMain(main));
//         smallImages.forEach((image) => {
//             image.addEventListener('click', () => changeMain(image))
//         })
//     }).catch(function(error) {
//       // Handle any errors
//     });
// }



