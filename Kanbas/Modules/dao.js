import model from "./model.js";
export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);


}

export async function createModule(module) {
    try {
        const existingModule = await model.findOne({
            name: module.name,
            course: module.course
        });

        if (existingModule) {
            return null;
        }

        delete module._id;
        const newModule = await model.create(module);
        return newModule;
    } catch (error) {
        console.error("Create module error:", error);
        throw error;
    }
}

export function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
   }
   
   export function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
   }
   