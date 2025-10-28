
/**
 * Data Transfer Object for Notification
 */
export interface NotificationDTO {
    id: string;
    source:string;
    level: 'info' | 'warning' | 'error';
    title: string;
    message: string;
    read: boolean;
}

/**
 * Payload for creating a new notification
 */
export type CreateNotificationPayload = Omit<NotificationDTO, 'id' | 'read' | 'source'>;

/**
 * Payload for updating an existing notification
 */
export type UpdateNotificationPayload = Partial<Omit<NotificationDTO, 'id' >>;

/* 
type Prettyfy<T> = {
    [K in keyof T]: T[K];
}

export type M = Partial<NotificationDTO> & Pick<NotificationDTO, 'id'>;

type N = Prettyfy<M>; 
*/

