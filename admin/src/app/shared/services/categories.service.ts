import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category, Message} from "../interfaces";
import {Observable} from "rxjs";
// import {Position} from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private http: HttpClient) {

  }

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/admin-category')
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/admin-category/${id}`)
  }

  create(name: string, image?: File): Observable<Category> {
    const formData = new FormData()

    if (image) {
      formData.append('image', image, image.name)
    }
    formData.append('name', name)

    return this.http.post<Category>('/api/admin-category', formData)

  }

  update(id: string, name: string, image?: File): Observable<Category> {
    const formData = new FormData()

    if (image) {
      formData.append('image', image, image.name)
    }
    formData.append('name', name)

    return this.http.patch<Category>(`/api/admin-category/${id}`, formData)
  }

  remove(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/admin-category/${id}`)
  }

}
