import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/ui/BackButton.jsx";
import { useAuth } from "../hooks/useAuth";

export default function TestDetail() {
    const { id } = useParams();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const { user } = useAuth();

    const [test, setTest] = useState(null);
    const [questionSets, setQuestionSets] = useState([]);
    const [copied, setCopied] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [assignedStudents, setAssignedStudents] = useState([]);
    const [error, setError] = useState("");
    const [searchType, setSearchType] = useState("username"); // "username" or "email"

    // Fetch test and question sets when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch test details
                const testResponse = await axios.get(`${BACKEND_URL}/tests/${id}`, {
                    withCredentials: true
                });
                if (testResponse.status === 200) {
                    setTest(testResponse.data);
                    if (testResponse.data.assignedStudentsId) {
                        // Fetch assigned students details
                        const studentsResponse = await axios.get(`${BACKEND_URL}/users/students`, {
                            params: { ids: testResponse.data.assignedStudentsId },
                            withCredentials: true
                        });
                        if (studentsResponse.status === 200) {
                            setAssignedStudents(studentsResponse.data);
                        }
                    }
                }

                // Fetch question sets for this teacher
                const setsResponse = await axios.get(`${BACKEND_URL}/question-sets/teacher/${user._id}`, {
                    withCredentials: true
                });
                if (setsResponse.status === 200) {
                    setQuestionSets(setsResponse.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id, BACKEND_URL, user._id]);

    // Handle updating test with question set
    const handleSetSelect = async (setId) => {
        try {
            // If setId is empty string, we're removing the set
            const updateData = setId ? { questionSetId: setId } : { questionSetId: null };
            
            const response = await axios.put(`${BACKEND_URL}/tests/${id}`, updateData, {
                withCredentials: true
            });
            
            if (response.status === 200) {
                setTest(prev => ({ ...prev, questionSetId: setId || null }));
                alert(setId ? "Test updated with question set successfully!" : "Question set removed successfully!");
            }
        } catch (error) {
            console.error("Error updating test with question set:", error);
            alert("Failed to update test with question set. Please try again.");
        }
    };

    // Handle updating test mode
    const handleModeChange = async (mode) => {
        try {
            const response = await axios.put(`${BACKEND_URL}/tests/${id}`, {
                mode: mode
            }, {
                withCredentials: true
            });
            if (response.status === 200) {
                setTest(prev => ({ ...prev, mode: mode }));
                alert("Test mode updated successfully!");
            }
        } catch (error) {
            console.error("Error updating test mode:", error);
            alert("Failed to update test mode. Please try again.");
        }
    };

    // Handle copying test ID to clipboard
    const copyTestId = () => {
        navigator.clipboard.writeText(id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Handle adding a student
    const handleAddStudent = async (e) => {
        e.preventDefault();
        setError("");
        
        try {
            // Find student by username or email
            const studentResponse = await axios.get(`${BACKEND_URL}/users/find`, {
                params: { 
                    [searchType]: identifier,
                    isTeacher: false 
                },
                withCredentials: true
            });

            console.log(studentResponse);
            
            if (studentResponse.status === 200) {
                const student = studentResponse.data;
                
                // Check if student is already assigned
                if (assignedStudents.some(s => s._id === student._id)) {
                    setError("This student is already assigned to the test.");
                    return;
                }

                // Update the test
                const response = await axios.put(`${BACKEND_URL}/tests/${id}`, {
                    assignedStudentsId: [...(test.assignedStudentsId || []), student._id]
                }, {
                    withCredentials: true
                });
                
                if (response.status === 200) {
                    setTest(prev => ({
                        ...prev,
                        assignedStudentsId: [...(prev.assignedStudentsId || []), student._id]
                    }));
                    setAssignedStudents(prev => [...prev, student]);
                    setIdentifier("");
                    setError("");
                }
            }
        } catch (error) {
            console.error("Error adding student:", error);
            if (error.response?.status === 404) {
                setError("Student not found. Please check the " + searchType + " and try again.");
            } else if (error.response?.status === 401) {
                setError("Please login again to continue.");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    // Handle removing a student
    const handleRemoveStudent = async (studentId) => {
        try {
            // Remove student from test
            const response = await axios.put(`${BACKEND_URL}/tests/${id}`, {
                assignedStudentsId: test.assignedStudentsId.filter(id => id !== studentId)
            }, {
                withCredentials: true
            });
            
            if (response.status === 200) {
                setTest(prev => ({
                    ...prev,
                    assignedStudentsId: prev.assignedStudentsId.filter(id => id !== studentId)
                }));
                setAssignedStudents(prev => prev.filter(student => student._id !== studentId));
            }
        } catch (error) {
            console.error("Error removing student:", error);
            alert("Failed to remove student. Please try again.");
        }
    };

    // Handle publishing test
    const handlePublish = async () => {
        try {
            // Validate that a question set is selected
            if (!test.questionSetId) {
                alert("Please select a question set before publishing the test.");
                return;
            }

            // Validate that test mode is selected
            if (!test.mode) {
                alert("Please select a test mode before publishing the test.");
                return;
            }

            // Update test status to published
            const response = await axios.put(`${BACKEND_URL}/tests/${id}`, {
                status: 'published'
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                setTest(prev => ({ ...prev, status: 'published' }));
                alert("Test published successfully!");
            }
        } catch (error) {
            console.error("Error publishing test:", error);
            alert("Failed to publish test. Please try again.");
        }
    };

    // Handle canceling published test
    const handleCancelPublish = async () => {
        try {
            // Update test status back to draft
            const response = await axios.put(`${BACKEND_URL}/tests/${id}`, {
                status: 'draft'
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                setTest(prev => ({ ...prev, status: 'draft' }));
                alert("Test status changed back to draft.");
            }
        } catch (error) {
            console.error("Error canceling publish:", error);
            alert("Failed to cancel publish. Please try again.");
        }
    };

    if (!test) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-background p-4">
            {/* Back button */}
            <div className="w-[80%] flex justify-start mb-4">
                <BackButton />
            </div>

            {/* Test details container */}
            <div className="w-[80%] bg-card shadow-lg rounded-lg p-8">
                {/* Test header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-primary">{test.title}</h1>
                    <div className="flex gap-2">
                        {test.status === 'draft' && (
                            <button
                                onClick={handlePublish}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Publish Test
                            </button>
                        )}
                        {test.status === 'published' && (
                            <>
                                <span className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                    Published
                                </span>
                                <button
                                    onClick={handleCancelPublish}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                >
                                    Cancel Publish
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Test description */}
                <p className="text-gray-600 mb-6">{test.description}</p>

                {/* Test duration */}
                <div className="mb-6">
                    <span className="font-semibold">Duration:</span> {test.duration} minutes
                </div>

                {/* Test Mode Selection */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Test Mode</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleModeChange('public')}
                            className={`px-4 py-2 rounded-md ${
                                test.mode === 'public' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Public
                        </button>
                        <button
                            onClick={() => handleModeChange('assigned')}
                            className={`px-4 py-2 rounded-md ${
                                test.mode === 'assigned' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Assigned
                        </button>
                        <button
                            onClick={() => handleModeChange('private')}
                            className={`px-4 py-2 rounded-md ${
                                test.mode === 'private' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Private
                        </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                        {test.mode === 'public' && "All students can access this test"}
                        {test.mode === 'assigned' && "Only assigned students can access this test"}
                        {test.mode === 'private' && "This test is private and not accessible to students"}
                    </p>

                    {/* Test ID for private mode */}
                    {test.mode === 'private' && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                            <h3 className="font-semibold mb-2">Test Access Code</h3>
                            <div className="flex items-center gap-2">
                                <code className="p-2 bg-white rounded border flex-1">{id}</code>
                                <button
                                    onClick={copyTestId}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                                Share this code with students to allow them to access this test.
                            </p>
                        </div>
                    )}

                    {/* Assigned students for assigned mode */}
                    {test.mode === 'assigned' && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                            <h3 className="font-semibold mb-4">Assigned Students</h3>
                            
                            {/* Add student form */}
                            <form onSubmit={handleAddStudent} className="mb-4">
                                <div className="flex gap-2 mb-2">
                                    <select
                                        value={searchType}
                                        onChange={(e) => setSearchType(e.target.value)}
                                        className="p-2 border rounded-md"
                                    >
                                        <option value="username">Username</option>
                                        <option value="email">Email</option>
                                    </select>
                                    <input
                                        type={searchType === "email" ? "email" : "text"}
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        placeholder={`Enter student ${searchType}`}
                                        className="flex-1 p-2 border rounded-md"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                    >
                                        Add Student
                                    </button>
                                </div>
                                {error && <p className="text-sm text-red-500">{error}</p>}
                            </form>

                            {/* Assigned students list */}
                            <div className="space-y-2">
                                {assignedStudents.map((student) => (
                                    <div key={student._id} className="flex justify-between items-center p-2 bg-white rounded border">
                                        <div>
                                            <p className="font-medium">{student.username}</p>
                                            <p className="text-sm text-gray-600">{student.email}</p>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveStudent(student._id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                {assignedStudents.length === 0 && (
                                    <p className="text-gray-500">No students assigned yet.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Question Sets Selection */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Select Question Set</h2>
                    <div className="flex gap-4 items-center">
                        <select
                            onChange={(e) => handleSetSelect(e.target.value)}
                            className={`flex-1 p-2 border rounded-md ${test.status === 'published' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                            value={test.questionSetId || ""}
                            disabled={test.status === 'published'}
                        >
                            <option value="">Select a question set</option>
                            {questionSets.map((set) => (
                                <option key={set._id} value={set._id}>
                                    {set.name} (Easy: {set.easy}, Medium: {set.medium}, Hard: {set.hard})
                                </option>
                            ))}
                        </select>
                        {test.questionSetId && test.status !== 'published' && (
                            <button
                                onClick={() => handleSetSelect("")}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Remove Set
                            </button>
                        )}
                    </div>
                    {!test.questionSetId && test.status === 'draft' && (
                        <p className="mt-2 text-sm text-red-500">
                            Please select a question set before publishing the test.
                        </p>
                    )}
                    {test.status === 'published' && (
                        <p className="mt-2 text-sm text-gray-500">
                            Question set cannot be changed while the test is published.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
} 