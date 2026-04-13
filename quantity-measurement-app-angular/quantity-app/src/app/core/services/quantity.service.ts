import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { QuantityInputDTO, QuantityMeasurementDTO } from '../models/models';

@Injectable({ providedIn: 'root' })
export class QuantityService {

  private api = `${environment.apiUrl}/quantities`;

  constructor(private http: HttpClient) {}

  compare(input: QuantityInputDTO): Observable<QuantityMeasurementDTO> {
    return this.http.post<QuantityMeasurementDTO>(`${this.api}/compare`, input);
  }

  convert(input: QuantityInputDTO): Observable<QuantityMeasurementDTO> {
    return this.http.post<QuantityMeasurementDTO>(`${this.api}/convert`, input);
  }

  add(input: QuantityInputDTO): Observable<QuantityMeasurementDTO> {
    return this.http.post<QuantityMeasurementDTO>(`${this.api}/add`, input);
  }

  // Fixed: was /add-with-target-unit (404) → now uses /add
  addWithTarget(input: QuantityInputDTO): Observable<QuantityMeasurementDTO> {
    return this.http.post<QuantityMeasurementDTO>(`${this.api}/add`, input);
  }

  subtract(input: QuantityInputDTO): Observable<QuantityMeasurementDTO> {
    return this.http.post<QuantityMeasurementDTO>(`${this.api}/subtract`, input);
  }

  // Fixed: was /subtract-with-target-unit (404) → now uses /subtract
  subtractWithTarget(input: QuantityInputDTO): Observable<QuantityMeasurementDTO> {
    return this.http.post<QuantityMeasurementDTO>(`${this.api}/subtract`, input);
  }

  divide(input: QuantityInputDTO): Observable<QuantityMeasurementDTO> {
    return this.http.post<QuantityMeasurementDTO>(`${this.api}/divide`, input);
  }

  getHistoryByType(type: string): Observable<QuantityMeasurementDTO[]> {
    return this.http.get<QuantityMeasurementDTO[]>(`${this.api}/history/type/${type}`);
  }

  // Fixed: was /history/errored (404) → now uses /history/errors
  getErrorHistory(): Observable<QuantityMeasurementDTO[]> {
    return this.http.get<QuantityMeasurementDTO[]>(`${this.api}/history/errors`);
  }
}
