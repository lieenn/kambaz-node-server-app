import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findQuizzesForCourse(courseId) {
  const { quizzes } = Database;
  const quiz = quizzes.filter((quiz) => quiz.course === courseId);
  console.log(quiz);
  return quiz;
}

export function createQuiz(quiz) {
  const { quizzes } = Database;
  const newQuiz = { ...quiz, _id: uuidv4() };
  Database.quizzes = [...quizzes, newQuiz];
  return newQuiz;
}

export function deleteQuiz(quizId) {
  const { quizzes } = Database;
  // Update the database, not just return the filtered list
  Database.quizzes = quizzes.filter((quiz) => quiz._id !== quizId);
  return { status: "ok" };
}

export function updateQuiz(quizId, quiz) {
  // Fixed: Use quizId parameter instead of undefined 'id' variable
  const index = Database.quizzes.findIndex((q) => q._id === quizId);
  // Fixed: Check for index !== -1 instead of index !== 1
  if (index !== -1) {
    Database.quizzes[index] = {
      ...Database.quizzes[index],
      ...quiz,
    };
    return Database.quizzes[index];
  }
  return null;
}

export function getQuestions(quizId) {
  const { quizQuestions } = Database;
  const questions = quizQuestions.filter((qs) => qs.quizId === quizId);
  return questions;
}
