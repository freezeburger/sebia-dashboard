import { computed, inject, Injectable, signal } from "@angular/core";
import { CreateNotificationPayload, NotificationDTO, UpdateNotificationPayload } from "../dto/notification.dto";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, Subject, tap } from "rxjs";

export type NotificationProcessResponse = {
    success: true;
    data: NotificationDTO | NotificationDTO[];
} | {
    success: false;
    error: string;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    protected data = signal< NotificationDTO[]>([]);
    public collection = computed( () => this.data() );

    private http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:5050/notifications';

    public create(payload: CreateNotificationPayload): Observable<NotificationProcessResponse> {
        if (!payload.title || !payload.message) return of({ success: false, error: 'Invalid data' });

        const result = new Subject<NotificationProcessResponse>();
        this.http.post<NotificationDTO>(this.apiUrl, payload)
            .pipe(
                catchError(err => {
                    result.next({ success: false, error: err.message || 'Unknown error' });
                    return of(null);
                }),
                tap(responseData => responseData && this.data.set([ responseData, ...this.data() ])),
                tap(responseData => responseData && result.next({ success: true, data: responseData })),
            )
            .subscribe();

        return result.asObservable();
    }

    public read(): Observable<NotificationProcessResponse> {

        const result = new Subject<NotificationProcessResponse>();

        this.http.get<NotificationDTO[]>(this.apiUrl)
            .pipe(
                catchError(err => {
                    result.next({ success: false, error: err.message || 'Unknown error' });
                    return of(null);
                }),
                tap(responseData => responseData && (this.data.set(responseData))),
                tap(responseData => responseData && result.next({ success: true, data: responseData })),
            )
            .subscribe();

        return result.asObservable();
    }

    public update(target: NotificationDTO, data: UpdateNotificationPayload): Observable<NotificationProcessResponse> {
        if (!target.id) return of({ success: false, error: 'Invalid target' });
        if (this.data().find(n => n.id === target.id) == null) {
            return of({ success: false, error: 'Notification not found' });
        }
        if (!data || Object.keys(data).length === 0) {
            return of({ success: false, error: 'No data to update' });
        }

        const payload: UpdateNotificationPayload = {
            read: target.read,
            level: target.level,
            message: target.message,
            ...data,
            source: target.id
        }

        return this.create(payload as CreateNotificationPayload);
    }

    public delete(target: NotificationDTO): Observable<NotificationProcessResponse> {
        if (!target.id) return of({ success: false, error: 'Invalid target' });
        if (this.data().find(n => n.id === target.id) == null) {
            return of({ success: false, error: 'Notification not found' });
        }

        const result = new Subject<NotificationProcessResponse>();

        this.http.delete<NotificationDTO>(`${this.apiUrl}/${target.id}`)
            .pipe(
                catchError(err => {
                    result.next({ success: false, error: err.message || 'Unknown error' });
                    return of(null);
                }),
                tap(() => this.data.set(this.data().filter(n => n.id !== target.id))),
                tap(() => result.next({ success: true, data: target })),
            )
            .subscribe();


        return result.asObservable();
    }

}