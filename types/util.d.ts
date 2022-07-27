export declare class ElCommonUtil {
  static copy(data: any): any
  static uuid(): string
  static downloadFile(url:string|any, mode?:string):void
  static downloadBlob(blob:Blob, fileName?:string):void
}

export declare class ElLocalStorageUtil {
  static getItem(key:string, namaspace?:string, defaultValue?:any):any
  static setItem(key:string, value:any, namespace?:string):void
  static clearItem(key:string, namespace?:string):void
}
