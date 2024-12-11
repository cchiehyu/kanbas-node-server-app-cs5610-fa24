import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
    app.delete("/api/modules/:moduleId", async (req, res) => {
        try {
            const { moduleId } = req.params;
            const status = await modulesDao.deleteModule(moduleId);
            res.json(status);
        } catch (error) {
            console.error("Delete error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    app.put("/api/modules/:moduleId", async (req, res) => {
        try {
            const { moduleId } = req.params;
            const moduleUpdates = req.body;
            const updatedModule = await modulesDao.updateModule(moduleId, moduleUpdates);
            res.json(updatedModule);
        } catch (error) {
            console.error("Update error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    app.get("/api/courses/:courseId/modules", async (req, res) => {
        try {
            const { courseId } = req.params;
            const modules = await modulesDao.findModulesForCourse(courseId);
            res.json(modules);
        } catch (error) {
            console.error("Find error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    app.post("/api/courses/:courseId/modules", async (req, res) => {
        try {
            const { courseId } = req.params;
            const module = {
                ...req.body,
                course: courseId,
            };
            const newModule = await modulesDao.createModule(module);
            res.json(newModule);
        } catch (error) {
            console.error("Create error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}