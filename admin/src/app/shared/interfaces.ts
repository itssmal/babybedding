export interface User {
  email: string,
  password: string
}

export interface Message {
  message: string
}

export interface Category {
  name: string,
  imageSrc?: string,
  _id?: string
}

export interface Position {
  name: string,
  description: string,
  images?: [
    {
      imageSrc: string,
    }
  ],
  mainImageId: number,
  cost: number,
  saleCost?: number,
  categoryId: string,
  quantity?: number,
  _id?: string
}
export interface Order {
  order: number,
  date: Date,
  positions: OrderPosition[],
  userName: string,
  userPhoneNumber: number,
  userEmail: string,
  area: string,
  city: string,
  department: string,
  notes: string,
  done: boolean,
  _id?: string
}
export interface OrderPosition {
  position: string,
  positionId: string,
  cost: number,
  saleCost?: number,
  quantity: number,
  imgPrev?: string
}
export interface MainData {
  textLeft: string,
  textRight: string,
  mainImageSrc?: string,
  leftImageSrc?: string,
  rightImageSrc?: string,
  _id?: string
}
