export class Response {
  eventType: string;
  data: any;

  constructor(eventType: string, data: any) {
    this.eventType = eventType;
    this.data = data;
  }

  static isResponse(response: any): response is Response {
    if (response?.eventType === undefined) {
      return false;
    }

    if (response?.eventType === "error") {
      return false;
    }

    return true;
  }
}
