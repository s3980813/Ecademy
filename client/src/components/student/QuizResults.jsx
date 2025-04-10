import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const QuizResults = ({ result, questions }) => {
  const navigate = useNavigate();

  const getAnswerStatus = (questionId, selectedAnswer) => {
    const question = questions.find(q => q._id === questionId);
    const isCorrect = selectedAnswer === question.correctAnswer;
    return {
      isCorrect,
      correctAnswer: question.correctAnswer,
    };
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Quiz Results
          </Typography>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="h6">
              Score: {result.score}%
            </Typography>
            <Chip
              label={`${result.correctAnswers} / ${result.totalQuestions} correct`}
              color={result.score >= 70 ? 'success' : 'error'}
            />
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Question Review
          </Typography>
          <List>
            {result.answers.map((answer, index) => {
              const { isCorrect, correctAnswer } = getAnswerStatus(answer.questionId, answer.selectedOption);
              const question = questions.find(q => q._id === answer.questionId);

              return (
                <React.Fragment key={answer.questionId}>
                  <ListItem>
                    <Box sx={{ width: '100%' }}>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        {isCorrect ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CancelIcon color="error" />
                        )}
                        <Typography variant="subtitle1">
                          Question {index + 1}
                        </Typography>
                      </Box>
                      <Typography variant="body1" gutterBottom>
                        {question.question}
                      </Typography>
                      <Box mt={1}>
                        <Typography variant="body2" color="text.secondary">
                          Your answer: {answer.selectedOption}
                        </Typography>
                        {!isCorrect && (
                          <Typography variant="body2" color="success.main">
                            Correct answer: {correctAnswer}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </ListItem>
                  {index < result.answers.length - 1 && <Divider />}
                </React.Fragment>
              );
            })}
          </List>
        </CardContent>
      </Card>

      <Box mt={3} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/student-dashboard')}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default QuizResults; 