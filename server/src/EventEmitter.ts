type EventObj = Record<string, any>

type EventListenerBase<Arg> = (arg: Arg) => void

export class EventEmitter<Events extends EventObj = EventObj> {
  private listeners: {
    [K in keyof Events]: EventListenerBase<Events[K]>[]
  }

  constructor() {
    this.listeners = {} as Record<keyof Events, EventListener[]>
  }

  emit<Event extends keyof Events>(name: Event, message: Events[Event]): void {
    if (!this.listeners[name]) return
    this.listeners[name].forEach((listener) => {
      listener(message)
    })
  }

  on<Event extends keyof Events>(
    name: Event,
    listener: EventListenerBase<Events[Event]>
  ): () => void {
    if (!this.listeners[name]) {
      this.listeners[name] = []
    }

    this.listeners[name].push(listener)

    return () => {
      this.listeners[name] = this.listeners[name].filter(
        (cb) => cb !== listener
      )
    }
  }

  once<Event extends keyof Events>(
    name: Event,
    listener: EventListenerBase<Events[Event]>
  ): () => void {
    const unsubscribe = this.on(name, (msg: any) => {
      unsubscribe()
      listener(msg)
    })

    return unsubscribe
  }
}
