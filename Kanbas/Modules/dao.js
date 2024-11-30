import Database from "../Database/index.js";
import model from "./model.js";
export function createModule(module) {
 delete module._id
 return model.create(module);
 // const newModule = { ...module, _id: Date.now().toString() };
 // Database.modules = [...Database.modules, newModule];
 // return newModule;
}
export function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
    // const { modules } = Database;
    // return modules.filter((module) => module.course === courseId);
   }
   