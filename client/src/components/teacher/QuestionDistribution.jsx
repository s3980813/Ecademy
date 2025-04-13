import React from 'react';

const QuestionDistribution = ({ 
    test, 
    tempDistribution, 
    handleDistributionChange, 
    handleConfirmDistribution,
    questionSets 
}) => {
    const selectedSet = questionSets.find(set => set._id === test.questionSetId);

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Question Distribution</h2>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Total Questions
                        </label>
                        <input
                            type="number"
                            value={tempDistribution.totalQuestions}
                            onChange={(e) => handleDistributionChange('totalQuestions', e.target.value)}
                            className="w-full p-2 border rounded-md"
                            disabled={test.status === 'published' || !test.questionSetId}
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Easy Questions
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={tempDistribution.easy}
                                onChange={(e) => handleDistributionChange('easy', e.target.value)}
                                className="w-full p-2 border rounded-md"
                                disabled={test.status === 'published' || !test.questionSetId}
                                min="0"
                            />
                            {test.questionSetId && (
                                <span className="absolute right-2 top-2 text-sm text-gray-500">
                                    Max: {selectedSet?.easy || 0}
                                </span>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Medium Questions
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={tempDistribution.medium}
                                onChange={(e) => handleDistributionChange('medium', e.target.value)}
                                className="w-full p-2 border rounded-md"
                                disabled={test.status === 'published' || !test.questionSetId}
                                min="0"
                            />
                            {test.questionSetId && (
                                <span className="absolute right-2 top-2 text-sm text-gray-500">
                                    Max: {selectedSet?.medium || 0}
                                </span>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hard Questions
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={tempDistribution.hard}
                                onChange={(e) => handleDistributionChange('hard', e.target.value)}
                                className="w-full p-2 border rounded-md"
                                disabled={test.status === 'published' || !test.questionSetId}
                                min="0"
                            />
                            {test.questionSetId && (
                                <span className="absolute right-2 top-2 text-sm text-gray-500">
                                    Max: {selectedSet?.hard || 0}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Current Distribution</h3>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{tempDistribution.totalQuestions}</p>
                            <p className="text-sm text-gray-500">Total</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">{tempDistribution.easy}</p>
                            <p className="text-sm text-gray-500">Easy</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">{tempDistribution.medium}</p>
                            <p className="text-sm text-gray-500">Medium</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-red-600">{tempDistribution.hard}</p>
                            <p className="text-sm text-gray-500">Hard</p>
                        </div>
                    </div>
                </div>
                {test.status !== 'published' && (
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleConfirmDistribution}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                            disabled={!test.questionSetId}
                        >
                            Confirm Changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionDistribution; 