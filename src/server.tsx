import React from 'react';

const TwoColumnComponent: React.FC = () => {
    return (
        <div className="flex">
            <div className="w-1/2">
                {/* Content for the first column */}
            </div>
            <div className="w-1/2">
                {/* Content for the second column */}
            </div>
        </div>
    );
};

export default TwoColumnComponent;