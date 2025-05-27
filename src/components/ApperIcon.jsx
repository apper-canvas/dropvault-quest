import { memo } from 'react'

import * as Icons from 'lucide-react';

const ApperIcon = memo(({ name, className = '', ...props }) => {
    let IconComponent = Icons[name]

    if (!IconComponent) {
        console.warn(`Icon "${name}" does not exist in lucide-react`)
        IconComponent = Icons['Smile']
    }

    return (
        <IconComponent 
            className={`transition-colors duration-200 ${className}`} 
            {...props} 
        />
    )
})

ApperIcon.displayName = 'ApperIcon'

};

export default ApperIcon;