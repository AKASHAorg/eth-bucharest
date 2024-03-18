import React from 'react';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import Icon from '@akashaorg/design-system-core/lib/components/Icon';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import { ExclamationTriangleIcon } from '@akashaorg/design-system-core/lib/components/Icon/hero-icons-outline';
export const BlockErrorCard = props => {
    const { errorTitle, errorDescription, refreshLabel, onRefresh } = props;
    return (React.createElement(Stack, { direction: "row" },
        React.createElement(Stack, { background: { light: 'errorLight', dark: 'errorDark' }, customStyle: "w-2.5 rounded-l-lg border border(errorLight dark:errorDark)" }),
        React.createElement(Stack, { spacing: "gap-y-1", padding: "p-2", background: { light: 'errorLight/30', dark: 'errorDark/30' }, customStyle: "rounded-r-lg border border(errorLight dark:errorDark)", fullWidth: true },
            React.createElement(Stack, { direction: "row", align: "center", spacing: "gap-x-1" },
                React.createElement(Icon, { icon: React.createElement(ExclamationTriangleIcon, null), color: "error" }),
                React.createElement(Text, { variant: "button-md" }, errorTitle)),
            React.createElement(Text, { variant: "footnotes2", weight: "normal", customStyle: "pl-6" }, errorDescription),
            refreshLabel && (React.createElement(Button, { variant: "text", size: "md", label: refreshLabel, onClick: onRefresh, customStyle: "ml-auto mt-auto" })))));
};
//# sourceMappingURL=block-error-card.js.map