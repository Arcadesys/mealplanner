import React from 'react';
import { MealPlanRequest } from '../types/mealPlanner';

interface PlanFormProps {
  formData: MealPlanRequest;
  onChange: (newFormData: MealPlanRequest) => void;
  onSubmit: () => void;
  className?: string;
}

const PlanForm: React.FC<PlanFormProps> = ({ formData, onChange, onSubmit, className }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    onChange({ ...formData, [name]: newValue });
  };

  const handleStepperChange = (name: string, increment: number) => {
    const currentValue = formData[name as keyof typeof formData] as number;
    const newValue = Math.max(0, currentValue + increment);
    onChange({ ...formData, [name]: newValue });
  };

  // Style classes
  const inputClass = "w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300";
  const labelClass = "block mb-1 font-medium dark:text-gray-200";
  const helperTextClass = "mt-1 text-sm text-gray-500 dark:text-gray-400";

  return (
    <div className={className}>
      {/* Rest of your form JSX stays exactly the same */}
    </div>
  );
};

export default PlanForm;
