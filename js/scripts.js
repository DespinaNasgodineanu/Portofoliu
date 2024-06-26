'use strict';



window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

const btnSendEmail = document.querySelector('#submitButton');

const sendEmail = function() {
  const messageForm = document.querySelector('.textarea_wrapper #message');
  const email = document.querySelector('#email');
  const fullName = document.querySelector('#name');

  const emailData = {
    to: "despina_nasgodineanu@yahoo.com",
    subject: `Portofoliu - ${email.value}` ,
    text:` Name : ${fullName.value} ,
           Message:${messageForm.value}`,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  };
  
  fetch(
    "https://bankist-api-image-o42rrddu2a-od.a.run.app/email/send",
    requestOptions
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Email was sent successfully:", data);
      // Store the access token securely, such as in localStorage or sessionStorage
    })
    .catch((error) => {
      console.error("There was a problem with the request:", error.message);
    });
}

btnSendEmail.addEventListener('click', sendEmail)

