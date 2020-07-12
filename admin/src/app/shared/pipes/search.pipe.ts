import { Pipe, PipeTransform } from '@angular/core';
import {Position} from "../interfaces";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(positions: Position[], search: string = ''): Position[]{
    if (!search.trim()){
      return positions
    }
      return positions.filter(positions => {
        return positions.name.includes(search)
      })

  }

}
