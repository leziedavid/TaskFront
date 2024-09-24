// SwitchComponent.tsx
import React from 'react';

// Définition de l'interface pour les propriétés du composant
interface SwitchComponentProps {
    isChecked: boolean; // true si la case est cochée, sinon false
    onChange: () => void; // Fonction appelée lorsqu'on change l'état de la case
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({ isChecked, onChange }) => {
    return (



<label className="inline-flex items-center mb-5 cursor-pointer">
<input type="checkbox" value="" className="sr-only peer"   checked={isChecked}
                onChange={onChange}/>
<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">  {isChecked ? 'Checked toggle' : 'Unchecked toggle'}</span>
</label>
    );
};

export default SwitchComponent;
