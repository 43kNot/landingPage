/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

document.addEventListener('DOMContentLoaded', function (){ 

    // Retrieve all section elements from the DOM
    const sections = document.querySelectorAll('section');

    // Retrieve the navbar element
    const navbar = document.querySelector('#navbar__list');

    // Iterate over all sections so that for each section-
    sections.forEach(section => {

        // Retrieve the section details from available attributes
        const sectionId = section.id;
        const sectionDataNav = section.dataset.nav;

        // create the li element
        const liElem = document.createElement("li");

        // create the anchor element
        const anchorElem = document.createElement("a");
        anchorElem.classList.add("menu__link");
        anchorElem.textContent = sectionDataNav;

         // add the anchor to li
         liElem.appendChild(anchorElem);
    
         // add the li element to the navbar
         navbar.appendChild(liElem);

       // Set the href attribute to link to the corresponding section
       anchorElem.href = `#${sectionId}`;

       // Add event listener to smooth scroll to section when the link is clicked
       anchorElem.addEventListener("click", function (event) {
           // Prevent default anchor behavior
           event.preventDefault();

           // Smooth scroll to the section
           section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        });
       
    });

    // Add a scroll event listener
  document.addEventListener('scroll', function() {
    console.log("scrolling");

    // Iterate over all sections so that for each section-
    makeActive();
    });

    function makeActive() {
        let scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            // Get the position of each section relative to the viewport
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Check if the section is within the viewport range
            if (scrollPosition >= sectionTop - sectionHeight / 3 && scrollPosition < sectionTop + sectionHeight - sectionHeight / 3) {
                // Add the active class to the section
                section.classList.add('nav-active');

                // Also highlight the corresponding navbar item
                const navLinks = navbar.querySelectorAll('a');
                navLinks.forEach(link => {
                    link.classList.remove('nav-active');
                });
                navLinks[index].classList.add('nav-active');
            } else {
                // Remove the active class if the section is out of the viewport
                section.classList.remove('nav-active');
            }
        });
    };
});