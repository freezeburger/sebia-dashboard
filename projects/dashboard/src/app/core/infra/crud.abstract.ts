/**
 * crud.abstract.ts
 */

import { HttpClient } from "@angular/common/http";
import { computed, inject, signal } from "@angular/core";
import { catchError, Observable, of, Subject, tap } from "rxjs";

export type ENPOINT = '/notifications' | '/reviews' | '/analysis' | '/logs'

export interface BaseEntity {
    id:string | number;
}

export type ProcessResponse<T> = {
    success: true;
    data: T | T[];
} | {
    success: false;
    error: string;
}

export abstract class CrudService< TypeDTO extends BaseEntity>{

    abstract API:ENPOINT;

    constructor(){
        setTimeout(() => {
            if(!this.API){
                throw new Error('API endpoint not defined in CrudService subclass');
            }
        },0);
    }

    protected data = signal< TypeDTO[]>([]);
    public collection = computed( () => this.data() );

    private http = inject(HttpClient);
    private get apiUrl() {
        return 'http://localhost:5050' + this.API;
    }

    abstract veryifyPayload(payload: Omit<TypeDTO, 'id'>): boolean;

    public create(payload: Omit<TypeDTO, 'id'>): Observable<ProcessResponse<TypeDTO>> {

        if (!this.veryifyPayload(payload)) return of({ success: false, error: 'Invalid data' });

        const result = new Subject<ProcessResponse<TypeDTO>>();
        this.http.post<TypeDTO>(this.apiUrl, payload)
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

    public read(): Observable<ProcessResponse<TypeDTO>> {

        const result = new Subject<ProcessResponse<TypeDTO>>();

        this.http.get<TypeDTO[]>(this.apiUrl)
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

    public update(target: TypeDTO, data: Partial<Omit<TypeDTO, 'id'>>): Observable<ProcessResponse<TypeDTO>> {
        if (!target.id) return of({ success: false, error: 'Invalid target' });
        if (this.data().find(n => n.id === target.id) == null) {
            return of({ success: false, error: 'Notification not found' });
        }
        if (!data || Object.keys(data).length === 0) {
            return of({ success: false, error: 'No data to update' });
        }

        const result = new Subject<ProcessResponse<TypeDTO>>();

        this.http.put<TypeDTO>(`${this.apiUrl}/${target.id}`, { ...target, ...data })
            .pipe(
                catchError(err => {
                    result.next({ success: false, error: err.message || 'Unknown error' });
                    return of(null);
                }),
                tap(responseData => {
                    if (responseData) {
                        const updatedData = this.data().map(n => n.id === target.id ? responseData : n);
                        this.data.set(updatedData);
                    }
                }),
                tap(responseData => responseData && result.next({ success: true, data: responseData })),
            )
            .subscribe();

        return result.asObservable();
    }

    public delete(target: TypeDTO): Observable<ProcessResponse<TypeDTO>> {
        
        if (!target.id) return of({ success: false, error: 'Invalid target' });
        if (this.data().find(n => n.id === target.id) == null) {
            return of({ success: false, error: 'Notification not found' });
        }

        const result = new Subject<ProcessResponse<TypeDTO>>();

        this.http.delete<TypeDTO>(`${this.apiUrl}/${target.id}`)
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