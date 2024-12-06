import QuestionModel from "./model.js";

export const createQuestion = (question) => {
  return QuestionModel.create(question);
};

export const findQuestionsForQuiz = async (quizId) => {
  console.log("DAO: Searching for questions with quizId:", quizId);
  try {
    // First, let's see ALL questions in the database
    const allQuestions = await QuestionModel.find({});
    console.log("DAO: ALL Questions in database:", JSON.stringify(allQuestions, null, 2));
    console.log("DAO: Total questions in database:", allQuestions.length);

    // Now let's see what we get with the filter
    const questions = await QuestionModel.find({ quizId }).sort({ order: 1 });
    console.log("DAO: Filtered questions count:", questions.length);
    console.log("DAO: Filtered Questions:", JSON.stringify(questions, null, 2));
    
    return questions;
  } catch (error) {
    console.error("DAO: Error finding questions:", error);
    throw error;
  }
};

export const findQuestionById = (questionId) => {
  return QuestionModel.findById(questionId);
};

export const updateQuestion = (questionId, question) => {
  return QuestionModel.updateOne({ _id: questionId }, { $set: question });
};

export const deleteQuestion = (questionId) => {
  return QuestionModel.deleteOne({ _id: questionId });
};

export const reorderQuestions = async (quizId, questionOrders) => {
  const bulkOps = questionOrders.map(({ questionId, order }) => ({
    updateOne: {
      filter: { _id: questionId, quizId },
      update: { $set: { order } }
    }
  }));
  return QuestionModel.bulkWrite(bulkOps);
};

export const calculateQuizPoints = async (quizId) => {
  const result = await QuestionModel.aggregate([
    { $match: { quizId } },
    { $group: { _id: null, totalPoints: { $sum: "$points" } } }
  ]);
  return result[0]?.totalPoints || 0;
};