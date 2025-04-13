import React from 'react';

const TestSettings = ({ 
    test, 
    handleInputChange, 
    handleSaveTest 
}) => {
    return (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-4">Test Settings</h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Test Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={test.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={test.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        rows="3"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (minutes)
                    </label>
                    <input
                        type="number"
                        name="duration"
                        value={test.duration}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        min="1"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Passing Score (%)
                    </label>
                    <input
                        type="number"
                        name="passingScore"
                        value={test.passingScore}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        min="0"
                        max="100"
                        required
                    />
                </div>

                <button
                    onClick={handleSaveTest}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Save Settings
                </button>
            </div>
        </div>
    );
};

export default TestSettings; 