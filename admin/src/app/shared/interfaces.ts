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
  imageSrc?: string,
  cost: number,
  categoryId: string,
  _id?: string
}
export interface Order {
  order: number,
  date: Date,
  position: string,
  positionId: string,
  price: string,
  quantity: number,
  cost: number,
  userName: string,
  userPhone: number,
  userEmail: string,
  address: string,
  mailNum: string,
  done: boolean,
  _id?: string
}
export interface MainData {
  textLeft: string,
  textRight: string,
  mainImageSrc?: string,
  _id?: string
}
