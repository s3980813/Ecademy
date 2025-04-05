import React, { useEffect, useState } from 'react';
import TestPopup from '../components/ui/TestPopup';
import BackButton from '../components/ui/BackButton';
import { useAuth } from '../hooks/useAuth';

export default function TestManagement() {
    // State to manage test lists
    const [tests, setTests] = useState([]);

    // Get teacher ID from AuthContext
    const { user } = useAuth();

    // State to manage popup visibility and new test data
    const [showPopup, setShowPopup] = useState(false);
    const [newTest, setNewTest] = useState({
        title: '',
        description: '',
        duration: 60,
        mode: 'private',
        teacherId: user._id,
        assignedStudents: [], 
    });

    // Function to handle popup visibility
    const openPopup = () => setShowPopup(!showPopup);
    const closePopup = () => {
        setShowPopup(false);
        setNewTest({
            title: '',
            description: '',
            duration: 60,
            mode: 'private',
            teacherId: user._id,
            assignedStudents: [],
        });
    };

    // Function to handle input changes in the popup
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTest({ ...newTest, [name]: value });
    };

    // Create a new test without API
    const createTest = () => {
        if (!newTest.title || !newTest.teacherId) {
            alert("Enter all fields!");
            return;
        }

        // Update the local state with the new test
        setTests([...tests, { ...newTest, _id: Date.now() }]);  // Using Date.now() to simulate unique ID
        alert("Test created successfully!");
        closePopup();
    };

    // Delete a test without API
    const deleteTest = (id) => {
        // Remove the test from the local state
        setTests(tests.filter(test => test._id !== id));
        alert("Test deleted successfully!");
    };

    // Access a test
    const accessTest = (id) => {
        window.location.href = `/teacher-dashboard/test/${id}`;
    };

    return (
        <>
        <div className="flex flex-col items-center w-full min-h-screen bg-background p-4">
            <div className="w-[80%] flex justify-start mb-4">
                <BackButton />
            </div>
            <div className="bg-card shadow-lg rounded-lg p-8 w-[80%] flex flex-col items-center">
                <div className="flex justify-between w-full mb-6">
                    <h1 className="text-sectionTitle font-bold text-primary">Test List</h1>
                    <button
                        onClick={openPopup}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Create New Test
                    </button>
                </div>

                {/* Test list */}
                <div className="mt-6 flex flex-col w-full mb-6">
                    {tests.length > 0 ? (
                        tests.map((test) => (
                            <div
                                key={test._id}
                                className="flex justify-between items-center p-4 border-b"
                            >
                                <span className="font-semibold text-cardTitle text-textPrimary">{test.title}</span>
                                <div className="flex items-center">
                                    <p className="text-textSecondary text-body mr-6">Duration: {test.duration} minutes</p>
                                    <p className="text-textSecondary text-body mr-6">Mode: {test.mode}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => accessTest(test._id)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600"
                                    >
                                        Access
                                    </button>
                                    <button
                                        onClick={() => deleteTest(test._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">There is no test yet.</p>
                    )}
                </div>
            </div>

            {/* Popup for creating new test */}
            <TestPopup
                showPopup={showPopup}
                closePopup={closePopup}
                handleChange={handleChange}
                createTest={createTest}
                newTest={newTest}
            />
        </div>
        </>
    );
}
