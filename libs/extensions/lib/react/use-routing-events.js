import * as React from 'react';
export const useRoutingEvents = () => {
    const [currentLocation, setCurrentLocation] = React.useState(window.location);
    React.useEffect(() => {
        window.addEventListener('single-spa:before-routing-event', (ev) => {
            if (ev.detail.newUrl !== ev.detail.oldUrl) {
                setCurrentLocation({ ...window.location }); // create and set a new object instance from location
            }
        });
    }, []);
    return currentLocation;
};
//# sourceMappingURL=use-routing-events.js.map