
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const dbRef = db.collection('trailers');

console.log(dbRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().sleeps);
    });
}))

const trailers = document.querySelectorAll('.trailer');


trailers.forEach((trailer) => {
    trailer.addEventListener('click', () => {
        const trailerId = trailer.id;
        console.log(trailerId)
    })
})