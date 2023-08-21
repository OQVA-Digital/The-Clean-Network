const caseStudyBts = document.querySelectorAll('.job .bt_ctnr button')
const closeStudyCaseBts = document.querySelectorAll('.case_study .close')

for (let i = 0; i < caseStudyBts.length; i++) {
    caseStudyBts[i].addEventListener('click', toggleCaseStudy, false)
}

for (let i = 0; i < closeStudyCaseBts.length; i++) {
    closeStudyCaseBts[i].addEventListener('click', toggleCaseStudy, false)
}

function toggleCaseStudy(e) {
    const caseStudyContainer = this.parentElement.parentElement.querySelector('.case_study')
    const isActive = caseStudyContainer.getAttribute('data-active') === 'true'

    if (!isActive) {
        caseStudyContainer.classList.add('show')
        caseStudyContainer.setAttribute('data-active', 'true')
    } else {
        caseStudyContainer.classList.remove('show')
        caseStudyContainer.setAttribute('data-active', 'false')
    }
}


const carouselVideos = document.querySelectorAll('.carousel video')

// for (i = 0; i < carouselVideos.length; i++) {
//     carouselVideos[i].addEventListener('touch', function (e) {
//         toggleVideo(e)
//     })
// }

for (let i = 0; i < carouselVideos.length; i++) {
    carouselVideos[i].addEventListener('click', function (e) {
        toggleVideo(e)
    })

    carouselVideos[i].addEventListener('touchstart', function (e) {
        let target = e.target;

        // Store the initial touch position
        let startX = e.touches[0].clientX;
        let startY = e.touches[0].clientY;

        // Add a touchend event listener to track when touch leaves the target
        target.addEventListener('touchend', function (e) {
            // Calculate the distance between initial and final touch position
            let endX = e.changedTouches[0].clientX;
            let endY = e.changedTouches[0].clientY;
            let distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

            // Check if the distance is within a threshold (e.g., 10 pixels) to consider it as a tap
            if (distance < 10) {
                toggleVideo(e);
            }
        }, { once: true }); // Use { once: true } to remove the touchend listener after it's triggered once
    });
}


function toggleVideo(e) {
    if (document.fullscreenElement) {
        document.exitFullscreen();

        e.currentTarget.volume = 0;
        e.currentTarget.muted = true;

        e.preventDefault()
        e.currentTarget.play()
    } else {
        if (e.currentTarget.requestFullscreen) {
            e.currentTarget.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            e.currentTarget.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            e.currentTarget.msRequestFullscreen();
        }
        e.currentTarget.volume = 0.2;
        e.currentTarget.muted = false;

        e.currentTarget.play()
    }
}