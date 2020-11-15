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

  create(name: string, description: string, cost: number, categoryId: string, images?: File[], mainImageId?: number, saleCost?: number,): Observable<Position> {
    const formData = new FormData()

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i], images[i].name)
      }
    }
    if (saleCost) {
      // @ts-ignore
      formData.append('saleCost', saleCost)
    }
    formData.append('name', name)
    formData.append('description', description)
    // @ts-ignore
    formData.append('cost', cost)
    formData.append('categoryId', categoryId)
    // @ts-ignore
    formData.append('mainImageId', mainImageId)

    console.log('position.service: ' + formData)

    return this.http.post<Position>(`/api/admin-position`, formData )
  }

  update(id: string, name: string, description: string, cost: number, categoryId: string, images?, mainImageId?: number, saleCost?: number ) {
    const formData = new FormData()

    console.log(images)
    if (images[0] instanceof File) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i], images[i].name)
      }
    } else if (images.length !== 0) {
      const imageArr = JSON.stringify(images)
      formData.append('images', imageArr)
    }
    if (saleCost) {
      // @ts-ignore
      formData.append('saleCost', saleCost)
    }

    formData.append('name', name)
    formData.append('description', description)
    // @ts-ignore
    formData.append('cost', cost)
    formData.append('categoryId', categoryId)
    // @ts-ignore
    formData.append('mainImageId', mainImageId)


    return this.http.patch<Position>(`/api/admin-position/${id}`, formData )
  }

  remove(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/admin-position/${id}`)
  }

}
