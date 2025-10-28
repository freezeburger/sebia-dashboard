import { Injectable } from "@angular/core";
import { CrudService, ENPOINT, ProcessResponse } from "@dashboard/app/core/infra/crud.abstract";
import { NotificationDTO } from "../dto/notification.dto";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NotificationRefactor extends CrudService<NotificationDTO> {

    override API: ENPOINT = '/notifications';

    veryifyPayload(payload: Omit<NotificationDTO, 'id'>): boolean {
        return Boolean(payload.title && payload.message);
    }

    override update(target: NotificationDTO, data: Partial<Omit<NotificationDTO, "id">>): Observable<ProcessResponse<NotificationDTO>> {
        
        if (!target.id) return of({ success: false, error: 'Invalid target' });
        if (this.data().find(n => n.id === target.id) == null) return of({ success: false, error: 'Notification not found' });
        if (!data || Object.keys(data).length === 0) return of({ success: false, error: 'No data to update' });
    
        const payload: Partial<Omit<NotificationDTO, "id">> = {
            read: target.read,
            level: target.level,
            message: target.message,
            ...data,
            source: target.id
        }

        return super.create(payload as Omit<NotificationDTO, "id">);

    }
}