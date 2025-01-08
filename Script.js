document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });

    // Zoom view functionality
    const zoomView = document.getElementById('zoomView');
    const zoomImg = document.getElementById('zoomImg');
    const zoomDescription = document.getElementById('zoomDescription');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    const images = document.querySelectorAll('.slider .slide img');

    function showImage(index) {
        const img = images[index];
        zoomImg.src = img.src;
        zoomDescription.textContent = img.getAttribute('data-description');
        zoomView.style.display = 'flex';
    }

    images.forEach((img, index) => {
        img.addEventListener('click', function () {
            currentIndex = index;
            showImage(currentIndex);
        });
    });

    closeBtn.addEventListener('click', function () {
        zoomView.style.display = 'none';
    });

    prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });

    zoomView.addEventListener('click', function (e) {
        if (e.target !== zoomImg && e.target !== prevBtn && e.target !== nextBtn) {
            zoomView.style.display = 'none';
        }
    });
});