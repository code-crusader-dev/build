export enum EventStatus {
  REGISTRATION_OPEN = 'REGISTRATION_OPEN',
  REGISTRATION_CLOSED = 'REGISTRATION_CLOSED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED'
}

export interface Event {
  id: string;
  clubId: string;
  name: string;
  description: string;
  venue: string;
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
  registrationDeadline: string; // ISO 8601 format
  capacity: number;
  registeredCount: number;
  status: EventStatus; // Backend-driven field
  posterImageUrl: string;
}
