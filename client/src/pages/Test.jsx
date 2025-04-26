import React, { useEffect, useState } from 'react';
import BackButton from '../components/ui/BackButton';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import TestPopup from '../components/ui/TestPopup'; // You’ll need to create this

export default function Test() {
    const [tests, setTests] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const { user } = useAuth();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [newTest, setNewTest] = useState({
        title: '',
        description: '',
        teacherId: user._id,
    });

    // Fetch tests on mount
    useEffect(() => {
        const fetchTests = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/tests/teacher/${user._id}`);
                setTests(res.data);
            } catch (err) {
                console.error("Failed to fetch tests:", err);
            }
        };
        fetchTests();
    }, [user._id, BACKEND_URL]);

    // Open/Close popup
    const openPopup = () => setShowPopup(true);
    const closePopup = () => {
        setShowPopup(false);
        setNewTest({ title: '', description: '', duration: 30, teacherId: user._id });
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTest({ ...newTest, [name]: value });
    };

    // Create a test
    const createTest = async () => {
        const total =
        parseInt(newTest.easy || 0) +
        parseInt(newTest.medium || 0) +
        parseInt(newTest.hard || 0);

        if (total > parseInt(newTest.totalQuestions)) {
            alert("❌ Total of Easy + Medium + Hard exceeds total questions.");
            return;
        }

        if (total < parseInt(newTest.totalQuestions)) {
            alert("⚠️ Make sure all questions are allocated (Easy + Medium + Hard = Total Questions)");
            return;
        }
        
        if (!newTest.title || !newTest.duration) {
            alert("Please fill in the title and duration.");
            return;
        }
        try {
            const res = await axios.post(`${BACKEND_URL}/tests`, newTest);
            setTests([...tests, res.data]);
            closePopup();
            alert("Test created!");
        } catch (err) {
            console.error("Error creating test:", err);
        }
    };

    // Delete test
    const deleteTest = async (id) => {
        try {
            await axios.delete(`${BACKEND_URL}/tests/${id}`);
            setTests(tests.filter(test => test._id !== id));
            alert("Test deleted!");
        } catch (err) {
            console.error("Error deleting test:", err);
        }
    };

    // Go to test details page
    const accessTest = (id) => {
        window.location.href = `/teacher-dashboard/test/${id}`;
    };

    return (
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

                <div className="mt-6 flex flex-col w-full mb-6">
                    {tests.length > 0 ? (
                        tests.map((test) => (
                            <div
                                key={test._id}
                                className="flex justify-between items-center p-4 border-b"
                            >
                                <span className="font-semibold text-cardTitle text-textPrimary">{test.title}</span>
                                <div className="text-textSecondary text-body mr-4">
                                    Duration: {test.duration} mins
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

            {/* Popup for test creation */}
            <TestPopup
                showPopup={showPopup}
                closePopup={closePopup}
                handleChange={handleChange}
                createTest={createTest}
                newTest={newTest}
            />
        </div>
    );
}
