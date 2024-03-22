# Event bus

Communication between integrations is done through the event bus.

### Global event bus

Global event bus is accessible through the sdk (sdk.api.globalChannel)
Almost all calls to the sdk APIs methods will also trigger an event on the global event bus.
Global event bus is a rxjs ReplaySubject.