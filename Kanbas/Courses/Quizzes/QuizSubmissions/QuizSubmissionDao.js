import QuizSubmissionModel from "./model.js";

export const createSubmission = async (submission) => {
    // Find existing submission for this quiz and student
    const existingSubmission = await QuizSubmissionModel.findOne({
      quizId: submission.quizId,
      studentId: submission.studentId,
    });
  
    if (existingSubmission) {
      // Update existing submission with new data
      return QuizSubmissionModel.findByIdAndUpdate(
        existingSubmission._id,
        {
          ...submission,
          _id: existingSubmission._id, // Keep the same ID
        },
        { new: true } // Return the updated document
      );
    } else {
      // Create new submission if none exists
      return QuizSubmissionModel.create(submission);
    }
  };

export const findSubmissionById = (submissionId) => {
  return QuizSubmissionModel.findById(submissionId);
};

export const findSubmissionsForQuiz = (quizId, studentId) => {
    return QuizSubmissionModel.find({
      quizId,
      studentId
    });
  };

export const findLatestAttemptNumber = async (quizId, studentId) => {
  const latest = await QuizSubmissionModel.findOne({ 
    quizId, 
    studentId 
  }).sort({ attemptNumber: -1 });
  return latest ? latest.attemptNumber : 0;
};

export const updateSubmissionScores = async (submissionId, updates) => {
  const submission = await QuizSubmissionModel.findById(submissionId);
  if (!submission) return null;

  // Update individual answer scores
  submission.answers = submission.answers.map(answer => {
    const update = updates.answers.find(u => u.questionId === answer.questionId);
    if (update) {
      return {
        ...answer,
        points: update.points
      };
    }
    return answer;
  });

  // Recalculate total score and percentage
  const totalScore = submission.answers.reduce((sum, ans) => sum + ans.points, 0);
  const percentage = Math.round((totalScore / submission.maxScore) * 100);

  submission.score = totalScore;
  submission.percentage = percentage;

  return QuizSubmissionModel.findByIdAndUpdate(
    submissionId, 
    { 
      answers: submission.answers,
      score: totalScore,
      percentage: percentage
    },
    { new: true }
  );
};
