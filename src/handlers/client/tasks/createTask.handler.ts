import { di } from "@config";
import { TaskService } from "@services";
import { AppFastifyHandler } from "@types";
import { CreateTaskType } from "@schemas/client";

export const createTaskHandler: AppFastifyHandler<CreateTaskType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.name);

  const createdTask = await taskService.createTask({
    userId: req.session!.userId,
    ...req.body,
  });

  reply.code(201).send({
    alert: true,
    message: req.i18n.t("swagger.messages.SAVED"),
    task: createdTask,
  });
};
