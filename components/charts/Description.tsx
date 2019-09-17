import './Description.scss';
import React, { useState } from 'react';

interface IDescriptionProps {
    description: string;
    calculatedBy: string;
    footNote?: string;
}

export const Description: React.FC<IDescriptionProps> = ({ description, calculatedBy, footNote = '' }) => {
    const [isVisible, updateIsVisible] = useState<boolean>(false);

    return (
        <div className="description">
            <a
                onClick={e => {
                    e.preventDefault();
                    updateIsVisible(!isVisible);
                    console.log(isVisible);
                }}
                // onMouseLeave={() => {
                //     console.log('mouse leave');

                //     updateIsVisible(false);
                // }}
                // onMouseOver={() => {
                //     console.log('mouse over');
                //     updateIsVisible(true);
                //     console.log(isVisible);
                // }}
            >
                Description
            </a>
            <div className={`description__body${isVisible ? '' : ' description--hidden'}`}>
                <p>{description}</p>
                <p>
                    <strong>Calculated By:</strong> {calculatedBy}
                </p>
                <sup>{footNote}</sup>
            </div>
        </div>
    );
};
