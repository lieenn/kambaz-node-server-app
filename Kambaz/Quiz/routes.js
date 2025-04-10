import { json } from "express";
import * as quizDao from "./dao.js";

export default function QuizRoutes(app) {
  app.get("/api/quizzes/course/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const quizzes = quizDao.findQuizzesForCourse(courseId); // Fixed function name
    res.json(quizzes);
  });

  app.post("/api/quizzes", (req, res) => {
    const newQuiz = quizDao.createQuiz(req.body);
    res.status(201).json(newQuiz);
  });

  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const status = await quizDao.deleteQuiz(quizId);
    res.json(status);
  });

  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const updatedQuiz = quizDao.updateQuiz(quizId, req.body);
    if (!updatedQuiz) {
      return res.status(400).json({ message: "Quiz not found" });
    }
    res.json(updatedQuiz);
  });

  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const questions = quizDao.getQuestions(quizId);
    res.json(questions);
  });
}
