import { di } from "@config";
import { TaskService } from "@services";
import { ReplaceTasksType } from "@schemas/client";
import { AppFastifyHandler, SuccessCode } from "@types";

export const replaceTasksHandler: AppFastifyHandler<ReplaceTasksType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.name);

  await taskService.replaceTasks({ tasks: req.body.tasks });

  reply.code(SuccessCode.CREATED).send({
    alert: true,
    message: "Успешно сохранено",
  });
};
