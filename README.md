# MyRide Backend

This repository contains the backend implementation for **MyRide**, an application designed to track vehicle servicing for bikes and cars. It manages user and vehicle data, stores service history, and sends reminders for upcoming servicing and document renewals.

## Features

- **User Management**: Store user details including name, phone number, insurance information, and driving license. Users can only modify their phone number.
- **Vehicle Management**: Track vehicle details such as a photo, VIN, engine number, number plate, and bluebook.
- **Service History**: Maintain a log of all servicing activities with cost, parts replaced, distance at service time, servicing location, distributor, and notes.
- **Reminders**: Automatic reminders for service due dates, as well as expirations for insurance, bluebook, and driving license.
- **Bookings**: Create and manage upcoming service bookings.
- **Notifications**: Enable or disable notifications per user. Admins can send customized notifications based on vehicle type, service count, total distance, and more.
- **Analytics**: Provide admins with analytics about vehicles and servicing trends.

## Technology Stack

This backend is built with **Node.js** and **Firebase Cloud Functions**. Data is stored in **Firestore**, while **Firebase Cloud Messaging** powers notifications. Analytics and advanced queries leverage Firestore's aggregation features.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd myride-backend
   ```

2. Install dependencies and run the server using Firebase Functions:

   ```bash
   npm install
   npm run serve
   ```

   This project uses **Firebase** as the backend platform. The `serve` command runs the Firebase emulator locally so you can test HTTP functions without deploying.

3. Initialize Firebase in your environment:

   ```bash
   firebase login
   firebase init
   ```

   During initialization, select **Functions** and follow the prompts to create a Firebase project or link an existing one. The generated `firebase.json` and `functions` directory hold configuration and Cloud Function code.

   Ensure that your environment has a service account or access token with permissions for Firestore and Cloud Messaging.

## API Overview

The following endpoints outline a potential API design. Adjust paths or fields as needed for your implementation.

### Authentication

- `POST /api/login` – Authenticate a user and return a token.
- `POST /api/register` – Register a new user.

### Users

- `GET /api/users/me` – Retrieve the authenticated user's profile.
- `PATCH /api/users/me` – Update the authenticated user's phone number.

### Vehicles

- `POST /api/vehicles` – Add a new vehicle.
- `GET /api/vehicles/:id` – Retrieve vehicle details.
- `PUT /api/vehicles/:id` – Update vehicle information (admin only).
- `DELETE /api/vehicles/:id` – Remove a vehicle (admin only).

### Service Records

- `POST /api/vehicles/:id/service-records` – Add a service record.
- `GET /api/vehicles/:id/service-records` – List service records for a vehicle.

### Bookings

- `POST /api/bookings` – Book a service appointment.
- `GET /api/bookings` – List upcoming bookings for the user.

### Notifications

- `POST /api/notifications/toggle` – Enable or disable user notifications.
- `POST /api/admin/notify` – Admin endpoint to send notifications with filters (vehicle type, service count, distance, etc.).

### Admin & Analytics

- `GET /api/admin/analytics` – Retrieve aggregated analytics about vehicles and servicing history.

## License

This project is provided as-is without warranty. Adapt it to your needs.
