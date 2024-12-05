import QuestionModel from "./model.js";

export const createQuestion = (question) => {
  return QuestionModel.create(question);
};

export const findQuestionsForQuiz = (quizId) => {
  return QuestionModel.find({ quizId }).sort({ order: 1 });
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