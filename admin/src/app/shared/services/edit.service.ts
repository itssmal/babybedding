import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MainData} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class EditService {

  constructor(private http: HttpClient) {

  }

  get(): Observable<MainData[]> {
    return this.http.get<MainData[]>('/api/edit')
  }

  create(textLeft: string, textRight: string, image?: File): Observable<MainData> {
    const formData = new FormData()

    if (image) {
      formData.append('mainImageSrc', image, image.name)
    }
    formData.append('textLeft', textLeft)
    formData.append('textRight', textRight)

    return this.http.post<MainData>('/api/edit', formData)

  }

  update(id:string, textLeft: string, textRight: string, image?: File): Observable<MainData> {
    const formData = new FormData()

    if (image) {
      formData.append('mainImageSrc', image, image.name)
    }
    formData.append('textLeft', textLeft)
    formData.append('textRight', textRight)

    return this.http.patch<MainData>(`/api/edit/${id}`, formData )
  }

}
