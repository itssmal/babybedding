import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, Position} from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class PositionsService {
  constructor(private http: HttpClient) {
  }

  fetchAll(): Observable<Position[]> {
    return this.http.get<Position[]>('/api/admin-position')
  }

  fetch(categoryId: string): Observable<Position[]> {
   return this.http.get<Position[]>(`/api/admin-position/${categoryId}`)
  }

  fetchOne(id: string): Observable<Position> {
    return this.http.get<Position>(`/api/admin-position/edit/${id}`)
  }

  create(name: string, description: string, cost: number, categoryId: string, image?: File): Observable<Position> {
    const formData = new FormData()

    if (image) {
      formData.append('image', image, image.name)
    }
    formData.append('name', name)
    formData.append('description', description)
    // @ts-ignore
    formData.append('cost', cost)
    formData.append('categoryId', categoryId)

    return this.http.post<Position>(`/api/admin-position`, formData )
  }

  update(id: string, name: string, description: string, cost: number, categoryId: string, image?: File ) {
    const formData = new FormData()

    if (image) {
      formData.append('image', image, image.name)
    }
    formData.append('name', name)
    formData.append('description', description)
    // @ts-ignore
    formData.append('cost', cost)
    formData.append('categoryId', categoryId)

    return this.http.patch<Position>(`/api/admin-position/${id}`, formData )
  }

  remove(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/admin-position/${id}`)
  }

}
