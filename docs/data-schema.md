# Data Schema

This document outlines the Firestore collections used by the MyRide backend.

## Users (`users`)
- `name`: string
- `phone`: string
- `notificationsEnabled`: boolean
- `insurance`: object
  - `number`: string
  - `expiry`: timestamp
- `drivingLicense`: object
  - `number`: string
  - `expiry`: timestamp

## Vehicles (`vehicles`)
- `userId`: reference to a user
- `photoUrl`: string
- `vin`: string
- `engineNumber`: string
- `plateNumber`: string
- `bluebook`: object
  - `documentUrl`: string
  - `expiry`: timestamp
- `totalDistance`: number

## ServiceRecords (`serviceRecords`)
- `vehicleId`: reference to a vehicle
- `serviceDate`: timestamp
- `cost`: number
- `partsChanged`: array of strings
- `distanceAtService`: number
- `location`: string
- `distributor`: string
- `notes`: string

## Bookings (`bookings`)
- `userId`: reference to a user
- `vehicleId`: reference to a vehicle
- `serviceDate`: timestamp
- `location`: string
- `notes`: string

## AdminNotifications (`adminNotifications`)
- `vehicleId`: reference to a vehicle (optional)
- `message`: string
- `sentAt`: timestamp
- `filters`: object describing custom filter options
