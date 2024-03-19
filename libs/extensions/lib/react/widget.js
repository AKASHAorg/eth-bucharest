import * as React from 'react';
import { useRootComponentProps } from '@akashaorg/ui-awf-hooks';
import { useRoutingEvents } from './use-routing-events';
import Parcel from 'single-spa-react/parcel';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
export const Widget = props => {
    const { name, loadingIndicator, onError, customStyle = '', fullHeight } = props;
    const { getExtensionsPlugin, getContext, logger } = useRootComponentProps();
    const widgetStore = React.useRef(getExtensionsPlugin().widgetStore);
    const [parcelConfigs, setParcelConfigs] = React.useState([]);
    const location = useRoutingEvents();
    const [isParcelMounted, setIsParcelMounted] = React.useState(false);
    const widgets = React.useMemo(() => {
        if (!widgetStore.current)
            return [];
        return widgetStore.current.getMatchingWidgets(name, location);
    }, [location, name]);
    React.useEffect(() => {
        const resolveConfigs = async () => {
            const newWidgets = [];
            for (const widget of widgets) {
                if (newWidgets.find(p => p.widget.appName === widget.appName))
                    return;
                try {
                    const config = await widget.loadingFn();
                    newWidgets.push({ config, widget });
                }
                catch (err) {
                    logger.error(`error getting widget config, ${widget.appName}`);
                    onError?.(widget);
                }
            }
            setParcelConfigs(newWidgets);
        };
        resolveConfigs().catch();
    }, [widgets, onError]);
    const handleParcelError = React.useCallback((widget, index) => err => {
        onError?.(widget, `Failed to mount: ${err.message}`);
        if (logger)
            logger.error(`Failed to mount parcel: ${widget.appName}_${index}`);
    }, [logger, onError]);
    const loadingConfiguredParcel = parcelConfigs.length > 0 ? !isParcelMounted : false;
    const isLoading = widgets.length > parcelConfigs.length || loadingConfiguredParcel;
    return (React.createElement(Stack, { customStyle: `${customStyle} ${fullHeight ? 'h-full' : ''}`, id: name },
        isLoading && loadingIndicator,
        parcelConfigs.map((parcelConf, index) => (React.createElement(Parcel, { wrapStyle: {
                display: isLoading ? 'none' : undefined,
            }, parcelDidMount: () => {
                setIsParcelMounted(true);
            }, key: parcelConf.widget.appName, config: {
                ...parcelConf.config,
                name: `${parcelConf.widget.appName}_${index}`,
            }, ...getContext(), handleError: handleParcelError(parcelConf.widget, index) })))));
};
//# sourceMappingURL=widget.js.map