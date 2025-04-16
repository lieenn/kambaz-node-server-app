import model from "./model.js";
export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}
export async function enrollUserInCourse(user, course) {
  const newEnrollment = { user, course, _id: `${user}-${course}` };
  return model.create(newEnrollment);
}
export async function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

export async function findEnrollment(userId, courseId) {
  return model.findOne({ user: userId, course: courseId });
}
export async function findAllEnrollments() {
  const enrollments = model.find(); //.populate("user").populate("course");
  return enrollments;
}
export async function findEnrollForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments;
}
export async function findEnrollForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments;
}
