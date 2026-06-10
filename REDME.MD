# Expert Laundry Services - Web Application
A responsive, single-page web application designed for a laundry service business. This project allows users to explore available laundry services, add them to a dynamic cart, calculate totals, and submit a booking request.
##  Features
 **Responsive Navigation Bar:** Includes links to page sections and a user profile placeholder.
 **Hero Section:** Engaging introductory section with a smooth-scrolling call-to-action button.
**Dynamic Booking System & Cart:** * Users can add or remove specific laundry services , Dry Cleaning, Wash & Fold
    * The cart updates dynamically, showing added items and automatically calculating the total price.
 **Booking Form:** Collects user details (Name, Email, Phone).
 **Email Confirmation Integration:** Pre-configured to work with  to send confirmation emails upon booking.
 **Informational Sections:** Showcases company achievements, unique selling qualities, and a newsletter subscription form.
##  Technologies Used
**CSS3:** Custom styling, flexbox layouts, and responsive design (Vanilla CSS, no frameworks).
**JavaScript :** DOM manipulation, dynamic cart logic, and form event handling.
**EmailJS:** Client-side email sending service.
##  File Structure
Ensure all three files are in the same folder for the application to work correctly:
* index.html - The main structure of the web page.
* style.css - Contains all the styling rules and design variables.
* script.js - Handles the interactive logic (cart updates, smooth scrolling, form submission).
##  How to Run the Project
1.  **Download the files:** Save `index.html`, style.css`, and `script.js` into a single folder on your computer.
2.  **Open in Browser:** Double-click `index.html` to open it in your default web browser (Chrome, Firefox, Safari, Edge). No local server is required to view the UI.

##  Setting up Email-JS (Optional)

To make the booking form actually send an email to the user:
1.  Create a free account on EmailJS.
2.  Get your **Public Key** and paste it into the `<head>` tag of `index.html` where it says 
3.  Create an Email Service and an Email Template in your EmailJS dashboard.
4.  Open `script.js`, uncomment the EmailJS code block inside the form submission listener, and replace `'YOUR_SERVICE_ID'` and `'YOUR_TEMPLATE_ID'` with your actual IDs.