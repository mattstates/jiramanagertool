import React, { Fragment as div, useEffect, useState } from 'react';

interface DropdownProps {
    collection: string[];
    form: string;
    labelName: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ form, labelName, collection }) => {
    const id = `${labelName}ID`;
    return (
        <div className="dropdown">
            <label htmlFor={id}>{labelName}</label>
            <select form={form} multiple size={0} id={id}>
                <option label="true">--Choose--</option>
                {collection.map((item) => (
                    <option key={item}>{item}</option>
                ))}
            </select>
        </div>
    );
};
