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

- Node.js with Firebase Cloud Functions
- Firestore for data storage
- Express framework

## Data Schema

See [docs/data-schema.md](docs/data-schema.md) for the Firestore collection layout.

## Project Structure

- `docs/` contains project documentation including data schemas.
- `src/` holds Firebase Cloud Functions source code.
  - `models/` defines Firestore schema objects.


## Getting Started

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd myride-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Initialize Firebase (select Firestore and Functions):

   ```bash
   firebase init
   ```

4. Deploy or run locally:

   ```bash
   firebase emulators:start   # run locally
   firebase deploy           # deploy to Firebase
   ```

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
