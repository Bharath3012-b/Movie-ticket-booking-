# Movie Ticket Booking System

A simple web-based Movie Ticket Booking System developed using **HTML, CSS, and JavaScript**.

This project is based on an existing open-source Movie Ticket Booking project and has been modified to add new functionality.

## Project Overview

The Movie Ticket Booking System allows users to select a movie, choose available seats, and calculate the total ticket price based on the number of selected seats.

The original project provides movie selection, seat selection and deselection, occupied seats, dynamic ticket-price calculation, and local storage functionality.

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Local Storage

## Original Features

* Movie selection
* Movie price selection
* Seat selection
* Seat deselection
* Occupied/sold seats
* Automatic ticket count
* Automatic total price calculation
* Local Storage support

## Modification 1 – Bulk Ticket Discount

A bulk ticket discount feature has been added to improve the existing booking system.

### Discount Rules

| Number of Tickets | Discount |
| ----------------- | -------: |
| 1–2 tickets       |       0% |
| 3–4 tickets       |       5% |
| 5 or more tickets |      10% |

The system automatically calculates the discount and displays the final payable amount.

### Example

If the customer selects 5 tickets:

```text
Ticket Price = ₹1000
Discount = 10%
Discount Amount = ₹100
Final Amount = ₹900
```

## Purpose of the Modification

The purpose of this modification is to provide a discount for customers booking multiple tickets and to make the ticket booking system more useful for group bookings.

## Project Structure

```text
Movie-Ticket-Booking-System/
│
├── images/
│   └── Project images
│
├── index.html
├── script.js
├── style.css
└── README.md
```

## How to Run the Project

1. Download or clone the repository.
2. Open the project folder.
3. Open `index.html` in a web browser.
4. Select a movie.
5. Select the required seats.
6. The ticket count and price will be displayed.
7. The applicable discount will be calculated automatically.

## Open Source Reference

Original project:

https://github.com/Chandrabhan3010/Movie-Ticket-Tooking-System

The original project was developed using HTML, CSS, and JavaScript and includes movie selection, seat selection, price calculation, and Local Storage functionality.

## Learning Outcomes

Through this project, the following concepts were practiced:

* HTML page structure
* CSS styling
* JavaScript DOM manipulation
* Event handling
* Seat selection logic
* Price calculation
* Local Storage
* Adding new functionality to an existing open-source project

## Future Enhancements

* User login and registration
* Online payment integration
* Movie search
* Movie category filtering
* Booking history
* Email/SMS booking confirmation
* Dark mode
* Multiple theatre and show-time selection

## Conclusion

This project demonstrates how an existing open-source software project can be studied, modified, and improved by adding new functionality. The bulk ticket discount feature provides an additional benefit to users making group bookings.
