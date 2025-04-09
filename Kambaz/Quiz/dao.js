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
