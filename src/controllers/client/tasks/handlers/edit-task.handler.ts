import { di } from "@config";
import { TaskService } from "@services";
import { EditTaskType } from "../schemas";
import { AppFastifyHandler, SuccessCode } from "@types";

export const editTaskHandler: AppFastifyHandler<EditTaskType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.name);

  const updatedTask = await taskService.editTask({
    taskId: req.params.taskId,
    ...req.body,
  });

  reply.code(SuccessCode.OK).send({
    alert: true,
    message: "Успешно сохранено",
    task: updatedTask,
  });
};
